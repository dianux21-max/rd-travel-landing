"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { trackLeadConversion } from "@/lib/analytics";

const REDIRECT_SECONDS = 6;

export default function AutoRedirect({ whatsappLink }: { whatsappLink: string }) {
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);
  const [cancelled, setCancelled] = useState(false);
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!trackedRef.current) {
      trackedRef.current = true;
      trackLeadConversion();
    }
  }, []);

  useEffect(() => {
    if (cancelled) return;

    if (secondsLeft <= 0) {
      window.location.href = whatsappLink;
      return;
    }

    const timeout = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timeout);
  }, [secondsLeft, cancelled, whatsappLink]);

  return (
    <div className="glass-strong glass-highlight mx-auto mt-8 max-w-md rounded-[var(--radius-lg)] p-6 text-center">
      <a
        href={whatsappLink}
        className="tap-target anim-pulse-glow flex w-full items-center justify-center gap-2 rounded-full py-4 font-heading text-base font-bold text-white"
        style={{ background: "var(--green)" }}
      >
        <Icon icon="ic:baseline-whatsapp" width={22} height={22} />
        Ir a WhatsApp ahora
      </a>

      {!cancelled ? (
        <p className="mt-4 text-sm text-[var(--ink-muted)]">
          Te llevamos a WhatsApp en {secondsLeft}s...{" "}
          <button
            type="button"
            onClick={() => setCancelled(true)}
            className="underline underline-offset-2"
          >
            Prefiero quedarme aquí
          </button>
        </p>
      ) : (
        <p className="mt-4 text-sm text-[var(--ink-muted)]">
          Sin problema. Cuando quieras, el botón de arriba te espera.
        </p>
      )}
    </div>
  );
}
