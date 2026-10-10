import type { Badge, Product } from "@/types/catalog";
import { besoins } from "@/data/besoins";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import raw from "./products.json";

/**
 * Catalogue : généré depuis products.csv par `npm run catalogue` (src/data/products.json).
 * Ne pas coder de produit ici.
 */
type Entry = {
  id: string;
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
  id: e.id,
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
const avecPhoto = (p: Product) => p.images.length > 0;

/**
 * Nouveautés : produits marqués « Nouveau » dans le catalogue (colonne badge) ; sinon, faute de badge,
 * les 8 derniers produits ajoutés au catalogue (ids les plus élevés) qui ont une photo.
 */
export const newProducts = (() => {
  const marked = products.filter((p) => p.badge?.kind === "new" && avecPhoto(p));
  return marked.length > 0 ? marked : [...products.filter(avecPhoto)].sort((a, b) => b.id!.localeCompare(a.id!)).slice(0, 8);
})();

/**
 * Produits phares (accueil) : uniquement des produits avec photo, ceux qui ont un prix d'abord.
 * Le catalogue ne contient aucune donnée de ventes : la sélection suit l'ordre du catalogue.
 */
export const bestSellers = [...products.filter(avecPhoto)].sort((a, b) => Number(b.price != null) - Number(a.price != null)).slice(0, 12);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

/** Un produit est dans sa famille principale ET dans celles de `aussiDans`. */
export const inFamille = (p: Product, famille: string) => p.famille === famille || p.aussiDans.includes(famille);
export const byFamille = (famille: string) => products.filter((p) => inFamille(p, famille));

/** Familles, besoins et marques qui ont au moins un produit : seuls ceux-là sont proposés dans la navigation. */
export const famillesAvecProduits = categories.filter((c) => byFamille(c.slug).length > 0);
export const besoinsAvecProduits = besoins.filter((b) => products.some((p) => p.besoins?.includes(b.slug)));
export const brandCount = (name: string) => products.filter((p) => p.brand === name).length;
export const brandsAvecProduits = brands.filter((b) => brandCount(b.name) > 0);

/** Lien de menu ou de pied de page : masqué tant que la page qu'il ouvre n'a aucun produit. */
export const lienVisible = (href: string) => {
  if (href === "/promotions") return promoProducts.length > 0;
  if (href === "/nouveautes") return newProducts.length > 0;
  const fam = href.match(/^\/boutique\/([^/]+)$/)?.[1];
  return fam ? byFamille(fam).length > 0 : true;
};

/** « Vous aimerez aussi » : liste explicite, sinon produits de la même famille, sinon des autres familles où le produit figure. */
export const getRelated = (p: Product) =>
  (p.relatedSlugs
    ? p.relatedSlugs.map(getProduct).filter((x): x is Product => Boolean(x))
    : [p.famille, ...p.aussiDans]
        .map((f) => byFamille(f).filter((x) => x.slug !== p.slug))
        .find((liste) => liste.length > 0) ?? []
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
