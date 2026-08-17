"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Icon } from "@iconify/react";
import { submitTripDetails, type TripDetailsState } from "@/app/gracias/actions";

const initialState: TripDetailsState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="tap-target flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-heading text-sm font-bold text-white disabled:opacity-70 sm:flex-1"
      style={{ background: "linear-gradient(120deg, var(--brand), var(--brand-2))" }}
    >
      {pending ? (
        <Icon icon="svg-spinners:180-ring" width={18} height={18} />
      ) : (
        <Icon icon="ic:baseline-whatsapp" width={18} height={18} />
      )}
      Enviar y continuar a WhatsApp
    </button>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-[var(--ink-faint)] focus:border-[var(--violet)]";

export default function TripDetailsForm({
  leadId,
  whatsappLink,
}: {
  leadId: string;
  whatsappLink: string;
}) {
  const [state, formAction] = useActionState(submitTripDetails, initialState);
  const [withMinors, setWithMinors] = useState<"si" | "no" | "">("");

  useEffect(() => {
    if (state.status === "success" && state.whatsappLink) {
      window.location.href = state.whatsappLink;
    }
  }, [state]);

  return (
    <div className="glass mx-auto mt-8 max-w-lg rounded-[var(--radius-lg)] p-6 text-left sm:p-7">
      <h2 className="font-heading text-lg font-bold">
        Cuéntanos más de tu viaje <span className="font-normal text-[var(--ink-faint)]">(opcional)</span>
      </h2>
      <p className="mt-1 text-sm text-[var(--ink-muted)]">
        Mientras te contactamos, esto nos ayuda a llegar con opciones ya más afinadas.
      </p>

      <form action={formAction} className="mt-5 space-y-4">
        <input type="hidden" name="leadId" value={leadId} />

        <div>
          <label htmlFor="destination" className="mb-1.5 block text-sm font-semibold">
            Destino
          </label>
          <input
            id="destination"
            name="destination"
            type="text"
            placeholder="¿A dónde te gustaría ir?"
            className={inputClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="dates" className="mb-1.5 block text-sm font-semibold">
              Fechas aproximadas
            </label>
            <input
              id="dates"
              name="dates"
              type="text"
              placeholder="Ej. noviembre, puente de..."
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="travelersCount" className="mb-1.5 block text-sm font-semibold">
              ¿Cuántas personas viajan?
            </label>
            <input
              id="travelersCount"
              name="travelersCount"
              type="text"
              placeholder="Ej. 2 adultos"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <span className="mb-1.5 block text-sm font-semibold">¿Viajan menores de edad?</span>
          <div className="flex gap-2">
            {(["si", "no"] as const).map((option) => (
              <label
                key={option}
                className={`tap-target flex-1 cursor-pointer rounded-xl border px-4 py-2.5 text-center text-sm font-medium transition-colors ${
                  withMinors === option
                    ? "border-[var(--violet)] bg-[color-mix(in_srgb,var(--violet)_18%,transparent)]"
                    : "border-white/15 bg-white/5 text-[var(--ink-muted)]"
                }`}
              >
                <input
                  type="radio"
                  name="travelWithMinors"
                  value={option}
                  checked={withMinors === option}
                  onChange={() => setWithMinors(option)}
                  className="sr-only"
                />
                {option === "si" ? "Sí" : "No"}
              </label>
            ))}
          </div>
        </div>

        {withMinors === "si" && (
          <div>
            <label htmlFor="minorsAges" className="mb-1.5 block text-sm font-semibold">
              Edades de los menores
            </label>
            <input
              id="minorsAges"
              name="minorsAges"
              type="text"
              placeholder="Ej. 5 y 9 años"
              className={inputClass}
            />
          </div>
        )}

        {state.status === "error" && (
          <p role="alert" className="text-sm text-red-300">
            {state.message}
          </p>
        )}

        <div className="flex flex-col gap-3 pt-1 sm:flex-row">
          <SubmitButton />
          <a
            href={whatsappLink}
            data-track="whatsapp_click"
            className="tap-target flex items-center justify-center rounded-full border border-white/15 px-4 py-3.5 text-center text-sm font-semibold text-[var(--ink-muted)] hover:bg-white/5"
          >
            Omitir, ir directo a WhatsApp
          </a>
        </div>
      </form>
    </div>
  );
}
