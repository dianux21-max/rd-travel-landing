import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { gallery } from "@/lib/content-vallarta2027";

export default function Gallery() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-fluid-h2 font-extrabold">
            Así es <span className="holo-text">Samba Vallarta</span>
          </h2>
          <p className="mt-3 text-[var(--ink-muted)]">
            Hotel todo incluido, frente al mar, en Nuevo Vallarta.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {gallery.map((photo, index) => (
            <Reveal key={photo.src} delay={index * 0.08}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
