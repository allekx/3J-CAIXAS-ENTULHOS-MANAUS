import { SITE } from "@/constants/site";
import { ALLOCATION_STATUS_LABELS } from "@/constants/allocation-status";
import { formatIsoDatePtBr } from "@/lib/alocacao/dates";
import {
  isValidBrazilianPhone,
  maskBrazilianPhone,
  toWhatsAppNumber,
} from "@/lib/utils/phone";
import type { AllocationRequestStatus } from "@/types/allocation-request";

/**
 * Dados operacionais para encaminhar o atendimento.
 * Nunca incluir admin_notes, IDs internos, tokens ou autenticação.
 */
export type ForwardRequestMessageInput = {
  protocol: string;
  customer_name: string;
  customer_phone: string;
  street: string;
  address_number: string;
  complement: string | null;
  neighborhood: string;
  condominium: string | null;
  city: string;
  box_type: string | null;
  box_size: string | null;
  quantity: string | number | null;
  rental_days: string | number | null;
  delivery_date: string | null;
  pickup_date: string | null;
  payment_method: string;
  status: AllocationRequestStatus;
};

function display(value: string | number | null | undefined) {
  if (value === null || value === undefined) {
    return "—";
  }

  const text = String(value).trim();
  return text.length === 0 ? "—" : text;
}

function displayPeriod(value: string | number | null | undefined) {
  if (value === null || value === undefined) {
    return "—";
  }

  const raw = String(value).trim();

  if (raw.length === 0) {
    return "—";
  }

  const days = Number(raw);

  if (!Number.isInteger(days) || days <= 0) {
    return display(raw);
  }

  return days === 1 ? "1 dia" : `${days} dias`;
}

function displayDate(value: string | null | undefined) {
  const raw = (value ?? "").trim();

  if (raw.length === 0) {
    return "—";
  }

  return formatIsoDatePtBr(raw);
}

export function buildForwardRequestMessage(input: ForwardRequestMessageInput) {
  const lines = [
    `Nova solicitação - ${SITE.name}`,
    "",
    `Protocolo: ${display(input.protocol)}`,
    "",
    "CLIENTE",
    `Nome: ${display(input.customer_name)}`,
    `Telefone: ${display(maskBrazilianPhone(input.customer_phone))}`,
    "",
    "LOCAL",
    `Endereço: ${display(input.street)}, ${display(input.address_number)}`,
    `Complemento: ${display(input.complement)}`,
    `Bairro: ${display(input.neighborhood)}`,
    `Condomínio: ${display(input.condominium)}`,
    `Cidade: ${display(input.city)}`,
    "",
    "CAIXA COLETORA",
    `Tipo: ${display(input.box_type)}`,
    `Tamanho: ${display(input.box_size)}`,
    `Quantidade: ${display(input.quantity)}`,
    `Período: ${displayPeriod(input.rental_days)}`,
    `Entrega: ${displayDate(input.delivery_date)}`,
    `Retirada: ${displayDate(input.pickup_date)}`,
    "",
    "Forma de pagamento:",
    display(input.payment_method),
    "",
    "Status:",
    display(ALLOCATION_STATUS_LABELS[input.status] ?? input.status),
  ];

  return lines.join("\n");
}

export function getForwardWhatsAppUrl(phone: string, message: string) {
  return `https://wa.me/${toWhatsAppNumber(phone)}?text=${encodeURIComponent(message)}`;
}

export function canOpenForwardWhatsApp(phone: string) {
  return isValidBrazilianPhone(phone);
}
