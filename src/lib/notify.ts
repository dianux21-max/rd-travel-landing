import "server-only";
import { Resend } from "resend";

export async function notifyNewLead(lead: {
  name: string;
  email: string;
  phone: string;
  utmSource?: string | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;

  if (!apiKey || !to) return;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "RD Travel <onboarding@resend.dev>",
      to,
      subject: `Nuevo lead: ${lead.name}`,
      html: `
        <div style="font-family: sans-serif; font-size: 15px; color: #1a1a1a;">
          <h2 style="margin-bottom: 4px;">Nuevo lead en /captura</h2>
          <p style="color: #555; margin-top: 0;">Respóndele por WhatsApp en menos de 24 horas.</p>
          <table cellpadding="6" style="border-collapse: collapse;">
            <tr><td><strong>Nombre</strong></td><td>${lead.name}</td></tr>
            <tr><td><strong>Correo</strong></td><td>${lead.email}</td></tr>
            <tr><td><strong>Teléfono</strong></td><td>${lead.phone}</td></tr>
            <tr><td><strong>Origen</strong></td><td>${lead.utmSource ?? "Directo / sin UTM"}</td></tr>
          </table>
          <p style="margin-top: 16px;">
            <a href="https://rd-travel-landing.vercel.app/admin/leads" style="color: #8b3fe8;">Ver en el panel de admin →</a>
          </p>
        </div>
      `,
    });
  } catch {
    // Best-effort: a failed notification should never block the lead from
    // being saved or the visitor from reaching /gracias.
  }
}
