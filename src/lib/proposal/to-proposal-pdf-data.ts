import { COMPANY, getCompanyContactLines } from "@/constants/company";
import { formatIsoDatePtBr } from "@/lib/alocacao/dates";
import { calculateProposalTotal, formatMoneyBrl } from "@/lib/money";
import { maskBrazilianPhone } from "@/lib/utils/phone";
import type { AllocationRequestRow } from "@/types/allocation-request";

const EMPTY = "—";

export type ProposalPdfData = {
  protocol: string;
  proposalDate: string;
  companyName: string;
  companyCity: string;
  companyContacts: string[];
  logoSrc: string | null;
  customer: {
    name: string;
    phone: string;
    address: string;
    condominium: string;
    neighborhood: string;
    city: string;
  };
  service: {
    boxType: string;
    boxSize: string;
    quantity: string;
    period: string;
    delivery: string;
    pickup: string;
  };
  values: {
    service: string;
    additional: string;
    discount: string;
    total: string;
  };
  paymentMethod: string;
  notes: string | null;
};

function displayText(value: string | number | null | undefined) {
  if (value === null || value === undefined) {
    return EMPTY;
  }

  const text = String(value).trim();
  return text.length === 0 ? EMPTY : text;
}

function formatAddress(request: AllocationRequestRow) {
  const complement = request.complement?.trim();
  const base = `${request.street.trim()}, ${request.address_number.trim()}`;
  return complement ? `${base} — ${complement}` : base;
}

function formatPeriod(days: number | null) {
  if (!days) {
    return EMPTY;
  }

  return days === 1 ? "1 dia" : `${days} dias`;
}

function formatProposalDate(date = new Date()) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "America/Manaus",
  }).format(date);
}

export function toProposalPdfData(
  request: AllocationRequestRow,
  options: { logoSrc?: string | null; proposalDate?: Date } = {},
): ProposalPdfData {
  const notes = request.proposal_notes?.trim() || null;

  return {
    protocol: request.protocol,
    proposalDate: formatProposalDate(options.proposalDate),
    companyName: COMPANY.name,
    companyCity: COMPANY.city,
    companyContacts: getCompanyContactLines(),
    logoSrc: options.logoSrc ?? null,
    customer: {
      name: displayText(request.customer_name),
      phone: displayText(maskBrazilianPhone(request.customer_phone)),
      address: displayText(formatAddress(request)),
      condominium: displayText(request.condominium),
      neighborhood: displayText(request.neighborhood),
      city: displayText(request.city),
    },
    service: {
      boxType: displayText(request.box_type),
      boxSize: displayText(request.box_size),
      quantity: displayText(request.quantity),
      period: formatPeriod(request.rental_days),
      delivery: request.delivery_date
        ? formatIsoDatePtBr(request.delivery_date)
        : EMPTY,
      pickup: request.pickup_date
        ? formatIsoDatePtBr(request.pickup_date)
        : EMPTY,
    },
    values: {
      service: formatMoneyBrl(request.service_value),
      additional: formatMoneyBrl(request.additional_value),
      discount: formatMoneyBrl(request.discount_value),
      total: formatMoneyBrl(
        calculateProposalTotal(
          request.service_value,
          request.additional_value,
          request.discount_value,
        ),
      ),
    },
    paymentMethod: displayText(request.payment_method),
    notes,
  };
}
