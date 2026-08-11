import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getLeadStats(supabase: SupabaseClient) {
  const now = Date.now();
  const since24h = new Date(now - 24 * 60 * 60 * 1000).toISOString();
  const since7d = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [{ count: total }, { count: last24h }, { count: last7d }] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", since24h),
    supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", since7d),
  ]);

  return {
    total: total ?? 0,
    last24h: last24h ?? 0,
    last7d: last7d ?? 0,
  };
}
