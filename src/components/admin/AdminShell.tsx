import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import { logout } from "@/app/admin/actions";

const NAV = [
  { href: "/admin", label: "Resumen", icon: "solar:widget-5-bold-duotone" },
  { href: "/admin/leads", label: "Leads", icon: "solar:users-group-rounded-bold-duotone" },
  { href: "/admin/analytics", label: "Analítica", icon: "solar:chart-2-bold-duotone" },
  { href: "/admin/settings", label: "Configuración", icon: "solar:settings-bold-duotone" },
];

export default function AdminShell({
  children,
  email,
}: {
  children: ReactNode;
  email: string;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8">
      <header className="glass mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-lg)] p-4">
        <div className="flex items-center gap-3">
          <p className="font-heading text-lg font-bold">
            RD <span className="holo-text">Travel</span>{" "}
            <span className="text-[var(--ink-faint)]">/ admin</span>
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-1">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="tap-target flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-[var(--ink-muted)] hover:bg-white/5 hover:text-[var(--ink)]"
            >
              <Icon icon={item.icon} width={18} height={18} />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-[var(--ink-faint)] sm:inline">{email}</span>
          <form action={logout}>
            <button
              type="submit"
              className="tap-target flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-sm font-medium hover:bg-white/5"
            >
              <Icon icon="solar:logout-2-bold" width={16} height={16} />
              Salir
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
