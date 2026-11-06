import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { allProducts, byFamille, cadeauxProducts, familleVisible, newProducts, promoProducts, topVentesProducts } from "@/data/products";

/** Entrée de la barre principale (calculée côté serveur, sérialisable pour le composant client). */
export type NavEntry = {
  label: string;
  href: string;
  /** Marques présentes dans la catégorie (panneau au survol) ; absent pour les rubriques sans panneau. */
  brands?: { name: string; href: string }[];
};

export type NavData = { primary: NavEntry[]; more: NavEntry[]; secondary: NavEntry[] };

const brandsOf = (famille: string) => {
  const noms = new Set(byFamille(famille).filter((p) => p.famille !== "accessoires" && p.brand).map((p) => p.brand));
  return brands
    .filter((b) => noms.has(b.name))
    .sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }))
    .map((b) => ({ name: b.name, href: `/marques/${b.slug}` }));
};

const cat = (slug: string, label?: string): NavEntry | null => {
  const c = categories.find((x) => x.slug === slug);
  if (!c || !familleVisible(slug)) return null;
  return { label: label ?? c.name, href: c.href, brands: brandsOf(slug) };
};

const notNull = <T,>(x: T | null): x is T => x !== null;

/** Barre principale : Top ventes · Cadeaux · Visage · Corps · Cheveux · Soin bébé · Hygiène · Santé & Bien-être · Marques · Conseils. */
export function buildNav(): NavData {
  const primary: NavEntry[] = [
    topVentesProducts.length > 0 ? { label: "Top ventes", href: "/top-ventes" } : null,
    cadeauxProducts.length > 0 ? { label: "Cadeaux", href: "/cadeaux" } : null,
    cat("visage"),
    cat("corps"),
    cat("cheveux"),
    cat("bebe-enfant", "Soin bébé"),
    cat("hygiene"),
    cat("sante-bien-etre"),
    { label: "Marques", href: "/marques" },
    { label: "Conseils", href: "/conseils" },
  ].filter(notNull);

  // Catégories qui ne tiennent pas dans la barre : menu « Plus » (aucune n'est retirée du site).
  const dansBarre = new Set(primary.map((e) => e.href));
  const more: NavEntry[] = [
    ...categories.map((c) => cat(c.slug)).filter(notNull).filter((e) => !dansBarre.has(e.href)),
    { label: "Toute la boutique", href: "/boutique" },
    ...(promoProducts.length > 0 ? [{ label: "Promotions", href: "/promotions" }] : []),
    ...(newProducts.length > 0 && allProducts.length > 0 ? [{ label: "Nouveautés", href: "/nouveautes" }] : []),
  ];

  const secondary: NavEntry[] = [
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ];
  return { primary, more, secondary };
}
