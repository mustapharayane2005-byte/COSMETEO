import Link from "next/link";
import BesoinCard from "@/components/BesoinCard";
import { besoins } from "@/data/besoins";

/** En-tête commun : label, titre, sous-titre et lien « Voir tous les besoins » (desktop, à droite). */
export function BesoinsHeader({ h = "h2", showLink = true }: { h?: "h1" | "h2"; showLink?: boolean }) {
  const H = h;
  return (
    <header className="relative mb-8 text-center" data-reveal>
      <p className="flex items-center justify-center gap-2.5 font-ui text-xs font-medium uppercase tracking-[0.2em] text-[#D99A9A]">
        <span aria-hidden="true" className="h-px w-5 bg-[#D99A9A]" />
        CONSEIL PERSONNALISÉ
      </p>
      <H id="besoins-title" className="h2 mt-3">
        Que recherchez-vous ?
      </H>
      <p className="mx-auto mt-3 max-w-[520px] font-ui text-base text-[#252525]">
        Choisissez votre besoin, nous vous montrons les produits adaptés.
      </p>
      {showLink && (
        <Link
          href="/besoins"
          className="absolute bottom-1 right-0 hidden font-ui text-sm font-semibold text-[#173C32] hover:underline lg:block"
        >
          Voir tous les besoins →
        </Link>
      )}
    </header>
  );
}

/** Bloc « Que recherchez-vous ? » : accueil et tête de /boutique. Rail natif à 2 rangées sur mobile. */
export default function BesoinsBlock() {
  return (
    <section className="py-14 lg:py-[72px]" aria-labelledby="besoins-title">
      <div className="container max-w-[1200px]">
        <BesoinsHeader />
      </div>
      <ul data-reveal className="grid auto-cols-[62vw] grid-flow-col grid-rows-[repeat(2,auto)] gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-px-5 snap-x snap-proximity px-5 pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [touch-action:pan-x_pan-y] md:auto-cols-[34vw] lg:mx-auto lg:w-[min(100%-64px,1200px)] lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-4 lg:grid-rows-none lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {besoins.map((b, i) => (
          <li key={b.slug} className={`snap-start ${i >= 8 ? "lg:hidden" : ""}`}>
            <BesoinCard besoin={b} />
          </li>
        ))}
      </ul>
      <div className="container mt-8 hidden justify-center lg:flex">
        <Link
          href="/besoins"
          className="inline-flex min-h-12 items-center rounded-full border border-[#173C32] px-8 font-ui text-sm font-semibold uppercase tracking-[0.04em] text-[#173C32] transition-colors hover:bg-[#173C32] hover:text-white"
        >
          Voir tous les besoins
        </Link>
      </div>
    </section>
  );
}
