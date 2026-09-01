import Link from "next/link";
import { PhoneActions } from "@/components/admin/PhoneActions";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { STATUS_FILTER_OPTIONS } from "@/constants/allocation-status";
import { ROUTES } from "@/constants/site";
import { formatRequestDate } from "@/lib/utils/alocacao";
import type { AdminRequestListItem } from "@/services/admin-allocation-requests";

type RequestsTableProps = {
  requests: AdminRequestListItem[];
  emptyLabel: string;
};

export function RequestsTable({ requests, emptyLabel }: RequestsTableProps) {
  if (requests.length === 0) {
    return (
      <p className="border border-brand-border bg-white px-4 py-8 text-sm text-brand-muted">
        {emptyLabel}
      </p>
    );
  }

  return (
    <>
      <div className="hidden overflow-x-auto border border-brand-border bg-white md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-brand-border bg-brand-surface text-xs font-semibold tracking-wide text-brand-muted uppercase">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap">Protocolo</th>
              <th className="px-4 py-3 whitespace-nowrap">Cliente</th>
              <th className="px-4 py-3 whitespace-nowrap">Telefone</th>
              <th className="px-4 py-3 whitespace-nowrap">Cidade/Bairro</th>
              <th className="px-4 py-3 whitespace-nowrap">Data da solicitação</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap">Ações</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr
                key={request.id}
                className="border-b border-brand-border last:border-b-0"
              >
                <td className="px-4 py-3 font-medium whitespace-nowrap text-brand-black">
                  {request.protocol}
                </td>
                <td className="px-4 py-3 text-brand-black">
                  {request.customer_name}
                </td>
                <td className="px-4 py-3">
                  <PhoneActions phone={request.customer_phone} />
                </td>
                <td className="px-4 py-3 text-brand-black">
                  {request.city} / {request.neighborhood}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-brand-muted">
                  {formatRequestDate(new Date(request.created_at))}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={request.status} />
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`${ROUTES.adminSolicitacoes}/${request.id}`}
                    className="text-sm font-semibold text-brand-black underline-offset-2 hover:underline"
                  >
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {requests.map((request) => (
          <article
            key={request.id}
            className="border border-brand-border bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-brand-black">{request.protocol}</p>
              <StatusBadge status={request.status} />
            </div>
            <p className="mt-2 text-sm text-brand-black">{request.customer_name}</p>
            <div className="mt-2">
              <PhoneActions phone={request.customer_phone} compact />
            </div>
            <p className="mt-2 text-sm text-brand-muted">
              {request.city} / {request.neighborhood}
            </p>
            <p className="mt-1 text-xs text-brand-muted">
              {formatRequestDate(new Date(request.created_at))}
            </p>
            <Link
              href={`${ROUTES.adminSolicitacoes}/${request.id}`}
              className="mt-3 inline-flex text-sm font-semibold text-brand-black underline-offset-2 hover:underline"
            >
              Ver
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}

type RequestsFiltersProps = {
  query: string;
  status: string;
  from: string;
  to: string;
};

export function RequestsFilters({
  query,
  status,
  from,
  to,
}: RequestsFiltersProps) {
  return (
    <form
      method="get"
      className="grid grid-cols-1 gap-3 border border-brand-border bg-white p-4 sm:grid-cols-2 lg:grid-cols-6"
    >
      <label className="flex min-w-0 flex-col gap-1.5 sm:col-span-2">
        <span className="text-xs font-medium tracking-wide text-brand-muted uppercase">
          Busca
        </span>
        <input
          name="q"
          defaultValue={query}
          placeholder="Protocolo, nome, telefone, endereço ou condomínio"
          className="h-11 border border-brand-border bg-white px-3 text-base text-brand-black outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
        />
      </label>

      <label className="flex min-w-0 flex-col gap-1.5">
        <span className="text-xs font-medium tracking-wide text-brand-muted uppercase">
          Status
        </span>
        <select
          name="status"
          defaultValue={status}
          className="h-11 border border-brand-border bg-white px-3 text-base text-brand-black outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
        >
          {STATUS_FILTER_OPTIONS.map((option) => (
            <option key={option.value || "all"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex min-w-0 flex-col gap-1.5">
        <span className="text-xs font-medium tracking-wide text-brand-muted uppercase">
          De
        </span>
        <input
          type="date"
          name="from"
          defaultValue={from}
          className="h-11 border border-brand-border bg-white px-3 text-base text-brand-black outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
        />
      </label>

      <label className="flex min-w-0 flex-col gap-1.5">
        <span className="text-xs font-medium tracking-wide text-brand-muted uppercase">
          Até
        </span>
        <input
          type="date"
          name="to"
          defaultValue={to}
          className="h-11 border border-brand-border bg-white px-3 text-base text-brand-black outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
        />
      </label>

      <div className="flex items-end gap-2">
        <Button type="submit" className="min-h-11">
          Filtrar
        </Button>
      </div>

      {query || status || from || to ? (
        <div className="flex items-end sm:col-span-2 lg:col-span-6">
          <Link
            href={ROUTES.adminSolicitacoes}
            className="text-sm font-semibold text-brand-muted underline-offset-2 hover:text-brand-black hover:underline"
          >
            Limpar filtros
          </Link>
        </div>
      ) : null}
    </form>
  );
}
