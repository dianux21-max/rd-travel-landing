"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashIp, isRateLimited } from "@/lib/rate-limit";

const LeadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Escribe tu nombre completo." })
    .max(120, { error: "Nombre demasiado largo." }),
  email: z
    .email({ error: "Escribe un correo válido." })
    .trim()
    .max(200, { error: "Correo demasiado largo." }),
  phone: z
    .string()
    .trim()
    .min(10, { error: "Escribe un teléfono a 10 dígitos." })
    .max(20, { error: "Teléfono demasiado largo." })
    .regex(/^[\d\s+()-]+$/, { error: "Solo números, espacios y + ( ) -." }),
});

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

const UTM_MAX_LENGTH = 100;

function sanitizeUtm(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, UTM_MAX_LENGTH);
  return trimmed.length > 0 ? trimmed : null;
}

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  // Honeypot: real visitors never fill this hidden field. Pretend success
  // so bots don't learn the form was rejected.
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success" };
  }

  const parsed = LeadSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Revisa los datos marcados en rojo.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "0.0.0.0";
  const ipHash = hashIp(ip);

  if (await isRateLimited(ipHash)) {
    return {
      status: "error",
      message:
        "Ya recibimos una solicitud tuya hace unos minutos. Te contactaremos pronto por WhatsApp.",
    };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("leads").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    utm_source: sanitizeUtm(formData.get("utm_source")),
    utm_medium: sanitizeUtm(formData.get("utm_medium")),
    utm_campaign: sanitizeUtm(formData.get("utm_campaign")),
    utm_content: sanitizeUtm(formData.get("utm_content")),
    utm_term: sanitizeUtm(formData.get("utm_term")),
    page_path: "/captura",
    user_agent: headerList.get("user-agent")?.slice(0, 300) ?? null,
    ip_hash: ipHash,
  });

  if (error) {
    return {
      status: "error",
      message:
        "No pudimos guardar tu solicitud. Intenta de nuevo o escríbenos directo por WhatsApp.",
    };
  }

  redirect("/gracias");
}
