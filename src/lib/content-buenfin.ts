// Buen Fin 2026 promo: visible only through BUEN_FIN_DEADLINE (see isBuenFinActive
// in captura/page.tsx), evaluated per-request so it disappears on its own — no
// redeploy needed when the promo ends. Extended once already, from the original
// 2026-11-21 cutoff to 2026-11-29.
export const BUEN_FIN_DEADLINE = new Date("2026-11-29T23:59:59-06:00");

export function isBuenFinPromoActive(): boolean {
  return Date.now() < BUEN_FIN_DEADLINE.getTime();
}

export const BUEN_FIN_WHATSAPP_NUMBER = "523338144369";

export type BuenFinPackage = {
  slug: string;
  name: string;
  subtitle?: string;
  days: number;
  salida: string;
  price: string;
  // Optional extras used by other campaign pages that reuse these cards.
  badge?: string;
  details?: string;
  salidaIcon?: string;
};

export const buenFinPackages: BuenFinPackage[] = [
  {
    slug: "tesoros_ibericos",
    name: "Tesoros Ibéricos",
    subtitle: "España y Portugal",
    days: 11,
    salida: "Sale 30 abr",
    price: "$39,900 MXN",
  },
  {
    slug: "madrid_paris_disneyland",
    name: "Madrid y París + Disneyland",
    days: 8,
    salida: "Sale 16 abr",
    price: "$42,900 MXN",
  },
  {
    slug: "pascua_italia_paris_disneyland",
    name: "Pascua: Italia y París + Disneyland",
    days: 10,
    salida: "Sale 30 mar",
    price: "$50,900 MXN",
  },
  {
    slug: "italia_paris_disneyland",
    name: "Italia y París + Disneyland",
    days: 10,
    salida: "Sale 2 may",
    price: "$51,900 MXN",
  },
  {
    slug: "europa_clasica",
    name: "Europa Clásica",
    days: 17,
    salida: "Salidas de abril a diciembre",
    price: "$56,000 MXN",
  },
  {
    slug: "encantos_europa_disneyland",
    name: "Encantos de Europa + Disneyland",
    days: 15,
    salida: "Salidas en abril y mayo",
    price: "$59,900 MXN",
  },
  {
    slug: "europa_9_naciones",
    name: "Europa 9 Naciones",
    days: 19,
    salida: "Salidas de abril a diciembre",
    price: "$63,000 MXN",
  },
];
