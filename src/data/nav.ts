import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { articles } from "@/data/conseils";
import { univers } from "@/data/home";
import { taxonomieAvecProduits, type RubriqueAvecNombre } from "@/data/taxonomie-filtres";
import { allProducts, byFamille, cadeauxProducts, familleVisible, newProducts, promoProducts, topVentesProducts } from "@/data/products";

/** Entrée de la barre principale (calculée côté serveur, sérialisable pour le composant client). */
export type NavEntry = {
  label: string;
  href: string;
  /** Marques présentes dans la catégorie (panneau au survol) ; absent pour les rubriques sans panneau. */
  brands?: { name: string; href: string }[];
  /** Grand menu de la rubrique (Visage, Corps, Cheveux, Soin bébé) : groupes non vides et cartes. Absent : petit panneau de marques. */
  rubrique?: {
    /** Groupes de la taxonomie : uniquement les entrées qui ont au moins un produit. */
    groupes: RubriqueAvecNombre["groupes"];
    /** Image de la rubrique déjà utilisée sur l'accueil ; absente : carte vert foncé. */
    image?: string;
    imageAlt?: string;
    /** Premier produit de la rubrique portant le badge « Nouveauté » ou « Top vente ». */
    produit?: { name: string; brand: string; href: string; image?: string; badge: string };
    /** Dernier conseil de la rubrique (article dont la famille correspond). */
    conseil?: { title: string; href: string; image?: string };
  };
};

export type NavData = { primary: NavEntry[]; more: NavEntry[]; secondary: NavEntry[] };

const brandsOf = (famille: string) => {
  const noms = new Set(byFamille(famille).filter((p) => p.famille !== "accessoires" && p.brand).map((p) => p.brand));
  return brands
    .filter((b) => noms.has(b.name))
    .sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }))
    .map((b) => ({ name: b.name, href: `/marques/${b.slug}` }));
};

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Cartes de la colonne de droite : uniquement ce qui existe (aucun contenu ni image inventés). */
const rubriqueOf = (slug: string): NavEntry["rubrique"] => {
  const taxo = taxonomieAvecProduits(slug);
  const u = univers.find((x) => x.href === `/boutique/${slug}`);
  const p = byFamille(slug).find((x) => x.badge && (norm(x.badge.label).includes("nouveau") || norm(x.badge.label).includes("top vente")));
  const articlesRubrique = articles.filter((a) => a.famille === slug);
  const a = articlesRubrique[articlesRubrique.length - 1];
  return {
    groupes: taxo?.groupes ?? [],
    image: u?.image,
    imageAlt: u?.imageAlt,
    produit: p && { name: p.name, brand: p.brand, href: `/produit/${p.slug}`, image: p.images[0], badge: p.badge!.label },
    conseil: a && { title: a.title, href: `/conseils/${a.slug}`, image: a.image },
  };
};
const RUBRIQUES_MENU = ["visage", "corps", "cheveux", "bebe-enfant"];

const cat = (slug: string, label?: string): NavEntry | null => {
  const c = categories.find((x) => x.slug === slug);
  if (!c || !familleVisible(slug)) return null;
  return { label: label ?? c.name, href: c.href, brands: brandsOf(slug), ...(RUBRIQUES_MENU.includes(slug) && { rubrique: rubriqueOf(slug) }) };
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
