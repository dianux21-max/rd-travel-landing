"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Icon } from "@iconify/react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="tap-target flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-heading font-bold text-white disabled:opacity-70"
      style={{ background: "linear-gradient(120deg, var(--brand), var(--brand-2))" }}
    >
      {pending ? <Icon icon="svg-spinners:180-ring" width={18} height={18} /> : "Entrar"}
    </button>
  );
}

export default function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="glass-strong mx-auto max-w-sm rounded-[var(--radius-lg)] p-7">
      <input type="hidden" name="next" value={next ?? ""} />
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-[var(--violet)]"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-[var(--violet)]"
        />
      </div>

      {state.status === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          {state.message}
        </p>
      )}

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
