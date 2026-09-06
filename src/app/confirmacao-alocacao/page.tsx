import type { Metadata } from "next";
import { AllocationFlow } from "@/components/alocacao/AllocationFlow";
import { AllocationHeader } from "@/components/alocacao/AllocationHeader";

export const metadata: Metadata = {
  title: "Confirmação de Locação",
};

export default function ConfirmacaoAlocacaoPage() {
  return (
    <>
      <AllocationHeader />
      <main className="flex-1">
        <AllocationFlow />
      </main>
    </>
  );
}
