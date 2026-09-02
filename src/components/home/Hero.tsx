import { HomeImage } from "@/components/home/HomeImage";
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
      className="overflow-hidden bg-landing-black text-white"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14 lg:py-20">
        <div className="min-w-0">
          <p className="text-[11px] font-medium tracking-[0.22em] text-landing-gold uppercase">
            {HOME_COMPANY.commercialName}
          </p>
          <h1 className="mt-3 max-w-xl font-[family-name:var(--font-oswald)] text-[2rem] leading-[1.1] font-medium tracking-tight text-white sm:text-[2.75rem] lg:text-5xl">
            Caixa Coletora de Entulho em Manaus
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-7 text-zinc-400 sm:text-base">
            Locação e alocação de caixa coletora de{" "}
            <span className="font-medium text-white">6 m³</span> para obras,
            reformas e limpezas em Manaus – AM, com permanência de até 3 dias
            úteis.
          </p>

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

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
          </div>
        </div>

        <HomeImage
          src={HOME_IMAGES.hero.src}
          alt={HOME_IMAGES.hero.alt}
          width={HOME_IMAGES.hero.width}
          height={HOME_IMAGES.hero.height}
          priority
          sizes="(max-width: 1024px) 100vw, 46vw"
          containerClassName="bg-zinc-900 ring-1 ring-white/10"
        />
      </div>
    </section>
  );
}
