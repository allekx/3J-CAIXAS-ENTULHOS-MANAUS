import { HOME_BENEFITS } from "@/constants/home";
import { HomeReveal } from "@/components/home/HomeReveal";
import { HomeSection } from "@/components/home/HomeSection";
import { SectionHeading } from "@/components/home/SectionHeading";

export function Benefits() {
  return (
    <HomeSection tone="subtle">
      <HomeReveal>
        <SectionHeading
          align="center"
          title="Por que escolher a 3J Caixas Entulhos"
        />
      </HomeReveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {HOME_BENEFITS.map((benefit, index) => (
          <HomeReveal
            key={benefit.title}
            as="article"
            delay={index * 90}
            className="border-t border-landing-gold/80 pt-5 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-landing-gold motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <p className="text-xs font-medium tracking-[0.18em] text-landing-muted uppercase">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-base font-semibold text-landing-black">
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-landing-muted">
              {benefit.description}
            </p>
          </HomeReveal>
        ))}
      </div>
    </HomeSection>
  );
}
