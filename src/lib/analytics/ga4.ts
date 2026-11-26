"use client";

type Gtag = (...args: unknown[]) => void;

// window.gtag only exists once MarketingPixels has loaded GA4, which only
// happens after cookie consent is granted — so this check doubles as the
// consent check, no separate lookup needed.
// `opcion` (optional) = which package/option the visitor picked, set via a
// data-ga-option attribute on the clicked link.
export function trackWhatsAppClick(ubicacion: string, opcion?: string) {
  if (typeof window === "undefined") return;
  const gtag = (window as typeof window & { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", "clic_whatsapp", opcion ? { ubicacion, opcion } : { ubicacion });
}
