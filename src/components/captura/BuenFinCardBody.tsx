import { Icon } from "@iconify/react";
import type { BuenFinPackage } from "@/lib/content-buenfin";

// Shared package card. Defaults reproduce the original Buen Fin card exactly;
// other campaign pages (e.g. /edad-de-oro-2027) override the GA prefix, CTA
// text and option label.
export default function BuenFinCardBody({
  pkg,
  whatsappLink,
  gaPrefix = "buen_fin",
  gaOption,
  ctaLabel = "Quiero este viaje",
}: {
  pkg: BuenFinPackage;
  whatsappLink: string;
  gaPrefix?: string;
  gaOption?: string;
  ctaLabel?: string;
}) {
  return (
    <>
      {pkg.badge && (
        <span className="glass mb-3 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-[var(--amber)] uppercase">
          {pkg.badge}
        </span>
      )}
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
            icon={pkg.salidaIcon ?? "solar:plane-bold-duotone"}
            width={16}
            height={16}
            className="shrink-0 text-[var(--violet)]"
          />
          {pkg.salida}
        </span>
      </div>

      {pkg.details && (
        <p className="mt-3 text-sm text-[var(--ink-muted)]">{pkg.details}</p>
      )}
      {/* Detail text varies in length: push price + button to the bottom so
          they line up across cards in the grid. */}
      {pkg.details && <div className="grow" aria-hidden="true" />}

      <p className="font-heading holo-text mt-4 text-2xl font-extrabold">
        {pkg.price}
      </p>
      <p className="text-xs text-[var(--ink-faint)]">por persona</p>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        data-track="whatsapp_click"
        data-ga-location={`${gaPrefix}_${pkg.slug}`}
        data-ga-option={gaOption}
        className="tap-target mt-5 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-white"
        style={{ background: "var(--green)" }}
      >
        <Icon icon="ic:baseline-whatsapp" width={18} height={18} />
        {ctaLabel}
      </a>
    </>
  );
}
