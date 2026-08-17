import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/dal";
import {
  getFunnelStats,
  getUtmBreakdown,
  getDeviceBreakdown,
  getGeoBreakdown,
  getActiveUsersCount,
} from "@/lib/admin/analytics";
import AdminShell from "@/components/admin/AdminShell";
import FunnelChart from "@/components/admin/FunnelChart";
import BarList from "@/components/admin/BarList";
import LiveUsersTile from "@/components/admin/LiveUsersTile";

export const metadata: Metadata = {
  title: "Analítica",
  robots: { index: false, follow: false },
};

export default async function AdminAnalyticsPage() {
  const { supabase, user } = await requireAdmin();

  const [funnel, utm, devices, geo, activeNow] = await Promise.all([
    getFunnelStats(supabase),
    getUtmBreakdown(supabase),
    getDeviceBreakdown(supabase),
    getGeoBreakdown(supabase),
    getActiveUsersCount(supabase),
  ]);

  return (
    <AdminShell email={user.email ?? ""}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Analítica</h1>
          <p className="mt-1 text-sm text-[var(--ink-muted)]">
            Últimos 30 días. Se actualiza cada vez que entras a esta página.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="glass rounded-[var(--radius-lg)] p-6">
            <h2 className="font-heading mb-1 text-lg font-bold">Embudo de conversión</h2>
            <p className="mb-5 text-sm text-[var(--ink-muted)]">
              De cada visita, cuántos llegan al siguiente paso.
            </p>
            <FunnelChart stages={funnel} />
          </div>
        </div>

        <LiveUsersTile initialCount={activeNow} />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="glass rounded-[var(--radius-lg)] p-6">
          <h2 className="font-heading mb-1 text-lg font-bold">Origen (UTM)</h2>
          <p className="mb-5 text-sm text-[var(--ink-muted)]">
            De qué campaña vino cada lead.
          </p>
          <BarList rows={utm} color="var(--sky)" />
        </div>

        <div className="glass rounded-[var(--radius-lg)] p-6">
          <h2 className="font-heading mb-1 text-lg font-bold">Dispositivo</h2>
          <p className="mb-5 text-sm text-[var(--ink-muted)]">
            Desde qué tipo de pantalla llegan los visitantes.
          </p>
          <BarList rows={devices} color="var(--brand-2)" />
        </div>

        <div className="glass rounded-[var(--radius-lg)] p-6 sm:col-span-2">
          <h2 className="font-heading mb-1 text-lg font-bold">Ciudad</h2>
          <p className="mb-5 text-sm text-[var(--ink-muted)]">
            De dónde son los leads que has recibido.
          </p>
          <BarList rows={geo} color="var(--amber)" />
        </div>
      </div>
    </AdminShell>
  );
}
