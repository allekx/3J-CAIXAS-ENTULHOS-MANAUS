import { ALLOCATION_STATUSES } from "@/types/allocation-request";
import type { AllocationRequestStatus } from "@/types/allocation-request";

export const ALLOCATION_STATUS_LABELS: Record<AllocationRequestStatus, string> =
  {
    pending: "Pendente",
    reviewing: "Em análise",
    proposal_sent: "Proposta enviada",
    approved: "Aprovado",
    scheduled: "Agendado",
    completed: "Concluído",
    cancelled: "Cancelado",
  };

export const STATUS_FILTER_OPTIONS: Array<{
  value: "" | AllocationRequestStatus;
  label: string;
}> = [
  { value: "", label: "Todos" },
  ...ALLOCATION_STATUSES.map((status) => ({
    value: status,
    label: ALLOCATION_STATUS_LABELS[status],
  })),
];
