import Link from "next/link";
import { PhoneActions } from "@/components/admin/PhoneActions";
import { StatusBadge } from "@/components/admin/StatusBadge";
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
      <div className="hidden min-w-0 overflow-x-auto border border-brand-border bg-white md:block">
        <table className="w-full min-w-[56rem] table-fixed text-left text-sm">
          <colgroup>
            <col className="w-[11%]" />
            <col className="w-[16%]" />
            <col className="w-[18%]" />
            <col className="w-[18%]" />
            <col className="w-[14%]" />
            <col className="w-[13%]" />
            <col className="w-[10%]" />
          </colgroup>
          <thead className="border-b border-brand-border bg-brand-surface text-xs font-semibold tracking-wide text-brand-muted uppercase">
            <tr>
              <th className="px-3 py-3">Protocolo</th>
              <th className="px-3 py-3">Cliente</th>
              <th className="px-3 py-3">Telefone</th>
              <th className="px-3 py-3">Cidade/Bairro</th>
              <th className="px-3 py-3">Data</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr
                key={request.id}
                className="border-b border-brand-border last:border-b-0"
              >
                <td className="px-3 py-3 font-medium text-brand-black">
                  <span className="block truncate" title={request.protocol}>
                    {request.protocol}
                  </span>
                </td>
                <td className="px-3 py-3 text-brand-black">
                  <span
                    className="block truncate"
                    title={request.customer_name}
                  >
                    {request.customer_name}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <PhoneActions phone={request.customer_phone} compact />
                </td>
                <td className="px-3 py-3 text-brand-black">
                  <span
                    className="block truncate"
                    title={`${request.city} / ${request.neighborhood}`}
                  >
                    {request.city} / {request.neighborhood}
                  </span>
                </td>
                <td className="px-3 py-3 text-brand-muted">
                  <span className="block truncate">
                    {formatRequestDate(new Date(request.created_at))}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <StatusBadge status={request.status} />
                </td>
                <td className="px-3 py-3">
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
            className="min-w-0 border border-brand-border bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="min-w-0 truncate font-semibold text-brand-black">
                {request.protocol}
              </p>
              <StatusBadge status={request.status} />
            </div>
            <p className="mt-2 truncate text-sm text-brand-black">
              {request.customer_name}
            </p>
            <div className="mt-2">
              <PhoneActions phone={request.customer_phone} compact />
            </div>
            <p className="mt-2 truncate text-sm text-brand-muted">
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
