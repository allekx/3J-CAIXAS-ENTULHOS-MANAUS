import { HOME_FAQ, HOME_CTA } from "@/constants/home";
import { HomeSection } from "@/components/home/HomeSection";
import { SectionHeading } from "@/components/home/SectionHeading";
import Link from "next/link";

export function FaqSection() {
  return (
    <HomeSection id="faq">
      <SectionHeading
        title="Perguntas frequentes sobre caixa coletora de entulho"
        description="Respostas objetivas para quem precisa de caixa de entulho, caixa coletora ou locação em Manaus."
      />

      <div className="mt-10 max-w-3xl divide-y divide-landing-border">
        {HOME_FAQ.map((item) => (
          <article key={item.question} className="py-6 first:pt-0">
            <h3 className="text-base font-semibold text-landing-black sm:text-lg">
              {item.question}
            </h3>
            <p className="mt-2 text-sm leading-7 text-landing-muted sm:text-[15px]">
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
                item.answer
              )}
            </p>
          </article>
        ))}
      </div>
    </HomeSection>
  );
}
