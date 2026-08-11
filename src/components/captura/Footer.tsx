import Container from "@/components/ui/Container";
import { legal } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 py-10">
      <Container className="flex flex-col items-center gap-4 text-center">
        <p className="font-heading text-lg font-bold">
          RD <span className="holo-text">Travel</span>
        </p>
        <p className="max-w-xl text-xs text-[var(--ink-faint)]">
          {legal.privacyNotice}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[var(--ink-faint)]">
          <a href="/aviso-de-privacidad" className="tap-target underline-offset-4 hover:underline">
            Aviso de privacidad
          </a>
          <span aria-hidden="true">·</span>
          <a href="/terminos" className="tap-target underline-offset-4 hover:underline">
            Términos y condiciones
          </a>
        </div>
        <p className="text-xs text-[var(--ink-faint)]">
          © {year} RD Travel by SPIN. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
