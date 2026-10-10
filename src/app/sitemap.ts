import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { articles } from "@/data/conseils";
import { allProducts, besoinsAvecProduits, brandsAvecProduits, byFamille, lienVisible } from "@/data/products";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cosmeteo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  // Pages sans produit (familles, sous-catégories, besoins, marques, promotions…) : absentes du plan du site.
  const pages = ["", "/boutique", "/nouveautes", "/promotions", "/marques", "/conseils", "/a-propos", "/contact"].filter(lienVisible);
  const urls = [
    ...pages,
    ...categories.flatMap((c) => [
      ...(byFamille(c.slug).length > 0 ? [`/boutique/${c.slug}`] : []),
      ...c.sousCategories
        .filter((s) => byFamille(c.slug).some((p) => p.sousCategorie === s.slug))
        .map((s) => `/boutique/${c.slug}/${s.slug}`),
    ]),
    ...besoinsAvecProduits.map((b) => `/besoins/${b.slug}`),
    ...brandsAvecProduits.map((b) => `/marques/${b.slug}`),
    ...articles.map((a) => `/conseils/${a.slug}`),
    ...allProducts.map((p) => `/produit/${p.slug}`),
  ];
  return urls.map((u) => ({ url: `${base}${u}` }));
}
