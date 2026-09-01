import Link from "next/link";
import { PhoneActions } from "@/components/admin/PhoneActions";
import { adminSolicitacaoPath } from "@/constants/site";
import type { DashboardOperation } from "@/services/admin-allocation-requests";

type TodayOperationsProps = {
  deliveries: DashboardOperation[];
  pickups: DashboardOperation[];
  deliveriesTotal: number;
  pickupsTotal: number;
};

function formatAddress(operation: DashboardOperation) {
  const complement = operation.complement?.trim();
  const line = complement
    ? `${operation.street}, ${operation.address_number} — ${complement}`
    : `${operation.street}, ${operation.address_number}`;

  return `${line} · ${operation.neighborhood}, ${operation.city}`;
}

function formatBox(operation: DashboardOperation) {
  const type = operation.box_type?.trim();
  const size = operation.box_size?.trim();

  if (type && size) {
    return `${type} · ${size}`;
  }

  return type || size || "—";
}

function OperationCard({ operation }: { operation: DashboardOperation }) {
  return (
    <article className="border border-brand-border bg-white p-4">
      <p className="text-xs font-medium tracking-wide text-brand-muted uppercase">
        Horário a definir
      </p>
      <p className="mt-2 font-semibold text-brand-black">{operation.protocol}</p>
      <p className="mt-1 text-sm text-brand-black">{operation.customer_name}</p>
      <p className="mt-1 text-sm text-brand-muted">{formatAddress(operation)}</p>
      <div className="mt-2">
        <PhoneActions phone={operation.customer_phone} compact />
      </div>
      <p className="mt-2 text-sm text-brand-black">{formatBox(operation)}</p>
      <Link
        href={adminSolicitacaoPath(operation.id)}
        className="mt-3 inline-flex min-h-10 items-center justify-center border border-brand-black px-3 text-xs font-semibold tracking-wide text-brand-black uppercase hover:bg-brand-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black"
      >
        Ver solicitação
      </Link>
    </article>
  );
}

function OperationColumn({
  title,
  operations,
  total,
  emptyLabel,
}: {
  title: string;
  operations: DashboardOperation[];
  total: number;
  emptyLabel: string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="text-xs font-semibold tracking-[0.12em] text-brand-gold-dark uppercase">
          {title}
        </h3>
        <p className="text-xs text-brand-muted">{total}</p>
      </div>

      {operations.length === 0 ? (
        <p className="border border-brand-border bg-white px-4 py-8 text-sm text-brand-muted">
          {emptyLabel}
        </p>
      ) : (
        <div className="grid gap-3">
          {operations.map((operation) => (
            <OperationCard key={operation.id} operation={operation} />
          ))}
          {operations.length < total ? (
            <p className="text-xs text-brand-muted">
              Mostrando {operations.length} de {total}.
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}

export function TodayOperations({
  deliveries,
  pickups,
  deliveriesTotal,
  pickupsTotal,
}: TodayOperationsProps) {
  return (
    <section className="mt-8">
      <h2 className="text-sm font-semibold tracking-[0.12em] text-brand-gold-dark uppercase">
        Operações de hoje
      </h2>
      <p className="mt-1 text-sm text-brand-muted">
        Entregas e retiradas previstas para hoje. Horários serão exibidos quando
        estiverem cadastrados.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OperationColumn
          title="Entregas"
          operations={deliveries}
          total={deliveriesTotal}
          emptyLabel="Nenhuma entrega prevista para hoje."
        />
        <OperationColumn
          title="Retiradas"
          operations={pickups}
          total={pickupsTotal}
          emptyLabel="Nenhuma retirada prevista para hoje."
        />
      </div>
    </section>
  );
}
