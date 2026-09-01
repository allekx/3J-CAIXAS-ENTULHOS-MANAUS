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

export function getWhatsAppConversationUrl(protocol: string) {
  const phone = onlyDigits(COMPANY.whatsapp);
  const message = `Olá, acabei de realizar uma solicitação de alocação de caixa coletora. Meu protocolo é ${protocol}.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}