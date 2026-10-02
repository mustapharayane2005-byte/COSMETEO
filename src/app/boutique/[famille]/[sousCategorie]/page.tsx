import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { categories, getFamille, getSousCategorie } from "@/data/categories";
import { allProducts } from "@/data/products";

type Props = { params: Promise<{ famille: string; sousCategorie: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.flatMap((c) => c.sousCategories.map((s) => ({ famille: c.slug, sousCategorie: s.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { famille, sousCategorie } = await params;
  const fam = getFamille(famille);
  const sub = getSousCategorie(famille, sousCategorie);
  return { title: fam && sub ? `${sub.name} – ${fam.name}` : "Boutique" };
}

export default async function SousCategoriePage({ params }: Props) {
  const { famille, sousCategorie } = await params;
  const fam = getFamille(famille);
  const sub = getSousCategorie(famille, sousCategorie);
  if (!fam || !sub) notFound();
  return (
    <CatalogPage
      title={sub.name}
      crumbs={[
        { label: "Boutique", href: "/boutique" },
        { label: fam.name, href: fam.href },
      ]}
      chips={fam.sousCategories.map((s) => ({
        label: s.name,
        href: `${fam.href}/${s.slug}`,
        active: s.slug === sub.slug,
      }))}
      products={allProducts.filter((p) => p.famille === fam.slug && p.sousCategorie === sub.slug)}
    />
  );
}
