import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE } from "@/constants/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
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
