import type { Metadata } from "next";
import { Icon } from "@iconify/react";
import { requireAdmin } from "@/lib/admin/dal";
import { getLeadStats } from "@/lib/admin/stats";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Resumen",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const { supabase, user } = await requireAdmin();
  const leadStats = await getLeadStats(supabase);

  const stats = [
    { label: "Leads totales", value: leadStats.total, icon: "solar:users-group-rounded-bold-duotone", color: "var(--violet)" },
    { label: "Últimas 24 horas", value: leadStats.last24h, icon: "solar:bolt-bold-duotone", color: "var(--amber)" },
    { label: "Últimos 7 días", value: leadStats.last7d, icon: "solar:calendar-bold-duotone", color: "var(--sky)" },
  ];

  return (
    <AdminShell email={user.email ?? ""}>
      <h1 className="font-heading text-2xl font-bold">Resumen</h1>
      <p className="mt-1 text-sm text-[var(--ink-muted)]">
        Vista rápida de la captura de leads en /captura.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-[var(--radius-lg)] p-6">
            <div
              className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: `${stat.color}1f` }}
            >
              <Icon icon={stat.icon} width={22} height={22} color={stat.color} />
            </div>
            <p className="font-heading text-3xl font-extrabold">{stat.value}</p>
            <p className="mt-1 text-sm text-[var(--ink-muted)]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="glass mt-6 flex flex-col items-start gap-3 rounded-[var(--radius-lg)] p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--ink-muted)]">
          Embudo por etapas, UTMs, dispositivos, ciudades y usuarios activos
          en tiempo real ya están listos.
        </p>
        <a
          href="/admin/analytics"
          className="tap-target shrink-0 rounded-full px-4 py-2 text-sm font-bold text-white"
          style={{ background: "linear-gradient(120deg, var(--brand), var(--brand-2))" }}
        >
          Ver analítica →
        </a>
      </div>
    </AdminShell>
  );
}
