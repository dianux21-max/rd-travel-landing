import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import { headers } from "next/headers";
import CookieConsent from "@/components/CookieConsent";
import MarketingPixels from "@/components/MarketingPixels";
import { baseOpenGraph } from "@/lib/content";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rdtravel.mx";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RD Travel — Te armamos tu viaje, sin complicarte con nada",
    template: "%s · RD Travel",
  },
  description:
    "Playa, Europa, Japón o el destino que traigas en mente: RD Travel te arma el viaje completo, con opciones reales para tu presupuesto y trato humano de principio a fin. Cotiza gratis por WhatsApp.",
  applicationName: "RD Travel",
  keywords: [
    "agencia de viajes",
    "paquetes todo incluido",
    "viajes en familia",
    "viajes en pareja",
    "Cancún",
    "Riviera Maya",
    "RD Travel",
  ],
  authors: [{ name: "RD Travel" }],
  openGraph: {
    ...baseOpenGraph,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "RD Travel — Te armamos tu viaje, sin complicarte con nada",
    description:
      "Cotización gratis por WhatsApp en menos de 24h. Playa, Europa, Japón o lo que traigas en mente.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#120b1e",
};

const JALISCO_CITIES = [
  "Zapopan",
  "Guadalajara",
  "Tlaquepaque",
  "Tonalá",
  "Tlajomulco de Zúñiga",
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "RD Travel",
  url: siteUrl,
  description:
    "Agencia de viajes en México especializada en paquetes a la medida: playa, circuitos internacionales, viajes en familia, en pareja y en grupo.",
  telephone: "+523338144369",
  foundingDate: "2023-04",
  areaServed: [
    ...JALISCO_CITIES.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: { "@type": "State", name: "Jalisco" },
    })),
    { "@type": "Country", name: "México" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "15:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/RDTravelViajes",
    "https://www.instagram.com/rdtravelviajes/",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${inter.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <CookieConsent />
        <MarketingPixels nonce={nonce} />
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
