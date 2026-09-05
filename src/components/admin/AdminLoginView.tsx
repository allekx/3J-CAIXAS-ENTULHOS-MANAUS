"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ROUTES, SITE } from "@/constants/site";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils/cn";

const LOGO_SRC = "/logos/logo-3j-oficial.jpg";

const inputClassName =
  "h-12 w-full min-h-12 border border-brand-border bg-brand-surface/60 px-3.5 text-base text-brand-black outline-none transition-[border-color,box-shadow,background-color] placeholder:text-zinc-400 focus:border-brand-gold focus:bg-white focus:ring-2 focus:ring-brand-gold/25";

export function AdminLoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoReady, setLogoReady] = useState(false);
  const [logoMissing, setLogoMissing] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setError("E-mail ou senha inválidos.");
        return;
      }

      router.replace(ROUTES.admin);
      router.refresh();
    } catch {
      setError("Não foi possível entrar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-brand-black">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,39,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(201,162,39,0.08),transparent_45%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-10 sm:px-6">
        <div className="admin-login-reveal flex flex-col items-center text-center">
          <div className="relative size-[7.5rem] sm:size-36">
            <div
              className="absolute inset-[-3px] rounded-full bg-[conic-gradient(from_210deg,#c9a227,#f0d878,#a6851c,#c9a227)] opacity-90"
              aria-hidden="true"
            />
            <div className="absolute inset-[3px] overflow-hidden rounded-full bg-brand-black shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
              {!logoMissing ? (
                <Image
                  src={LOGO_SRC}
                  alt={SITE.name}
                  width={288}
                  height={288}
                  priority
                  onLoad={() => setLogoReady(true)}
                  onError={() => setLogoMissing(true)}
                  className={cn(
                    "size-full object-cover",
                    !logoReady && "opacity-0",
                  )}
                />
              ) : (
                <span className="flex size-full items-center justify-center px-2 text-sm font-bold tracking-wide text-white uppercase">
                  {SITE.shortName}
                </span>
              )}
            </div>
          </div>

          <p className="mt-5 text-[0.7rem] font-semibold tracking-[0.22em] text-brand-gold uppercase">
            Painel administrativo
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {SITE.name}
          </h1>
        </div>

        <section
          className="admin-login-reveal mt-8 border border-white/10 border-t-2 border-t-brand-gold bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:p-7"
          style={{ animationDelay: "90ms" }}
        >
          <h2 className="text-lg font-semibold tracking-tight text-brand-black">
            Entrar no painel
          </h2>
          <p className="mt-1 text-sm text-brand-muted">
            Acesso restrito à equipe 3J.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
            noValidate
          >
            <div className="flex min-w-0 flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-brand-black"
              >
                E-mail <span className="text-red-700">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="seu@email.com"
                className={inputClassName}
                required
              />
            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-brand-black"
              >
                Senha <span className="text-red-700">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className={inputClassName}
                required
              />
            </div>

            {error ? (
              <p
                className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="mt-2"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </section>

        <p
          className="admin-login-reveal mt-6 text-center text-xs tracking-wide text-zinc-500"
          style={{ animationDelay: "160ms" }}
        >
          3J Caixas Entulhos · Manaus – AM
        </p>
      </main>
    </div>
  );
}
