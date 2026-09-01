import { SITE } from "@/constants/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-border bg-brand-surface">
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
        <p className="text-xs text-brand-muted sm:text-sm">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
