import type { Metadata } from "next";
import BesoinsBlock from "@/components/BesoinsBlock";
import FamilyGrid from "@/components/FamilyGrid";
import PageShell from "@/components/PageShell";
import ProductGrid from "@/components/ProductGrid";
import { allProducts } from "@/data/products";

export const metadata: Metadata = { title: "Boutique" };

export default function ShopPage() {
  return (
    <PageShell>
      <div className="container pt-8 md:pt-14">
        <h1 className="h2 !text-[clamp(2.25rem,1.2rem+3.4vw,4rem)]">Boutique</h1>
        <p className="lead mt-3 max-w-xl">Tous nos soins et produits de beauté.</p>
      </div>
      <BesoinsBlock />
      <section className="container pb-10" aria-label="Familles de produits">
        <FamilyGrid />
      </section>
      <section className="container pb-[clamp(56px,8vw,112px)] pt-6" aria-labelledby="all-title">
        <h2 id="all-title" className="h2 mb-8">
          Tous nos produits
        </h2>
        <ProductGrid products={allProducts} columns={4} />
      </section>
    </PageShell>
  );
}
