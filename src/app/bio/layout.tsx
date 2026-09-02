import type { ReactNode } from "react";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export default function BioLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${oswald.variable} min-h-dvh bg-[#0c0e14] text-white`}
    >
      <div className="relative mx-auto min-h-dvh w-full max-w-[480px] overflow-hidden sm:my-0 sm:min-h-dvh">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,#161b24_0%,#10141c_42%,#0e1118_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[130%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,196,0,0.14),transparent_62%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[38%] -right-16 h-56 w-56 bg-[radial-gradient(circle,rgba(29,91,191,0.09),transparent_68%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-12 left-1/2 h-64 w-[110%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(255,196,0,0.07),transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ring-1 ring-white/[0.06]"
        />

        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
