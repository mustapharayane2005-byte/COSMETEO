"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import BrandTile, { type BrandTileData } from "@/components/BrandTile";
import Icon from "@/components/ui/Icon";
import { brandTypes } from "@/data/brandTypes";

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const btn =
  "inline-flex min-h-12 items-center rounded-full bg-[#173C32] px-8 font-ui text-sm font-semibold uppercase tracking-[0.04em] text-white hover:bg-[#0f2a22]";

/**
 * Filtre par univers via l'URL (?univers=k-beauty, sans cartes), recherche en direct, « À la une » et grille complète.
 * Rendu côté client : fondu en CSS pur, aucun écouteur scroll/wheel/touchmove.
 */
export default function BrandCatalog({ brands }: { brands: BrandTileData[] }) {
  const params = useSearchParams();
  const active = brandTypes.find((t) => t.id === params.get("univers"));
  const [q, setQ] = useState("");
  const needle = norm(q.trim());

  const list = useMemo(
    () =>
      brands
        .filter((b) => (!active || b.types.includes(active.id)) && (!needle || norm(b.name).includes(needle)))
        .sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" })),
    [brands, active, needle],
  );
  const featured = brands.filter((b) => b.featured);
  const showFeatured = !active && !needle;
  const fade = "motion-safe:animate-[revealFade_0.5s_ease-out]";

  return (
    <>
      {/* 2. Recherche */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-[460px]">
          <label htmlFor="brand-search" className="sr-only">
            Rechercher une marque
          </label>
          <Icon name="search" className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-[#1A1A1A]" />
          <input
            id="brand-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher une marque…"
            className="h-[52px] w-full rounded-full border border-[#E3DDD3] bg-white pl-12 pr-5 font-ui text-base outline-none placeholder:text-[#6B6B68] focus-visible:border-[#173C32]"
          />
        </div>
        <p aria-live="polite" className="font-ui text-[13px] text-[#252525]/70">
          {list.length} marque{list.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* 3. À la une : seulement sans filtre ni recherche */}
      {showFeatured && featured.length > 0 && (
        <section aria-label="À la une" className={`mt-10 ${fade}`}>
          <h2 className="mb-4 font-display text-[1.5rem] font-normal leading-tight text-[#1A1A1A]">À la une</h2>
          <ul className="-mx-5 flex snap-x snap-proximity gap-3 overflow-x-auto overscroll-x-contain px-5 pb-2 [scrollbar-width:none] [touch-action:pan-x_pan-y] lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
            {featured.map((b, i) => (
              <li key={b.slug} className="w-[60vw] shrink-0 snap-start sm:w-[36vw] lg:w-auto">
                <BrandTile brand={b} index={i} large />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 4. Grille complète */}
      <section aria-label="Toutes les marques" className="mt-10">
        {showFeatured && <h2 className="mb-4 font-display text-[1.5rem] font-normal leading-tight text-[#1A1A1A]">Toutes les marques</h2>}
        {list.length === 0 ? (
          <div className="grid place-items-center gap-5 rounded-2xl border border-[#EDE8E0] bg-[#FAF8F4] px-6 py-16 text-center">
            <p className="font-display text-2xl text-[#1A1A1A]">
              {active?.id === "nutribeauty" && !needle ? "Les marques Nutribeauty arrivent bientôt." : "Aucune marque ne correspond."}
            </p>
            <Link href="/marques" replace scroll={false} onClick={() => setQ("")} className={btn}>
              Voir toutes les marques
            </Link>
          </div>
        ) : (
          <ul className={`grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 ${fade}`}>
            {list.map((b, i) => (
              <li key={b.slug}>
                <BrandTile brand={b} index={i + 2} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
