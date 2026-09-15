"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSiteSettings, buildWhatsAppLink } from "@/lib/site-settings";
import { getWhatsappOverride } from "@/lib/whatsapp-routing";

const TripDetailsSchema = z.object({
  leadId: z.uuid({ error: "Solicitud inválida." }),
  destination: z.string().trim().max(200).optional(),
  dates: z.string().trim().max(200).optional(),
  travelersCount: z.string().trim().max(50).optional(),
  travelWithMinors: z.enum(["si", "no"]).optional(),
  minorsAges: z.string().trim().max(200).optional(),
  notes: z.string().trim().max(1000).optional(),
});

export type TripDetailsState = {
  status: "idle" | "error" | "success";
  message?: string;
  whatsappLink?: string;
};

async function whatsappRedirectLink(pagePath: string | null | undefined) {
  const override = getWhatsappOverride(pagePath);
  if (override) {
    return buildWhatsAppLink(override.number, override.message);
  }
  const settings = await getSiteSettings();
  return buildWhatsAppLink(
    settings.whatsappNumber,
    "Hola, acabo de llenar el formulario en la página de RD Travel 🙂"
  );
}

export async function submitTripDetails(
  _prevState: TripDetailsState,
  formData: FormData
): Promise<TripDetailsState> {
  const parsed = TripDetailsSchema.safeParse({
    leadId: formData.get("leadId"),
    destination: formData.get("destination") || undefined,
    dates: formData.get("dates") || undefined,
    travelersCount: formData.get("travelersCount") || undefined,
    travelWithMinors: formData.get("travelWithMinors") || undefined,
    minorsAges: formData.get("minorsAges") || undefined,
    notes: formData.get("notes") || undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        "No pudimos guardar los detalles. Puedes escribirnos directo por WhatsApp.",
    };
  }

  // Only touch fields the visitor actually filled in — an offer-specific page
  // (e.g. /europa-2027) pre-sets trip_destination when the lead is created,
  // and this form is optional, so a blank field here must not null it out.
  const updates: Record<string, string | boolean | null> = {};
  if (parsed.data.destination) updates.trip_destination = parsed.data.destination;
  if (parsed.data.dates) updates.trip_dates = parsed.data.dates;
  if (parsed.data.travelersCount) updates.travelers_count = parsed.data.travelersCount;
  if (parsed.data.travelWithMinors) {
    updates.travel_with_minors = parsed.data.travelWithMinors === "si";
  }
  if (parsed.data.minorsAges) updates.minors_ages = parsed.data.minorsAges;
  if (parsed.data.notes) updates.additional_notes = parsed.data.notes;

  const supabase = createAdminClient();

  if (Object.keys(updates).length > 0) {
    await supabase.from("leads").update(updates).eq("id", parsed.data.leadId);
  }
  // Best-effort: the lead is already saved from /captura, so a failure here
  // shouldn't block the visitor from reaching WhatsApp.

  const { data: lead } = await supabase
    .from("leads")
    .select("page_path")
    .eq("id", parsed.data.leadId)
    .single();

  return { status: "success", whatsappLink: await whatsappRedirectLink(lead?.page_path) };
}
