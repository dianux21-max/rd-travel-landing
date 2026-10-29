"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Icon } from "@iconify/react";
import { subscribeConsent, getConsentSnapshot, getConsentServerSnapshot } from "@/lib/consent";

export default function StickyMobileCta() {
  const [hidden, setHidden] = useState(false);
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getConsentServerSnapshot);

  useEffect(() => {
    const form = document.getElementById("formulario");
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  // The cookie banner docks in this same bottom slot on mobile until answered.
  if (consent === null) return null;

  return (
    <div
      className={`glass-strong fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-2 px-3 py-3 transition-transform duration-300 sm:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <p className="truncate text-xs font-medium text-[var(--ink-muted)]">
        Cotización gratis, sin compromiso
      </p>
      <a
        href="#formulario"
        data-track="cta_click"
        className="tap-target flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2.5 text-xs font-bold text-white"
        style={{ background: "linear-gradient(120deg, var(--brand), var(--brand-2))" }}
      >
        <Icon icon="solar:chat-round-dots-bold" width={16} height={16} />
        Cotizar por WhatsApp
      </a>
    </div>
  );
}
