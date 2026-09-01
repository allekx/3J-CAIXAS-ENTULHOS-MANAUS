"use client";

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
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-sm font-semibold tracking-wide">{SITE.name}</p>
          <p className="mt-1 text-xs text-zinc-400">Painel administrativo</p>
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

      <div className="lg:pl-64">
        <header className="flex items-center justify-between border-b border-brand-border bg-white px-4 py-3 lg:hidden">
          <p className="text-sm font-semibold">{SITE.name}</p>
          <button
            type="button"
            className="flex size-10 items-center justify-center border border-brand-border"
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
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
