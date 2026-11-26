import type { Metadata } from "next";
import { headers } from "next/headers";
import { buildWhatsAppLink } from "@/lib/site-settings";
import { baseOpenGraph } from "@/lib/content";
import {
  faq,
  headline,
  metaDescription,
  metaKeywords,
  objectionHandling,
  whatsappMessage,
  CONTENT_NAME,
  GENERIC_OPTION,
  PAGE_PATH,
  WHATSAPP_NUMBER,
} from "@/lib/content-edaddeoro2027";

import Hero from "@/components/edaddeoro2027/Hero";
import TrustBar from "@/components/edaddeoro2027/TrustBar";
import Packages from "@/components/edaddeoro2027/Packages";
import Includes from "@/components/edaddeoro2027/Includes";
import Program from "@/components/edaddeoro2027/Program";
import Faq from "@/components/edaddeoro2027/Faq";
import ClosingCta from "@/components/edaddeoro2027/ClosingCta";
import Benefits from "@/components/captura/Benefits";
import Testimonials from "@/components/captura/Testimonials";
import Footer from "@/components/captura/Footer";
import StickyMobileCta from "@/components/captura/StickyMobileCta";
import WhatsAppFloatingButton from "@/components/captura/WhatsAppFloatingButton";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import MetaPixelCampaignEvents from "@/components/MetaPixelCampaignEvents";
import SocialProofPopup from "@/components/captura/SocialProofPopup";
import { getRecentLeadSignals } from "@/lib/admin/social-proof";

// Metadata talks only about this trip (overrides the site-wide keywords,
// OG and Twitter copy from the root layout). The share image comes from
// opengraph-image.jpg / twitter-image.jpg in this folder (= hero.jpg).
export const metadata: Metadata = {
  title: headline,
  description: metaDescription,
  keywords: metaKeywords,
  alternates: { canonical: PAGE_PATH },
  robots: { index: false, follow: true },
  openGraph: {
    ...baseOpenGraph,
    title: headline,
    description: metaDescription,
    url: PAGE_PATH,
  },
  twitter: {
    card: "summary_large_image",
    title: headline,
    description: metaDescription,
  },
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

export default async function EdadDeOro2027Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [params, nonce, socialSignals] = await Promise.all([
    searchParams,
    headers().then((h) => h.get("x-nonce") ?? undefined),
    getRecentLeadSignals(),
  ]);

  const utm = {
    utm_source: firstValue(params.utm_source),
    utm_medium: firstValue(params.utm_medium),
    utm_campaign: firstValue(params.utm_campaign),
    utm_content: firstValue(params.utm_content),
    utm_term: firstValue(params.utm_term),
  };

  // Generic buttons (no package picked yet).
  const whatsappLink = buildWhatsAppLink(
    WHATSAPP_NUMBER,
    whatsappMessage(GENERIC_OPTION),
    utm
  );

  return (
    <>
      <main id="main" className="flex-1">
        <Hero whatsappLink={whatsappLink} />
        <TrustBar />
        <Packages utm={utm} />
        <Includes />
        <Program />
        <Benefits />
        <Testimonials
          heading={
            <>
              Más de <span className="holo-text">100 viajeros</span> ya viajaron con nosotros
            </>
          }
          objectionBody={objectionHandling.body}
        />
        <Faq />
        <ClosingCta whatsappLink={whatsappLink} />
      </main>
      <Footer />
      <StickyMobileCta
        text="Edad de Oro 2027 · todo incluido"
        label="Informes por WhatsApp"
        whatsappHref={whatsappLink}
        gaOption={GENERIC_OPTION}
      />
      <WhatsAppFloatingButton href={whatsappLink} gaOption={GENERIC_OPTION} />
      <SocialProofPopup signals={socialSignals} />
      <AnalyticsTracker pagePath={PAGE_PATH} fireOnMount="page_view" utm={utm} />
      <MetaPixelCampaignEvents contentName={CONTENT_NAME} />
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
