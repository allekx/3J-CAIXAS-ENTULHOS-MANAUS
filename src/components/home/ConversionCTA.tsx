import {
  HOME_CTA,
  HOME_WHATSAPP_MESSAGES,
  getHomeWhatsAppUrl,
} from "@/constants/home";
import { HomeLinkButton } from "@/components/home/HomeLinkButton";

export function ConversionCTA() {
  return (
    <section
      id="solicitar"
      className="border-y border-landing-gold/30 bg-landing-black py-16 text-white sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-[11px] font-medium tracking-[0.22em] text-landing-gold uppercase">
          Solicite agora
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-oswald)] text-[1.75rem] leading-[1.15] font-medium tracking-tight text-white sm:text-4xl">
          Solicite sua caixa coletora em Manaus
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-zinc-400 sm:text-base">
          Faça sua solicitação online de caixa coletora de entulho e nossa equipe
          entrará em contato para confirmar os detalhes da locação.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <HomeLinkButton href={HOME_CTA.href} className="sm:min-w-[16rem]">
            {HOME_CTA.label}
          </HomeLinkButton>
          <HomeLinkButton
            href={getHomeWhatsAppUrl(HOME_WHATSAPP_MESSAGES.floating)}
            variant="light"
            external
            className="sm:min-w-[14rem]"
          >
            Falar pelo WhatsApp
          </HomeLinkButton>
        </div>
      </div>
    </section>
  );
}
