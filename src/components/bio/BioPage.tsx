import { BioFooter } from "@/components/bio/BioFooter";
import { BioLinks } from "@/components/bio/BioLinks";
import { BioProfile } from "@/components/bio/BioProfile";
import { BioReveal } from "@/components/bio/BioReveal";
import { LocationCard } from "@/components/bio/LocationCard";

export function BioPage() {
  return (
    <div className="flex min-h-dvh flex-col px-5 py-8 sm:px-6 sm:py-10">
      <BioReveal>
        <BioProfile />
      </BioReveal>

      <BioReveal delay={90} className="mt-7">
        <BioLinks />
      </BioReveal>

      <BioReveal delay={180} className="mt-7">
        <LocationCard />
      </BioReveal>

      <BioReveal delay={270}>
        <BioFooter />
      </BioReveal>
    </div>
  );
}
