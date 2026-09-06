import { HOME_GALLERY } from "@/constants/home";
import { HomeImage } from "@/components/home/HomeImage";
import { HomeSection } from "@/components/home/HomeSection";
import { SectionHeading } from "@/components/home/SectionHeading";

export function ServiceGallery() {
  return (
    <HomeSection>
      <SectionHeading
        align="center"
        title="Caixas coletoras em obras de Manaus"
        description="Fotos reais de caixas coletoras utilizadas em obras, reformas e serviços pela cidade."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 md:gap-8">
        {HOME_GALLERY.map((item) => (
          <figure key={item.src} className="min-w-0">
            <HomeImage
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes="(max-width: 640px) 100vw, 48vw"
              containerClassName="bg-white"
              className="object-cover"
            />
            <figcaption className="mt-3 text-sm text-landing-muted">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </HomeSection>
  );
}
