import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import { ctaLabel, GENERIC_OPTION } from "@/lib/content-edaddeoro2027";

// Same look as captura/FinalCta, but this page closes with WhatsApp instead of
// the lead form. Keeps id="formulario" so StickyMobileCta / the floating
// WhatsApp button hide/show at the end of the page like on the other pages.
export default function ClosingCta({ whatsappLink }: { whatsappLink: string }) {
  return (
    <section id="formulario" className="relative overflow-hidden py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-full"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 100%, rgba(194,41,138,0.28), transparent 70%)",
        }}
      />
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="font-heading text-fluid-h2 font-extrabold">
            Escríbenos y <span className="holo-text">arma tu viaje</span>
          </h2>
          <p className="mt-3 text-[var(--ink-muted)]">
            Te resolvemos tus dudas y te decimos cómo apartar tu lugar en Edad de Oro 2027.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton
              href={whatsappLink}
              external
              pulse
              size="lg"
              icon="ic:baseline-whatsapp"
              dataTrack="whatsapp_click"
              gaLocation="cierre"
              gaOption={GENERIC_OPTION}
            >
              {ctaLabel}
            </CtaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
