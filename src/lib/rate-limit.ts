import "server-only";
import { createHash } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

const WINDOW_MINUTES = 10;
const MAX_SUBMISSIONS_PER_WINDOW = 3;

export function hashIp(ip: string) {
  const salt = process.env.LEAD_HASH_SALT ?? "rd-travel-fallback-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function isRateLimited(ipHash: string) {
  const supabase = createAdminClient();
  const since = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();

  const { count, error } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);

  if (error) {
    // Fail open on read errors so a transient DB hiccup never blocks a real lead;
    // the honeypot + validation still guard against basic spam.
    return false;
  }

  return (count ?? 0) >= MAX_SUBMISSIONS_PER_WINDOW;
}
