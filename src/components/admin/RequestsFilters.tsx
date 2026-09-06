"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { STATUS_FILTER_OPTIONS } from "@/constants/allocation-status";
import { ROUTES } from "@/constants/site";
import { cn } from "@/lib/utils/cn";

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
  const hasAdvancedFilters = Boolean(status || from || to);
  const [advancedOpen, setAdvancedOpen] = useState(hasAdvancedFilters);
  const hasAnyFilter = Boolean(query || status || from || to);

  return (
    <form method="get" className="min-w-0 border border-brand-border bg-white p-4">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="text-xs font-medium tracking-wide text-brand-muted uppercase">
            Busca
          </span>
          <input
            name="q"
            defaultValue={query}
            placeholder="Protocolo, nome, telefone ou endereço"
            className="h-11 w-full min-w-0 border border-brand-border bg-white px-3 text-base text-brand-black outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
          />
        </label>

        <Button
          type="submit"
          className="min-h-11 w-full shrink-0 sm:w-auto sm:min-w-[7.5rem]"
        >
          Buscar
        </Button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          aria-expanded={advancedOpen}
          aria-controls="requests-advanced-filters"
          onClick={() => setAdvancedOpen((open) => !open)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-black underline-offset-2 hover:underline"
        >
          Filtrar por
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-4 text-brand-gold transition-transform duration-200",
              advancedOpen && "rotate-180",
            )}
          />
        </button>

        {hasAnyFilter ? (
          <Link
            href={ROUTES.adminSolicitacoes}
            className="text-sm font-semibold text-brand-muted underline-offset-2 hover:text-brand-black hover:underline"
          >
            Limpar filtros
          </Link>
        ) : null}
      </div>

      {advancedOpen ? (
        <div
          id="requests-advanced-filters"
          className="mt-4 grid min-w-0 grid-cols-1 gap-3 border-t border-brand-border pt-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <label className="flex min-w-0 flex-col gap-1.5">
            <span className="text-xs font-medium tracking-wide text-brand-muted uppercase">
              Status
            </span>
            <select
              name="status"
              defaultValue={status}
              className="h-11 w-full min-w-0 border border-brand-border bg-white px-3 text-base text-brand-black outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
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
              className="h-11 w-full min-w-0 border border-brand-border bg-white px-3 text-base text-brand-black outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
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
              className="h-11 w-full min-w-0 border border-brand-border bg-white px-3 text-base text-brand-black outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
            />
          </label>

          <div className="flex items-end">
            <Button
              type="submit"
              className="min-h-11 w-full shrink-0 sm:w-auto"
            >
              Aplicar filtros
            </Button>
          </div>
        </div>
      ) : (
        <>
          {status ? <input type="hidden" name="status" value={status} /> : null}
          {from ? <input type="hidden" name="from" value={from} /> : null}
          {to ? <input type="hidden" name="to" value={to} /> : null}
        </>
      )}
    </form>
  );
}
