import { Icon } from "@iconify/react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { forWhom } from "@/lib/content";

export default function ForWhom() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-fluid-h2 font-extrabold">
            ¿RD Travel es para ti?
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-[var(--radius-lg)] p-7">
              <h3 className="font-heading flex items-center gap-2 text-lg font-bold text-[var(--green)]">
                <Icon icon="solar:check-circle-bold" width={22} height={22} />
                Es para ti si...
              </h3>
              <ul className="mt-4 space-y-3">
                {forWhom.yes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--ink-muted)]">
                    <Icon
                      icon="solar:check-read-linear"
                      width={18}
                      height={18}
                      className="mt-0.5 shrink-0 text-[var(--green)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass h-full rounded-[var(--radius-lg)] p-7">
              <h3 className="font-heading flex items-center gap-2 text-lg font-bold text-[var(--ink-faint)]">
                <Icon icon="solar:close-circle-bold" width={22} height={22} />
                Mejor no, si...
              </h3>
              <ul className="mt-4 space-y-3">
                {forWhom.no.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--ink-muted)]">
                    <Icon
                      icon="solar:close-circle-linear"
                      width={18}
                      height={18}
                      className="mt-0.5 shrink-0 text-[var(--ink-faint)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
