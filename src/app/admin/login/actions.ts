"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const LoginSchema = z.object({
  email: z.email({ error: "Escribe un correo válido." }),
  password: z.string().min(6, { error: "La contraseña es muy corta." }),
});

export type LoginState = {
  status: "idle" | "error";
  message?: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { status: "error", message: "Revisa tu correo y contraseña." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { status: "error", message: "Correo o contraseña incorrectos." };
  }

  const next = formData.get("next");
  redirect(typeof next === "string" && next.startsWith("/admin") ? next : "/admin");
}
