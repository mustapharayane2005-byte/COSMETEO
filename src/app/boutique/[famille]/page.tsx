import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { categories, getFamille } from "@/data/categories";
import { allProducts } from "@/data/products";

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
  return (
    <CatalogPage
      title={fam.name}
      crumbs={[{ label: "Boutique", href: "/boutique" }]}
      chips={fam.sousCategories.map((s) => ({ label: s.name, href: `${fam.href}/${s.slug}` }))}
      products={allProducts.filter((p) => p.famille === fam.slug)}
    />
  );
}
