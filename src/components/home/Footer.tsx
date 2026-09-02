import Link from "next/link";
import {
  HOME_COMPANY,
  HOME_CTA,
  HOME_NAV,
  HOME_WHATSAPP_MESSAGES,
  getHomeWhatsAppUrl,
} from "@/constants/home";
import { ROUTES } from "@/constants/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-landing-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <p className="text-base font-semibold tracking-tight">
              {HOME_COMPANY.commercialName}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-7 text-zinc-400">
              Locação de caixas coletoras para obras, reformas e limpezas em
              Manaus.
            </p>
          </div>

          <div>
            <h2 className="text-[11px] font-medium tracking-[0.18em] text-landing-gold uppercase">
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
                <span className="block text-zinc-500">E-mail</span>
                <a
                  href={`mailto:${HOME_COMPANY.email}`}
                  className="text-zinc-300 transition-colors hover:text-white"
                >
                  {HOME_COMPANY.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-medium tracking-[0.18em] text-landing-gold uppercase">
              Localização
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              {HOME_COMPANY.address.street} – {HOME_COMPANY.address.neighborhood}
              <br />
              {HOME_COMPANY.address.city} – {HOME_COMPANY.address.state}
            </p>
          </div>

          <div>
            <h2 className="text-[11px] font-medium tracking-[0.18em] text-landing-gold uppercase">
              Redes
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

            <h2 className="mt-8 text-[11px] font-medium tracking-[0.18em] text-landing-gold uppercase">
              Links úteis
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {HOME_NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-zinc-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href={HOME_CTA.href}
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Solicitar caixa
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:text-sm">
          <p>
            © {year} {HOME_COMPANY.commercialName}. Todos os direitos reservados.
          </p>
          <p className="mt-2">
            <Link
              href={ROUTES.confirmacaoAlocacao}
              className="transition-colors hover:text-zinc-300"
            >
              Solicitar caixa coletora
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
