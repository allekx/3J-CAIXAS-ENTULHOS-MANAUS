import { HOME_COMPANY } from "@/constants/home";
import { ROUTES } from "@/constants/site";

/** Site institucional da 3J — SimDif */
export const BIO_WEBSITE_DEFAULT_URL = "https://3jcaixasentulhomanaus.simdif.com/";

export const BIO_WEBSITE_URL =
  process.env.NEXT_PUBLIC_BIO_WEBSITE_URL?.trim() || BIO_WEBSITE_DEFAULT_URL;

/** Instagram oficial da 3J */
export const BIO_INSTAGRAM_DEFAULT_URL =
  "https://www.instagram.com/3_j_caixas_entulhos_manaus";

export const BIO_INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_BIO_INSTAGRAM_URL?.trim() ||
  BIO_INSTAGRAM_DEFAULT_URL;

/** Canal oficial no YouTube — 3J Caixas Entulhos Manaus */
export const YOUTUBE_DEFAULT_URL =
  "https://www.youtube.com/@jadaildodasilvagomes1401";

export const YOUTUBE_URL =
  process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() || YOUTUBE_DEFAULT_URL;

/** Perfil oficial no Google Maps (https://maps.app.goo.gl/K4KQGPyK1nJ5nfpp8) */
export const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/3J+CAIXAS+ENTULHOS+MANAUS/@-3.0225982,-60.0712107,17z/data=!3m1!4b1!4m6!3m5!1s0x926c17bd023fd083:0xff913899cbffe1f2!8m2!3d-3.0225982!4d-60.0712107!16s%2Fg%2F11zgw0y3f2";

/**
 * Iframe embed do perfil oficial (place ID do Google Maps).
 * Referência: 0x926c17bd023fd083:0xff913899cbffe1f2
 */
export const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.1105522692654!2d-60.0686356875!3d-3.0225982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x926c17bd023fd083%3A0xff913899cbffe1f2!2s3J%20CAIXAS%20ENTULHOS%20MANAUS!5e0!3m2!1spt-BR!2sbr!4v1735689600000!5m2!1spt-BR!2sbr";

export const BIO_WHATSAPP_URL =
  "https://wa.me/5592985946242?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20uma%20caixa%20coletora";

export const BIO_LINKS = {
  allocation: ROUTES.confirmacaoAlocacao,
  whatsapp: BIO_WHATSAPP_URL,
  googleMaps: GOOGLE_MAPS_PLACE_URL,
  website: BIO_WEBSITE_URL,
  instagram: BIO_INSTAGRAM_URL,
  youtube: YOUTUBE_URL,
} as const;

export const BIO_PROFILE = {
  name: HOME_COMPANY.commercialName.toUpperCase(),
  logoSrc: "/logos/logo-3j-oficial.jpg",
  logoAlt: "Logo oficial da 3J Caixas Entulhos Manaus",
} as const;

export const BIO_LOCATION = {
  title: "ONDE ESTAMOS",
  city: "Manaus – AM",
  addressLine: "Estrada do Tarumã – Tarumã, Manaus – AM",
  street: "Estrada do Tarumã",
  neighborhood: "Tarumã",
  cityState: `${HOME_COMPANY.address.city} – ${HOME_COMPANY.address.state}`,
  mapsEmbedUrl: GOOGLE_MAPS_EMBED_URL,
  mapsOpenUrl: GOOGLE_MAPS_PLACE_URL,
  mapTitle: "Mapa da 3J Caixas Entulhos Manaus no bairro Tarumã",
} as const;

export const BIO_METADATA = {
  title: "3J Caixas Entulhos Manaus | Links",
  description:
    "Solicite sua caixa coletora de entulho em Manaus. Atendimento, localização e contatos da 3J Caixas Entulhos.",
} as const;

export const BIO_FOOTER = {
  name: HOME_COMPANY.commercialName.toUpperCase(),
  tagline: "Caixas coletoras de entulho em Manaus – AM",
  phone: HOME_COMPANY.phoneDisplay,
  email: HOME_COMPANY.email,
  instagram: "@3_j_caixas_entulhos_manaus",
  instagramUrl: BIO_INSTAGRAM_URL,
  copyright: "© 2026 3J Caixas Entulhos Manaus",
} as const;
