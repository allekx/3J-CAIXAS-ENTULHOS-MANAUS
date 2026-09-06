"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { signOutAdmin } from "@/lib/auth/actions";
import { ROUTES, SITE } from "@/constants/site";
import { cn } from "@/lib/utils/cn";

const LOGO_SRC = "/logos/logo-3j-oficial.jpg";

const NAV_ITEMS = [
  {
    href: ROUTES.admin,
    label: "Dashboard",
    icon: LayoutDashboard,
    match: "exact" as const,
  },
  {
    href: ROUTES.adminSolicitacoes,
    label: "Solicitações",
    icon: ClipboardList,
    match: "prefix" as const,
  },
];

type AdminShellProps = {
  children: ReactNode;
  userEmail: string;
};

function AdminBrandMark({
  sizeClassName,
  priority = false,
}: {
  sizeClassName: string;
  priority?: boolean;
}) {
  const [logoReady, setLogoReady] = useState(false);
  const [logoMissing, setLogoMissing] = useState(false);

  return (
    <div className={cn("relative shrink-0", sizeClassName)}>
      <div
        className="absolute inset-[-2px] rounded-full bg-[conic-gradient(from_210deg,#c9a227,#f0d878,#a6851c,#c9a227)] opacity-90"
        aria-hidden="true"
      />
      <div className="absolute inset-[2px] overflow-hidden rounded-full bg-brand-black ring-1 ring-brand-gold/40">
        {!logoMissing ? (
          <Image
            src={LOGO_SRC}
            alt={SITE.name}
            width={160}
            height={160}
            priority={priority}
            onLoad={() => setLogoReady(true)}
            onError={() => setLogoMissing(true)}
            className={cn(
              "size-full object-cover",
              !logoReady && "opacity-0",
            )}
          />
        ) : (
          <span className="flex size-full items-center justify-center px-1 text-[10px] font-bold tracking-wide text-white uppercase">
            {SITE.shortName}
          </span>
        )}
      </div>
    </div>
  );
}

export function AdminShell({ children, userEmail }: AdminShellProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href: string, match: "exact" | "prefix") {
    if (match === "exact") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="min-h-dvh bg-brand-surface">
      {menuOpen ? (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-brand-black text-white transition-transform lg:translate-x-0",
          menuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="border-b border-white/10 border-t-2 border-t-brand-gold px-5 py-5">
          <Link
            href={ROUTES.admin}
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3"
          >
            <AdminBrandMark sizeClassName="size-12" priority />
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-wide text-brand-gold">
                {SITE.name}
              </span>
              <span className="mt-0.5 block text-xs text-zinc-400">
                Painel administrativo
              </span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4" aria-label="Menu administrativo">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href, item.match);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm font-medium",
                      active
                        ? "border-l-2 border-brand-gold bg-white/10 text-brand-gold"
                        : "border-l-2 border-transparent text-zinc-300 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.75}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-white/10 px-3 py-4">
          <p className="truncate px-3 text-xs text-zinc-400">{userEmail}</p>
          <form action={signOutAdmin} className="mt-2">
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              <LogOut aria-hidden="true" className="size-4" strokeWidth={1.75} />
              Sair
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0 lg:pl-64">
        <header className="flex items-center justify-between border-b border-brand-border border-t-2 border-t-brand-gold bg-white px-4 py-3 lg:hidden">
          <Link href={ROUTES.admin} className="flex min-w-0 items-center gap-2.5">
            <AdminBrandMark sizeClassName="size-9" />
            <span className="truncate text-sm font-semibold text-brand-gold">
              {SITE.name}
            </span>
          </Link>
          <button
            type="button"
            className="flex size-10 shrink-0 items-center justify-center border border-brand-border"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </header>
        <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
