"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export default function StickyMobileCta({ ctaLabel }: { ctaLabel: string }) {
  const [hidden, setHidden] = useState(false);

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

  return (
    <div
      className={`glass-strong fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 px-4 py-3 transition-transform duration-300 sm:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <p className="text-xs font-medium text-[var(--ink-muted)]">
        Cotización gratis, sin compromiso
      </p>
      <a
        href="#formulario"
        className="tap-target flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold text-white"
        style={{ background: "linear-gradient(120deg, var(--brand), var(--brand-2))" }}
      >
        <Icon icon="solar:chat-round-dots-bold" width={16} height={16} />
        {ctaLabel}
      </a>
    </div>
  );
}
