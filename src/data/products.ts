import type { Badge, Product } from "@/types/catalog";
import { categories } from "@/data/categories";
import raw from "./products.json";

/**
 * Catalogue : généré depuis products.csv par `npm run catalogue` (src/data/products.json).
 * Ne pas coder de produit ici.
 */
type Entry = {
  slug: string;
  name: string;
  brand: string;
  famille: string;
  aussiDans: string[];
  format?: string;
  price?: number;
  oldPrice?: number;
  stock: string;
  description?: string;
  image?: string;
  badge?: string;
};

const toBadge = (label?: string): Badge | undefined => {
  if (!label) return undefined;
  const n = label.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const kind = n.includes("nouv") ? "new" : n.includes("promo") || n.includes("%") ? "promo" : "highlight";
  return { label, kind };
};

const products: Product[] = (raw as Entry[]).map((e) => ({
  slug: e.slug,
  name: e.name,
  brand: e.brand,
  famille: e.famille,
  aussiDans: e.aussiDans,
  format: e.format,
  price: e.price,
  oldPrice: e.oldPrice,
  badge: toBadge(e.badge),
  images: e.image ? [e.image] : [],
  description: e.description,
  inStock: e.stock !== "indisponible",
  art: "bottle",
  tone: "sage",
}));

export const allProducts: Product[] = products;
export const promoProducts = products.filter((p) => p.oldPrice);
export const newProducts = products.filter((p) => p.badge?.kind === "new");
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

/** Un produit est dans sa famille principale ET dans celles de `aussiDans`. */
export const inFamille = (p: Product, famille: string) => p.famille === famille || p.aussiDans.includes(famille);
export const byFamille = (famille: string) => products.filter((p) => inFamille(p, famille));

/** « Vous aimerez aussi » : liste explicite, sinon produits de la même famille. */
export const getRelated = (p: Product) =>
  (p.relatedSlugs
    ? p.relatedSlugs.map(getProduct).filter((x): x is Product => Boolean(x))
    : byFamille(p.famille).filter((x) => x.slug !== p.slug)
  ).slice(0, 8);

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Recherche simple : nom, marque, catégorie(s). Tous les mots doivent être trouvés. */
export const searchProducts = (query: string): Product[] => {
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  return products.filter((p) => {
    const noms = [p.famille, ...p.aussiDans].map((slug) => categories.find((c) => c.slug === slug)?.name ?? slug);
    const hay = norm([p.name, p.brand, ...noms].join(" "));
    return words.every((w) => hay.includes(w));
  });
};
