import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/dal";
import AdminShell from "@/components/admin/AdminShell";
import SettingsForm from "./SettingsForm";
import {
  DEFAULT_CTA_LABEL,
  DEFAULT_HEADLINE,
  DEFAULT_SUBHEADLINE,
  DEFAULT_WHATSAPP_MESSAGE,
  DEFAULT_WHATSAPP_NUMBER,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Configuración",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const { supabase, user } = await requireAdmin();

  const { data } = await supabase
    .from("site_settings")
    .select("headline, subheadline, cta_label, whatsapp_number, whatsapp_message")
    .eq("id", 1)
    .maybeSingle();

  const defaults = {
    headline: data?.headline || DEFAULT_HEADLINE,
    subheadline: data?.subheadline || DEFAULT_SUBHEADLINE,
    ctaLabel: data?.cta_label || DEFAULT_CTA_LABEL,
    whatsappNumber: data?.whatsapp_number || DEFAULT_WHATSAPP_NUMBER,
    whatsappMessage: data?.whatsapp_message || DEFAULT_WHATSAPP_MESSAGE,
  };

  return (
    <AdminShell email={user.email ?? ""}>
      <h1 className="font-heading text-2xl font-bold">Configuración</h1>
      <p className="mt-1 text-sm text-[var(--ink-muted)]">
        Edita el titular, el CTA y el WhatsApp de destino sin tocar código.
        Los cambios se reflejan de inmediato en /captura y /gracias.
      </p>

      <SettingsForm defaults={defaults} />
    </AdminShell>
  );
}
