import type { Metadata } from "next";
import CatalogPage from "@/components/CatalogPage";
import { searchProducts } from "@/data/products";

export const metadata: Metadata = { title: "Recherche", robots: { index: false } };

type Props = { searchParams: Promise<{ q?: string | string[] }> };

/** Résultats de recherche : nom, marque ou catégorie. */
export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim().slice(0, 80) ?? "";
  const products = searchProducts(query);
  return (
    <CatalogPage
      title={query ? `Résultats pour « ${query} »` : "Recherche"}
      intro={query ? undefined : "Saisissez un produit, une marque ou une catégorie."}
      crumbs={[{ label: "Boutique", href: "/boutique" }]}
      products={products}
    />
  );
}
