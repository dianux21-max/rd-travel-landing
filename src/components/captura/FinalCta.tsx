import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import LeadForm from "@/components/captura/LeadForm";

export default function FinalCta({
  ctaLabel,
  utm,
  pagePath = "/captura",
  tripHint,
  heading = (
    <>
      ¿Listo para dejar de planear y empezar a <span className="holo-text">empacar</span>?
    </>
  ),
  body = "Cuéntanos qué viaje traes en mente y te armamos tu cotización sin costo, en menos de 24 horas.",
}: {
  ctaLabel: string;
  utm: Record<string, string | undefined>;
  pagePath?: string;
  tripHint?: string;
  heading?: React.ReactNode;
  body?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
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
          <h2 className="font-heading text-fluid-h2 font-extrabold">{heading}</h2>
          <p className="mt-3 text-[var(--ink-muted)]">{body}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <LeadForm ctaLabel={ctaLabel} utm={utm} pagePath={pagePath} tripHint={tripHint} />
        </Reveal>
      </Container>
    </section>
  );
}
