import { Icon } from "@iconify/react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { objectionHandling, testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-fluid-h2 font-extrabold">
            Familias y parejas que ya viajaron con nosotros
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.1}>
              <figure className="glass lift flex h-full flex-col rounded-[var(--radius-lg)] p-6">
                <div className="flex gap-1 text-[var(--amber)]" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} icon="solar:star-bold" width={16} height={16} />
                  ))}
                </div>
                <blockquote className="mt-3 grow text-sm text-[var(--ink-muted)]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full font-heading text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-2))" }}
                    aria-hidden="true"
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-[var(--ink-faint)]">{testimonial.context}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="glass-highlight glass mx-auto mt-10 max-w-3xl rounded-[var(--radius-lg)] p-6 text-center sm:p-8">
            <Icon
              icon="solar:question-circle-bold-duotone"
              width={32}
              height={32}
              className="mx-auto text-[var(--sky)]"
            />
            <h3 className="font-heading mt-3 text-lg font-bold">{objectionHandling.title}</h3>
            <p className="mt-2 text-[var(--ink-muted)]">{objectionHandling.body}</p>
            <a
              href="#faq"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--sky)] underline-offset-4 hover:underline"
            >
              ¿Tienes más dudas? Ve las preguntas frecuentes →
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
