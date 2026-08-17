"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import type { LeadSignal } from "@/lib/admin/social-proof";

const VISIBLE_MS = 6000;
const GAP_MS = 9000;
const INITIAL_DELAY_MS = 4000;

export default function SocialProofPopup({ signals }: { signals: LeadSignal[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (signals.length === 0 || dismissed) return;

    let showTimeout: ReturnType<typeof setTimeout>;
    let hideTimeout: ReturnType<typeof setTimeout>;

    function cycle() {
      setVisible(true);
      hideTimeout = setTimeout(() => {
        setVisible(false);
        showTimeout = setTimeout(() => {
          setIndex((i) => (i + 1) % signals.length);
          cycle();
        }, GAP_MS);
      }, VISIBLE_MS);
    }

    const initialDelay = setTimeout(cycle, INITIAL_DELAY_MS);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [signals.length, dismissed]);

  if (signals.length === 0 || dismissed) return null;

  const signal = signals[index];

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-4 z-30 hidden max-w-xs lg:block"
      aria-live="polite"
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35 }}
            className="glass pointer-events-auto flex items-center gap-3 rounded-[var(--radius-md)] p-4 pr-3"
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-2))" }}
              aria-hidden="true"
            >
              {signal.firstName.charAt(0).toUpperCase()}
            </div>
            <p className="text-sm text-[var(--ink-muted)]">
              <span className="font-semibold text-[var(--ink)]">{signal.firstName}</span>
              {signal.city ? ` de ${signal.city}` : ""} ya cotizó su viaje ·{" "}
              <span className="text-[var(--ink-faint)]">{signal.timeLabel}</span>
            </p>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Cerrar"
              className="tap-target shrink-0 text-[var(--ink-faint)] hover:text-[var(--ink)]"
            >
              <Icon icon="solar:close-circle-bold" width={18} height={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
