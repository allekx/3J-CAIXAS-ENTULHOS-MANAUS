import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import { Benefits } from "@/components/home/Benefits";
import { ConversionCTA } from "@/components/home/ConversionCTA";
import { FaqSection } from "@/components/home/FaqSection";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { HomeStructuredData } from "@/components/home/HomeStructuredData";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Location } from "@/components/home/Location";
import { ServiceGallery } from "@/components/home/ServiceGallery";
import { ServiceSection } from "@/components/home/ServiceSection";
import { TrustBar } from "@/components/home/TrustBar";
import { WhatsAppButton } from "@/components/home/WhatsAppButton";
import {
  HOME_COMPANY,
  HOME_IMAGES,
  HOME_METADATA,
} from "@/constants/home";
import { ROUTES } from "@/constants/site";
import { getSiteUrl } from "@/lib/seo/site-url";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: HOME_METADATA.title,
  description: HOME_METADATA.description,
  keywords: [...HOME_METADATA.keywords],
  alternates: {
    canonical: ROUTES.home,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: HOME_METADATA.title,
    description: HOME_METADATA.description,
    locale: "pt_BR",
    type: "website",
    url: ROUTES.home,
    siteName: HOME_COMPANY.commercialName,
    images: [
      {
        url: HOME_IMAGES.og.src,
        width: HOME_IMAGES.og.width,
        height: HOME_IMAGES.og.height,
        alt: HOME_IMAGES.og.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_METADATA.title,
    description: HOME_METADATA.description,
    images: [HOME_IMAGES.og.src],
  },
};

export default function HomePage() {
  return (
    <div className={`${oswald.variable} bg-white text-landing-black antialiased`}>
      <HomeStructuredData />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <ServiceSection />
        <HowItWorks />
        <ServiceGallery />
        <Benefits />
        <Location />
        <FaqSection />
        <ConversionCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
