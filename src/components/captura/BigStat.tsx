"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import { bigStat } from "@/lib/content";

export default function BigStat() {
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = valueRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let cleanup: (() => void) | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();

          const { gsap } = await import("gsap");
          gsap.fromTo(
            el,
            { opacity: 0, scale: 0.7, y: 24 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
            }
          );
          cleanup = () => gsap.killTweensOf(el);
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <section className="py-16 sm:py-20">
      <Container className="text-center">
        <span
          ref={valueRef}
          className="holo-text font-heading text-fluid-stat block font-extrabold"
        >
          {bigStat.value}
        </span>
        <p className="font-heading text-fluid-h3 mx-auto mt-3 max-w-2xl font-bold text-[var(--ink)]">
          {bigStat.label}
        </p>
        <p className="mx-auto mt-2 max-w-xl text-[var(--ink-muted)]">
          {bigStat.detail}
        </p>
      </Container>
    </section>
  );
}
