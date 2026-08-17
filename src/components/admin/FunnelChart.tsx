import type { FunnelStage } from "@/lib/admin/analytics";

export default function FunnelChart({ stages }: { stages: FunnelStage[] }) {
  const max = stages[0]?.count || 1;

  return (
    <div className="space-y-4">
      {stages.map((stage, i) => {
        const widthPct =
          max === 0 ? 0 : Math.max((stage.count / max) * 100, stage.count > 0 ? 3 : 0);
        const prevCount = i > 0 ? stages[i - 1].count : null;
        const convPct =
          prevCount && prevCount > 0 ? Math.round((stage.count / prevCount) * 100) : null;

        return (
          <div key={stage.key}>
            <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium">{stage.label}</span>
              <span className="flex shrink-0 items-center gap-2">
                {convPct !== null && (
                  <span className="text-xs text-[var(--ink-faint)]">
                    {convPct}% del paso anterior
                  </span>
                )}
                <span className="font-heading font-bold text-[var(--ink)]">
                  {stage.count.toLocaleString("es-MX")}
                </span>
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{
                  width: `${widthPct}%`,
                  background: "linear-gradient(90deg, var(--violet), var(--brand))",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
