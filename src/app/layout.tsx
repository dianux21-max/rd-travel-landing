import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import { headers } from "next/headers";
import CookieConsent from "@/components/CookieConsent";
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
    type: "website",
    locale: "es_MX",
    siteName: "RD Travel",
    title: "RD Travel — Te armamos tu viaje, sin complicarte con nada",
    description:
      "Playa, Europa, Japón o el destino que traigas en mente: te armamos el viaje completo. Cotización gratis por WhatsApp en menos de 24h.",
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "RD Travel",
  url: siteUrl,
  description:
    "Agencia de viajes en México especializada en paquetes a la medida: playa, circuitos internacionales, viajes en familia, en pareja y en grupo.",
  areaServed: "MX",
  sameAs: [] as string[],
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
