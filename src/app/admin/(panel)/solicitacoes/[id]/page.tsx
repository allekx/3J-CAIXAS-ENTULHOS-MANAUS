import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RequestEditForm } from "@/components/admin/RequestEditForm";
import { ROUTES } from "@/constants/site";
import { getAllocationRequestById } from "@/services/admin-allocation-requests";

export const metadata: Metadata = {
  title: "Detalhe da solicitação",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default async function AdminSolicitacaoDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (!UUID_PATTERN.test(id)) {
    notFound();
  }

  const request = await getAllocationRequestById(id);

  if (!request) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href={ROUTES.adminSolicitacoes}
        className="text-sm font-semibold text-brand-muted underline-offset-2 hover:text-brand-black hover:underline"
      >
        Voltar para solicitações
      </Link>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-brand-black">
        Atendimento da solicitação
      </h1>
      <p className="mt-1 text-sm text-brand-muted">
        Visualize e atualize os dados desta alocação. Depois de salvar, gere a
        proposta comercial em PDF ou encaminhe o atendimento pelo WhatsApp.
      </p>

      <RequestEditForm request={request} />
    </div>
  );
}
