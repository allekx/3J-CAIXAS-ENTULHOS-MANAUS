import { z } from "zod";
import { PAYMENT_METHODS } from "@/types/alocacao";
import {
  ALLOCATION_FIELD_LIMITS,
  ALLOCATION_STATUSES,
} from "@/types/allocation-request";
import { isIsoDate } from "@/lib/alocacao/dates";
import {
  calculateProposalTotal,
  isValidMoney,
  parseMoneyInput,
  roundMoney,
} from "@/lib/money";
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

function optionalPositiveInt(message: string) {
  return z
    .union([z.string(), z.number(), z.null(), z.undefined()])
    .transform((value) => {
      if (value === null || value === undefined) {
        return null;
      }

      const raw = String(value).trim();

      if (raw.length === 0) {
        return null;
      }

      const parsed = Number(raw);
      return Number.isInteger(parsed) ? parsed : Number.NaN;
    })
    .refine((value) => value === null || (Number.isInteger(value) && value > 0), {
      message,
    });
}

function moneyField(message: string) {
  return z
    .union([z.string(), z.number(), z.null(), z.undefined()])
    .transform(parseMoneyInput)
    .refine(isValidMoney, { message });
}

function optionalIsoDate(message: string) {
  return z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value) => {
      const raw = (value ?? "").toString().trim();
      return raw.length === 0 ? null : raw;
    })
    .refine((value) => value === null || isIsoDate(value), {
      message,
    });
}

export const updateAllocationRequestSchema = z
  .object({
    status: z.enum(ALLOCATION_STATUSES),
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
    box_type: sanitizeOptionalText(ALLOCATION_FIELD_LIMITS.boxType),
    box_size: sanitizeOptionalText(ALLOCATION_FIELD_LIMITS.boxSize),
    quantity: optionalPositiveInt("Informe uma quantidade inteira maior que zero."),
    rental_days: optionalPositiveInt(
      "Informe o período em dias, com um número inteiro maior que zero.",
    ),
    delivery_date: optionalIsoDate("Informe uma data de entrega válida."),
    pickup_date: optionalIsoDate("Informe uma data de retirada válida."),
    admin_notes: sanitizeOptionalText(ALLOCATION_FIELD_LIMITS.adminNotes),
    assigned_to: sanitizeOptionalText(ALLOCATION_FIELD_LIMITS.assignedTo),
    service_value: moneyField("Informe um valor de serviço válido."),
    additional_value: moneyField("Informe um valor adicional válido."),
    discount_value: moneyField("Informe um desconto válido."),
    proposal_notes: sanitizeOptionalText(ALLOCATION_FIELD_LIMITS.proposalNotes),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.delivery_date && data.pickup_date && data.pickup_date < data.delivery_date) {
      ctx.addIssue({
        code: "custom",
        path: ["pickup_date"],
        message: "A data de retirada não pode ser anterior à entrega.",
      });
    }

    if (
      roundMoney(data.discount_value) >
      roundMoney(data.service_value + data.additional_value)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["discount_value"],
        message: "O desconto não pode ser maior que a soma dos valores.",
      });
    }
  });

export type UpdateAllocationRequestPayload = z.infer<
  typeof updateAllocationRequestSchema
>;

export function toUpdateAllocationRequestRow(
  data: UpdateAllocationRequestPayload,
) {
  return {
    ...data,
    total_value: calculateProposalTotal(
      data.service_value,
      data.additional_value,
      data.discount_value,
    ),
  };
}

export function parseUpdateAllocationRequest(input: unknown) {
  return updateAllocationRequestSchema.parse(input);
}

export function flattenUpdateFieldErrors(error: z.ZodError) {
  const fieldErrors: Partial<Record<keyof UpdateAllocationRequestPayload, string>> =
    {};

  for (const issue of error.issues) {
    const key = issue.path[0];

    if (typeof key === "string" && !(key in fieldErrors)) {
      fieldErrors[key as keyof UpdateAllocationRequestPayload] = issue.message;
    }
  }

  return fieldErrors;
}
