"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { HomeLinkButton } from "@/components/home/HomeLinkButton";
import { HOME_COMPANY, HOME_CTA, HOME_NAV } from "@/constants/home";
import { ROUTES } from "@/constants/site";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-landing-border/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href={ROUTES.home} className="flex min-w-0 items-center gap-3">
          <Image
            src="/logos/logo-3j-oficial.jpg"
            alt={HOME_COMPANY.commercialName}
            width={44}
            height={44}
            className="size-10 shrink-0 rounded-full object-cover ring-1 ring-landing-border sm:size-11"
            priority
          />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-brand-gold sm:text-[15px]">
              {HOME_COMPANY.commercialName}
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Navegação principal"
        >
          {HOME_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-landing-muted transition-colors hover:text-landing-black"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <HomeLinkButton
            href={HOME_CTA.href}
            className="min-w-[10.5rem] px-4"
          >
            {HOME_CTA.shortLabel}
          </HomeLinkButton>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md text-landing-black ring-1 ring-landing-border lg:hidden"
          aria-expanded={open}
          aria-controls="home-mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        id="home-mobile-menu"
        className={cn(
          "border-t border-landing-border bg-white lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
          {HOME_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-b border-landing-border/70 py-3.5 text-sm text-landing-black last:border-b-0"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 pb-2">
            <HomeLinkButton href={HOME_CTA.href}>
              {HOME_CTA.shortLabel}
            </HomeLinkButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
