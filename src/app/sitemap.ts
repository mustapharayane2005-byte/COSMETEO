import type { MetadataRoute } from "next";
import { besoins } from "@/data/besoins";
import { allBrands } from "@/data/brands";
import { categories } from "@/data/categories";
import { articles } from "@/data/conseils";
import { allProducts } from "@/data/products";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cosmeteo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/boutique", "/nouveautes", "/promotions", "/marques", "/conseils", "/a-propos", "/contact"];
  const urls = [
    ...pages,
    ...categories.flatMap((c) => [`/boutique/${c.slug}`, ...c.sousCategories.map((s) => `/boutique/${c.slug}/${s.slug}`)]),
    ...besoins.map((b) => `/besoins/${b.slug}`),
    ...allBrands.map((b) => `/marques/${b.slug}`),
    ...articles.map((a) => `/conseils/${a.slug}`),
    ...allProducts.map((p) => `/produit/${p.slug}`),
  ];
  return urls.map((u) => ({ url: `${base}${u}` }));
}
