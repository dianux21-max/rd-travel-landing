import { Icon } from "@iconify/react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { benefits } from "@/lib/content";

export default function Benefits() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-fluid-h2 font-extrabold">
            Esto es lo que ganas al viajar con nosotros
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.1}>
              <TiltCard className="h-full p-7">
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: `${benefit.color}1f` }}
                >
                  <Icon icon={benefit.icon} width={30} height={30} color={benefit.color} />
                </div>
                <h3 className="font-heading text-fluid-h3 font-bold">{benefit.title}</h3>
                <p className="mt-2 text-[var(--ink-muted)]">{benefit.body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
