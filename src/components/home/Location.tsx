import { HOME_COMPANY, HOME_MAPS } from "@/constants/home";
import { HomeLinkButton } from "@/components/home/HomeLinkButton";
import { HomeSection } from "@/components/home/HomeSection";
import { SectionHeading } from "@/components/home/SectionHeading";

export function Location() {
  return (
    <HomeSection id="localizacao" tone="subtle">
      <SectionHeading
        title="Onde atendemos em Manaus"
        description="Atendimento em Manaus e região, com base no bairro Tarumã."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="rounded-xl bg-white p-6 sm:p-7">
          <h3 className="text-base font-semibold text-landing-black">
            Atendimento em Manaus e região
          </h3>
          <p className="mt-3 text-sm leading-7 text-landing-muted sm:text-[15px]">
            A {HOME_COMPANY.commercialName} está localizada em{" "}
            <strong className="font-medium text-landing-black">
              {HOME_COMPANY.address.neighborhood}, Manaus – AM
            </strong>
            , e realiza atendimento relacionado à locação de caixas coletoras de
            entulho em Manaus e região.
          </p>

          <h3 className="mt-6 text-base font-semibold text-landing-black">
            Endereço
          </h3>
          <p className="mt-2 text-sm leading-7 text-landing-muted sm:text-[15px]">
            {HOME_COMPANY.address.street}
            <br />
            {HOME_COMPANY.address.neighborhood}
            <br />
            {HOME_COMPANY.address.city} – {HOME_COMPANY.address.state}
          </p>

          <div className="mt-6">
            <HomeLinkButton
              href={HOME_MAPS.searchUrl}
              external
              variant="secondary"
              className="sm:w-auto sm:min-w-[11rem]"
            >
              Ver localização
            </HomeLinkButton>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-white">
          <iframe
            title="Mapa da 3J Caixas Entulhos Manaus no bairro Tarumã"
            src={HOME_MAPS.embedUrl}
            className="h-72 w-full border-0 sm:h-80 lg:h-full lg:min-h-[22rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </HomeSection>
  );
}
