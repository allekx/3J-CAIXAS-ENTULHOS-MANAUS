import { ALLOCATION_STATUS_LABELS } from "@/constants/allocation-status";
import { cn } from "@/lib/utils/cn";
import type { AllocationRequestStatus } from "@/types/allocation-request";

const STATUS_STYLES: Record<AllocationRequestStatus, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-800",
  reviewing: "border-sky-200 bg-sky-50 text-sky-800",
  proposal_sent: "border-yellow-200 bg-yellow-50 text-yellow-900",
  approved: "border-emerald-200 bg-emerald-50 text-emerald-800",
  scheduled: "border-teal-200 bg-teal-50 text-teal-800",
  completed: "border-zinc-200 bg-zinc-100 text-zinc-700",
  cancelled: "border-stone-200 bg-stone-100 text-stone-600",
};

type StatusBadgeProps = {
  status: AllocationRequestStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5 text-xs font-medium",
        STATUS_STYLES[status],
      )}
    >
      {ALLOCATION_STATUS_LABELS[status]}
    </span>
  );
}
