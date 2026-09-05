import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import { About } from "@/components/home/About";
import { Benefits } from "@/components/home/Benefits";
import { ConversionCTA } from "@/components/home/ConversionCTA";
import { DumpsterSection } from "@/components/home/DumpsterSection";
import { FaqSection } from "@/components/home/FaqSection";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { HomeStructuredData } from "@/components/home/HomeStructuredData";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Location } from "@/components/home/Location";
import { RentalSection } from "@/components/home/RentalSection";
import { ServiceGallery } from "@/components/home/ServiceGallery";
import { ServiceSection } from "@/components/home/ServiceSection";
import { TrustBar } from "@/components/home/TrustBar";
import { WhatsAppButton } from "@/components/home/WhatsAppButton";
import { HOME_IMAGES, HOME_METADATA } from "@/constants/home";
import { ROUTES } from "@/constants/site";
import { getSiteUrl } from "@/lib/seo/site-url";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

/**
 * Landing principal em preview interno.
 * A URL pública `/` redireciona para `/bio` até a landing estar pronta.
 */
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: HOME_METADATA.title,
  description: HOME_METADATA.description,
  keywords: [...HOME_METADATA.keywords],
  alternates: {
    canonical: ROUTES.landingPreview,
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: HOME_METADATA.title,
    description: HOME_METADATA.description,
    locale: "pt_BR",
    type: "website",
    url: ROUTES.landingPreview,
    siteName: "3J Caixas Entulhos Manaus",
    images: [
      {
        url: HOME_IMAGES.hero.src,
        width: HOME_IMAGES.hero.width,
        height: HOME_IMAGES.hero.height,
        alt: HOME_IMAGES.hero.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_METADATA.title,
    description: HOME_METADATA.description,
    images: [HOME_IMAGES.hero.src],
  },
};

export default function LandingPreviewPage() {
  return (
    <div className={`${oswald.variable} bg-white text-landing-black antialiased`}>
      <HomeStructuredData />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <ServiceSection />
        <RentalSection />
        <DumpsterSection />
        <HowItWorks />
        <ServiceGallery />
        <Benefits />
        <About />
        <Location />
        <FaqSection />
        <ConversionCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
