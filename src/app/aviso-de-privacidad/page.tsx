import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Footer from "@/components/captura/Footer";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  alternates: { canonical: "/aviso-de-privacidad" },
};

export default function PrivacyPage() {
  return (
    <>
      <main className="flex-1 py-16 sm:py-24">
        <Container className="max-w-2xl">
          <h1 className="font-heading text-fluid-h2 font-extrabold">
            Aviso de privacidad
          </h1>
          <p className="mt-2 text-sm text-[var(--ink-faint)]">
            Última actualización: {new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long" })}
          </p>

          <div className="mt-8 space-y-6 text-[var(--ink-muted)]">
            <p>
              RD Travel by SPIN (&ldquo;RD Travel&rdquo;, &ldquo;nosotros&rdquo;) es responsable del
              tratamiento de tus datos personales conforme a la Ley Federal
              de Protección de Datos Personales en Posesión de los
              Particulares (LFPDPPP) de México.
            </p>

            <div>
              <h2 className="font-heading text-lg font-bold text-[var(--ink)]">
                ¿Qué datos recabamos?
              </h2>
              <p className="mt-2">
                Cuando llenas el formulario de cotización en /captura
                recabamos tu nombre, correo electrónico y número de
                teléfono. También registramos datos técnicos básicos
                (dispositivo, origen de la visita y parámetros de campaña)
                para entender qué canales funcionan mejor.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-[var(--ink)]">
                ¿Para qué los usamos?
              </h2>
              <p className="mt-2">
                Únicamente para contactarte por WhatsApp, correo o teléfono
                y armar la cotización de viaje que solicitaste. No vendemos
                ni compartimos tus datos con terceros para fines distintos
                a los aquí descritos.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-[var(--ink)]">
                ¿Dónde se almacenan?
              </h2>
              <p className="mt-2">
                Tus datos se guardan en una base de datos protegida
                (Supabase), con acceso restringido únicamente al equipo
                autorizado de RD Travel mediante inicio de sesión y reglas
                de seguridad a nivel de base de datos.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-[var(--ink)]">
                Cookies
              </h2>
              <p className="mt-2">
                Usamos cookies propias para recordar tu preferencia de
                cookies, y de terceros (Meta, TikTok) para medir el
                rendimiento de nuestras campañas, solo si diste tu
                consentimiento en el aviso correspondiente. Puedes retirar
                tu consentimiento en cualquier momento borrando las cookies
                de tu navegador.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-[var(--ink)]">
                Tus derechos (ARCO)
              </h2>
              <p className="mt-2">
                Puedes solicitar acceder, rectificar, cancelar u oponerte al
                uso de tus datos personales en cualquier momento,
                escribiéndonos directamente por WhatsApp.
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
