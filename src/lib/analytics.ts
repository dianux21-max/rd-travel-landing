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
