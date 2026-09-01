import { isValidBrazilianPhone } from "@/lib/utils/phone";
import type {
  CustomerFormData,
  CustomerFormErrors,
} from "@/types/alocacao";

export function getCustomerFormErrors(
  data: CustomerFormData,
): CustomerFormErrors {
  const errors: CustomerFormErrors = {};

  if (!data.responsibleName.trim()) {
    errors.responsibleName = "Informe o nome do responsável.";
  }

  if (!isValidBrazilianPhone(data.phone)) {
    errors.phone = "Informe um telefone válido com DDD.";
  }

  if (!data.address.trim()) {
    errors.address = "Informe o endereço.";
  }

  if (!data.number.trim()) {
    errors.number = "Informe o número.";
  }

  if (!data.neighborhood.trim()) {
    errors.neighborhood = "Informe o bairro.";
  }

  if (!data.city.trim()) {
    errors.city = "Informe a cidade.";
  }

  if (!data.paymentMethod) {
    errors.paymentMethod = "Selecione a forma de pagamento.";
  }

  if (!data.acceptedTerms) {
    errors.acceptedTerms = "É necessário aceitar os Termos e Condições.";
  }

  return errors;
}

export function isCustomerFormValid(data: CustomerFormData) {
  return Object.keys(getCustomerFormErrors(data)).length === 0;
}

export function formatFullAddress(data: CustomerFormData) {
  const complement = data.complement.trim();

  return complement
    ? `${data.address.trim()}, ${data.number.trim()} — ${complement}`
    : `${data.address.trim()}, ${data.number.trim()}`;
}

export function formatRequestDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
