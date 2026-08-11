import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Footer from "@/components/captura/Footer";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  alternates: { canonical: "/terminos" },
};

export default function TermsPage() {
  return (
    <>
      <main className="flex-1 py-16 sm:py-24">
        <Container className="max-w-2xl">
          <h1 className="font-heading text-fluid-h2 font-extrabold">
            Términos y condiciones
          </h1>

          <div className="mt-8 space-y-6 text-[var(--ink-muted)]">
            <p>
              Al llenar el formulario de /captura, aceptas que RD Travel te
              contacte por WhatsApp, correo o teléfono para darte
              seguimiento a tu solicitud de cotización de viaje.
            </p>
            <p>
              Las cotizaciones que compartimos no representan un cobro ni un
              compromiso de compra: son propuestas informativas sujetas a
              disponibilidad y cambios de precio por parte de los
              proveedores (hoteles, aerolíneas y operadores) hasta el
              momento en que se confirma tu reservación.
            </p>
            <p>
              Según el viaje, puedes pagar de contado o en abonos. Cuando es
              en abonos, tu anticipo bloquea tu lugar y tu precio mientras
              completas el pago; la reservación queda confirmada al
              terminar de pagar. Te compartimos comprobante de cada pago
              que hagas.
            </p>
            <p>
              Este sitio es informativo y de generación de contacto; no
              procesa pagos ni almacena datos bancarios.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
