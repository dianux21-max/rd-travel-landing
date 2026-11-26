import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import BuenFinCardBody from "@/components/captura/BuenFinCardBody";
import BuenFinMobileCarousel from "@/components/captura/BuenFinMobileCarousel";
import { buildWhatsAppLink } from "@/lib/site-settings";
import {
  packages,
  packagesNote,
  whatsappMessage,
  WHATSAPP_NUMBER,
} from "@/lib/content-edaddeoro2027";

const GA_PREFIX = "edad_de_oro";
const CARD_CTA = "Quiero esta opción";

export default function Packages({
  utm,
}: {
  utm: Record<string, string | undefined>;
}) {
  const cards = packages.map((pkg) => ({
    ...pkg,
    gaOption: pkg.option,
    whatsappLink: buildWhatsAppLink(WHATSAPP_NUMBER, whatsappMessage(pkg.option), utm),
  }));

  return (
    <section id="opciones" className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-fluid-h2 font-extrabold">
            Elige cómo <span className="holo-text">quieres llegar</span>
          </h2>
          <p className="mt-3 text-[var(--ink-muted)]">
            Mismo programa y mismo hotel; cambia solo desde dónde sales.
          </p>
        </Reveal>

        {/* Desktop/tablet: grid */}
        <div className="mt-12 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <Reveal key={card.slug} delay={(index % 4) * 0.08}>
              <TiltCard className="flex h-full flex-col p-6">
                <BuenFinCardBody
                  pkg={card}
                  whatsappLink={card.whatsappLink}
                  gaPrefix={GA_PREFIX}
                  gaOption={card.gaOption}
                  ctaLabel={CARD_CTA}
                />
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Mobile: swipeable carousel */}
        <div className="mt-12 md:hidden">
          <BuenFinMobileCarousel cards={cards} gaPrefix={GA_PREFIX} ctaLabel={CARD_CTA} />
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-[var(--ink-faint)]">
          {packagesNote}
        </p>
      </Container>
    </section>
  );
}
