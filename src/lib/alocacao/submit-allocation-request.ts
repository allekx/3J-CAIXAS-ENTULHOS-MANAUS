import type { CustomerFormData } from "@/types/alocacao";
import type {
  CreateAllocationRequestSuccess,
  PublicAllocationRequestPayload,
} from "@/types/allocation-request";

export const ALLOCATION_SUBMIT_ERROR =
  "Não foi possível enviar sua solicitação. Tente novamente.";

export function toPublicAllocationPayload(
  data: CustomerFormData,
): PublicAllocationRequestPayload | null {
  if (!data.paymentMethod) {
    return null;
  }

  return {
    customer_name: data.responsibleName,
    customer_phone: data.phone,
    customer_document: data.document,
    street: data.address,
    address_number: data.number,
    complement: data.complement,
    neighborhood: data.neighborhood,
    condominium: data.condominium,
    city: data.city,
    payment_method: data.paymentMethod,
  };
}

function isCreateSuccess(
  value: unknown,
): value is CreateAllocationRequestSuccess {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    record.success === true &&
    typeof record.protocol === "string" &&
    record.protocol.length > 0 &&
    typeof record.createdAt === "string" &&
    typeof record.status === "string"
  );
}

export async function submitAllocationRequest(
  payload: PublicAllocationRequestPayload,
): Promise<CreateAllocationRequestSuccess> {
  const response = await fetch("/api/allocation-requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let body: unknown;

  try {
    body = await response.json();
  } catch {
    throw new Error("ALLOCATION_SUBMIT_FAILED");
  }

  if (!response.ok || !isCreateSuccess(body)) {
    throw new Error("ALLOCATION_SUBMIT_FAILED");
  }

  return body;
}
