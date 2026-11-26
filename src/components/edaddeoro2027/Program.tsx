import { Icon } from "@iconify/react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { AccordionItem } from "@/components/edaddeoro2027/Faq";
import { program } from "@/lib/content-edaddeoro2027";

export default function Program() {
  return (
    <section id="programa" className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <Reveal className="text-center">
          <h2 className="font-heading text-fluid-h2 font-extrabold">
            El programa, <span className="holo-text">día por día</span>
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {program.map((day, index) => (
            <Reveal key={day.day} delay={index * 0.05}>
              <AccordionItem
                defaultOpen={index === 0}
                title={
                  <span>
                    <span className="text-[var(--violet)]">{day.day}</span> · {day.title}
                  </span>
                }
              >
                <ul className="space-y-2 px-5 pb-4">
                  {day.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--ink-muted)]">
                      <Icon
                        icon="solar:point-on-map-bold"
                        width={14}
                        height={14}
                        className="mt-0.5 shrink-0 text-[var(--amber)]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-[var(--ink-faint)]">Programa sujeto a cambios.</p>
      </Container>
    </section>
  );
}
