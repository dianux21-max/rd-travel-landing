import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : undefined;
  const notAuthorized = params.error === "not-authorized";

  return (
    <main className="flex flex-1 items-center justify-center py-20">
      <Container className="max-w-md">
        <h1 className="font-heading text-fluid-h2 text-center font-extrabold">
          Panel <span className="holo-text">RD Travel</span>
        </h1>
        <p className="mt-2 mb-8 text-center text-sm text-[var(--ink-muted)]">
          Acceso privado para el equipo.
        </p>
        {notAuthorized && (
          <p className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
            Esa cuenta no tiene permisos de administrador.
          </p>
        )}
        <LoginForm next={next} />
      </Container>
    </main>
  );
}
