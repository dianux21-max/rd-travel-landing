"use client";

import { getConsentSnapshot } from "@/lib/consent";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track?: (...args: unknown[]) => void };
  }
}

/**
 * Fires the lead-conversion event to Meta Pixel / TikTok Pixel, if the
 * scripts are loaded (see MarketingPixels.tsx) and the visitor has granted
 * marketing consent.
 */
export function trackLeadConversion() {
  if (getConsentSnapshot() !== "granted") return;

  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
  if (typeof window.ttq?.track === "function") {
    window.ttq.track("SubmitForm");
  }
}

/**
 * Fires a standard Meta Pixel event, only with marketing consent and once
 * the pixel script is loaded. Returns false if it couldn't fire yet.
 */
export function trackMetaEvent(
  event: string,
  params?: Record<string, string | number>
): boolean {
  if (getConsentSnapshot() !== "granted") return false;
  if (typeof window.fbq !== "function") return false;
  window.fbq("track", event, params);
  return true;
}
