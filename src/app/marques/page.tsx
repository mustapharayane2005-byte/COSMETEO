import type { Metadata } from "next";
import { Suspense } from "react";
import BrandCatalog from "@/components/BrandCatalog";
import PageShell from "@/components/PageShell";
import Button from "@/components/ui/Button";
import { brandsAZ } from "@/data/brands";
import { allProducts } from "@/data/products";

export const metadata: Metadata = { title: "Nos marques" };

export default function BrandsPage() {
  // Nombre de produits RÉELS par marque (src/data/products.ts), jamais inventé.
  const tiles = brandsAZ.map((b) => ({
    slug: b.slug,
    name: b.name,
    types: b.types,
    featured: b.featured,
    count: allProducts.filter((p) => p.brand === b.name).length,
  }));
  return (
    <PageShell>
      <section className="container pb-[clamp(56px,8vw,112px)]">
        <header className="pb-6 pt-10 lg:pb-8 lg:pt-14" data-reveal>
          <p className="font-ui text-xs font-medium tracking-[0.2em] text-[#1A1A1A]/70">— NOS MARQUES</p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.1] text-[#1A1A1A]">
            Toutes nos marques, un seul endroit
          </h1>
          <p className="mt-3 max-w-[540px] font-ui text-base text-[#252525]">
            Choisissez un univers ou cherchez une marque, puis découvrez toute sa sélection.
          </p>
        </header>

        <Suspense fallback={null}>
          <BrandCatalog brands={tiles} />
        </Suspense>

        <p className="mt-6 font-ui text-[11px] leading-snug text-[#252525]/60">
          Marques citées à titre d&apos;illustration. Les marques appartiennent à leurs propriétaires respectifs.
        </p>

        <div
          className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#FAF8F4] p-7 sm:flex-row sm:items-center"
          data-reveal
        >
          <p className="font-display text-[clamp(1.4rem,2vw,1.9rem)] leading-[1.1] text-[#1A1A1A]">
            Une marque manque ? Dites-le-nous.
          </p>
          <Button href="/contact" variant="secondary">
            NOUS CONTACTER
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
