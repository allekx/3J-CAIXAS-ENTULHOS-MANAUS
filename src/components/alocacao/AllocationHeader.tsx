"use client";

import Image from "next/image";
import { useState } from "react";
import { SITE } from "@/constants/site";

export function AllocationHeader() {
  const [logoState, setLogoState] = useState<"pending" | "ready" | "missing">(
    "pending",
  );

  return (
    <header className="border-b-4 border-brand-gold bg-brand-black text-white">
      <div className="mx-auto flex min-h-16 max-w-[800px] items-center gap-3 px-4 py-3 sm:min-h-[4.5rem] sm:px-6">
        {logoState !== "missing" ? (
          <Image
            src="/logos/logo-3j.png"
            alt={SITE.name}
            width={180}
            height={48}
            priority
            onLoad={() => setLogoState("ready")}
            onError={() => setLogoState("missing")}
            className={
              logoState === "ready"
                ? "h-10 w-auto max-w-[180px] object-contain sm:h-11"
                : "pointer-events-none absolute h-0 w-0 opacity-0"
            }
          />
        ) : null}

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-wide sm:text-base">
            {SITE.name}
          </p>
          <p className="mt-0.5 text-xs text-zinc-300">
            Confirmação de alocação
          </p>
        </div>
      </div>
    </header>
  );
}
