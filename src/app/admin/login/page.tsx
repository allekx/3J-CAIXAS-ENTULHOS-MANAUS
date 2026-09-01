import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/app/admin/login/AdminLoginForm";
import { ROUTES, SITE } from "@/constants/site";
import { getAdminSessionUser } from "@/lib/auth/admin";

export const metadata: Metadata = {
  title: "Login administrativo",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const user = await getAdminSessionUser();

  if (user) {
    redirect(ROUTES.admin);
  }

  return (
    <div className="flex min-h-dvh flex-col bg-brand-surface">
      <header className="border-b-4 border-brand-gold bg-brand-black text-white">
        <div className="mx-auto flex min-h-16 max-w-md items-center px-4 py-3 sm:px-6">
          <div>
            <p className="text-sm font-semibold tracking-wide sm:text-base">
              {SITE.name}
            </p>
            <p className="mt-0.5 text-xs text-zinc-300">Acesso administrativo</p>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-10 sm:px-6">
        <section className="border border-brand-border bg-white p-5 sm:p-6">
          <h1 className="text-xl font-semibold tracking-tight text-brand-black">
            Entrar no painel
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-brand-muted">
            Use o e-mail e a senha cadastrados pela equipe 3J.
          </p>
          <AdminLoginForm />
        </section>
      </main>
    </div>
  );
}
