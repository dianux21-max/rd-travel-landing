"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track?: (...args: unknown[]) => void };
  }
}

function hasMarketingConsent(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split("; ")
    .some((row) => row === "rdtravel_consent=granted");
}

/**
 * Fires the lead-conversion event to Meta Pixel / TikTok Pixel, if the
 * scripts are loaded and the visitor has granted marketing consent.
 * Wiring the actual pixel scripts (with NEXT_PUBLIC_META_PIXEL_ID /
 * NEXT_PUBLIC_TIKTOK_PIXEL_ID) is a fase 2/3 item — this hook is safe to
 * call today even with no pixels installed yet.
 */
export function trackLeadConversion() {
  if (!hasMarketingConsent()) return;

  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
  if (typeof window.ttq?.track === "function") {
    window.ttq.track("SubmitForm");
  }
}
