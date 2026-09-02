import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type BioRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function BioReveal({ children, delay = 0, className }: BioRevealProps) {
  return (
    <div
      className={cn("bio-reveal", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
