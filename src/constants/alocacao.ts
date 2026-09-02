import type { CustomerFormData } from "@/types/alocacao";
import { COMPANY } from "@/constants/company";
import { onlyDigits } from "@/lib/utils/phone";

export const INITIAL_CUSTOMER_FORM: CustomerFormData = {
  responsibleName: "",
  phone: "",
  address: "",
  number: "",
  complement: "",
  neighborhood: "",
  condominium: "",
  city: "",
  paymentMethod: "",
  acceptedTerms: false,
};

export const PRIVACY_HREF = "#politica-de-privacidade";

export const COLLECTOR_BOX_DEFAULTS = {
  boxType: "Caixa coletora de entulho",
  boxSize: "6 m³",
  quantity: 1,
  rentalDays: 3,
} as const;

export const COLLECTOR_BOX_INFO = {
  size: `${COLLECTOR_BOX_DEFAULTS.boxSize} (6 metros cúbicos)`,
  stayPeriod: "3 dias úteis na obra",
  earlyPickup:
    "Se você solicitar a retirada antes desse prazo, a caixa é retirada no máximo no dia seguinte.",
  extraDaysNote:
    "Caso seja necessário ultrapassar os 3 dias úteis, haverá acréscimo no valor.",
} as const;

export const WHATSAPP_LOCATION_INFO = {
  stepTitle: "Localização via WhatsApp",
  stepMessage:
    "Ao concluir esta solicitação, na última etapa você encontrará o botão para falar conosco pelo WhatsApp. Envie a localização da obra para confirmarmos o endereço da entrega.",
  successMessage:
    "Toque no botão abaixo, fale conosco pelo WhatsApp e envie a localização da obra para confirmarmos o ponto de entrega da caixa.",
} as const;

export function getWhatsAppConversationUrl(protocol: string) {
  const phone = onlyDigits(COMPANY.whatsapp);
  const message = `Olá, acabei de realizar uma solicitação de alocação de caixa coletora. Meu protocolo é ${protocol}. Segue a localização da obra:`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}