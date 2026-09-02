import type { Metadata } from "next";
import { BioPage } from "@/components/bio/BioPage";
import { BIO_METADATA, BIO_PROFILE } from "@/constants/bio";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: BIO_METADATA.title,
  description: BIO_METADATA.description,
  alternates: {
    canonical: "/bio",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: BIO_METADATA.title,
    description: BIO_METADATA.description,
    locale: "pt_BR",
    type: "website",
    url: "/bio",
    siteName: "3J Caixas Entulhos Manaus",
    images: [
      {
        url: BIO_PROFILE.logoSrc,
        width: 96,
        height: 96,
        alt: BIO_PROFILE.logoAlt,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: BIO_METADATA.title,
    description: BIO_METADATA.description,
    images: [BIO_PROFILE.logoSrc],
  },
};

export default function BioRoutePage() {
  return <BioPage />;
}
