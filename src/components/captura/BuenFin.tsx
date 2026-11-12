import { Icon } from "@iconify/react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { buildWhatsAppLink } from "@/lib/site-settings";
import { buenFinPackages, BUEN_FIN_WHATSAPP_NUMBER } from "@/lib/content-buenfin";

export default function BuenFin({
  utm,
}: {
  utm: Record<string, string | undefined>;
}) {
  return (
    <section id="buen-fin" className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[var(--amber)] uppercase">
            🔥 Buen Fin
          </span>
          <h2 className="font-heading text-fluid-h2 mt-4 font-extrabold">
            Buen Fin: <span className="holo-text">Europa 2027</span> desde
            Guadalajara
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {buenFinPackages.map((pkg, index) => {
            const packageLabel = pkg.subtitle
              ? `${pkg.name} (${pkg.subtitle})`
              : pkg.name;
            const message = `Hola RD Travel, me interesa ${packageLabel} de la promo Buen Fin`;
            const whatsappLink = buildWhatsAppLink(
              BUEN_FIN_WHATSAPP_NUMBER,
              message,
              utm
            );

            return (
              <Reveal key={pkg.slug} delay={(index % 3) * 0.08}>
                <TiltCard className="flex h-full flex-col p-6">
                  <h3 className="font-heading text-lg font-bold">{pkg.name}</h3>
                  {pkg.subtitle && (
                    <p className="mt-0.5 text-sm text-[var(--ink-faint)]">
                      {pkg.subtitle}
                    </p>
                  )}

                  <div className="mt-3 flex flex-col gap-1.5 text-sm text-[var(--ink-muted)]">
                    <span className="flex items-center gap-1.5">
                      <Icon
                        icon="solar:calendar-bold-duotone"
                        width={16}
                        height={16}
                        className="shrink-0 text-[var(--violet)]"
                      />
                      {pkg.days} días
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon
                        icon="solar:plane-bold-duotone"
                        width={16}
                        height={16}
                        className="shrink-0 text-[var(--violet)]"
                      />
                      {pkg.salida}
                    </span>
                  </div>

                  <p className="font-heading holo-text mt-4 text-2xl font-extrabold">
                    {pkg.price}
                  </p>
                  <p className="text-xs text-[var(--ink-faint)]">por persona</p>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="whatsapp_click"
                    data-ga-location={`buen_fin_${pkg.slug}`}
                    className="tap-target mt-5 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-white"
                    style={{ background: "var(--green)" }}
                  >
                    <Icon icon="ic:baseline-whatsapp" width={18} height={18} />
                    Quiero este viaje
                  </a>
                </TiltCard>
              </Reveal>
            );
          })}
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
