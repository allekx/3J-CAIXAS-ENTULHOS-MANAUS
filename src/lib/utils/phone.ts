export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function maskBrazilianPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length === 0) {
    return "";
  }

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function toWhatsAppNumber(phone: string) {
  const digits = onlyDigits(phone);

  if (digits.startsWith("55") && digits.length >= 12) {
    return digits;
  }

  return `55${digits}`;
}

export function isValidBrazilianPhone(value: string) {
  const digits = onlyDigits(value);

  if (digits.length !== 10 && digits.length !== 11) {
    return false;
  }

  const ddd = Number(digits.slice(0, 2));

  if (ddd < 11 || ddd > 99) {
    return false;
  }

  if (digits.length === 11 && digits[2] !== "9") {
    return false;
  }

  return true;
}
