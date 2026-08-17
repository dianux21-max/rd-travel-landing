import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/dal";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "short",
  timeStyle: "short",
});

function tripSummary(lead: {
  trip_destination: string | null;
  trip_dates: string | null;
  travelers_count: string | null;
  travel_with_minors: boolean | null;
  minors_ages: string | null;
}) {
  const parts = [
    lead.trip_destination,
    lead.trip_dates,
    lead.travelers_count,
    lead.travel_with_minors === true
      ? `menores (${lead.minors_ages || "sin edad"})`
      : lead.travel_with_minors === false
        ? "sin menores"
        : null,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" · ") : "—";
}

export default async function AdminLeadsPage() {
  const { supabase, user } = await requireAdmin();

  const { data: leads, error } = await supabase
    .from("leads")
    .select(
      "id, created_at, name, email, phone, utm_source, utm_campaign, trip_destination, trip_dates, travelers_count, travel_with_minors, minors_ages"
    )
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <AdminShell email={user.email ?? ""}>
      <h1 className="font-heading text-2xl font-bold">Leads</h1>
      <p className="mt-1 text-sm text-[var(--ink-muted)]">
        Últimos {leads?.length ?? 0} contactos capturados en /captura.
      </p>

      {error && (
        <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          No se pudieron cargar los leads: {error.message}
        </p>
      )}

      <div className="glass mt-6 overflow-x-auto rounded-[var(--radius-lg)]">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs tracking-wide text-[var(--ink-faint)] uppercase">
              <th className="px-4 py-3 font-semibold">Fecha</th>
              <th className="px-4 py-3 font-semibold">Nombre</th>
              <th className="px-4 py-3 font-semibold">Correo</th>
              <th className="px-4 py-3 font-semibold">Teléfono</th>
              <th className="px-4 py-3 font-semibold">Viaje</th>
              <th className="px-4 py-3 font-semibold">Origen</th>
            </tr>
          </thead>
          <tbody>
            {(leads ?? []).map((lead) => (
              <tr key={lead.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3 whitespace-nowrap text-[var(--ink-muted)]">
                  {dateFormatter.format(new Date(lead.created_at))}
                </td>
                <td className="px-4 py-3 font-medium">{lead.name}</td>
                <td className="px-4 py-3 text-[var(--ink-muted)]">{lead.email}</td>
                <td className="px-4 py-3 text-[var(--ink-muted)]">{lead.phone}</td>
                <td className="px-4 py-3 text-[var(--ink-muted)]">{tripSummary(lead)}</td>
                <td className="px-4 py-3 text-[var(--ink-muted)]">
                  {lead.utm_source ?? lead.utm_campaign ?? "—"}
                </td>
              </tr>
            ))}
            {leads?.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[var(--ink-faint)]">
                  Todavía no hay leads. En cuanto alguien llene el formulario
                  de /captura, aparecerá aquí.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
