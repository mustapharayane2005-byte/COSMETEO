import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { brands, getBrand } from "@/data/brands";
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
  return (
    <CatalogPage
      title={brand.name}
      intro={`Retrouvez ici les produits de la marque ${brand.name}.`}
      crumbs={[{ label: "Nos marques", href: "/marques" }]}
      products={allProducts.filter((p) => p.brand === brand.name)}
    />
  );
}
