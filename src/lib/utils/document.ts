import { onlyDigits } from "@/lib/utils/phone";

export function maskCnpj(value: string) {
  const digits = onlyDigits(value).slice(0, 14);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 5) {
    return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  }

  if (digits.length <= 8) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  }

  if (digits.length <= 12) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  }

  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

function hasRepeatedDigits(digits: string) {
  return /^(\d)\1+$/.test(digits);
}

export function isValidCnpj(value: string) {
  const digits = onlyDigits(value);

  if (digits.length !== 14 || hasRepeatedDigits(digits)) {
    return false;
  }

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;

  for (let index = 0; index < 12; index += 1) {
    sum += Number(digits[index]) * weights1[index];
  }

  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;

  if (digit1 !== Number(digits[12])) {
    return false;
  }

  sum = 0;

  for (let index = 0; index < 13; index += 1) {
    sum += Number(digits[index]) * weights2[index];
  }

  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;

  return digit2 === Number(digits[13]);
}

export function formatCnpj(value: string) {
  const digits = onlyDigits(value);

  if (digits.length === 0) {
    return "";
  }

  return maskCnpj(digits);
}

export function parseOptionalCnpj(value: string) {
  const digits = onlyDigits(value);
  return digits.length === 0 ? null : digits;
}
