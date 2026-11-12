import { Icon } from "@iconify/react";
import type { BuenFinPackage } from "@/lib/content-buenfin";

export default function BuenFinCardBody({
  pkg,
  whatsappLink,
}: {
  pkg: BuenFinPackage;
  whatsappLink: string;
}) {
  return (
    <>
      <h3 className="font-heading text-lg font-bold">{pkg.name}</h3>
      {pkg.subtitle && (
        <p className="mt-0.5 text-sm text-[var(--ink-faint)]">{pkg.subtitle}</p>
      )}

      <div className="mt-3 flex flex-col gap-1.5 text-sm text-[var(--ink-muted)]">
        <span className="flex items-center gap-1.5">
          <Icon
            icon="solar:calendar-bold-duotone"
            width={16}
            height={16}
            className="shrink-0 text-[var(--violet)]"
          />
          {pkg.days} días
        </span>
        <span className="flex items-center gap-1.5">
          <Icon
            icon="solar:plane-bold-duotone"
            width={16}
            height={16}
            className="shrink-0 text-[var(--violet)]"
          />
          {pkg.salida}
        </span>
      </div>

      <p className="font-heading holo-text mt-4 text-2xl font-extrabold">
        {pkg.price}
      </p>
      <p className="text-xs text-[var(--ink-faint)]">por persona</p>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        data-track="whatsapp_click"
        data-ga-location={`buen_fin_${pkg.slug}`}
        className="tap-target mt-5 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-white"
        style={{ background: "var(--green)" }}
      >
        <Icon icon="ic:baseline-whatsapp" width={18} height={18} />
        Quiero este viaje
      </a>
    </>
  );
}
