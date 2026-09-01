import { Box } from "lucide-react";
import { SITE } from "@/constants/site";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-semibold tracking-[0.16em] text-brand-gold-dark uppercase">
        Sistema de alocação
      </p>
      <h1 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-brand-black sm:text-3xl">
        {SITE.name}
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-muted sm:text-base">
        {SITE.description}
      </p>

      <section className="mt-8 max-w-xl border border-brand-border bg-brand-surface p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center border border-brand-border bg-white text-brand-gold-dark">
            <Box aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-brand-black sm:text-base">
              Alocação de caixas
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-brand-muted">
              Use este sistema para solicitar a alocação de caixas coletoras de
              entulho de forma organizada e segura.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
