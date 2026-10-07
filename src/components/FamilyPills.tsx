import CategoryBubble from "@/components/CategoryBubble";
import { categories } from "@/data/categories";

/** Pastilles rondes des familles. Rail horizontal natif (overflow-x, aucun JS de drag) ; centré en desktop. */
export default function FamilyPills() {
  return (
    <section className="pt-11 lg:pt-14" aria-label="Familles de produits">
      <ul data-reveal className="flex snap-x snap-proximity gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain px-[var(--gutter)] pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [touch-action:pan-x_pan-y] min-[1280px]:justify-center md:gap-5 [&::-webkit-scrollbar]:hidden">
        {categories.map((c) => (
          <li key={c.slug} className="shrink-0 snap-start">
            <CategoryBubble id={c.id} name={c.name} href={c.href} fond={c.fond} trait={c.trait} />
          </li>
        ))}
      </ul>
    </section>
  );
}
