import "server-only";

import { parseCreateAllocationRequest } from "@/lib/alocacao/create-allocation-request.schema";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { AllocationRequestInsert } from "@/types/allocation-request";

export function toAllocationRequestInsert(
  input: unknown,
): AllocationRequestInsert {
  const data = parseCreateAllocationRequest(input);

  return {
    customer_name: data.customer_name,
    customer_phone: data.customer_phone,
    street: data.street,
    address_number: data.address_number,
    complement: data.complement,
    neighborhood: data.neighborhood,
    condominium: data.condominium,
    city: data.city,
    payment_method: data.payment_method,
  };
}

export async function createAllocationRequest(input: unknown) {
  const row = toAllocationRequestInsert(input);
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("allocation_requests")
    .insert(row)
    .select("protocol, created_at, status")
    .single();

  if (error || !data) {
    console.error("[allocation-requests] Falha ao inserir solicitação.", error);
    throw new Error("ALLOCATION_INSERT_FAILED");
  }

  return data;
}
