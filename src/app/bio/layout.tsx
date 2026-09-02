import type { ReactNode } from "react";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export default function BioLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${oswald.variable} min-h-dvh bg-[#050608] text-white`}>
      <div className="relative mx-auto min-h-dvh w-full max-w-[480px] bg-landing-black shadow-[0_0_0_1px_rgba(255,255,255,0.04)] sm:my-0 sm:min-h-dvh">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(255,196,0,0.08),transparent_70%)]"
        />
        {children}
      </div>
    </div>
  );
}
