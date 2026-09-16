import type { CampaignRow } from "@/lib/admin/analytics";

const dateFormatter = new Intl.DateTimeFormat("es-MX", { dateStyle: "short" });

export default function CampaignTable({ rows }: { rows: CampaignRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-xs tracking-wide text-[var(--ink-faint)] uppercase">
            <th className="px-4 py-3 font-semibold">Campaña</th>
            <th className="px-4 py-3 font-semibold">Página</th>
            <th className="px-4 py-3 font-semibold">Leads</th>
            <th className="px-4 py-3 font-semibold">Primer lead</th>
            <th className="px-4 py-3 font-semibold">Último lead</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.campaign} className="border-b border-white/5 last:border-0">
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
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-[var(--ink-faint)]">
                Todavía no hay campañas con leads registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
