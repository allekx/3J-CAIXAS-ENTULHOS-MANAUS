import type { ReactNode } from "react";

export default function ConfirmacaoAlocacaoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-white">{children}</div>
  );
}
