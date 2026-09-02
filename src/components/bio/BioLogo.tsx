import Image from "next/image";
import { BIO_PROFILE } from "@/constants/bio";

export function BioLogo() {
  return (
    <div className="relative mx-auto size-[5.25rem] sm:size-[5.75rem]">
      <div
        aria-hidden="true"
        className="absolute -inset-[3px] rounded-full motion-safe:animate-[bio-spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,196,0,0.2)_50deg,rgba(255,196,0,0.95)_130deg,rgba(29,91,191,0.45)_220deg,transparent_300deg)] opacity-90"
      />
      <div
        aria-hidden="true"
        className="absolute -inset-px rounded-full bg-gradient-to-br from-landing-gold/30 via-white/5 to-landing-blue/20"
      />
      <div className="absolute inset-[3px] overflow-hidden rounded-full bg-landing-black shadow-[0_0_24px_rgba(255,196,0,0.12)] ring-1 ring-white/15">
        <Image
          src={BIO_PROFILE.logoSrc}
          alt={BIO_PROFILE.logoAlt}
          width={96}
          height={96}
          priority
          className="h-full w-full scale-[1.06] rounded-full object-cover object-center"
        />
      </div>
    </div>
  );
}
