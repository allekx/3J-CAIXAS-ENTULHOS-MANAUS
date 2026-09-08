import {
  HOME_COMPANY,
  HOME_FAQ,
  HOME_IMAGES,
  HOME_METADATA,
} from "@/constants/home";
import { ROUTES } from "@/constants/site";
import { getSiteUrl } from "@/lib/seo/site-url";

const LOCAL_BUSINESS_ID = "#local-business";
const ORGANIZATION_ID = "#organization";
const WEBSITE_ID = "#website";

export function buildHomeStructuredData() {
  const siteUrl = getSiteUrl();
  const businessId = `${siteUrl}/${LOCAL_BUSINESS_ID}`;
  const organizationId = `${siteUrl}/${ORGANIZATION_ID}`;
  const websiteId = `${siteUrl}/${WEBSITE_ID}`;
  const logoUrl = `${siteUrl}/logos/logo-3j-oficial.jpg`;
  const ogImageUrl = `${siteUrl}${HOME_IMAGES.og.src}`;

  const logo = {
    "@type": "ImageObject",
    url: logoUrl,
    contentUrl: logoUrl,
    width: 1024,
    height: 1024,
    caption: HOME_COMPANY.commercialName,
  };

  const primaryImage = {
    "@type": "ImageObject",
    url: ogImageUrl,
    contentUrl: ogImageUrl,
    width: HOME_IMAGES.og.width,
    height: HOME_IMAGES.og.height,
    caption: HOME_IMAGES.og.alt,
  };

  const organization = {
    "@type": "Organization",
    "@id": organizationId,
    name: HOME_COMPANY.commercialName,
    legalName: HOME_COMPANY.legalName,
    alternateName: [HOME_COMPANY.shortName, "3J"],
    url: siteUrl,
    logo,
    image: primaryImage,
    email: HOME_COMPANY.email,
    telephone: "+55 92 98594-6242",
    sameAs: [HOME_COMPANY.instagramUrl, "https://maps.app.goo.gl/K4KQGPyK1nJ5nfpp8"],
  };

  const localBusiness = {
    "@type": "LocalBusiness",
    "@id": businessId,
    name: HOME_COMPANY.commercialName,
    legalName: HOME_COMPANY.legalName,
    description: HOME_METADATA.description,
    image: [ogImageUrl, logoUrl],
    logo,
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
    parentOrganization: { "@id": organizationId },
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
    "@id": websiteId,
    name: HOME_COMPANY.commercialName,
    alternateName: [HOME_COMPANY.shortName, "3J"],
    url: siteUrl,
    inLanguage: "pt-BR",
    description: HOME_METADATA.description,
    publisher: { "@id": organizationId },
    image: primaryImage,
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    url: siteUrl,
    name: HOME_METADATA.title,
    description: HOME_METADATA.description,
    isPartOf: { "@id": websiteId },
    about: { "@id": businessId },
    primaryImageOfPage: primaryImage,
    inLanguage: "pt-BR",
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
    "@graph": [
      organization,
      localBusiness,
      service,
      website,
      webPage,
      faqPage,
    ],
  };
}
