import { cn } from "@/lib/utils/cn";

type HomeVideoProps = {
  src: string;
  title: string;
  /** Vertical (9:16) ou horizontal (16:9). */
  orientation?: "vertical" | "horizontal";
  className?: string;
  containerClassName?: string;
};

export function HomeVideo({
  src,
  title,
  orientation = "horizontal",
  className,
  containerClassName,
}: HomeVideoProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-landing-black ring-1 ring-landing-border",
        isVertical
          ? "w-full max-w-[min(100%,18rem)] sm:max-w-[20rem] lg:max-w-[22rem]"
          : "w-full max-w-full",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "relative w-full bg-landing-black",
          isVertical ? "aspect-[9/16]" : "aspect-video",
        )}
      >
        <video
          className={cn(
            "absolute inset-0 size-full",
            isVertical ? "object-contain" : "object-cover",
            className,
          )}
          controls
          playsInline
          preload="metadata"
          title={title}
          aria-label={title}
        >
          <source src={src} type="video/mp4" />
          Seu navegador não suporta a reprodução de vídeo.
        </video>
      </div>
    </div>
  );
}
