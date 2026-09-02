import {
  HOME_CTA,
  HOME_DUMPSTER_HIGHLIGHTS,
  HOME_IMAGES,
} from "@/constants/home";
import { HomeImage } from "@/components/home/HomeImage";
import { HomeLinkButton } from "@/components/home/HomeLinkButton";
import { HomeSection } from "@/components/home/HomeSection";
import { SectionHeading } from "@/components/home/SectionHeading";

export function DumpsterSection() {
  return (
    <HomeSection>
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
        <div className="order-2 lg:order-1">
          <SectionHeading
            title="Caixa coletora com capacidade de 6 m³"
            description="Espaço adequado para resíduos de construção e reforma, com mais organização e praticidade durante o descarte na obra em Manaus."
          />

          <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-landing-border sm:grid-cols-2">
            {HOME_DUMPSTER_HIGHLIGHTS.map((item) => (
              <div key={item.label} className="bg-white px-5 py-4">
                <dt className="text-[11px] font-medium tracking-[0.16em] text-landing-muted uppercase">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-landing-black sm:text-[15px]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <HomeLinkButton href={HOME_CTA.href} className="sm:w-auto sm:min-w-[15rem]">
              {HOME_CTA.dumpsterLabel}
            </HomeLinkButton>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <HomeImage
            src={HOME_IMAGES.hero.src}
            alt={HOME_IMAGES.hero.alt}
            width={HOME_IMAGES.hero.width}
            height={HOME_IMAGES.hero.height}
            sizes="(max-width: 1024px) 100vw, 46vw"
            containerClassName="bg-white"
          />
        </div>
      </div>
    </HomeSection>
  );
}
