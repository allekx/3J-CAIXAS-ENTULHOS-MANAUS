import { HOME_IMAGES, HOME_SERVICE_APPLICATIONS } from "@/constants/home";
import { HomeImage } from "@/components/home/HomeImage";
import { HomeSection } from "@/components/home/HomeSection";
import { SectionHeading } from "@/components/home/SectionHeading";

export function ServiceSection() {
  return (
    <HomeSection id="servico">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <HomeImage
          src={HOME_IMAGES.obra.src}
          alt={HOME_IMAGES.obra.alt}
          width={HOME_IMAGES.obra.width}
          height={HOME_IMAGES.obra.height}
          sizes="(max-width: 1024px) 100vw, 48vw"
        />

        <div>
          <SectionHeading
            title="Caixa coletora de 6 m³ para obras e reformas"
            description="Solução prática para organizar resíduos de obra, reforma e limpeza em Manaus. A 3J Caixas Entulhos Manaus trabalha com caixa de entulho de 6 m³ para diferentes tipos de serviço."
          />

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {HOME_SERVICE_APPLICATIONS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-landing-black sm:text-[15px]"
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-landing-gold"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HomeSection>
  );
}
