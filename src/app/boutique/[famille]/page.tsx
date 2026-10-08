import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { categories, getFamille } from "@/data/categories";
import { allProducts, byFamille } from "@/data/products";

type Props = { params: Promise<{ famille: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ famille: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { famille } = await params;
  return { title: getFamille(famille)?.name ?? "Boutique" };
}

export default async function FamillePage({ params }: Props) {
  const { famille } = await params;
  const fam = getFamille(famille);
  if (!fam) notFound();
  const products = byFamille(fam.slug);
  // Sous-catégories : seulement si le catalogue les renseigne (sinon pastilles vers des pages vides).
  const hasSubs = products.some((p) => p.sousCategorie);
  return (
    <CatalogPage
      title={fam.name}
      crumbs={[{ label: "Boutique", href: "/boutique" }]}
      chips={hasSubs ? fam.sousCategories.map((s) => ({ label: s.name, href: `${fam.href}/${s.slug}` })) : undefined}
      products={products}
    />
  );
}
