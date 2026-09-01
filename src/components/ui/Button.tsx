import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "whatsapp" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-gold text-brand-black hover:bg-brand-gold-dark focus-visible:outline-brand-gold-dark",
  secondary:
    "border border-brand-black bg-white text-brand-black hover:bg-brand-surface focus-visible:outline-brand-black",
  whatsapp:
    "bg-brand-whatsapp text-white hover:bg-brand-whatsapp-dark focus-visible:outline-brand-whatsapp",
  ghost:
    "bg-transparent text-brand-muted underline-offset-2 hover:text-brand-black hover:underline focus-visible:outline-brand-gold",
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-12 w-full items-center justify-center gap-2 px-4 text-sm font-semibold tracking-wide uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
