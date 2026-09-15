import type { Metadata } from "next";
import { headers } from "next/headers";
import { buildWhatsAppLink } from "@/lib/site-settings";
import {
  faq,
  headline,
  subheadline,
  ctaLabel,
  TRIP_HINT,
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
} from "@/lib/content-vallarta2027";

import Hero from "@/components/vallarta2027/Hero";
import TrustBar from "@/components/vallarta2027/TrustBar";
import Gallery from "@/components/vallarta2027/Gallery";
import Benefits from "@/components/vallarta2027/Benefits";
import Pricing from "@/components/vallarta2027/Pricing";
import Faq from "@/components/vallarta2027/Faq";
import FinalCta from "@/components/captura/FinalCta";
import Footer from "@/components/captura/Footer";
import StickyMobileCta from "@/components/captura/StickyMobileCta";
import WhatsAppFloatingButton from "@/components/captura/WhatsAppFloatingButton";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import SocialProofPopup from "@/components/captura/SocialProofPopup";
import { getRecentLeadSignals } from "@/lib/admin/social-proof";

export const metadata: Metadata = {
  title: headline,
  description: subheadline,
  alternates: { canonical: "/vallarta-2027" },
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

export default async function Vallarta2027Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [params, nonce, socialSignals] = await Promise.all([
    searchParams,
    headers().then((h) => h.get("x-nonce") ?? undefined),
    getRecentLeadSignals(),
  ]);

  const whatsappLink = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE);

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
        <Hero />
        <TrustBar />
        <Gallery />
        <Benefits />
        <Pricing />
        <FinalCta
          ctaLabel={ctaLabel}
          utm={utm}
          pagePath="/vallarta-2027"
          tripHint={TRIP_HINT}
          heading={
            <>
              Aparta tu lugar en <span className="holo-text">Samba Vallarta</span>
            </>
          }
          body="Cuéntanos tus datos y te contactamos por WhatsApp para apartar tu habitación."
        />
        <Faq />
      </main>
      <Footer />
      <StickyMobileCta ctaLabel={ctaLabel} />
      <WhatsAppFloatingButton href={whatsappLink} />
      <SocialProofPopup signals={socialSignals} />
      <AnalyticsTracker pagePath="/vallarta-2027" fireOnMount="page_view" utm={utm} />
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
