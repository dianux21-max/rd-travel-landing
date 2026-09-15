import Image from "next/image";
import { Icon } from "@iconify/react";
import Container from "@/components/ui/Container";
import CtaButton from "@/components/ui/CtaButton";
import { eyebrow, headline, subheadline, ctaLabel } from "@/lib/content-vallarta2027";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[140%]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(139,63,232,0.35), transparent 70%)",
        }}
      />
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--violet)]">
            <span className="dot-online" aria-hidden="true" />
            {eyebrow}
          </span>

          <h1 className="font-heading text-fluid-h1 mt-5 font-extrabold">
            <span className="holo-text">{headline}</span>
          </h1>

          <p className="text-fluid-lead mx-auto mt-5 max-w-xl text-[var(--ink-muted)] lg:mx-0">
            {subheadline}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <CtaButton href="#formulario" pulse size="lg">
              {ctaLabel}
            </CtaButton>
            <p className="flex items-center gap-1.5 text-xs text-[var(--ink-faint)]">
              <Icon icon="solar:shield-check-bold" width={16} height={16} />
              Sin compromiso hasta apartar.
            </p>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-[var(--radius-xl)] lg:mx-0">
          <Image
            src="/images/vallarta-2027/vista-aerea.webp"
            alt="Vista aérea del hotel Samba Vallarta frente al mar en Nuevo Vallarta"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 60%, rgba(18,11,30,0.55) 100%)",
            }}
          />
        </div>
      </Container>
    </section>
  );
}
