import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import BuenFinCardBody from "@/components/captura/BuenFinCardBody";
import BuenFinMobileCarousel from "@/components/captura/BuenFinMobileCarousel";
import { buildWhatsAppLink } from "@/lib/site-settings";
import { buenFinPackages, BUEN_FIN_WHATSAPP_NUMBER } from "@/lib/content-buenfin";

export default function BuenFin({
  utm,
}: {
  utm: Record<string, string | undefined>;
}) {
  const cards = buenFinPackages.map((pkg) => {
    const packageLabel = pkg.subtitle
      ? `${pkg.name} (${pkg.subtitle})`
      : pkg.name;
    const message = `Hola RD Travel, me interesa ${packageLabel} de la promo Buen Fin`;
    const whatsappLink = buildWhatsAppLink(
      BUEN_FIN_WHATSAPP_NUMBER,
      message,
      utm
    );

    return { ...pkg, whatsappLink };
  });

  return (
    <section id="buen-fin" className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[var(--amber)] uppercase">
            🔥 Buen Fin
          </span>
          <h2 className="font-heading text-fluid-h2 mt-4 font-extrabold">
            Buen Fin extendido: <span className="holo-text">Europa 2027</span>{" "}
            desde Guadalajara
          </h2>
        </Reveal>

        {/* Desktop/tablet: grid */}
        <div className="mt-12 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal key={card.slug} delay={(index % 3) * 0.08}>
              <TiltCard className="flex h-full flex-col p-6">
                <BuenFinCardBody pkg={card} whatsappLink={card.whatsappLink} />
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Mobile: swipeable carousel */}
        <div className="mt-12 md:hidden">
          <BuenFinMobileCarousel cards={cards} />
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-[var(--ink-faint)]">
          Salidas grupales garantizadas. Incluye vuelo, hotel, desayunos y
          guía en español. Precios por persona en habitación doble o triple,
          sujetos a disponibilidad.
        </p>
      </Container>
    </section>
  );
}
