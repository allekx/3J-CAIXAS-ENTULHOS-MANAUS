import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type HomeSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "white" | "subtle" | "dark";
  containerClassName?: string;
};

const tones = {
  white: "bg-white",
  subtle: "bg-landing-subtle",
  dark: "bg-landing-black text-white",
};

export function HomeSection({
  id,
  children,
  className,
  tone = "white",
  containerClassName,
}: HomeSectionProps) {
  return (
    <section id={id} className={cn(tones[tone], "py-16 sm:py-20", className)}>
      <div
        className={cn("mx-auto max-w-6xl px-4 sm:px-6", containerClassName)}
      >
        {children}
      </div>
    </section>
  );
}
