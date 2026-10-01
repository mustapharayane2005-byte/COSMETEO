import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { categories } from "@/data/categories";
import { allProducts } from "@/data/products";

type Props = { params: Promise<{ categorie: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ categorie: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorie } = await params;
  const cat = categories.find((c) => c.slug === categorie);
  return { title: cat ? cat.name : "Boutique" };
}

export default async function CategoryPage({ params }: Props) {
  const { categorie } = await params;
  const cat = categories.find((c) => c.slug === categorie);
  if (!cat) notFound();
  return (
    <CatalogPage
      title={cat.name}
      products={allProducts.filter((p) => p.category === cat.slug)}
      filter={{ active: cat.slug }}
    />
  );
}
