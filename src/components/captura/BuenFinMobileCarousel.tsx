"use client";

import { useEffect, useRef, useState } from "react";
import BuenFinCardBody from "./BuenFinCardBody";
import type { BuenFinPackage } from "@/lib/content-buenfin";

type CardData = BuenFinPackage & { whatsappLink: string; gaOption?: string };

export default function BuenFinMobileCarousel({
  cards,
  gaPrefix,
  ctaLabel,
}: {
  cards: CardData[];
  gaPrefix?: string;
  ctaLabel?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = cardRefs.current.findIndex((el) => el === entry.target);
          if (index !== -1) setActiveIndex(index);
        });
      },
      { root: track, threshold: 0.6 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [cards.length]);

  function scrollToIndex(index: number) {
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  return (
    <div>
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {cards.map((card, index) => (
          <div
            key={card.slug}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="glass glass-highlight flex w-[82%] shrink-0 snap-center flex-col rounded-[var(--radius-lg)] p-6"
          >
            <BuenFinCardBody
              pkg={card}
              whatsappLink={card.whatsappLink}
              gaPrefix={gaPrefix}
              gaOption={card.gaOption}
              ctaLabel={ctaLabel}
            />
          </div>
        ))}
      </div>

      <div className="mt-1 flex items-center justify-center gap-1">
        {cards.map((card, index) => (
          <button
            key={card.slug}
            type="button"
            aria-label={`Ver paquete ${index + 1} de ${cards.length}: ${card.name}`}
            aria-current={index === activeIndex}
            onClick={() => scrollToIndex(index)}
            className="flex items-center justify-center"
            style={{ minHeight: 32, minWidth: 32 }}
          >
            <span
              aria-hidden="true"
              className={`block h-2 rounded-full transition-all ${
                index === activeIndex
                  ? "w-5 bg-[var(--brand-2)]"
                  : "w-2 bg-white/20"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
