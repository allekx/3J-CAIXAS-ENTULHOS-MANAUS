"use server";

import { z } from "zod";
import { flattenUpdateFieldErrors } from "@/lib/alocacao/update-allocation-request.schema";
import { updateAllocationRequest } from "@/services/admin-allocation-requests";

export type UpdateAllocationActionResult =
  | { success: true }
  | {
      success: false;
      message: string;
      fieldErrors?: ReturnType<typeof flattenUpdateFieldErrors>;
    };

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function updateAllocationRequestAction(
  id: string,
  payload: unknown,
): Promise<UpdateAllocationActionResult> {
  if (!UUID_PATTERN.test(id)) {
    return {
      success: false,
      message: "Solicitação inválida.",
    };
  }

  try {
    await updateAllocationRequest(id, payload);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Verifique os campos destacados.",
        fieldErrors: flattenUpdateFieldErrors(error),
      };
    }

    console.error("[admin] Falha ao salvar solicitação.", error);
    return {
      success: false,
      message: "Não foi possível salvar as alterações. Tente novamente.",
    };
  }
}
