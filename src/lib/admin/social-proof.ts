import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export type LeadSignal = {
  firstName: string;
  city: string | null;
  timeLabel: string;
};

function relativeLabel(createdAt: string): string {
  const days = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
  if (days < 1) return "hoy";
  if (days < 2) return "ayer";
  return `hace ${Math.floor(days)} días`;
}

/**
 * Real, recent leads only (first name + city) for the social-proof popup.
 * Never fabricated. Returns [] (nothing rendered) if there's no real data.
 */
export async function getRecentLeadSignals(): Promise<LeadSignal[]> {
  try {
    const supabase = createAdminClient();
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from("leads")
      .select("name, geo_city, created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(12);

    if (error || !data) return [];

    return data
      .map((row) => ({
        firstName: row.name?.trim().split(/\s+/)[0] ?? "",
        city: row.geo_city,
        timeLabel: relativeLabel(row.created_at),
      }))
      .filter((row) => row.firstName.length > 0);
  } catch {
    return [];
  }
}
