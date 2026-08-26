import type { Metadata } from "next";
import { headers } from "next/headers";
import { getSiteSettings, buildWhatsAppLink } from "@/lib/site-settings";
import {
  faq,
  headline,
  subheadline,
  ctaLabel,
  TRIP_HINT,
} from "@/lib/content-europa2027";

import Hero from "@/components/europa2027/Hero";
import TrustBar from "@/components/europa2027/TrustBar";
import Itinerary from "@/components/europa2027/Itinerary";
import Benefits from "@/components/europa2027/Benefits";
import Pricing from "@/components/europa2027/Pricing";
import Faq from "@/components/europa2027/Faq";
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
  alternates: { canonical: "/europa-2027" },
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

export default async function Europa2027Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [settings, params, nonce, socialSignals] = await Promise.all([
    getSiteSettings(),
    searchParams,
    headers().then((h) => h.get("x-nonce") ?? undefined),
    getRecentLeadSignals(),
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
        <Hero />
        <TrustBar />
        <Itinerary />
        <Benefits />
        <Pricing />
        <FinalCta
          ctaLabel={ctaLabel}
          utm={utm}
          pagePath="/europa-2027"
          tripHint={TRIP_HINT}
          heading={
            <>
              Aparta tu lugar en el{" "}
              <span className="holo-text">Circuito Europa 2027</span>
            </>
          }
          body="Cuéntanos tus datos y te contactamos por WhatsApp con el itinerario completo y el plan de pagos."
        />
        <Faq />
      </main>
      <Footer />
      <StickyMobileCta ctaLabel={ctaLabel} />
      <WhatsAppFloatingButton href={whatsappLink} />
      <SocialProofPopup signals={socialSignals} />
      <AnalyticsTracker pagePath="/europa-2027" fireOnMount="page_view" utm={utm} />
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
