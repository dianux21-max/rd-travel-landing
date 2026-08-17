"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { getActiveUsersNow } from "@/app/admin/analytics/actions";

const POLL_MS = 10000;

export default function LiveUsersTile({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const next = await getActiveUsersNow();
        setCount(next);
      } catch {
        // transient network/auth hiccup — keep showing the last known count
      }
    }, POLL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass rounded-[var(--radius-lg)] p-6">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--green)_18%,transparent)]">
        <Icon icon="solar:users-group-two-rounded-bold-duotone" width={22} height={22} color="var(--green)" />
      </div>
      <p className="flex items-center gap-2 font-heading text-3xl font-extrabold">
        {count}
        <span className="dot-online" aria-hidden="true" />
      </p>
      <p className="mt-1 text-sm text-[var(--ink-muted)]">Personas en el sitio ahora</p>
    </div>
  );
}
