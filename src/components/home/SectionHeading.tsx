import { BrandText } from "@/components/home/BrandText";
import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  const brandTone = light ? "onDark" : "onLight";

  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-[11px] font-medium tracking-[0.22em] text-landing-gold uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-[family-name:var(--font-oswald)] text-[1.75rem] leading-[1.15] font-medium tracking-tight sm:text-4xl",
          eyebrow && "mt-2",
          light ? "text-white" : "text-landing-black",
        )}
      >
        <BrandText tone={brandTone}>{title}</BrandText>
      </h2>
      <span
        aria-hidden="true"
        className={cn(
          "mt-4 block h-px w-12 bg-brand-gold/80",
          align === "center" && "mx-auto",
        )}
      />
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-[15px] leading-7 sm:text-base",
            align === "center" && "mx-auto",
            light ? "text-zinc-400" : "text-landing-muted",
          )}
        >
          <BrandText tone={brandTone}>{description}</BrandText>
        </p>
      ) : null}
    </div>
  );
}
