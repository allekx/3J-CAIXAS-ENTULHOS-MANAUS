import { z } from "zod";
import { ALLOCATION_FIELD_LIMITS } from "@/types/allocation-request";
import { PAYMENT_METHODS } from "@/types/alocacao";
import { isValidBrazilianPhone, onlyDigits } from "@/lib/utils/phone";

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
