"use client";

import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@/types/catalog";

const chip =
  "inline-flex min-h-11 shrink-0 items-center rounded-full border px-5 text-sm font-medium transition-colors";

/** Liste produits avec filtre par marque (pastilles affichées s'il y a au moins 2 marques). */
export default function FilteredProductGrid({ products, columns = 4 }: { products: Product[]; columns?: 4 | 6 }) {
  const [brand, setBrand] = useState<string | null>(null);
  const brands = [...new Set(products.map((p) => p.brand))].sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }));
  const shown = brand ? products.filter((p) => p.brand === brand) : products;

  return (
    <>
      {brands.length > 1 && (
        <div role="group" aria-label="Filtrer par marque" className="-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          {[null, ...brands].map((b) => (
            <button
              key={b ?? "toutes"}
              type="button"
              aria-pressed={brand === b}
              onClick={() => setBrand(b)}
              className={`${chip} ${brand === b ? "border-green bg-green text-ivory" : "border-line bg-white text-[#1A1A1A] hover:border-green"}`}
            >
              {b ?? "Toutes les marques"}
            </button>
          ))}
        </div>
      )}
      <p className="mb-6 text-sm text-[var(--muted)]" aria-live="polite">
        {shown.length} produit{shown.length > 1 ? "s" : ""}
      </p>
      <ProductGrid key={brand ?? "toutes"} products={shown} columns={columns} />
    </>
  );
}
