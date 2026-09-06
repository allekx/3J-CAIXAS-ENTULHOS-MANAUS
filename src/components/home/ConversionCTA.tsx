import {
  HOME_CTA,
  HOME_WHATSAPP_MESSAGES,
  getHomeWhatsAppUrl,
} from "@/constants/home";
import { HomeLinkButton } from "@/components/home/HomeLinkButton";
import { HomeReveal } from "@/components/home/HomeReveal";

export function ConversionCTA() {
  return (
    <section
      id="solicitar"
      className="relative overflow-hidden border-y border-landing-gold/30 bg-landing-black py-16 text-white sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.1),transparent_60%)]"
      />

      <HomeReveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-[11px] font-medium tracking-[0.22em] text-landing-gold uppercase">
          Solicite agora
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-oswald)] text-[1.75rem] leading-[1.15] font-medium tracking-tight text-white sm:text-4xl">
          Solicite sua caixa coletora em Manaus
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-5 block h-px w-16 bg-brand-gold/70"
        />
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-zinc-400 sm:text-base">
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
      </HomeReveal>
    </section>
  );
}
