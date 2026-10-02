import { banners } from "@/data/home";
import Link from "next/link";

/** Deux bannières côte à côte (empilées sur mobile). Texte seul : aucun packshot de marque. */
export default function PromoBanners() {
  return (
    <section className="container pt-14 lg:pt-20" aria-label="Offres et sélections">
      <ul className="grid gap-4 md:grid-cols-2 lg:gap-6">
        {banners.map((b) => (
          <li
            key={b.id}
            data-reveal
            className={`flex min-h-[220px] flex-col items-start justify-between gap-8 rounded-3xl p-7 lg:min-h-[280px] lg:p-10 ${
              b.theme === "blush" ? "bg-blush" : "bg-sage"
            }`}
          >
            <h2 className="max-w-[18ch] font-display text-[clamp(1.625rem,1.2rem+1.6vw,2.5rem)] leading-[1.1] text-green">
              {b.title}
            </h2>
            <Link
              href={b.href}
              className="inline-flex min-h-12 items-center rounded-full bg-green px-8 font-ui text-sm font-semibold uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#0f2a22]"
            >
              {b.cta}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
