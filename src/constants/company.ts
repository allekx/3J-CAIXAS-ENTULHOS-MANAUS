import { SITE } from "@/constants/site";
import { maskBrazilianPhone, onlyDigits } from "@/lib/utils/phone";

function readPublicEnv(name: string) {
  return (process.env[name] ?? "").trim();
}

export const COMPANY = {
  name: SITE.name,
  city: "Manaus - AM",
  phone: readPublicEnv("NEXT_PUBLIC_COMPANY_PHONE"),
  email: readPublicEnv("NEXT_PUBLIC_COMPANY_EMAIL"),
  whatsapp: readPublicEnv("NEXT_PUBLIC_COMPANY_WHATSAPP"),
} as const;

export function formatCompanyPhone(raw: string) {
  const digits = onlyDigits(raw);

  if (digits.length === 0) {
    return "";
  }

  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) {
    return maskBrazilianPhone(digits.slice(2));
  }

  return maskBrazilianPhone(digits) || raw;
}

export function getCompanyContactLines() {
  const lines: string[] = [];

  const phone = formatCompanyPhone(COMPANY.phone);
  const whatsapp = formatCompanyPhone(COMPANY.whatsapp);

  if (phone) {
    lines.push(`Telefone: ${phone}`);
  }

  if (whatsapp && whatsapp !== phone) {
    lines.push(`WhatsApp: ${whatsapp}`);
  } else if (!phone && whatsapp) {
    lines.push(`WhatsApp: ${whatsapp}`);
  }

  if (COMPANY.email) {
    lines.push(`E-mail: ${COMPANY.email}`);
  }

  return lines;
}
