import { HOME_MAPS } from "@/constants/home";
import { HomeSection } from "@/components/home/HomeSection";

export function Location() {
  return (
    <HomeSection id="localizacao" tone="subtle">
      <div className="overflow-hidden rounded-xl bg-white ring-1 ring-landing-border">
        <iframe
          title="Mapa da 3J Caixas Entulhos Manaus no bairro Tarumã"
          src={HOME_MAPS.embedUrl}
          className="h-72 w-full border-0 sm:h-[22rem] lg:h-[26rem]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </HomeSection>
  );
}
