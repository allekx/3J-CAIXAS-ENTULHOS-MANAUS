import Image from "next/image";
import { FORBIDDEN_USAGE_EXAMPLES } from "@/constants/termos-locacao";
import { cn } from "@/lib/utils/cn";

type ForbiddenUsageExamplesProps = {
  className?: string;
  /** Densidade visual: formulário (compacto) ou página de termos (mais espaço). */
  density?: "compact" | "comfortable";
};

export function ForbiddenUsageExamples({
  className,
  density = "compact",
}: ForbiddenUsageExamplesProps) {
  const isComfortable = density === "comfortable";

  return (
    <div className={cn("space-y-4", className)}>
      {FORBIDDEN_USAGE_EXAMPLES.map((example) => (
        <aside
          key={example.id}
          className={cn(
            "border border-red-200 bg-red-50/40",
            isComfortable ? "p-5 sm:p-6" : "p-4",
          )}
        >
          <p className="text-xs font-semibold tracking-[0.14em] text-red-700 uppercase">
            {example.badge}
          </p>
          <h2
            className={cn(
              "mt-1.5 font-semibold text-brand-black",
              isComfortable ? "text-lg" : "text-sm sm:text-base",
            )}
          >
            {example.title}
          </h2>
          <p
            className={cn(
              "mt-1.5 leading-relaxed text-brand-muted",
              isComfortable ? "text-[15px] leading-7" : "text-sm",
            )}
          >
            {example.description}
          </p>

          <ul
            className={cn(
              "mt-4 grid gap-3",
              example.images.length > 1 && "sm:grid-cols-2",
            )}
          >
            {example.images.map((image, index) => (
              <li key={image.src}>
                <figure className="overflow-hidden border border-brand-border bg-white">
                  <div className="relative aspect-[3/4] w-full bg-zinc-100">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 640px) 100vw, 360px"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-brand-border px-3 py-2 text-xs text-brand-muted">
                    Exemplo {index + 1} — uso incorreto
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </aside>
      ))}
    </div>
  );
}
