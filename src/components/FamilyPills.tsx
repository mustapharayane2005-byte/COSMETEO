import Link from "next/link";
import ProductArt from "@/components/ui/ProductArt";
import { categories } from "@/data/categories";
import { pastel } from "@/data/pastels";

const artVars = { "--art-body": "#173c32", "--art-cap": "#f3efe8", "--art-label": "#ffffff" } as React.CSSProperties;

/** Pastilles rondes des familles. Rail horizontal natif (overflow-x, aucun JS de drag). */
export default function FamilyPills() {
  return (
    <section className="pt-11 lg:pt-14" aria-label="Familles de produits">
      <ul data-reveal className="flex gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain px-[var(--gutter)] pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [touch-action:pan-x_pan-y] md:justify-center md:gap-7 [&::-webkit-scrollbar]:hidden">
        {categories.map((c, i) => (
          <li key={c.slug} className="shrink-0">
            <Link href={c.href} className="group flex w-[84px] flex-col items-center gap-2.5 md:w-[100px]">
              <span
                style={{ ...artVars, backgroundColor: pastel(i) }}
                className="grid size-[76px] place-items-center rounded-full border border-line transition-colors group-hover:border-green md:size-[92px]"
              >
                <ProductArt shape={c.art} className="h-[70%] w-auto" />
              </span>
              <span className="text-center font-ui text-xs font-medium text-[#1A1A1A] md:text-sm">{c.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
