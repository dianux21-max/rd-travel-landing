"use client";

const COOKIE_NAME = "rdtravel_consent";
const COOKIE_MAX_AGE_DAYS = 180;

type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribeConsent(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getConsentSnapshot(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  return match ? match.split("=")[1] : null;
}

// Unknown on the server: a non-null placeholder keeps consumers rendering
// their "no consent yet" state until the client confirms the real value.
export function getConsentServerSnapshot(): string {
  return "pending";
}

export function writeConsent(value: "granted" | "denied") {
  const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
  listeners.forEach((listener) => listener());
}
