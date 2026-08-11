import { Icon } from "@iconify/react";
import type { ReactNode } from "react";

export default function CtaButton({
  children,
  href = "#formulario",
  pulse = false,
  size = "md",
  icon = "solar:chat-round-dots-bold",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  pulse?: boolean;
  size?: "md" | "lg";
  icon?: string | null;
  className?: string;
}) {
  const sizeClasses =
    size === "lg"
      ? "px-8 py-4 text-base sm:text-lg"
      : "px-6 py-3.5 text-sm sm:text-base";

  return (
    <a
      href={href}
      className={`tap-target group inline-flex items-center justify-center gap-2 rounded-full font-heading font-bold text-white shadow-lg transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-[0.98] ${sizeClasses} ${pulse ? "anim-pulse-glow" : ""} ${className}`}
      style={{
        background: "linear-gradient(120deg, var(--brand), var(--brand-2))",
      }}
    >
      {icon && (
        <Icon icon={icon} width={size === "lg" ? 24 : 20} height={size === "lg" ? 24 : 20} />
      )}
      {children}
    </a>
  );
}
