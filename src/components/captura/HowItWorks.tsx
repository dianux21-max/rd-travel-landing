import { Icon } from "@iconify/react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { howItWorks } from "@/lib/content";

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-fluid-h2 font-extrabold">
            Así de simple funciona
          </h2>
          <p className="mt-3 text-[var(--ink-muted)]">
            Tres pasos, sin letras chiquitas.
          </p>
        </Reveal>

        <div className="relative mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
          <div
            aria-hidden="true"
            className="flow-pulse absolute top-8 left-[16.5%] hidden h-0.5 w-[67%] rounded-full sm:block"
          />

          {howItWorks.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.12} className="relative text-center">
              <div
                className="glass-strong relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ boxShadow: "var(--shadow-glow-brand)" }}
              >
                <Icon icon={item.icon} width={30} height={30} className="text-[var(--violet)]" />
                <span className="font-heading absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-2)] text-xs font-bold text-white">
                  {item.step}
                </span>
              </div>
              <h3 className="font-heading mt-5 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--ink-muted)]">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
