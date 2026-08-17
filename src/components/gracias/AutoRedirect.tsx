import { Icon } from "@iconify/react";

export default function AutoRedirect({ whatsappLink }: { whatsappLink: string }) {
  return (
    <div className="glass-strong glass-highlight mx-auto mt-8 max-w-md rounded-[var(--radius-lg)] p-6 text-center">
      <a
        href={whatsappLink}
        data-track="whatsapp_click"
        className="tap-target anim-pulse-glow flex w-full items-center justify-center gap-2 rounded-full py-4 font-heading text-base font-bold text-white"
        style={{ background: "var(--green)" }}
      >
        <Icon icon="ic:baseline-whatsapp" width={22} height={22} />
        Ir a WhatsApp ahora
      </a>
    </div>
  );
}
