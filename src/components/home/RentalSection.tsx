import Link from "next/link";
import { COLLECTOR_BOX_DEFAULTS } from "@/constants/alocacao";
import { HOME_CTA } from "@/constants/home";
import { HomeLinkButton } from "@/components/home/HomeLinkButton";
import { HomeSection } from "@/components/home/HomeSection";
import { SectionHeading } from "@/components/home/SectionHeading";

export function RentalSection() {
  return (
    <HomeSection id="locacao" tone="subtle">
      <SectionHeading
        title="Locação de caixa coletora de entulho em Manaus"
        description="A 3J Caixas Entulhos Manaus oferece locação de caixa coletora de entulho com capacidade de 6 m³ para obras, reformas e serviços de limpeza em Manaus – AM."
      />

      <div className="mt-8 max-w-3xl space-y-4 text-[15px] leading-7 text-landing-muted sm:text-base">
        <p>
          Se você procura <strong className="font-medium text-landing-black">locação de caixa coletora</strong> ou{" "}
          <strong className="font-medium text-landing-black">locação de caixa de entulho em Manaus</strong>,
          a 3J disponibiliza caixa coletora de {COLLECTOR_BOX_DEFAULTS.boxSize} para organizar
          resíduos de construção, reforma e demolição no local da obra.
        </p>
        <p>
          A permanência padrão informada pela empresa é de{" "}
          <strong className="font-medium text-landing-black">3 dias úteis</strong>.
          Para solicitar, preencha o formulário de{" "}
          <Link
            href={HOME_CTA.href}
            className="font-medium text-landing-black underline-offset-4 hover:underline"
          >
            confirmação de locação
          </Link>{" "}
          ou fale conosco pelo WhatsApp.
        </p>
      </div>

      <div className="mt-8">
        <HomeLinkButton href={HOME_CTA.href} className="sm:w-auto sm:min-w-[16rem]">
          {HOME_CTA.label}
        </HomeLinkButton>
      </div>
    </HomeSection>
  );
}
