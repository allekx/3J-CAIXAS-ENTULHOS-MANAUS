import {
  HOME_COMPANY,
  HOME_FAQ,
  HOME_IMAGES,
  HOME_METADATA,
} from "@/constants/home";
import { ROUTES } from "@/constants/site";
import { getSiteUrl } from "@/lib/seo/site-url";

const LOCAL_BUSINESS_ID = "#local-business";

export function buildHomeStructuredData() {
  const siteUrl = getSiteUrl();
  const businessId = `${siteUrl}${LOCAL_BUSINESS_ID}`;

  const localBusiness = {
    "@type": "LocalBusiness",
    "@id": businessId,
    name: HOME_COMPANY.commercialName,
    legalName: HOME_COMPANY.legalName,
    description: HOME_METADATA.description,
    image: `${siteUrl}${HOME_IMAGES.hero.src}`,
    logo: `${siteUrl}/logos/logo-3j-oficial.jpg`,
    telephone: "+55 92 98594-6242",
    email: HOME_COMPANY.email,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: HOME_COMPANY.address.street,
      addressLocality: HOME_COMPANY.address.city,
      addressRegion: HOME_COMPANY.address.state,
      postalCode: HOME_COMPANY.address.zip,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -3.0225982,
      longitude: -60.0712107,
    },
    hasMap: "https://maps.app.goo.gl/K4KQGPyK1nJ5nfpp8",
    areaServed: {
      "@type": "City",
      name: "Manaus",
      containedInPlace: {
        "@type": "State",
        name: "Amazonas",
      },
    },
    sameAs: [HOME_COMPANY.instagramUrl, "https://maps.app.goo.gl/K4KQGPyK1nJ5nfpp8"],
  };

  const organization = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: HOME_COMPANY.commercialName,
    url: siteUrl,
    logo: `${siteUrl}/logos/logo-3j-oficial.jpg`,
    email: HOME_COMPANY.email,
    telephone: "+55 92 98594-6242",
    sameAs: [HOME_COMPANY.instagramUrl],
  };

  const service = {
    "@type": "Service",
    "@id": `${siteUrl}/#service`,
    name: "Locação de caixa coletora de entulho",
    serviceType: "Locação de caixa coletora de entulho",
    description:
      "Serviço de locação de caixa coletora de 6 m³ para obras, reformas e limpezas em Manaus – AM.",
    provider: { "@id": businessId },
    areaServed: {
      "@type": "City",
      name: "Manaus",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}${ROUTES.confirmacaoAlocacao}`,
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: HOME_COMPANY.commercialName,
    url: siteUrl,
    inLanguage: "pt-BR",
    publisher: { "@id": `${siteUrl}/#organization` },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: HOME_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, localBusiness, service, website, faqPage],
  };
}
