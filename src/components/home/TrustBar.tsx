import { HOME_TRUST_ITEMS } from "@/constants/home";

export function TrustBar() {
  return (
    <section
      aria-label="Destaques do serviço"
      className="border-y border-landing-border bg-landing-subtle"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 md:gap-0 md:py-9">
        {HOME_TRUST_ITEMS.map((item, index) => (
          <div
            key={item.title}
            className="md:border-r md:border-landing-border md:px-6 md:last:border-r-0 md:first:pl-0"
          >
            <p className="text-sm font-semibold text-landing-black sm:text-[15px]">
              {item.title}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-landing-muted sm:text-sm">
              {item.description}
            </p>
            {index < HOME_TRUST_ITEMS.length - 1 ? (
              <div className="mt-4 h-px bg-landing-border md:hidden" />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
