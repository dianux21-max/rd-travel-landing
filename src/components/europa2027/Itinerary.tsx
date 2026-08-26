import { Icon } from "@iconify/react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { routeCountries } from "@/lib/content-europa2027";

export default function Itinerary() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-fluid-h2 font-extrabold">
            La ruta: <span className="holo-text">4 países, un solo viaje</span>
          </h2>
          <p className="mt-3 text-[var(--ink-muted)]">
            17 días recorriendo lo mejor de cada país, sin que tengas que armar tú el mapa.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {routeCountries.map((group, index) => (
            <Reveal key={group.country} delay={index * 0.08}>
              <div className="glass lift h-full rounded-[var(--radius-lg)] p-6">
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "color-mix(in srgb, var(--violet) 18%, transparent)" }}
                >
                  <Icon icon="solar:map-point-wave-bold-duotone" width={22} height={22} color="var(--violet)" />
                </div>
                <h3 className="font-heading text-lg font-bold">{group.country}</h3>
                <ul className="mt-3 space-y-1.5">
                  {group.cities.map((city) => (
                    <li key={city} className="flex items-center gap-2 text-sm text-[var(--ink-muted)]">
                      <Icon icon="solar:point-on-map-bold" width={14} height={14} className="shrink-0 text-[var(--amber)]" />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
