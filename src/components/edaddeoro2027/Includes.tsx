import { Icon } from "@iconify/react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { includes } from "@/lib/content-edaddeoro2027";

export default function Includes() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-fluid-h2 font-extrabold">
            Qué <span className="holo-text">incluye</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {includes.map((item, index) => (
            <Reveal key={item.label} delay={(index % 4) * 0.06}>
              <div className="glass lift flex h-full items-center gap-3 rounded-[var(--radius-lg)] p-5">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "color-mix(in srgb, var(--violet) 18%, transparent)" }}
                >
                  <Icon icon={item.icon} width={22} height={22} color="var(--violet)" />
                </div>
                <p className="text-sm font-semibold">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
