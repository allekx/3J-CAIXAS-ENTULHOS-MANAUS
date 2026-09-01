import type { Metadata } from "next";
import { AllocationFlow } from "@/components/alocacao/AllocationFlow";

export const metadata: Metadata = {
  title: "Confirmação de Alocação",
};

export default function ConfirmacaoAlocacaoPage() {
  return <AllocationFlow />;
}
