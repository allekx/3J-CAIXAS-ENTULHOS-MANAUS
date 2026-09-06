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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-[border-color,box-shadow] duration-300",
        scrolled
          ? "border-landing-border shadow-[0_8px_30px_rgba(8,10,13,0.06)]"
          : "border-landing-border/80 shadow-none",
      )}
    >
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
              className="relative text-sm text-landing-muted transition-colors hover:text-landing-black after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-brand-gold after:transition-transform after:duration-300 hover:after:scale-x-100"
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
          className="inline-flex size-10 items-center justify-center rounded-md text-landing-black ring-1 ring-landing-border transition-colors hover:bg-landing-subtle lg:hidden"
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
