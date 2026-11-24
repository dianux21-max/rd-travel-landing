export default function BuenFinBar() {
  return (
    <div className="sticky top-0 z-50 border-b border-[var(--glass-border-strong)] bg-[var(--bg-elevated)]">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2">
        <p className="min-w-0 flex-1 text-center text-xs font-medium text-[var(--ink)] sm:flex-initial sm:text-sm">
          <span className="sm:hidden">
            🔥 Extendemos Buen Fin: Europa 2027 · desde $2,000 MXN · hasta 29
            nov
          </span>
          <span className="hidden sm:inline">
            🔥 Extendemos Buen Fin: Europa 2027 desde GDL · Aparta desde
            $2,000 MXN por persona · Hasta el 29 de noviembre
          </span>
        </p>
        <a
          href="#buen-fin"
          data-track="cta_click"
          className="tap-target shrink-0 rounded-full px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white"
          style={{ background: "linear-gradient(120deg, var(--brand), var(--brand-2))" }}
        >
          Ver paquetes
        </a>
      </div>
    </div>
  );
}
