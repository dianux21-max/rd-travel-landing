import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export type FunnelStage = {
  key: string;
  label: string;
  count: number;
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

  const [visits, scrolls, ctaClicks, graciasViews, leadsResult] = await Promise.all([
    distinctSessionCount(supabase, ["page_view"], since),
    distinctSessionCount(supabase, ["scroll_50"], since),
    distinctSessionCount(supabase, ["cta_click", "whatsapp_click"], since),
    distinctSessionCount(supabase, ["gracias_view"], since),
    supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", since),
  ]);

  return [
    { key: "visit", label: "Visitas", count: visits },
    { key: "scroll", label: "Llegó a la mitad de la página", count: scrolls },
    { key: "cta", label: "Le dio clic a un CTA", count: ctaClicks },
    { key: "lead", label: "Envió el formulario", count: leadsResult.count ?? 0 },
    { key: "gracias", label: "Llegó a /gracias", count: graciasViews },
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
