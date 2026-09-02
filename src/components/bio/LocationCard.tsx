import { ExternalLink, MapPin } from "lucide-react";
import { BIO_LINKS, BIO_LOCATION } from "@/constants/bio";
import { BioLinkButton } from "@/components/bio/BioLinkButton";
import { MapEmbed } from "@/components/bio/MapEmbed";

export function LocationCard() {
  return (
    <section aria-labelledby="bio-location-title" className="mt-2">
      <h2
        id="bio-location-title"
        className="text-center font-[family-name:var(--font-oswald)] text-sm font-medium tracking-[0.14em] text-zinc-400 uppercase"
      >
        {BIO_LOCATION.title}
      </h2>

      <div className="mt-3.5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4">
        <div className="flex items-start gap-3 text-left">
          <span
            className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-landing-blue/15 text-landing-blue"
            aria-hidden="true"
          >
            <MapPin className="size-4" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-medium text-white">
              {BIO_LOCATION.city}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-zinc-400">
              {BIO_LOCATION.addressLine}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <MapEmbed />
        </div>

        <div className="mt-4">
          <BioLinkButton
            href={BIO_LINKS.googleMaps}
            title="Abrir no Google Maps"
            subtitle="Ver rota e localização"
            icon={ExternalLink}
            external
          />
        </div>
      </div>
    </section>
  );
}
