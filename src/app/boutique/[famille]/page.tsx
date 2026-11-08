import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { categories, getFamille } from "@/data/categories";
import { byFamille } from "@/data/products";
import { filtrerProduits, lireFiltres } from "@/data/taxonomie-filtres";

type Props = {
  params: Promise<{ famille: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ famille: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { famille } = await params;
  return { title: getFamille(famille)?.name ?? "Boutique" };
}

export default async function FamillePage({ params, searchParams }: Props) {
  const { famille } = await params;
  const fam = getFamille(famille);
  if (!fam) notFound();
  // Filtres d'adresse facultatifs (?sous_categorie=…), appliqués dans la rubrique (le paramètre categorie est celui de la page).
  const filtres = { ...lireFiltres(await searchParams), categorie: fam.slug };
  const products = filtrerProduits(byFamille(fam.slug), filtres);
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
