import type { Metadata } from "next";
import { headers } from "next/headers";
import { getSiteSettings, buildWhatsAppLink } from "@/lib/site-settings";
import { faq } from "@/lib/content";

import Hero from "@/components/captura/Hero";
import TrustBar from "@/components/captura/TrustBar";
import BigStat from "@/components/captura/BigStat";
import Benefits from "@/components/captura/Benefits";
import HowItWorks from "@/components/captura/HowItWorks";
import Testimonials from "@/components/captura/Testimonials";
import ForWhom from "@/components/captura/ForWhom";
import Faq from "@/components/captura/Faq";
import FinalCta from "@/components/captura/FinalCta";
import Footer from "@/components/captura/Footer";
import StickyMobileCta from "@/components/captura/StickyMobileCta";
import WhatsAppFloatingButton from "@/components/captura/WhatsAppFloatingButton";

export const metadata: Metadata = {
  alternates: { canonical: "/captura" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CapturaPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [settings, params, nonce] = await Promise.all([
    getSiteSettings(),
    searchParams,
    headers().then((h) => h.get("x-nonce") ?? undefined),
  ]);

  const whatsappLink = buildWhatsAppLink(
    settings.whatsappNumber,
    settings.whatsappMessage
  );

  const utm = {
    utm_source: firstValue(params.utm_source),
    utm_medium: firstValue(params.utm_medium),
    utm_campaign: firstValue(params.utm_campaign),
    utm_content: firstValue(params.utm_content),
    utm_term: firstValue(params.utm_term),
  };

  return (
    <>
      <main id="main" className="flex-1">
        <Hero
          headline={settings.headline}
          subheadline={settings.subheadline}
          ctaLabel={settings.ctaLabel}
        />
        <TrustBar />
        <BigStat />
        <Benefits />
        <HowItWorks />
        <Testimonials />
        <ForWhom />
        <Faq />
        <FinalCta ctaLabel={settings.ctaLabel} utm={utm} />
      </main>
      <Footer />
      <StickyMobileCta ctaLabel={settings.ctaLabel} />
      <WhatsAppFloatingButton href={whatsappLink} />
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
