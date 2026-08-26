import { Icon } from "@iconify/react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import { pricing, ctaLabel } from "@/lib/content-europa2027";

export default function Pricing() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="glass-strong glass-highlight mx-auto max-w-2xl rounded-[var(--radius-xl)] p-8 text-center sm:p-10">
          <p className="text-sm font-semibold tracking-wide text-[var(--violet)] uppercase">
            Tu inversión
          </p>
          <p className="font-heading holo-text mt-3 text-fluid-stat font-extrabold">
            {pricing.base}
          </p>
          <p className="mt-2 text-[var(--ink-muted)]">
            + {pricing.taxes} de impuestos y cargos · {pricing.note}
          </p>

          <div className="glass mt-8 flex flex-col items-center gap-2 rounded-[var(--radius-lg)] p-5 sm:flex-row sm:justify-center sm:gap-4">
            <Icon icon="solar:wallet-money-bold-duotone" width={28} height={28} className="text-[var(--green)]" />
            <p className="text-sm text-[var(--ink-muted)]">
              <span className="font-heading font-bold text-[var(--ink)]">{pricing.deposit}</span>{" "}
              {pricing.depositNote}
            </p>
          </div>

          <div className="mt-8">
            <CtaButton href="#formulario" pulse size="lg">
              {ctaLabel}
            </CtaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
