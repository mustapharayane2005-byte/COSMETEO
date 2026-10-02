"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Brand } from "@/types/catalog";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Liste alphabétique des marques (texte uniquement) avec recherche. */
export default function BrandIndex({ brands }: { brands: Brand[] }) {
  const [q, setQ] = useState("");
  const groups = useMemo(() => {
    const needle = norm(q.trim());
    const map = new Map<string, Brand[]>();
    for (const b of brands) {
      if (needle && !norm(b.name).includes(needle)) continue;
      const letter = norm(b.name)[0].toUpperCase();
      map.set(letter, [...(map.get(letter) ?? []), b]);
    }
    return [...map.entries()];
  }, [brands, q]);

  return (
    <>
      <div className="relative max-w-md">
        <label htmlFor="brand-search" className="sr-only">
          Rechercher une marque
        </label>
        <input
          id="brand-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher une marque…"
          className="h-11 w-full rounded-full border border-line bg-white px-5 text-sm outline-none placeholder:text-ink/50 focus-visible:border-green"
        />
      </div>
      {groups.length === 0 ? (
        <p className="lead mt-8">Aucune marque ne correspond à votre recherche.</p>
      ) : (
        <div className="mt-8 grid gap-8">
          {groups.map(([letter, items]) => (
            <section key={letter} aria-label={`Marques en ${letter}`} className="grid gap-3 md:grid-cols-[64px_1fr]">
              <h2 className="font-display text-3xl text-rose">{letter}</h2>
              <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((b) => (
                  <li key={b.slug} className="border-b border-line">
                    <Link href={`/marques/${b.slug}`} className="block py-3 font-medium text-green hover:underline">
                      {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
