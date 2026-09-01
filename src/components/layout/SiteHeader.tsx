import Link from "next/link";
import { ROUTES, SITE } from "@/constants/site";

export function SiteHeader() {
  return (
    <header className="border-b-4 border-brand-gold bg-brand-black text-white">
      <div className="mx-auto flex min-h-16 max-w-5xl items-center gap-3 px-4 py-3 sm:min-h-[4.5rem] sm:gap-4 sm:px-6">
        <Link
          href={ROUTES.home}
          className="flex min-w-0 items-center gap-3 text-white"
        >
          <span className="flex size-10 shrink-0 items-center justify-center bg-brand-gold text-sm font-bold tracking-wide text-brand-black sm:size-11 sm:text-base">
            {SITE.shortName}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-wide sm:text-base">
              {SITE.name}
            </span>
            <span className="mt-0.5 block text-xs text-zinc-300">
              Caixas coletoras de entulho
            </span>
          </span>
        </Link>
      </div>
    </header>
  );
}
