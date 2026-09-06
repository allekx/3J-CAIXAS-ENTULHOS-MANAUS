import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type HomeLinkButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "whatsapp" | "light";
  external?: boolean;
};

const variants = {
  primary:
    "bg-landing-gold text-landing-black shadow-[0_8px_24px_rgba(255,196,0,0.22)] hover:bg-[#f2bc00] hover:shadow-[0_12px_28px_rgba(255,196,0,0.28)] focus-visible:outline-landing-gold",
  secondary:
    "border border-landing-border bg-white text-landing-black hover:border-landing-black/20 hover:bg-landing-subtle focus-visible:outline-landing-black",
  whatsapp:
    "bg-brand-whatsapp text-white hover:bg-brand-whatsapp-dark focus-visible:outline-brand-whatsapp",
  light:
    "border border-white/20 bg-white/5 text-white hover:bg-white/10 focus-visible:outline-white",
};

export function HomeLinkButton({
  href,
  children,
  className,
  variant = "primary",
  external = false,
}: HomeLinkButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center rounded-md px-5 text-center text-[13px] font-semibold tracking-[0.04em] uppercase transition-[color,background-color,border-color,transform,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-colors motion-reduce:hover:translate-y-0 sm:min-h-12 sm:px-6",
    variants[variant],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
