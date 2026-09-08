import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { HOME_COMPANY } from "@/constants/home";
import { SITE } from "@/constants/site";
import { getSiteUrl } from "@/lib/seo/site-url";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: HOME_COMPANY.commercialName,
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  icons: {
    icon: [
      { url: "/icons/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icons/icon-48.png"],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: HOME_COMPANY.commercialName,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} font-sans antialiased text-brand-black`}
      >
        {children}
      </body>
    </html>
  );
}
