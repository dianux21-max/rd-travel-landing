"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Icon } from "@iconify/react";
import { subscribeConsent, getConsentSnapshot, getConsentServerSnapshot } from "@/lib/consent";

export default function StickyMobileCta({
  text = "Cotización gratis, sin compromiso",
  label = "Cotizar por WhatsApp",
  whatsappHref,
  gaOption,
}: {
  text?: string;
  label?: string;
  /** When set, the button opens WhatsApp directly instead of scrolling to #formulario. */
  whatsappHref?: string;
  gaOption?: string;
} = {}) {
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

  const linkProps = whatsappHref
    ? {
        href: whatsappHref,
        target: "_blank",
        rel: "noopener noreferrer",
        "data-track": "whatsapp_click",
        "data-ga-location": "barra_movil",
        "data-ga-option": gaOption,
      }
    : { href: "#formulario", "data-track": "cta_click" };

  return (
    <div
      className={`glass-strong fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-2 px-3 py-3 transition-transform duration-300 sm:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <p className="truncate text-xs font-medium text-[var(--ink-muted)]">{text}</p>
      <a
        {...linkProps}
        className="tap-target flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2.5 text-xs font-bold text-white"
        style={{ background: "linear-gradient(120deg, var(--brand), var(--brand-2))" }}
      >
        <Icon
          icon={whatsappHref ? "ic:baseline-whatsapp" : "solar:chat-round-dots-bold"}
          width={16}
          height={16}
        />
        {label}
      </a>
    </div>
  );
}
