"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Icon } from "@iconify/react";
import { submitLead, type LeadFormState } from "@/app/captura/actions";

const initialState: LeadFormState = { status: "idle" };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="tap-target anim-pulse-glow flex w-full items-center justify-center gap-2 rounded-full py-4 font-heading text-base font-bold text-white transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      style={{ background: "linear-gradient(120deg, var(--brand), var(--brand-2))" }}
    >
      {pending ? (
        <>
          <Icon icon="svg-spinners:180-ring" width={20} height={20} />
          Enviando...
        </>
      ) : (
        <>
          <Icon icon="solar:chat-round-dots-bold" width={20} height={20} />
          {label}
        </>
      )}
    </button>
  );
}

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-red-300">
      <Icon icon="solar:danger-triangle-bold" width={14} height={14} />
      {errors[0]}
    </p>
  );
}

export default function LeadForm({
  ctaLabel,
  utm,
}: {
  ctaLabel: string;
  utm: Record<string, string | undefined>;
}) {
  const [state, formAction] = useActionState(submitLead, initialState);
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <form
      id="formulario"
      action={formAction}
      noValidate
      className="glass-strong glass-highlight relative mx-auto max-w-xl rounded-[var(--radius-xl)] p-6 sm:p-8"
    >
      {/* Honeypot: hidden from humans, catnip for bots */}
      <div
        style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
        aria-hidden="true"
      >
        <label htmlFor="company">No llenar este campo</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {Object.entries(utm).map(([key, value]) =>
        value ? <input key={key} type="hidden" name={key} value={value} /> : null
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
            Nombre completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            placeholder="¿Cómo te llamas?"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-base outline-none placeholder:text-[var(--ink-faint)] focus:border-[var(--violet)]"
          />
          <FieldError id="name-error" errors={fieldErrors.name} />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
            Correo
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="tu@correo.com"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-base outline-none placeholder:text-[var(--ink-faint)] focus:border-[var(--violet)]"
          />
          <FieldError id="email-error" errors={fieldErrors.email} />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">
            Teléfono (WhatsApp)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="10 dígitos"
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-base outline-none placeholder:text-[var(--ink-faint)] focus:border-[var(--violet)]"
          />
          <FieldError id="phone-error" errors={fieldErrors.phone} />
        </div>
      </div>

      <div className="mt-6">
        <SubmitButton label={ctaLabel} />
      </div>

      <p aria-live="polite" className="mt-3 text-center text-sm">
        {state.status === "error" && (
          <span className="flex items-center justify-center gap-1.5 text-red-300">
            <Icon icon="solar:close-circle-bold" width={16} height={16} />
            {state.message}
          </span>
        )}
      </p>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-[var(--ink-faint)]">
        <Icon icon="solar:lock-keyhole-minimalistic-bold" width={14} height={14} />
        Tus datos están seguros. Solo los usamos para tu cotización.
      </p>
    </form>
  );
}
