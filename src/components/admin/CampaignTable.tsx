import type { CampaignRow } from "@/lib/admin/analytics";
import { CAMPAIGN_MANUAL_DATA } from "@/lib/admin/campaign-manual-data";

const dateFormatter = new Intl.DateTimeFormat("es-MX", { dateStyle: "short" });
const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

export default function CampaignTable({ rows }: { rows: CampaignRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-xs tracking-wide text-[var(--ink-faint)] uppercase">
            <th className="px-4 py-3 font-semibold">Campaña</th>
            <th className="px-4 py-3 font-semibold">Página</th>
            <th className="px-4 py-3 font-semibold">Leads (sitio)</th>
            <th className="px-4 py-3 font-semibold">Primer lead</th>
            <th className="px-4 py-3 font-semibold">Último lead</th>
            <th className="px-4 py-3 font-semibold">Gasto (Meta)</th>
            <th className="px-4 py-3 font-semibold">Costo/lead (Meta)</th>
            <th className="px-4 py-3 font-semibold">Contactos totales</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const manual = CAMPAIGN_MANUAL_DATA[row.campaign];
            return (
              <tr key={row.campaign} className="border-b border-white/5 last:border-0 align-top">
                <td className="px-4 py-3 font-medium">{row.campaign}</td>
                <td className="px-4 py-3 text-[var(--ink-muted)]">{row.pagePath}</td>
                <td className="px-4 py-3 font-heading font-bold text-[var(--ink)]">
                  {row.leadCount}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-[var(--ink-muted)]">
                  {dateFormatter.format(new Date(row.firstLeadAt))}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-[var(--ink-muted)]">
                  {dateFormatter.format(new Date(row.lastLeadAt))}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-[var(--ink-muted)]">
                  {manual ? currencyFormatter.format(manual.adSpendMxn) : "—"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-[var(--ink-muted)]">
                  {manual ? currencyFormatter.format(manual.costPerMetaLead) : "—"}
                </td>
                <td className="px-4 py-3 text-[var(--ink-muted)]">
                  {manual?.totalContactsManual ? (
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-[var(--ink)]">
                        {manual.totalContactsManual}
                      </span>
                      {manual.notes && (
                        <span className="text-xs text-[var(--ink-faint)]">{manual.notes}</span>
                      )}
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-[var(--ink-faint)]">
                Todavía no hay campañas con leads registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
