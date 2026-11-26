"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { trackMetaEvent } from "@/lib/analytics";
import { subscribeConsent, getConsentSnapshot, getConsentServerSnapshot } from "@/lib/consent";

/**
 * Campaign-page Meta Pixel events, on top of the site-wide PageView that
 * MarketingPixels already sends:
 * - ViewContent (content_name) once per page load, as soon as consent is
 *   granted and the pixel script has loaded.
 * - Contact on every click to a [data-track="whatsapp_click"] link, with the
 *   option the visitor picked (data-ga-option).
 * Nothing fires without marketing consent (same gate as GA4).
 */
export default function MetaPixelCampaignEvents({ contentName }: { contentName: string }) {
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getConsentServerSnapshot);
  const viewFiredRef = useRef(false);

  useEffect(() => {
    if (consent !== "granted" || viewFiredRef.current) return;

    // The pixel <Script> mounts at the same time consent flips, so fbq may
    // not exist yet on the first try: retry briefly.
    let tries = 0;
    const fire = () => {
      if (viewFiredRef.current) return true;
      if (trackMetaEvent("ViewContent", { content_name: contentName })) {
        viewFiredRef.current = true;
        return true;
      }
      return false;
    };
    if (fire()) return;
    const interval = setInterval(() => {
      tries += 1;
      if (fire() || tries >= 40) clearInterval(interval);
    }, 250);
    return () => clearInterval(interval);
  }, [consent, contentName]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = (event.target as HTMLElement)?.closest('[data-track="whatsapp_click"]');
      if (!target) return;
      const option = target.getAttribute("data-ga-option");
      trackMetaEvent("Contact", {
        content_name: contentName,
        ...(option ? { content_category: option } : {}),
      });
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [contentName]);

  return null;
}
