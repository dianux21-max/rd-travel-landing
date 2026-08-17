import type { CountRow } from "@/lib/admin/analytics";

export default function BarList({
  rows,
  emptyMessage = "Todavía no hay datos suficientes.",
  color = "var(--violet)",
}: {
  rows: CountRow[];
  emptyMessage?: string;
  color?: string;
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-[var(--ink-faint)]">{emptyMessage}</p>;
  }

  const max = Math.max(...rows.map((row) => row.count), 1);

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div key={row.label}>
          <div className="mb-1 flex items-center justify-between gap-3 text-sm">
            <span className="truncate text-[var(--ink-muted)]">{row.label}</span>
            <span className="font-heading shrink-0 font-semibold">{row.count}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full"
              style={{ width: `${(row.count / max) * 100}%`, background: color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
