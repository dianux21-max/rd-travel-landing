"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@iconify/react";

const COOKIE_NAME = "rdtravel_consent";
const COOKIE_MAX_AGE_DAYS = 180;

type Listener = () => void;
const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readConsentCookie(): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  return match ? match.split("=")[1] : null;
}

function getSnapshot() {
  return readConsentCookie();
}

// Unknown on the server: report a non-null placeholder so the banner stays
// hidden until the client confirms whether a real choice was already made.
function getServerSnapshot() {
  return "pending";
}

function writeConsentCookie(value: "granted" | "denied") {
  const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
  listeners.forEach((listener) => listener());
}

export default function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const visible = consent === null;

  function respond(value: "granted" | "denied") {
    writeConsentCookie(value);
    window.dispatchEvent(new CustomEvent("rdtravel:consent", { detail: value }));
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="glass-strong fixed inset-x-3 bottom-28 z-50 mx-auto flex max-w-3xl flex-col gap-3 rounded-[var(--radius-lg)] p-4 sm:bottom-3 sm:flex-row sm:items-center sm:justify-between sm:p-5"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <p className="flex items-start gap-2 text-xs text-[var(--ink-muted)] sm:text-sm">
        <Icon icon="solar:cookie-bold-duotone" width={22} height={22} className="shrink-0 text-[var(--amber)]" />
        Usamos cookies propias y de terceros para medir el rendimiento de esta
        página y mostrarte anuncios relevantes. Puedes leer más en nuestro{" "}
        <a href="/aviso-de-privacidad" className="underline underline-offset-2">
          aviso de privacidad
        </a>
        .
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => respond("denied")}
          className="tap-target rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-[var(--ink-muted)] hover:bg-white/5"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => respond("granted")}
          className="tap-target rounded-full px-4 py-2 text-xs font-bold text-white"
          style={{ background: "linear-gradient(120deg, var(--brand), var(--brand-2))" }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
