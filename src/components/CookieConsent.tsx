"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@iconify/react";
import { subscribeConsent, getConsentSnapshot, getConsentServerSnapshot, writeConsent } from "@/lib/consent";

export default function CookieConsent() {
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getConsentServerSnapshot);
  const visible = consent === null;

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-0 z-50 mx-auto flex max-w-3xl flex-col gap-1.5 rounded-[var(--radius-lg)] border border-[var(--glass-border-strong)] bg-[var(--bg-elevated)] p-2.5 shadow-[var(--shadow-soft)] sm:bottom-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-5"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <p className="flex items-center gap-2 text-xs text-[var(--ink-muted)] sm:items-start sm:text-sm">
        <Icon icon="solar:cookie-bold-duotone" width={18} height={18} className="shrink-0 text-[var(--amber)] sm:w-[22px] sm:h-[22px]" />
        <span className="sm:hidden">
          Usamos cookies para mejorar tu experiencia.{" "}
          <a href="/aviso-de-privacidad" className="underline underline-offset-2">
            Más info
          </a>
          .
        </span>
        <span className="hidden sm:inline">
          Usamos cookies propias y de terceros para medir el rendimiento de esta
          página y mostrarte anuncios relevantes. Puedes leer más en nuestro{" "}
          <a href="/aviso-de-privacidad" className="underline underline-offset-2">
            aviso de privacidad
          </a>
          .
        </span>
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => writeConsent("denied")}
          className="tap-target rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-[var(--ink-muted)] hover:bg-white/5"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => writeConsent("granted")}
          className="tap-target rounded-full px-4 py-2 text-xs font-bold text-white"
          style={{ background: "linear-gradient(120deg, var(--brand), var(--brand-2))" }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
