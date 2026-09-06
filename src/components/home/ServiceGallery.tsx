import { HOME_GALLERY } from "@/constants/home";
import { HomeImage } from "@/components/home/HomeImage";
import { HomeReveal } from "@/components/home/HomeReveal";
import { HomeSection } from "@/components/home/HomeSection";
import { SectionHeading } from "@/components/home/SectionHeading";

export function ServiceGallery() {
  return (
    <HomeSection>
      <HomeReveal>
        <SectionHeading
          align="center"
          title="Caixas coletoras em obras de Manaus"
          description="Fotos reais de caixas coletoras utilizadas em obras, reformas e serviços pela cidade."
        />
      </HomeReveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 md:gap-8">
        {HOME_GALLERY.map((item, index) => (
          <HomeReveal key={item.src} as="figure" delay={index * 80} className="group min-w-0">
            <HomeImage
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes="(max-width: 640px) 100vw, 48vw"
              containerClassName="bg-white ring-1 ring-landing-border/80 transition-[box-shadow,transform] duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_rgba(8,10,13,0.1)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <figcaption className="mt-3 text-sm text-landing-muted transition-colors duration-300 group-hover:text-landing-black">
              {item.caption}
            </figcaption>
          </HomeReveal>
        ))}
      </div>
    </HomeSection>
  );
}
