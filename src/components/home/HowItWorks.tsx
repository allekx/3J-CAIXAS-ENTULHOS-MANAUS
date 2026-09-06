import { HOME_CTA, HOME_STEPS } from "@/constants/home";
import { HomeLinkButton } from "@/components/home/HomeLinkButton";
import { HomeReveal } from "@/components/home/HomeReveal";
import { HomeSection } from "@/components/home/HomeSection";
import { SectionHeading } from "@/components/home/SectionHeading";

export function HowItWorks() {
  return (
    <HomeSection id="como-funciona" tone="subtle">
      <HomeReveal>
        <SectionHeading
          align="center"
          title="Como funciona a locação da caixa coletora"
          description="Processo simples para solicitar locação de caixa de entulho em Manaus."
        />
      </HomeReveal>

      <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
        {HOME_STEPS.map((step, index) => (
          <HomeReveal key={step.step} as="li" delay={index * 100} className="relative md:pt-2">
            <span className="font-[family-name:var(--font-oswald)] text-4xl font-medium text-landing-gold/90">
              {step.step}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-landing-black">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-landing-muted sm:text-[15px]">
              {step.description}
            </p>
          </HomeReveal>
        ))}
      </ol>

      <HomeReveal delay={280} className="mt-10 flex justify-center">
        <HomeLinkButton href={HOME_CTA.href} className="sm:min-w-[13rem]">
          {HOME_CTA.nowLabel}
        </HomeLinkButton>
      </HomeReveal>
    </HomeSection>
  );
}
