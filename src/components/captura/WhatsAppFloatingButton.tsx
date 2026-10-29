"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Icon } from "@iconify/react";
import { subscribeConsent, getConsentSnapshot, getConsentServerSnapshot } from "@/lib/consent";

export default function WhatsAppFloatingButton({ href }: { href: string }) {
  const [formVisible, setFormVisible] = useState(false);
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getConsentServerSnapshot);

  useEffect(() => {
    const form = document.getElementById("formulario");
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  // On mobile, defer to the cookie banner docked at the bottom until answered.
  const showOnMobile = formVisible && consent !== null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos directo por WhatsApp"
      data-track="whatsapp_click"
      className={`tap-target fixed right-4 bottom-6 z-40 h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 sm:right-6 sm:bottom-6 ${
        showOnMobile ? "flex" : "hidden sm:flex"
      }`}
      style={{ background: "var(--green)" }}
    >
      <Icon icon="ic:baseline-whatsapp" width={30} height={30} color="white" />
    </a>
  );
}
