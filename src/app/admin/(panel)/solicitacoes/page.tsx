import type { Metadata } from "next";
import { RequestsFilters } from "@/components/admin/RequestsFilters";
import { RequestsTable } from "@/components/admin/RequestsTable";
import {
  listAllocationRequests,
  parseListFilters,
} from "@/services/admin-allocation-requests";

export const metadata: Metadata = {
  title: "Solicitações",
};

type PageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    from?: string;
    to?: string;
  }>;
};

export default async function AdminSolicitacoesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = parseListFilters(params);
  const requests = await listAllocationRequests(filters);

  return (
    <div className="mx-auto min-w-0 max-w-6xl">
      <h1 className="text-2xl font-semibold tracking-tight text-brand-black">
        Solicitações
      </h1>
      <p className="mt-1 text-sm text-brand-muted">
        Central de atendimento das solicitações de locação.
      </p>

      <div className="mt-6 min-w-0">
        <RequestsFilters
          query={params.q ?? ""}
          status={filters.status ?? ""}
          from={filters.from ?? ""}
          to={filters.to ?? ""}
        />
      </div>

      <div className="mt-4 min-w-0">
        <RequestsTable
          requests={requests}
          emptyLabel="Nenhuma solicitação encontrada para os filtros informados."
        />
      </div>
    </div>
  );
}
