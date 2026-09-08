"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { BrandText } from "@/components/home/BrandText";
import { HOME_CTA, HOME_FAQ } from "@/constants/home";
import { HomeReveal } from "@/components/home/HomeReveal";
import { HomeSection } from "@/components/home/HomeSection";
import { SectionHeading } from "@/components/home/SectionHeading";
import { cn } from "@/lib/utils/cn";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <HomeSection id="faq">
      <HomeReveal>
        <SectionHeading
          title="Perguntas frequentes sobre caixa coletora de entulho"
          description="Toque em uma pergunta para ver a resposta."
        />
      </HomeReveal>

      <HomeReveal delay={100}>
        <div className="mt-10 max-w-3xl divide-y divide-landing-border border-y border-landing-border">
          {HOME_FAQ.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-trigger-${index}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-brand-gold"
                  onClick={() =>
                    setOpenIndex((current) =>
                      current === index ? null : index,
                    )
                  }
                >
                  <span className="text-base font-semibold text-landing-black sm:text-lg">
                    <BrandText>{item.question}</BrandText>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "size-5 shrink-0 text-brand-gold transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  hidden={!isOpen}
                  className="pb-5 text-sm leading-7 text-landing-muted sm:text-[15px]"
                >
                  {item.question === "Como solicitar uma caixa coletora?" ? (
                    <>
                      O cliente pode preencher a solicitação online pela{" "}
                      <Link
                        href={HOME_CTA.href}
                        className="font-medium text-landing-black underline-offset-4 hover:underline"
                      >
                        página de confirmação de locação
                      </Link>{" "}
                      ou entrar em contato pelo WhatsApp.
                    </>
                  ) : (
                    <BrandText>{item.answer}</BrandText>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </HomeReveal>
    </HomeSection>
  );
}
