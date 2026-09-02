import type { ReactNode } from "react";
import { HOME_COMPANY } from "@/constants/home";
import { HomeSection } from "@/components/home/HomeSection";
import { SectionHeading } from "@/components/home/SectionHeading";

function InfoRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1 border-b border-landing-border py-4 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:gap-6">
      <dt className="text-xs font-medium tracking-[0.12em] text-landing-muted uppercase">
        {label}
      </dt>
      <dd className="text-sm leading-7 text-landing-black sm:text-[15px]">
        {children}
      </dd>
    </div>
  );
}

export function About() {
  return (
    <HomeSection id="sobre">
      <SectionHeading
        title="Sobre a 3J Caixas Entulhos Manaus"
        description="Empresa localizada no bairro Tarumã, em Manaus – AM, com foco em alocação de caixa coletora de entulho para obras, reformas e limpezas."
      />

      <div className="mt-10 max-w-3xl rounded-xl bg-landing-subtle p-5 sm:p-7">
        <dl>
          <InfoRow label="Razão social">{HOME_COMPANY.legalName}</InfoRow>
          <InfoRow label="Nome comercial">{HOME_COMPANY.commercialName}</InfoRow>
          <InfoRow label="Inscrição Municipal">
            {HOME_COMPANY.municipalRegistration}
          </InfoRow>
          <InfoRow label="Localização">
            {HOME_COMPANY.address.street} – {HOME_COMPANY.address.neighborhood}
            <br />
            {HOME_COMPANY.address.city} – {HOME_COMPANY.address.state}
          </InfoRow>
          <InfoRow label="Instagram">
            <a
              href={HOME_COMPANY.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              {HOME_COMPANY.instagram}
            </a>
          </InfoRow>
          <InfoRow label="E-mail">
            <a
              href={`mailto:${HOME_COMPANY.email}`}
              className="underline-offset-4 hover:underline"
            >
              {HOME_COMPANY.email}
            </a>
          </InfoRow>
          <InfoRow label="WhatsApp">{HOME_COMPANY.phoneDisplay}</InfoRow>
        </dl>
        <p className="mt-5 text-sm leading-7 text-landing-muted">
          Também existe Perfil Oficial da empresa no Google.
        </p>
      </div>
    </HomeSection>
  );
}
