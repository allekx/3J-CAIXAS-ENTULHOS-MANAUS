import { z } from "zod";
import { ALLOCATION_FIELD_LIMITS } from "@/types/allocation-request";
import { PAYMENT_METHODS } from "@/types/alocacao";
import { isValidBrazilianPhone, onlyDigits } from "@/lib/utils/phone";
import { isValidCnpj } from "@/lib/utils/document";

function sanitizeRequiredText(max: number) {
  return z
    .string()
    .transform((value) => value.replace(/\s+/g, " ").trim())
    .pipe(z.string().min(1).max(max));
}

function sanitizeOptionalText(max: number) {
  return z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value) => (value ?? "").replace(/\s+/g, " ").trim())
    .pipe(z.string().max(max))
    .transform((value) => (value.length === 0 ? null : value));
}

function optionalCnpjField() {
  return z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value) => onlyDigits(String(value ?? "")))
    .transform((value) => (value.length === 0 ? null : value))
    .refine((value) => value === null || isValidCnpj(value), {
      message: "Informe um CNPJ válido.",
    });
}

export const createAllocationRequestSchema = z
  .object({
    customer_name: sanitizeRequiredText(ALLOCATION_FIELD_LIMITS.customerName),
    customer_phone: z
      .string()
      .max(ALLOCATION_FIELD_LIMITS.customerPhone)
      .refine(isValidBrazilianPhone, {
        message: "Informe um telefone válido com DDD.",
      })
      .transform(onlyDigits),
    customer_document: optionalCnpjField(),
    street: sanitizeRequiredText(ALLOCATION_FIELD_LIMITS.street),
    address_number: sanitizeRequiredText(ALLOCATION_FIELD_LIMITS.addressNumber),
    complement: sanitizeOptionalText(ALLOCATION_FIELD_LIMITS.complement),
    neighborhood: sanitizeRequiredText(ALLOCATION_FIELD_LIMITS.neighborhood),
    condominium: sanitizeOptionalText(ALLOCATION_FIELD_LIMITS.condominium),
    city: sanitizeRequiredText(ALLOCATION_FIELD_LIMITS.city),
    payment_method: z.enum(PAYMENT_METHODS),
  })
  .strict();

export type CreateAllocationRequestPayload = z.infer<
  typeof createAllocationRequestSchema
>;

export function parseCreateAllocationRequest(input: unknown) {
  return createAllocationRequestSchema.parse(input);
}
