import {
  WHATSAPP_NUMBER as VALLARTA_WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE as VALLARTA_WHATSAPP_MESSAGE,
} from "@/lib/content-vallarta2027";

/**
 * Some offer pages route WhatsApp contact to whoever is handling that
 * specific promotion, instead of the site-wide default number in
 * site_settings. Keyed by the lead's page_path.
 */
const PAGE_WHATSAPP_OVERRIDES: Record<string, { number: string; message: string }> = {
  "/vallarta-2027": { number: VALLARTA_WHATSAPP_NUMBER, message: VALLARTA_WHATSAPP_MESSAGE },
};

export function getWhatsappOverride(pagePath: string | null | undefined) {
  if (!pagePath) return null;
  return PAGE_WHATSAPP_OVERRIDES[pagePath] ?? null;
}
