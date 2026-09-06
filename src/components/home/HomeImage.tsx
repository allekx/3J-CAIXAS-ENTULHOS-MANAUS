import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type HomeImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
};

export function HomeImage({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className,
  containerClassName,
}: HomeImageProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-landing-subtle",
        containerClassName,
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", className)}
      />
    </div>
  );
}
