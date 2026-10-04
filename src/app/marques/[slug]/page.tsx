import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import ProductGrid from "@/components/ProductGrid";
import Button from "@/components/ui/Button";
import { brands, getBrand } from "@/data/brands";
import { getBrandType } from "@/data/brandTypes";
import { allProducts } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: getBrand(slug)?.name ?? "Marques" };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();
  const products = allProducts.filter((p) => p.brand === brand.name);
  return (
    <PageShell>
      <section className="container pb-[clamp(56px,8vw,112px)]">
        <header className="pb-6 pt-10 lg:pb-8 lg:pt-14" data-reveal>
          <nav aria-label="Fil d'Ariane" className="mb-4 flex flex-wrap gap-x-2 font-ui text-xs text-[#252525]/70">
            <Link href="/marques" className="hover:underline">
              Nos marques
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{brand.name}</span>
          </nav>
          <p className="flex flex-wrap gap-x-3 font-ui text-[11px] font-medium uppercase tracking-[0.12em] text-[#173C32]/65">
            {brand.types.length > 0
              ? brand.types.map((id) => <span key={id}>{getBrandType(id)?.label}</span>)
              : <span>Sélection</span>}
          </p>
          <h1 className="mt-2 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.1] text-[#173C32]">
            {brand.name}
          </h1>
          <p className="mt-3 font-ui text-sm text-[#252525]/70">
            {products.length > 0 ? `${products.length} produit${products.length > 1 ? "s" : ""}` : "Bientôt disponible"}
          </p>
        </header>

        {products.length > 0 ? (
          <ProductGrid products={products} columns={4} />
        ) : (
          <div className="grid place-items-center gap-5 rounded-2xl border border-[#EDE8E0] bg-[#FAF8F4] px-6 py-16 text-center">
            <p className="font-display text-2xl text-[#173C32]">Les produits de cette marque arrivent bientôt.</p>
            <Button href="/boutique" variant="secondary">
              VOIR TOUTE LA BOUTIQUE
            </Button>
          </div>
        )}
      </section>
    </PageShell>
  );
}
