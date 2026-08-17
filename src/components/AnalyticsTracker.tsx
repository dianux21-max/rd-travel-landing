"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics/track-actions";

const SESSION_KEY = "rdtravel_session_id";
const HEARTBEAT_MS = 20000;

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export default function AnalyticsTracker({
  pagePath,
  fireOnMount,
  utm,
}: {
  pagePath: string;
  fireOnMount: "page_view" | "gracias_view";
  utm?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
}) {
  const scrollFiredRef = useRef(false);

  useEffect(() => {
    const sessionId = getSessionId();
    const base = {
      sessionId,
      pagePath,
      utmSource: utm?.utm_source ?? null,
      utmMedium: utm?.utm_medium ?? null,
      utmCampaign: utm?.utm_campaign ?? null,
    };

    trackEvent({ ...base, eventType: fireOnMount });

    function handleScroll() {
      if (scrollFiredRef.current) return;
      const scrolled =
        (window.scrollY + window.innerHeight) /
        document.documentElement.scrollHeight;
      if (scrolled >= 0.5) {
        scrollFiredRef.current = true;
        trackEvent({ ...base, eventType: "scroll_50" });
        window.removeEventListener("scroll", handleScroll);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    function handleClick(event: MouseEvent) {
      const target = (event.target as HTMLElement)?.closest("[data-track]");
      const eventType = target?.getAttribute("data-track");
      if (eventType) {
        trackEvent({ ...base, eventType });
      }
    }
    document.addEventListener("click", handleClick);

    const heartbeat = setInterval(() => {
      if (document.visibilityState === "visible") {
        trackEvent({ ...base, eventType: "heartbeat" });
      }
    }, HEARTBEAT_MS);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
      clearInterval(heartbeat);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePath, fireOnMount]);

  return null;
}
