import type { Metadata } from "next";
import { Icon } from "@iconify/react";
import Container from "@/components/ui/Container";
import AutoRedirect from "@/components/gracias/AutoRedirect";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { getSiteSettings, buildWhatsAppLink } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "¡Gracias! Ya recibimos tu solicitud",
  robots: { index: false, follow: false },
  alternates: { canonical: "/gracias" },
};

export default async function GraciasPage() {
  const settings = await getSiteSettings();
  const whatsappLink = buildWhatsAppLink(
    settings.whatsappNumber,
    "Hola, acabo de llenar el formulario en la página de RD Travel 🙂"
  );

  return (
    <main className="flex flex-1 items-center justify-center py-20">
      <Container className="text-center">
        <div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "rgba(34,197,94,0.15)" }}
        >
          <Icon icon="solar:check-read-bold" width={40} height={40} className="text-[var(--green)]" />
        </div>

        <h1 className="font-heading text-fluid-h1 mt-6 font-extrabold">
          ¡Gracias! Ya <span className="holo-text">tenemos tu solicitud</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-fluid-lead text-[var(--ink-muted)]">
          En menos de 24 horas te escribimos por WhatsApp con 2-3 opciones
          armadas para tu presupuesto. Mientras tanto, escríbenos directo si
          quieres adelantar algún detalle.
        </p>

        <AutoRedirect whatsappLink={whatsappLink} />
      </Container>
      <AnalyticsTracker pagePath="/gracias" fireOnMount="gracias_view" />
    </main>
  );
}
