"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSiteSettings, buildWhatsAppLink } from "@/lib/site-settings";

const TripDetailsSchema = z.object({
  leadId: z.uuid({ error: "Solicitud inválida." }),
  destination: z.string().trim().max(200).optional(),
  dates: z.string().trim().max(200).optional(),
  travelersCount: z.string().trim().max(50).optional(),
  travelWithMinors: z.enum(["si", "no"]).optional(),
  minorsAges: z.string().trim().max(200).optional(),
});

export type TripDetailsState = {
  status: "idle" | "error" | "success";
  message?: string;
  whatsappLink?: string;
};

async function whatsappRedirectLink() {
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
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        "No pudimos guardar los detalles. Puedes escribirnos directo por WhatsApp.",
    };
  }

  const supabase = createAdminClient();
  await supabase
    .from("leads")
    .update({
      trip_destination: parsed.data.destination || null,
      trip_dates: parsed.data.dates || null,
      travelers_count: parsed.data.travelersCount || null,
      travel_with_minors:
        parsed.data.travelWithMinors === "si"
          ? true
          : parsed.data.travelWithMinors === "no"
            ? false
            : null,
      minors_ages: parsed.data.minorsAges || null,
    })
    .eq("id", parsed.data.leadId);
  // Best-effort: the lead is already saved from /captura, so a failure here
  // shouldn't block the visitor from reaching WhatsApp.

  return { status: "success", whatsappLink: await whatsappRedirectLink() };
}
