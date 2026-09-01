export function addDaysToIsoDate(isoDate: string, days: number) {
  const [year, month, day] = isoDate.split("-").map(Number);

  if (!year || !month || !day) {
    return "";
  }

  const result = new Date(Date.UTC(year, month - 1, day + days));
  const yyyy = result.getUTCFullYear();
  const mm = String(result.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(result.getUTCDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

export function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function formatIsoDatePtBr(isoDate: string) {
  if (!isIsoDate(isoDate)) {
    return isoDate;
  }

  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

/** Manaus não observa horário de verão (UTC-4 o ano inteiro). */
export const COMPANY_TIME_ZONE = "America/Manaus";
const COMPANY_UTC_OFFSET = "-04:00";

export function getCompanyIsoDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: COMPANY_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function getCompanyDayRangeUtc(date = new Date()) {
  const isoDate = getCompanyIsoDate(date);
  const nextIsoDate = addDaysToIsoDate(isoDate, 1);

  return {
    isoDate,
    startUtc: new Date(`${isoDate}T00:00:00.000${COMPANY_UTC_OFFSET}`).toISOString(),
    endExclusiveUtc: new Date(
      `${nextIsoDate}T00:00:00.000${COMPANY_UTC_OFFSET}`,
    ).toISOString(),
  };
}

export function formatCompanyLongDate(date = new Date()) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: COMPANY_TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
