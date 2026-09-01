/** Precisão alinhada a numeric(12,2). */
export const MONEY_MAX = 9_999_999_999.99;

export function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function parseMoneyInput(value: unknown): number {
  if (value === null || value === undefined) {
    return 0;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? roundMoney(value) : Number.NaN;
  }

  const raw = String(value).trim();

  if (raw.length === 0) {
    return 0;
  }

  const cleaned = raw.replace(/R\$/gi, "").replace(/\s/g, "");

  if (cleaned.length === 0) {
    return 0;
  }

  const normalized = cleaned.includes(",")
    ? cleaned.replace(/\./g, "").replace(",", ".")
    : cleaned.replace(/[^\d.-]/g, "");

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? roundMoney(parsed) : Number.NaN;
}

export function isValidMoney(value: number) {
  return Number.isFinite(value) && value >= 0 && value <= MONEY_MAX;
}

export function formatMoneyBrl(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(roundMoney(value));
}

export function formatMoneyInput(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundMoney(value));
}

export function calculateProposalTotal(
  serviceValue: number,
  additionalValue: number,
  discountValue: number,
) {
  return roundMoney(serviceValue + additionalValue - discountValue);
}
