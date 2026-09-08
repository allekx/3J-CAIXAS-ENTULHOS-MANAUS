import type { ReactNode } from "react";
import { HOME_COMPANY } from "@/constants/home";
import { cn } from "@/lib/utils/cn";

/** Variantes do nome da marca, da mais longa para a mais curta. */
const BRAND_NAME_VARIANTS = [
  HOME_COMPANY.commercialName,
  HOME_COMPANY.shortName,
  "3J",
] as const;

const BRAND_NAME_PATTERN = new RegExp(
  `(${BRAND_NAME_VARIANTS.map((name) =>
    name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  ).join("|")})`,
  "g",
);

type BrandTone = "onLight" | "onDark";

const TONE_CLASS: Record<BrandTone, string> = {
  onLight: "font-semibold text-brand-gold",
  onDark: "font-semibold text-landing-gold",
};

type BrandTextProps = {
  children: string;
  /** Fundo claro (padrão) ou escuro da landing. */
  tone?: BrandTone;
  className?: string;
  markClassName?: string;
};

/**
 * Destaca o nome da empresa (e variantes) na cor dourada padrão da landing.
 */
export function BrandText({
  children,
  tone = "onLight",
  className,
  markClassName,
}: BrandTextProps) {
  return (
    <span className={className}>
      {highlightBrandName(children, tone, markClassName)}
    </span>
  );
}

export function highlightBrandName(
  text: string,
  tone: BrandTone = "onLight",
  markClassName?: string,
): ReactNode[] {
  const parts = text.split(BRAND_NAME_PATTERN);

  return parts.map((part, index) => {
    if (!part) {
      return null;
    }

    const isBrand = (BRAND_NAME_VARIANTS as readonly string[]).includes(part);

    if (!isBrand) {
      return <span key={`t-${index}`}>{part}</span>;
    }

    return (
      <span
        key={`b-${index}`}
        className={cn(TONE_CLASS[tone], markClassName)}
      >
        {part}
      </span>
    );
  });
}
