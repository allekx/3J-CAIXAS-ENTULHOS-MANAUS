import { BIO_PROFILE } from "@/constants/bio";
import { BioLogo } from "@/components/bio/BioLogo";

export function BioProfile() {
  return (
    <header className="text-center">
      <BioLogo />

      <h1 className="mt-5 font-[family-name:var(--font-oswald)] text-base font-medium tracking-[0.1em] text-white sm:text-lg">
        {BIO_PROFILE.name}
      </h1>
    </header>
  );
}
