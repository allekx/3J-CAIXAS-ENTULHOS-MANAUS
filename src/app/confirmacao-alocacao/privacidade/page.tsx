import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AllocationHeader } from "@/components/alocacao/AllocationHeader";
import { PRIVACY_POLICY } from "@/constants/privacidade";
import { ROUTES } from "@/constants/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: PRIVACY_POLICY.subtitle,
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacidadePage() {
  return (
    <>
      <AllocationHeader title={PRIVACY_POLICY.title} />
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
            {PRIVACY_POLICY.subtitle}
          </p>
          <p className="mt-2 text-xs font-medium tracking-[0.14em] text-brand-gold-dark uppercase">
            {PRIVACY_POLICY.updatedLabel}
          </p>

          <ol className="mt-8 space-y-8">
            {PRIVACY_POLICY.sections.map((section, index) => (
              <li
                key={section.title}
                className="border-t border-brand-border pt-6 first:border-t-0 first:pt-0"
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-brand-gold-dark uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 text-base font-semibold text-brand-black sm:text-lg">
                  {section.title}
                </h2>

                <div className="mt-3 space-y-3 text-sm leading-7 text-brand-muted sm:text-[15px]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {"bullets" in section && section.bullets ? (
                    <ul className="list-disc space-y-1.5 pl-5">
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}

                  {"closing" in section && section.closing ? (
                    <p>{section.closing}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-10 border-t border-brand-border pt-6 text-sm leading-7 text-brand-muted">
            Controlador: {PRIVACY_POLICY.controller.name} · CNPJ{" "}
            {PRIVACY_POLICY.controller.cnpj} ·{" "}
            <a
              href={`mailto:${PRIVACY_POLICY.controller.email}`}
              className="font-medium text-brand-black underline-offset-2 hover:underline"
            >
              {PRIVACY_POLICY.controller.email}
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
