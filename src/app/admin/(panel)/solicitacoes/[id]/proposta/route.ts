import { NextResponse } from "next/server";
import { getAdminSessionUser } from "@/lib/auth/admin";
import { renderProposalPdf } from "@/lib/proposal/render-proposal-pdf";
import { getAllocationRequestById } from "@/services/admin-allocation-requests";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const user = await getAdminSessionUser();

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Não autorizado." },
      { status: 401 },
    );
  }

  const { id } = await context.params;

  if (!UUID_PATTERN.test(id)) {
    return NextResponse.json(
      { success: false, message: "Solicitação inválida." },
      { status: 404 },
    );
  }

  try {
    const allocationRequest = await getAllocationRequestById(id);

    if (!allocationRequest) {
      return NextResponse.json(
        { success: false, message: "Solicitação não encontrada." },
        { status: 404 },
      );
    }

    const { buffer, filename } = await renderProposalPdf(allocationRequest);

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("[admin] Falha ao gerar proposta PDF.", error);
    return NextResponse.json(
      { success: false, message: "Não foi possível gerar a proposta." },
      { status: 500 },
    );
  }
}
