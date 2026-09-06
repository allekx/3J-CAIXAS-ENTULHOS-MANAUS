import { HOME_MAPS } from "@/constants/home";
import { HomeReveal } from "@/components/home/HomeReveal";
import { HomeSection } from "@/components/home/HomeSection";

export function Location() {
  return (
    <HomeSection id="localizacao" tone="subtle">
      <HomeReveal>
        <div className="overflow-hidden rounded-xl bg-white shadow-[0_12px_40px_rgba(8,10,13,0.06)] ring-1 ring-landing-border">
          <iframe
            title="Mapa da 3J Caixas Entulhos Manaus no bairro Tarumã"
            src={HOME_MAPS.embedUrl}
            className="h-72 w-full border-0 sm:h-[22rem] lg:h-[26rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </HomeReveal>
    </HomeSection>
  );
}
