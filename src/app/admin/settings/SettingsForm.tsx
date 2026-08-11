"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Icon } from "@iconify/react";
import { updateSettings, type SettingsState } from "./actions";

const initialState: SettingsState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="tap-target flex items-center gap-2 rounded-full px-6 py-3 font-heading font-bold text-white disabled:opacity-70"
      style={{ background: "linear-gradient(120deg, var(--brand), var(--brand-2))" }}
    >
      {pending ? <Icon icon="svg-spinners:180-ring" width={18} height={18} /> : "Guardar cambios"}
    </button>
  );
}

type Defaults = {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  whatsappNumber: string;
  whatsappMessage: string;
};

export default function SettingsForm({ defaults }: { defaults: Defaults }) {
  const [state, formAction] = useActionState(updateSettings, initialState);
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="glass mt-6 max-w-2xl space-y-5 rounded-[var(--radius-lg)] p-6 sm:p-8">
      <div>
        <label htmlFor="headline" className="mb-1.5 block text-sm font-semibold">
          Titular del héroe
        </label>
        <input
          id="headline"
          name="headline"
          defaultValue={defaults.headline}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-[var(--violet)]"
        />
        {fieldErrors.headline && <p className="mt-1 text-xs text-red-300">{fieldErrors.headline[0]}</p>}
      </div>

      <div>
        <label htmlFor="subheadline" className="mb-1.5 block text-sm font-semibold">
          Subtítulo del héroe
        </label>
        <textarea
          id="subheadline"
          name="subheadline"
          rows={3}
          defaultValue={defaults.subheadline}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-[var(--violet)]"
        />
        {fieldErrors.subheadline && <p className="mt-1 text-xs text-red-300">{fieldErrors.subheadline[0]}</p>}
      </div>

      <div>
        <label htmlFor="cta_label" className="mb-1.5 block text-sm font-semibold">
          Texto del botón (CTA)
        </label>
        <input
          id="cta_label"
          name="cta_label"
          defaultValue={defaults.ctaLabel}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-[var(--violet)]"
        />
        {fieldErrors.cta_label && <p className="mt-1 text-xs text-red-300">{fieldErrors.cta_label[0]}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="whatsapp_number" className="mb-1.5 block text-sm font-semibold">
            WhatsApp destino
          </label>
          <input
            id="whatsapp_number"
            name="whatsapp_number"
            inputMode="numeric"
            placeholder="5215500000000"
            defaultValue={defaults.whatsappNumber}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-[var(--violet)]"
          />
          <p className="mt-1 text-xs text-[var(--ink-faint)]">Código de país + número, sin espacios ni +.</p>
          {fieldErrors.whatsapp_number && (
            <p className="mt-1 text-xs text-red-300">{fieldErrors.whatsapp_number[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="whatsapp_message" className="mb-1.5 block text-sm font-semibold">
            Mensaje inicial de WhatsApp
          </label>
          <input
            id="whatsapp_message"
            name="whatsapp_message"
            defaultValue={defaults.whatsappMessage}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-[var(--violet)]"
          />
          {fieldErrors.whatsapp_message && (
            <p className="mt-1 text-xs text-red-300">{fieldErrors.whatsapp_message[0]}</p>
          )}
        </div>
      </div>

      {state.status === "success" && (
        <p className="flex items-center gap-1.5 text-sm text-[var(--green)]">
          <Icon icon="solar:check-circle-bold" width={18} height={18} />
          {state.message}
        </p>
      )}
      {state.status === "error" && state.message && (
        <p className="flex items-center gap-1.5 text-sm text-red-300">
          <Icon icon="solar:danger-triangle-bold" width={18} height={18} />
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
