import Link from "next/link";
import Media from "@/components/ui/Media";
import { categories } from "@/data/categories";

/** Grandes familles en cartes avec image (2 colonnes sur mobile). */
export default function FamilyGrid() {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
      {categories.map((c) => (
        <li key={c.slug}>
          <Link
            href={c.href}
            className="card-lift group block overflow-hidden rounded-2xl bg-white border border-line shadow-[0_1px_2px_rgba(23,60,50,0.06),0_6px_18px_rgba(23,60,50,0.05)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Media
                src={c.image}
                alt=""
                art={c.art}
                tone={c.tone}
                variant="scene"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </div>
            <div className="p-4">
              <h2 className="font-display text-xl leading-tight text-green">{c.name}</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">{c.sousCategories.length} sous-catégories</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
