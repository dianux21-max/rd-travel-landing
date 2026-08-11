"use client";

import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { faq } from "@/lib/content";

function FaqItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyRef = useRef<HTMLDivElement>(null);

  async function toggle() {
    const el = bodyRef.current;
    const nextOpen = !open;
    setOpen(nextOpen);

    if (!el) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const { gsap } = await import("gsap");
    if (prefersReducedMotion) {
      gsap.set(el, { height: nextOpen ? "auto" : 0 });
      return;
    }

    if (nextOpen) {
      gsap.fromTo(
        el,
        { height: 0 },
        { height: "auto", duration: 0.35, ease: "power2.out" }
      );
    } else {
      gsap.to(el, { height: 0, duration: 0.28, ease: "power2.in" });
    }
  }

  return (
    <div className="glass overflow-hidden rounded-[var(--radius-md)]">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="tap-target flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
      >
        {question}
        <Icon
          icon="solar:alt-arrow-down-bold"
          width={20}
          height={20}
          className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div ref={bodyRef} style={{ height: defaultOpen ? "auto" : 0, overflow: "hidden" }}>
        <p className="px-5 pb-4 text-sm text-[var(--ink-muted)]">{answer}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <Reveal className="text-center">
          <h2 className="font-heading text-fluid-h2 font-extrabold">
            Preguntas frecuentes
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {faq.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.05}>
              <FaqItem question={item.question} answer={item.answer} defaultOpen={index === 0} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
