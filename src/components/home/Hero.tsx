import { BrandText } from "@/components/home/BrandText";
import { HomeImage } from "@/components/home/HomeImage";
import { HomeReveal } from "@/components/home/HomeReveal";
import {
  HOME_COMPANY,
  HOME_CTA,
  HOME_HERO_TRUST,
  HOME_IMAGES,
  HOME_WHATSAPP_MESSAGES,
  getHomeWhatsAppUrl,
} from "@/constants/home";
import { HomeLinkButton } from "@/components/home/HomeLinkButton";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-landing-black text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.12),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14 lg:py-20">
        <div className="min-w-0">
          <HomeReveal immediate>
            <p className="text-[11px] font-medium tracking-[0.22em] text-landing-gold uppercase">
              Locação de caixas coletoras
            </p>
          </HomeReveal>

          <HomeReveal immediate delay={80}>
            <h1 className="mt-3 max-w-xl font-[family-name:var(--font-oswald)] text-[2rem] leading-[1.1] font-medium tracking-tight text-white sm:text-[2.75rem] lg:text-5xl">
              Caixa Coletora de Entulho em Manaus
            </h1>
          </HomeReveal>

          <HomeReveal immediate delay={160}>
            <p className="mt-5 max-w-lg text-[15px] leading-7 text-zinc-400 sm:text-base">
              <BrandText tone="onDark">
                Seja bem-vindo(a) à 3J Caixas Entulhos Manaus – empresa séria e
                devidamente regularizada, com CNPJ 64.160.751/0001-58. Atuamos
                com compromisso, respeito a você cliente e às normas, segurança,
                transparência e total confiança em cada serviço prestado.
              </BrandText>
            </p>
          </HomeReveal>

          <HomeReveal immediate delay={240}>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-400">
              {HOME_HERO_TRUST.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="size-1 rounded-full bg-landing-gold"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </HomeReveal>

          <HomeReveal immediate delay={320}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <HomeLinkButton href={HOME_CTA.href} className="sm:min-w-[16rem]">
                {HOME_CTA.label}
              </HomeLinkButton>
              <HomeLinkButton
                href={getHomeWhatsAppUrl(HOME_WHATSAPP_MESSAGES.hero)}
                variant="light"
                external
                className="sm:min-w-[14rem]"
              >
                Falar pelo WhatsApp
              </HomeLinkButton>
              <HomeLinkButton
                href={HOME_COMPANY.instagramUrl}
                variant="light"
                external
                className="sm:min-w-[14rem]"
              >
                Seguir no Instagram
              </HomeLinkButton>
            </div>
          </HomeReveal>
        </div>

        <HomeReveal immediate delay={180} className="min-w-0">
          <HomeImage
            src={HOME_IMAGES.hero.src}
            alt={HOME_IMAGES.hero.alt}
            width={HOME_IMAGES.hero.width}
            height={HOME_IMAGES.hero.height}
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
            containerClassName="mt-2 min-h-[12rem] bg-zinc-800 shadow-[0_24px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/10 sm:min-h-[16rem]"
          />
        </HomeReveal>
      </div>
    </section>
  );
}
