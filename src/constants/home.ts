import { ROUTES } from "@/constants/site";
import { onlyDigits } from "@/lib/utils/phone";

export const HOME_COMPANY = {
  legalName: "Jadaildo da Silva Gomes",
  commercialName: "3J Caixas Entulhos Manaus",
  shortName: "3J Caixas Entulhos",
  cnpj: "64.160.751/0001-58",
  municipalRegistration: "702250001",
  formalized: "Empresa formalizada",
  address: {
    street: "Avenida do Cetur",
    neighborhood: "Tarumã",
    city: "Manaus",
    state: "AM",
    full: "Avenida do Cetur – Tarumã\nManaus – AM",
    line: "Avenida do Cetur – Tarumã, Manaus – AM",
  },
  googleProfile: "3J CAIXAS ENTULHOS MANAUS (verificado)",
  instagram: "@3JCAIXASENTULHOSMANAUS",
  instagramUrl: "https://www.instagram.com/3JCAIXASENTULHOSMANAUS",
  email: "jadaildodasilvagomes@gmail.com",
  phoneDisplay: "(92) 98594-6242",
  phoneDigits: "5592985946242",
  channels: [
    "WhatsApp",
    "Telegram (24h)",
    "Ligação",
    "E-mail",
  ] as const,
  website: "3JCAIXASENTULHOSMANAUS.COM.BR",
} as const;

export const HOME_IMAGES = {
  hero: {
    src: "/images/3j/3j-caixa-coletora-azul-manaus.jpg",
    width: 509,
    height: 281,
    alt: "Caixa coletora azul da 3J Caixas Entulhos Manaus",
  },
  obra: {
    src: "/images/3j/3j-caixa-entulho-obra-manaus.png",
    width: 844,
    height: 474,
    alt: "Caixa coletora de entulho utilizada em obra em Manaus",
  },
  rua: {
    src: "/images/3j/3j-caixa-coletora-entulho-manaus.png",
    width: 844,
    height: 475,
    alt: "Caixa coletora azul da 3J Caixas Entulhos em área urbana de Manaus",
  },
  obrasDupla: {
    src: "/images/3j/3j-caixas-obras-manaus-01.png",
    width: 497,
    height: 285,
    alt: "Caixas coletoras da 3J em obra com areia e materiais em Manaus",
  },
  obraCaminhao: {
    src: "/images/3j/3j-caixas-obras-manaus-02.png",
    width: 844,
    height: 844,
    alt: "Caixa coletora azul da 3J com caminhão de entrega em Manaus",
  },
} as const;

export const HOME_VIDEOS = {
  service: {
    src: "/videos/video-caixas-coletoras.mp4",
    title: "Caixas coletoras da 3J em operação",
  },
} as const;

export const HOME_NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Serviço", href: "#servico" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Localização", href: "#localizacao" },
  { label: "FAQ", href: "#faq" },
] as const;

export const HOME_SERVICE_APPLICATIONS = [
  "Construções",
  "Reformas",
  "Demolições",
  "Limpezas",
  "Retirada de resíduos de obra",
] as const;

export const HOME_TRUST_ITEMS = [
  {
    title: "6 m³",
    description: "Capacidade da caixa",
  },
  {
    title: "3 dias úteis",
    description: "Período de permanência",
  },
  {
    title: "Manaus",
    description: "Área de atendimento",
  },
  {
    title: "Atendimento rápido",
    description: "Via WhatsApp",
  },
] as const;

export const HOME_HERO_TRUST = [
  "Entrega e retirada",
  "Atendimento ágil",
  "Empresa local",
] as const;

export const HOME_STEPS = [
  {
    step: "01",
    title: "Faça sua solicitação",
    description:
      "Preencha seus dados e informe o local onde a caixa será utilizada.",
  },
  {
    step: "02",
    title: "Confirmamos os detalhes",
    description:
      "Nossa equipe analisa a solicitação e entra em contato para confirmar entrega e demais informações.",
  },
  {
    step: "03",
    title: "Receba a caixa coletora",
    description:
      "A caixa é entregue no endereço combinado e permanece pelo período acordado com a equipe.",
  },
] as const;

export const HOME_BENEFITS = [
  {
    title: "Praticidade para sua obra",
    description: "Organize o descarte de resíduos com mais agilidade no canteiro.",
  },
  {
    title: "Entrega e retirada organizadas",
    description: "Fluxo simples para receber e devolver a caixa coletora.",
  },
  {
    title: "Capacidade adequada à obra",
    description: "Volume pensado para diferentes tipos de serviço e descarte.",
  },
  {
    title: "Atendimento em Manaus",
    description: "Empresa local com contato direto pelo WhatsApp.",
  },
] as const;

export const HOME_GALLERY = [
  {
    ...HOME_IMAGES.obra,
    caption: "Caixa coletora em operação em obra",
  },
  {
    ...HOME_IMAGES.rua,
    caption: "Atendimento em área urbana de Manaus",
  },
  {
    ...HOME_IMAGES.obrasDupla,
    caption: "Caixas coletoras em obra residencial",
  },
  {
    ...HOME_IMAGES.obraCaminhao,
    caption: "Entrega e retirada com caminhão da 3J",
  },
] as const;

export const HOME_MAPS = {
  searchUrl:
    "https://www.google.com/maps/search/?api=1&query=Avenida+do+Cetur,+Tarum%C3%A3,+Manaus+-+AM",
  embedUrl:
    "https://maps.google.com/maps?q=Avenida+do+Cetur,+Tarum%C3%A3,+Manaus+-+AM&z=15&output=embed",
} as const;

export const HOME_WHATSAPP_MESSAGES = {
  hero: "Olá, gostaria de solicitar um orçamento de uma caixa coletora",
  floating:
    "Olá, gostaria de solicitar um orçamento de uma caixa coletora",
} as const;

export const HOME_FAQ = [
  {
    question: "Qual o tamanho da caixa coletora da 3J?",
    answer: "A 3J Caixas Entulhos trabalha com caixa coletora de 6 m³.",
  },
  {
    question: "Por quanto tempo a caixa coletora fica na obra?",
    answer:
      "A permanência padrão informada pela empresa é de 3 dias úteis.",
  },
  {
    question: "Para quais tipos de serviço posso solicitar uma caixa coletora?",
    answer:
      "A caixa pode ser utilizada em obras, reformas, demolições e serviços de limpeza que necessitem de espaço adequado para os resíduos.",
  },
  {
    question: "A 3J Caixas Entulhos atende Manaus?",
    answer:
      "Sim. A empresa está localizada em Manaus, no bairro Tarumã, e realiza atendimento em Manaus e região.",
  },
  {
    question: "Como solicitar uma caixa coletora?",
    answer:
      "O cliente pode preencher a solicitação online pela página de confirmação de locação ou entrar em contato pelo WhatsApp.",
  },
  {
    question: "Como faço para saber a disponibilidade?",
    answer:
      "Envie uma solicitação pelo site ou entre em contato pelo WhatsApp para que a equipe analise a necessidade e confirme os detalhes.",
  },
] as const;

export function getHomeWhatsAppNumber() {
  const fromEnv = onlyDigits(process.env.NEXT_PUBLIC_COMPANY_WHATSAPP ?? "");

  if (fromEnv.length >= 10) {
    return fromEnv.startsWith("55") ? fromEnv : `55${fromEnv}`;
  }

  return HOME_COMPANY.phoneDigits;
}

export function getHomeWhatsAppUrl(message: string) {
  const phone = getHomeWhatsAppNumber();
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const HOME_CTA = {
  label: "Solicitar caixa coletora",
  shortLabel: "Solicitar caixa",
  href: ROUTES.confirmacaoAlocacao,
  nowLabel: "Solicitar agora",
} as const;

export const HOME_METADATA = {
  title: "3J Caixas Entulhos Manaus | Caixa Coletora de Entulho 6 m³",
  description:
    "Caixa coletora de entulho de 6 m³ em Manaus para obras, reformas e limpezas. Solicite a locação da sua caixa coletora com a 3J Caixas Entulhos Manaus.",
  keywords: [
    "caixa coletora Manaus",
    "caixa coletora de entulhos Manaus",
    "caixa de entulho Manaus",
    "locação de caixa coletora Manaus",
    "caixa coletora 6m³ Manaus",
    "caixa para obra Manaus",
    "entulho Manaus",
    "3J Caixas Entulhos Manaus",
  ],
} as const;
