import { Check, ClipboardList, CircleCheck, ListChecks } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type StepperItem = {
  id: number;
  name: string;
  icon: LucideIcon;
};

export const ALLOCATION_STEPS: StepperItem[] = [
  { id: 1, name: "Dados", icon: ClipboardList },
  { id: 2, name: "Revisão", icon: ListChecks },
  { id: 3, name: "Conclusão", icon: CircleCheck },
];

type AllocationStepperProps = {
  currentStep: number;
  steps?: StepperItem[];
};

export function AllocationStepper({
  currentStep,
  steps = ALLOCATION_STEPS,
}: AllocationStepperProps) {
  return (
    <nav aria-label="Etapas da solicitação">
      <ol className="flex items-start">
        {steps.map((step, index) => {
          const status =
            step.id < currentStep
              ? "complete"
              : step.id === currentStep
                ? "current"
                : "upcoming";
          const Icon = step.icon;
          const isLast = index === steps.length - 1;
          const connectorComplete = currentStep > step.id;

          return (
            <li key={step.id} className="min-w-0 flex-1">
              <div
                className="flex items-center"
                aria-current={status === "current" ? "step" : undefined}
              >
                {index > 0 ? (
                  <span
                    className={cn(
                      "h-0.5 min-w-2 flex-1",
                      currentStep >= step.id
                        ? "bg-brand-gold"
                        : "bg-brand-border",
                    )}
                    aria-hidden="true"
                  />
                ) : (
                  <span className="min-w-2 flex-1" aria-hidden="true" />
                )}

                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center border sm:size-10",
                    status === "upcoming"
                      ? "border-brand-border bg-white text-zinc-400"
                      : "border-brand-gold bg-brand-gold text-brand-black",
                  )}
                >
                  {status === "complete" ? (
                    <Check
                      aria-hidden="true"
                      className="size-4 sm:size-5"
                      strokeWidth={2.25}
                    />
                  ) : (
                    <Icon
                      aria-hidden="true"
                      className="size-4 sm:size-5"
                      strokeWidth={1.75}
                    />
                  )}
                  <span className="sr-only">
                    {status === "complete"
                      ? `${step.name}, concluída`
                      : status === "current"
                        ? `${step.name}, etapa atual`
                        : step.name}
                  </span>
                </span>

                {!isLast ? (
                  <span
                    className={cn(
                      "h-0.5 min-w-2 flex-1",
                      connectorComplete ? "bg-brand-gold" : "bg-brand-border",
                    )}
                    aria-hidden="true"
                  />
                ) : (
                  <span className="min-w-2 flex-1" aria-hidden="true" />
                )}
              </div>
              <p
                className={cn(
                  "mt-2 text-center text-[11px] font-medium sm:text-xs",
                  status === "upcoming" ? "text-zinc-400" : "text-brand-black",
                )}
              >
                <span className="mr-1">{step.id}.</span>
                {step.name}
              </p>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
