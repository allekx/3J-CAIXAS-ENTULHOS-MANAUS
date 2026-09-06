import { HOME_SERVICE_APPLICATIONS, HOME_VIDEOS } from "@/constants/home";
import { HomeSection } from "@/components/home/HomeSection";
import { HomeVideo } from "@/components/home/HomeVideo";
import { SectionHeading } from "@/components/home/SectionHeading";

export function ServiceSection() {
  return (
    <HomeSection id="servico">
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-center lg:gap-16">
        <div className="flex w-full justify-center lg:justify-start">
          <HomeVideo
            src={HOME_VIDEOS.service.src}
            title={HOME_VIDEOS.service.title}
            orientation="vertical"
          />
        </div>

        <div className="min-w-0">
          <SectionHeading
            title="Caixa coletora para obras e reformas"
            description="Solução prática para organizar resíduos de obra, reforma e limpeza em Manaus. A 3J Caixas Entulhos Manaus atende diferentes tipos de serviço com entrega e retirada organizadas."
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
