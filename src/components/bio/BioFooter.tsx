import { BIO_FOOTER } from "@/constants/bio";

export function BioFooter() {
  return (
    <footer className="mt-auto border-t border-white/8 pt-8 text-center">
      <p className="font-[family-name:var(--font-oswald)] text-[13px] font-medium tracking-[0.08em] text-zinc-300 uppercase">
        {BIO_FOOTER.name}
      </p>
      <p className="mt-2 text-[13px] text-zinc-500">{BIO_FOOTER.tagline}</p>

      <address className="mt-5 space-y-1.5 text-[13px] not-italic text-zinc-400">
        <p>
          <a
            href={`tel:+5592985946242`}
            className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-landing-gold"
          >
            {BIO_FOOTER.phone}
          </a>
        </p>
        <p>
          <a
            href={`mailto:${BIO_FOOTER.email}`}
            className="break-all transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-landing-gold"
          >
            {BIO_FOOTER.email}
          </a>
        </p>
        <p>
          <a
            href={BIO_FOOTER.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-landing-gold"
          >
            {BIO_FOOTER.instagram}
          </a>
        </p>
      </address>

      <p className="mt-6 text-[11px] text-zinc-600">{BIO_FOOTER.copyright}</p>
    </footer>
  );
}
