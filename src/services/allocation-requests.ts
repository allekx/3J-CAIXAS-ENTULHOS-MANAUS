import "server-only";

import { parseCreateAllocationRequest } from "@/lib/alocacao/create-allocation-request.schema";
import { COLLECTOR_BOX_DEFAULTS } from "@/constants/alocacao";
import { ALLOCATION_TERMS } from "@/constants/termos-locacao";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { withAdminQueryRetry } from "@/lib/supabase/admin-query-retry";
import type { AllocationRequestInsert } from "@/types/allocation-request";

export function toAllocationRequestInsert(
  input: unknown,
): AllocationRequestInsert {
  const data = parseCreateAllocationRequest(input);

  return {
    customer_name: data.customer_name,
    customer_phone: data.customer_phone,
    customer_document: data.customer_document,
    street: data.street,
    address_number: data.address_number,
    complement: data.complement,
    neighborhood: data.neighborhood,
    condominium: data.condominium,
    city: data.city,
    payment_method: data.payment_method,
    box_type: COLLECTOR_BOX_DEFAULTS.boxType,
    box_size: COLLECTOR_BOX_DEFAULTS.boxSize,
    quantity: COLLECTOR_BOX_DEFAULTS.quantity,
    rental_days: COLLECTOR_BOX_DEFAULTS.rentalDays,
    terms_accepted_at: new Date().toISOString(),
    terms_version: ALLOCATION_TERMS.version,
  };
}

function isMissingTermsColumnError(error: {
  code?: string;
  message?: string;
} | null) {
  if (!error) return false;
  const message = (error.message ?? "").toLowerCase();
  return (
    error.code === "42703" ||
    error.code === "PGRST204" ||
    message.includes("terms_accepted_at") ||
    message.includes("terms_version")
  );
}

export async function createAllocationRequest(input: unknown) {
  const row = toAllocationRequestInsert(input);
  const supabase = createSupabaseAdminClient();

  let result = await withAdminQueryRetry(
    () =>
      supabase
        .from("allocation_requests")
        .insert(row)
        .select("protocol, created_at, status")
        .single(),
    "createAllocationRequest",
  );

  if (isMissingTermsColumnError(result.error)) {
    console.warn(
      "[allocation-requests] Colunas de termos ausentes. Execute supabase/migrations/006_terms_accepted.sql. Inserindo sem gravar o aceite.",
    );

    const { terms_accepted_at: _a, terms_version: _v, ...legacyRow } = row;

    result = await withAdminQueryRetry(
      () =>
        supabase
          .from("allocation_requests")
          .insert(legacyRow)
          .select("protocol, created_at, status")
          .single(),
      "createAllocationRequest:legacy",
    );
  }

  const { data, error } = result;

  if (error || !data) {
    console.error("[allocation-requests] Falha ao inserir solicitação.", {
      message: error?.message,
      code: error?.code,
      details: error?.details,
      hint: error?.hint,
    });
    throw new Error("ALLOCATION_INSERT_FAILED");
  }

  return data;
}
