import { Icon } from "@iconify/react";
import Container from "@/components/ui/Container";
import { legal, socialLinks } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 py-10">
      <Container className="flex flex-col items-center gap-4 text-center">
        <p className="font-heading text-lg font-bold">
          RD <span className="holo-text">Travel</span>
        </p>

        <div className="flex items-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="tap-target flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[var(--ink-muted)] transition-colors hover:border-white/30 hover:text-[var(--ink)]"
            >
              <Icon icon={social.icon} width={20} height={20} />
            </a>
          ))}
        </div>

        <p className="max-w-xl text-xs text-[var(--ink-faint)]">
          {legal.privacyNotice}
        </p>

        <p className="max-w-xl text-xs text-[var(--ink-faint)]">
          {legal.serviceArea}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-[var(--ink-muted)]">
          <Icon icon="ic:baseline-whatsapp" width={14} height={14} className="text-[var(--green)]" />
          {legal.phones.map((phone, index) => (
            <span key={phone} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">·</span>}
              <a
                href={`tel:+52${phone.replace(/\s/g, "")}`}
                className="tap-target underline-offset-4 hover:underline"
              >
                {phone}
              </a>
            </span>
          ))}
        </div>

        <p className="text-xs text-[var(--ink-faint)]">{legal.hours}</p>

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
          © {year} RD Travel. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
