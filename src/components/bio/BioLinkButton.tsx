import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type BioLinkButtonProps = {
  href: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  variant?: "primary" | "secondary";
  external?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
};

export function BioLinkButton({
  href,
  title,
  subtitle,
  icon: Icon,
  variant = "secondary",
  external = false,
  disabled = false,
  ariaLabel,
}: BioLinkButtonProps) {
  const classes = cn(
    "group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-[transform,box-shadow,border-color,background-color] duration-200 motion-reduce:transition-none sm:px-4",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-landing-gold",
    "active:scale-[0.985] motion-reduce:active:scale-100",
    variant === "primary"
      ? "bg-landing-gold text-landing-black shadow-[0_1px_0_rgba(255,255,255,0.1)_inset] hover:bg-[#f2bc00] hover:shadow-[0_4px_20px_rgba(255,196,0,0.18)]"
      : "border border-white/10 bg-white/[0.03] text-white hover:border-white/18 hover:bg-white/[0.06]",
    disabled && "pointer-events-none opacity-45",
  );

  const content = (
    <>
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg",
          variant === "primary"
            ? "bg-landing-black/8 text-landing-black"
            : "bg-white/6 text-landing-gold",
        )}
        aria-hidden="true"
      >
        <Icon className="size-[17px]" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-[family-name:var(--font-oswald)] text-[13px] font-medium tracking-[0.05em] uppercase">
          {title}
        </span>
        <span
          className={cn(
            "mt-0.5 block text-[11px] leading-snug",
            variant === "primary" ? "text-landing-black/65" : "text-zinc-500",
          )}
        >
          {subtitle}
        </span>
      </span>
    </>
  );

  if (disabled) {
    return (
      <div
        className={classes}
        role="link"
        aria-disabled="true"
        aria-label={ariaLabel ?? title}
      >
        {content}
      </div>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel ?? title}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel ?? title}>
      {content}
    </Link>
  );
}
