import Link from "next/link";
import { BrandText } from "@/components/home/BrandText";
import { GOOGLE_MAPS_PLACE_URL } from "@/constants/bio";
import { HomeReveal } from "@/components/home/HomeReveal";
import {
  HOME_COMPANY,
  HOME_CTA,
  HOME_WHATSAPP_MESSAGES,
  getHomeWhatsAppUrl,
} from "@/constants/home";
import { ROUTES } from "@/constants/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-landing-black text-white">
      <HomeReveal className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <p className="text-base font-semibold tracking-tight text-brand-gold">
              {HOME_COMPANY.commercialName.toUpperCase()}
            </p>
            <p className="mt-3 text-sm text-zinc-400">
              {HOME_COMPANY.formalized}
            </p>
            <dl className="mt-5 space-y-3 text-sm leading-6">
              <div>
                <dt className="text-[11px] font-medium tracking-[0.16em] text-zinc-500 uppercase">
                  Razão social
                </dt>
                <dd className="mt-1 text-zinc-300">
                  {HOME_COMPANY.legalName}
                  <span className="mt-0.5 block font-semibold text-landing-gold">
                    ({HOME_COMPANY.commercialName.toUpperCase()})
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium tracking-[0.16em] text-zinc-500 uppercase">
                  CNPJ
                </dt>
                <dd className="mt-1 text-zinc-300">{HOME_COMPANY.cnpj}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium tracking-[0.16em] text-zinc-500 uppercase">
                  Inscrição municipal
                </dt>
                <dd className="mt-1 text-zinc-300">
                  {HOME_COMPANY.municipalRegistration}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-[11px] font-medium tracking-[0.18em] text-brand-gold uppercase">
              Endereço
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              {HOME_COMPANY.address.street} – {HOME_COMPANY.address.neighborhood}
              <br />
              {HOME_COMPANY.address.city} – {HOME_COMPANY.address.state}
            </p>

            <h2 className="mt-8 text-[11px] font-medium tracking-[0.18em] text-brand-gold uppercase">
              Perfil oficial
            </h2>
            <p className="mt-4 text-sm">
              <a
                href={GOOGLE_MAPS_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-landing-gold transition-colors hover:text-brand-gold"
              >
                {HOME_COMPANY.googleProfile}
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-[11px] font-medium tracking-[0.18em] text-brand-gold uppercase">
              Contato
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <span className="block text-zinc-500">WhatsApp</span>
                <a
                  href={getHomeWhatsAppUrl(HOME_WHATSAPP_MESSAGES.floating)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 transition-colors hover:text-white"
                >
                  {HOME_COMPANY.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="block text-zinc-500">Ligação</span>
                <a
                  href={`tel:+${HOME_COMPANY.phoneDigits}`}
                  className="text-zinc-300 transition-colors hover:text-white"
                >
                  {HOME_COMPANY.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="block text-zinc-500">E-mail</span>
                <a
                  href={`mailto:${HOME_COMPANY.email}`}
                  className="break-all text-zinc-300 transition-colors hover:text-white"
                >
                  {HOME_COMPANY.email}
                </a>
              </li>
              <li>
                <span className="block text-zinc-500">Telegram</span>
                <span className="text-zinc-300">Atendimento 24h</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-medium tracking-[0.18em] text-brand-gold uppercase">
              Canais e redes
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-300">
              {HOME_COMPANY.channels.map((channel) => (
                <li key={channel}>{channel}</li>
              ))}
            </ul>

            <h2 className="mt-8 text-[11px] font-medium tracking-[0.18em] text-brand-gold uppercase">
              Instagram
            </h2>
            <p className="mt-4 text-sm">
              <a
                href={HOME_COMPANY.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 transition-colors hover:text-white"
              >
                {HOME_COMPANY.instagram}
              </a>
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href={HOME_CTA.href}
                className="inline-flex min-h-11 items-center justify-center bg-brand-gold px-4 text-xs font-semibold tracking-wide text-brand-black uppercase transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand-gold-dark motion-reduce:hover:translate-y-0"
              >
                Solicitar caixa coletora
              </Link>
              <a
                href={HOME_COMPANY.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center border border-brand-gold px-4 text-xs font-semibold tracking-wide text-brand-gold uppercase transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand-gold hover:text-brand-black motion-reduce:hover:translate-y-0"
              >
                Seguir no Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>
            {HOME_COMPANY.address.city} – {HOME_COMPANY.address.state}
          </p>
          <p>
            © {year}{" "}
            <BrandText tone="onDark">{HOME_COMPANY.commercialName}</BrandText>.
            Todos os direitos reservados.
          </p>
          <p>
            <Link
              href={ROUTES.bio}
              className="transition-colors hover:text-zinc-300"
            >
              Página bio
            </Link>
          </p>
        </div>
      </HomeReveal>
    </footer>
  );
}
