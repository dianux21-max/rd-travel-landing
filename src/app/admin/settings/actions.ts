"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/dal";

const SettingsSchema = z.object({
  headline: z.string().trim().min(5, { error: "El titular es muy corto." }).max(160),
  subheadline: z.string().trim().min(5, { error: "El subtítulo es muy corto." }).max(280),
  cta_label: z.string().trim().min(2, { error: "El texto del botón es muy corto." }).max(60),
  whatsapp_number: z
    .string()
    .trim()
    .regex(/^\d{10,15}$/, { error: "Usa solo dígitos con código de país, ej. 5215500000000." }),
  whatsapp_message: z.string().trim().min(3, { error: "Escribe un mensaje inicial." }).max(300),
});

export type SettingsState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function updateSettings(
  _prevState: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  const { supabase } = await requireAdmin();

  const parsed = SettingsSchema.safeParse({
    headline: formData.get("headline"),
    subheadline: formData.get("subheadline"),
    cta_label: formData.get("cta_label"),
    whatsapp_number: formData.get("whatsapp_number"),
    whatsapp_message: formData.get("whatsapp_message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Revisa los campos marcados.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase
    .from("site_settings")
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) {
    return { status: "error", message: "No se pudo guardar. Intenta de nuevo." };
  }

  revalidatePath("/captura");
  revalidatePath("/gracias");
  revalidatePath("/admin/settings");

  return { status: "success", message: "Cambios guardados." };
}
