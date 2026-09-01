import { z } from "zod";
import { NextResponse } from "next/server";
import { createAllocationRequest } from "@/services/allocation-requests";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function errorResponse(status: number) {
  return NextResponse.json({ success: false }, { status });
}

export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      console.error("[allocation-requests] Payload JSON inválido.");
      return errorResponse(400);
    }

    const created = await createAllocationRequest(body);

    return NextResponse.json({
      success: true,
      protocol: created.protocol,
      createdAt: created.created_at,
      status: created.status,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("[allocation-requests] Payload rejeitado.", error.issues);
      return errorResponse(400);
    }

    console.error("[allocation-requests] Erro ao criar solicitação.", error);
    return errorResponse(500);
  }
}
