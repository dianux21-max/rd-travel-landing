import "server-only";
import { createClient } from "@/lib/supabase/server";
import {
  DEFAULT_CTA_LABEL,
  DEFAULT_HEADLINE,
  DEFAULT_SUBHEADLINE,
  DEFAULT_WHATSAPP_MESSAGE,
  DEFAULT_WHATSAPP_NUMBER,
} from "@/lib/content";

export type SiteSettings = {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  whatsappNumber: string;
  whatsappMessage: string;
};

const FALLBACK_SETTINGS: SiteSettings = {
  headline: DEFAULT_HEADLINE,
  subheadline: DEFAULT_SUBHEADLINE,
  ctaLabel: DEFAULT_CTA_LABEL,
  whatsappNumber: DEFAULT_WHATSAPP_NUMBER,
  whatsappMessage: DEFAULT_WHATSAPP_MESSAGE,
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("headline, subheadline, cta_label, whatsapp_number, whatsapp_message")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) {
      return FALLBACK_SETTINGS;
    }

    return {
      headline: data.headline || FALLBACK_SETTINGS.headline,
      subheadline: data.subheadline || FALLBACK_SETTINGS.subheadline,
      ctaLabel: data.cta_label || FALLBACK_SETTINGS.ctaLabel,
      whatsappNumber: data.whatsapp_number || FALLBACK_SETTINGS.whatsappNumber,
      whatsappMessage: data.whatsapp_message || FALLBACK_SETTINGS.whatsappMessage,
    };
  } catch {
    return FALLBACK_SETTINGS;
  }
}

export function buildWhatsAppLink(number: string, message: string) {
  const digits = number.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
