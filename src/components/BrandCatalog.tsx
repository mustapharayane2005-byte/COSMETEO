"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import BrandTile, { type BrandTileData } from "@/components/BrandTile";
import Icon from "@/components/ui/Icon";
import type { BrandType } from "@/types/catalog";

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const FILTERS: { label: string; type?: BrandType; param?: string }[] = [
  { label: "Toutes" },
  { label: "Dermo-cosmétique", type: "dermo", param: "dermo" },
  { label: "Soins coréens", type: "coreen", param: "coreen" },
  { label: "Grand public", type: "grand-public", param: "grand-public" },
];

/** Recherche en direct + filtres par univers (dans l'URL : ?type=dermo) + grille de cartes. Aucun écouteur scroll. */
export default function BrandCatalog({ brands }: { brands: BrandTileData[] }) {
  const params = useSearchParams();
  const typeParam = params.get("type");
  const active = FILTERS.find((f) => f.param === typeParam) ?? FILTERS[0];
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const needle = norm(q.trim());
    return brands
      .filter((b) => (!active.type || b.type === active.type) && (!needle || norm(b.name).includes(needle)))
      .sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));
  }, [brands, q, active.type]);

  const pill = "inline-flex min-h-11 shrink-0 items-center rounded-full border px-5 font-ui text-sm font-medium transition-colors";

  return (
    <>
      <div className="bg-white pb-4 pt-1 lg:sticky lg:top-[121px] lg:z-[5]">
        <div className="relative lg:max-w-[460px]">
          <label htmlFor="brand-search" className="sr-only">
            Rechercher une marque
          </label>
          <Icon name="search" className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-[#173C32]" />
          <input
            id="brand-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher une marque…"
            className="h-[52px] w-full rounded-full border border-[#E3DDD3] bg-white pl-12 pr-5 font-ui text-base outline-none placeholder:text-[#6B6B68] focus-visible:border-[#173C32]"
          />
        </div>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <nav
            aria-label="Filtrer par univers"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [touch-action:pan-x_pan-y] lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {FILTERS.map((f) => {
              const on = f === active;
              return (
                <Link
                  key={f.label}
                  href={f.param ? `/marques?type=${f.param}` : "/marques"}
                  replace
                  scroll={false}
                  aria-current={on ? "true" : undefined}
                  className={`${pill} ${on ? "border-[#173C32] bg-[#173C32] text-white" : "border-[#E3DDD3] bg-white text-[#173C32] hover:border-[#173C32]"}`}
                >
                  {f.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center justify-between gap-4 font-ui text-[13px] text-[#252525]/70 lg:justify-end">
            <p aria-live="polite">
              {list.length} marque{list.length > 1 ? "s" : ""}
            </p>
            <label className="flex items-center gap-1.5">
              Trier :
              <select className="rounded-md bg-transparent py-1 font-medium text-[#173C32]" aria-label="Trier les marques" defaultValue="az">
                <option value="az">A–Z</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="grid place-items-center gap-5 rounded-2xl border border-[#EDE8E0] bg-[#FAF8F4] px-6 py-16 text-center">
          <p className="font-display text-2xl text-[#173C32]">Aucune marque ne correspond à votre recherche.</p>
          <Link
            href="/marques"
            replace
            scroll={false}
            onClick={() => setQ("")}
            className="inline-flex min-h-12 items-center rounded-full bg-[#173C32] px-8 font-ui text-sm font-semibold uppercase tracking-[0.04em] text-white hover:bg-[#0f2a22]"
          >
            Voir toutes les marques
          </Link>
        </div>
      ) : (
        <ul data-reveal-stagger className="mt-2 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
          {list.map((b) => (
            <li key={b.slug}>
              <BrandTile brand={b} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
