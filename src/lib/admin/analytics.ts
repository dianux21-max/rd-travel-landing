import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export type FunnelStage = {
  key: string;
  label: string;
  count: number;
  /** Percentage to show next to the count. When omitted, FunnelChart falls
   * back to count / previous-stage-count — which only makes sense for a
   * strictly linear funnel. Stages that branch off an earlier step (e.g.
   * "clicked WhatsApp directly" vs "clicked the form CTA", both measured
   * against the same earlier "scroll" step) or that aren't a real next
   * step at all (e.g. raw /gracias pageviews, which include bots/direct
   * visits) must set this explicitly instead. */
  pctOverride?: number | null;
  hidePct?: boolean;
  /** Caption for the percentage, when the default "% del paso anterior"
   * would be misleading (e.g. a stage compared against an earlier step
   * rather than the one directly above it). */
  pctCaption?: string;
};

export type CountRow = {
  label: string;
  count: number;
};

function sinceIso(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

async function distinctSessionCount(
  supabase: SupabaseClient,
  eventTypes: string[],
  since: string
): Promise<number> {
  const { data, error } = await supabase
    .from("page_events")
    .select("session_id")
    .in("event_type", eventTypes)
    .gte("created_at", since);

  if (error || !data) return 0;
  return new Set(data.map((row) => row.session_id as string)).size;
}

export async function getFunnelStats(
  supabase: SupabaseClient,
  days = 30
): Promise<FunnelStage[]> {
  const since = sinceIso(days);

  const [visits, scrolls, ctaClicks, whatsappClicks, graciasViews, leadsResult] =
    await Promise.all([
      distinctSessionCount(supabase, ["page_view"], since),
      distinctSessionCount(supabase, ["scroll_50"], since),
      distinctSessionCount(supabase, ["cta_click"], since),
      distinctSessionCount(supabase, ["whatsapp_click"], since),
      distinctSessionCount(supabase, ["gracias_view"], since),
      supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", since),
    ]);

  const pctOf = (count: number, base: number) => (base > 0 ? Math.round((count / base) * 100) : null);
  const leadsCount = leadsResult.count ?? 0;

  return [
    { key: "visit", label: "Visitas", count: visits },
    { key: "scroll", label: "Llegó a la mitad de la página", count: scrolls },
    // Both of these branch off "scroll" independently (the WhatsApp button
    // doesn't require scrolling to the form), so both compare against the
    // same base instead of each other.
    {
      key: "cta",
      label: "Le dio clic a un CTA (formulario)",
      count: ctaClicks,
      pctOverride: pctOf(ctaClicks, scrolls),
      pctCaption: "% de quienes llegaron a la mitad",
    },
    {
      key: "whatsapp",
      label: "Le dio clic a WhatsApp directo",
      count: whatsappClicks,
      pctOverride: pctOf(whatsappClicks, scrolls),
      pctCaption: "% de quienes llegaron a la mitad",
    },
    {
      key: "lead",
      label: "Envió el formulario",
      count: leadsCount,
      pctOverride: pctOf(leadsCount, ctaClicks),
      pctCaption: "% de quienes le dieron clic al CTA",
    },
    // Counts every visit to /gracias, including bots/crawlers and people
    // who land there directly — not a reliable "next step" of the funnel,
    // so it's shown as a raw count rather than a percentage.
    { key: "gracias", label: "Vistas totales de /gracias", count: graciasViews, hidePct: true },
  ];
}

export async function getUtmBreakdown(
  supabase: SupabaseClient,
  days = 30
): Promise<CountRow[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("utm_source")
    .gte("created_at", sinceIso(days));

  if (error || !data) return [];

  const counts = new Map<string, number>();
  for (const row of data) {
    const key = (row.utm_source as string | null)?.trim() || "Directo / sin UTM";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

export type CampaignRow = {
  campaign: string;
  pagePath: string;
  leadCount: number;
  firstLeadAt: string;
  lastLeadAt: string;
};

export async function getCampaignBreakdown(
  supabase: SupabaseClient,
  days = 180
): Promise<CampaignRow[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("utm_campaign, page_path, created_at")
    .gte("created_at", sinceIso(days))
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  const byCampaign = new Map<
    string,
    { pagePaths: Set<string>; count: number; first: string; last: string }
  >();

  for (const row of data) {
    const campaign = (row.utm_campaign as string | null)?.trim() || "Sin campaña (directo/orgánico)";
    const pagePath = (row.page_path as string | null) ?? "—";
    const createdAt = row.created_at as string;

    const existing = byCampaign.get(campaign);
    if (!existing) {
      byCampaign.set(campaign, {
        pagePaths: new Set([pagePath]),
        count: 1,
        first: createdAt,
        last: createdAt,
      });
    } else {
      existing.pagePaths.add(pagePath);
      existing.count += 1;
      existing.last = createdAt;
    }
  }

  return [...byCampaign.entries()]
    .map(([campaign, info]) => ({
      campaign,
      pagePath: [...info.pagePaths].join(", "),
      leadCount: info.count,
      firstLeadAt: info.first,
      lastLeadAt: info.last,
    }))
    .sort((a, b) => new Date(b.lastLeadAt).getTime() - new Date(a.lastLeadAt).getTime());
}

const DEVICE_LABELS: Record<string, string> = {
  mobile: "Móvil",
  tablet: "Tablet",
  desktop: "Escritorio",
};

export async function getDeviceBreakdown(
  supabase: SupabaseClient,
  days = 30
): Promise<CountRow[]> {
  const { data, error } = await supabase
    .from("page_events")
    .select("device_type, session_id")
    .eq("event_type", "page_view")
    .gte("created_at", sinceIso(days));

  if (error || !data) return [];

  const seenSessions = new Set<string>();
  const counts = new Map<string, number>();
  for (const row of data) {
    const sessionId = row.session_id as string;
    if (seenSessions.has(sessionId)) continue;
    seenSessions.add(sessionId);
    const key = (row.device_type as string | null) ?? "desktop";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([key, count]) => ({ label: DEVICE_LABELS[key] ?? key, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getGeoBreakdown(
  supabase: SupabaseClient,
  days = 30
): Promise<CountRow[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("geo_city, geo_country")
    .gte("created_at", sinceIso(days));

  if (error || !data) return [];

  const counts = new Map<string, number>();
  for (const row of data) {
    const city = row.geo_city as string | null;
    const country = row.geo_country as string | null;
    const key = city ? `${city}${country ? `, ${country}` : ""}` : "Ubicación desconocida";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

export async function getActiveUsersCount(
  supabase: SupabaseClient,
  windowSeconds = 45
): Promise<number> {
  const since = new Date(Date.now() - windowSeconds * 1000).toISOString();

  const { data, error } = await supabase
    .from("page_events")
    .select("session_id")
    .gte("created_at", since);

  if (error || !data) return 0;
  return new Set(data.map((row) => row.session_id as string)).size;
}
