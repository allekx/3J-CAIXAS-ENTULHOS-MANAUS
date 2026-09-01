import type { Metadata } from "next";
import Link from "next/link";
import { RequestsTable } from "@/components/admin/RequestsTable";
import { TodayOperations } from "@/components/admin/TodayOperations";
import { ROUTES } from "@/constants/site";
import { getAdminDashboard } from "@/services/admin-allocation-requests";

export const metadata: Metadata = {
  title: "Painel administrativo",
};

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="border border-brand-border border-t-2 border-t-brand-gold bg-white px-4 py-4">
      <p className="text-xs font-semibold tracking-[0.12em] text-brand-muted uppercase">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-brand-black">
        {value}
      </p>
    </article>
  );
}

function capitalizeFirst(value: string) {
  if (value.length === 0) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default async function AdminDashboardPage() {
  const dashboard = await getAdminDashboard();
  const { stats } = dashboard;

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-semibold tracking-tight text-brand-black">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-brand-muted">
        {capitalizeFirst(dashboard.todayLabel)} · visão operacional das
        solicitações.
      </p>

      <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Solicitações hoje" value={stats.createdToday} />
        <StatCard label="Pendentes" value={stats.pending} />
        <StatCard label="Em análise" value={stats.reviewing} />
        <StatCard label="Propostas enviadas" value={stats.proposalSent} />
        <StatCard label="Aprovadas" value={stats.approved} />
        <StatCard
          label="Entregas previstas para hoje"
          value={stats.deliveriesToday}
        />
        <StatCard
          label="Retiradas previstas para hoje"
          value={stats.pickupsToday}
        />
      </section>

      <TodayOperations
        deliveries={dashboard.deliveries}
        pickups={dashboard.pickups}
        deliveriesTotal={stats.deliveriesToday}
        pickupsTotal={stats.pickupsToday}
      />

      <section className="mt-8">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-sm font-semibold tracking-[0.12em] text-brand-gold-dark uppercase">
            Solicitações recentes
          </h2>
          <Link
            href={ROUTES.adminSolicitacoes}
            className="text-sm font-semibold text-brand-muted underline-offset-2 hover:text-brand-black hover:underline"
          >
            Ver todas
          </Link>
        </div>
        <RequestsTable
          requests={dashboard.recent}
          emptyLabel="Nenhuma solicitação encontrada."
        />
      </section>
    </div>
  );
}
