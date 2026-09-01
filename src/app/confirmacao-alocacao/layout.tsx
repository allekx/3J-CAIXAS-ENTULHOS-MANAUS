import type { ReactNode } from "react";
import { AllocationHeader } from "@/components/alocacao/AllocationHeader";

export default function ConfirmacaoAlocacaoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-brand-surface">
      <AllocationHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
