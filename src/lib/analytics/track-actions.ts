"use server";

import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { parseDeviceType } from "./device";

const ALLOWED_EVENTS = new Set([
  "page_view",
  "scroll_50",
  "cta_click",
  "whatsapp_click",
  "gracias_view",
  "heartbeat",
]);

export async function trackEvent(input: {
  sessionId: string;
  eventType: string;
  pagePath: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
}) {
  if (!ALLOWED_EVENTS.has(input.eventType)) return;
  if (!input.sessionId || input.sessionId.length > 100) return;

  const userAgent = (await headers()).get("user-agent");
  const supabase = createAdminClient();

  await supabase.from("page_events").insert({
    session_id: input.sessionId,
    event_type: input.eventType,
    page_path: input.pagePath?.slice(0, 200) ?? null,
    utm_source: input.utmSource?.slice(0, 100) ?? null,
    utm_medium: input.utmMedium?.slice(0, 100) ?? null,
    utm_campaign: input.utmCampaign?.slice(0, 100) ?? null,
    device_type: parseDeviceType(userAgent),
  });
}
