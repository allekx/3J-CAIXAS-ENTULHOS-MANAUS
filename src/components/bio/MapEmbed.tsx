import { BIO_LOCATION } from "@/constants/bio";

export function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
      <iframe
        title={BIO_LOCATION.mapTitle}
        src={BIO_LOCATION.mapsEmbedUrl}
        className="h-44 w-full border-0 sm:h-48"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
