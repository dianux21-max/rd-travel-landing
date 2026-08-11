import { Icon } from "@iconify/react";
import Container from "@/components/ui/Container";
import { trustBar } from "@/lib/content";

export default function TrustBar() {
  return (
    <section aria-label="Confianza" className="border-y border-white/10 bg-white/[0.03] py-5">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
          {trustBar.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm font-medium text-[var(--ink-muted)]"
            >
              <Icon
                icon="solar:verified-check-bold"
                width={18}
                height={18}
                className="shrink-0 text-[var(--green)]"
              />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
