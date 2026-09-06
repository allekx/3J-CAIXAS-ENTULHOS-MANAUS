import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AllocationHeader } from "@/components/alocacao/AllocationHeader";
import { ALLOCATION_TERMS } from "@/constants/termos-locacao";
import { ROUTES } from "@/constants/site";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description: ALLOCATION_TERMS.subtitle,
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermosLocacaoPage() {
  return (
    <>
      <AllocationHeader title={ALLOCATION_TERMS.title} />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-[800px] px-4 pb-12 sm:px-6">
          <Link
            href={ROUTES.confirmacaoAlocacao}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-muted transition-colors hover:text-brand-black"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Voltar à solicitação
          </Link>

          <p className="mt-6 text-[15px] leading-7 text-brand-muted sm:text-base">
            {ALLOCATION_TERMS.subtitle}
          </p>
          <p className="mt-2 text-xs font-medium tracking-[0.14em] text-brand-gold-dark uppercase">
            {ALLOCATION_TERMS.updatedLabel}
          </p>

          <ol className="mt-8 space-y-6">
            {ALLOCATION_TERMS.items.map((item, index) => (
              <li
                key={item.title}
                className="border-t border-brand-border pt-5 first:border-t-0 first:pt-0"
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-brand-gold-dark uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 text-base font-semibold text-brand-black sm:text-lg">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-brand-muted sm:text-[15px]">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-10 border-t border-brand-border pt-6 text-sm leading-7 text-brand-muted">
            Ao marcar “Li e aceito os Termos e Condições” na solicitação de
            locação, o cliente declara ter lido e concordado com as regras
            acima.
          </p>
        </div>
      </main>
    </>
  );
}
