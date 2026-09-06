import { z } from "zod";
import { NextResponse } from "next/server";
import { createAllocationRequest } from "@/services/allocation-requests";
import {
  rateLimitAllocationRequest,
  rateLimitHeaders,
} from "@/lib/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function errorResponse(status: number, headers?: HeadersInit) {
  return NextResponse.json({ success: false }, { status, headers });
}

export async function POST(request: Request) {
  try {
    const limitResult = await rateLimitAllocationRequest(request);
    const limitHeaders = rateLimitHeaders(limitResult);

    if (!limitResult.success) {
      console.warn("[allocation-requests] Rate limit excedido.");
      return errorResponse(429, limitHeaders);
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      console.error("[allocation-requests] Payload JSON inválido.");
      return errorResponse(400, limitHeaders);
    }

    const created = await createAllocationRequest(body);

    return NextResponse.json(
      {
        success: true,
        protocol: created.protocol,
        createdAt: created.created_at,
        status: created.status,
      },
      { headers: limitHeaders },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("[allocation-requests] Payload rejeitado.", error.issues);
      return errorResponse(400);
    }

    console.error("[allocation-requests] Erro ao criar solicitação.", error);
    return errorResponse(500);
  }
}
