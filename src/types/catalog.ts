import type { BrandTypeId } from "@/data/brandTypes";

import type { IconName } from "@/components/ui/Icon";

/**
 * Contrats de données de la vitrine.
 * Quand le vrai catalogue (API / CMS / base) arrivera, il suffira de
 * produire des objets conformes à ces types : les composants ne changent pas.
 */

/** Silhouettes de produit utilisées tant qu'il n'y a pas de vraies photos. */
export type ArtShape =
  | "pump"
  | "tube"
  | "jar"
  | "dropper"
  | "bottle"
  | "perfume"
  | "capsule"
  | "compact";

/** Palettes de fond / produit pour les visuels de substitution. */
export type Tone = "sage" | "sand" | "coral" | "cream" | "green" | "brown";

export type Badge = {
  label: string;
  kind: "new" | "promo" | "highlight";
};

export type ProductVariants = {
  /** Ex. « Contenance », « Teinte ». */
  label: string;
  options: string[];
};

/**
 * Un produit = une ligne de products.csv (voir `npm run catalogue`, source : src/data/products.json) :
 * la fiche /produit/[slug], les listes, la recherche, le SEO et l'image de partage s'en déduisent.
 * Tous les champs éditoriaux sont facultatifs : un bloc sans contenu n'est pas affiché.
 */
export type Product = {
  /** Identifiant unique et URL : /produit/<slug>. */
  slug: string;
  name: string;
  brand: string;
  /** Slug de famille principale (voir data/categories.ts). */
  famille: string;
  /** Autres familles où le produit apparaît aussi. */
  aussiDans: string[];
  /** Slug de sous-catégorie de la famille. */
  sousCategorie?: string;
  /** Slugs des besoins (voir data/besoins.ts). */
  besoins?: string[];
  /** Contenance ou format (ex. « 400 ml »). */
  format?: string;
  /** Prix en FCFA (entier). Absent → « Prix bientôt disponible », achat désactivé. */
  price?: number;
  /** Ancien prix en FCFA : présent uniquement en cas de promotion. */
  oldPrice?: number;
  badge?: Badge;
  /** Photos définitives (ex. /images/products/xxx.webp). [0] = carte, [1] = survol. Vide → visuel neutre (marque + nom). */
  images: string[];
  shortDescription?: string;
  description?: string;
  ingredients?: string;
  howToUse?: string;
  variants?: ProductVariants;
  inStock: boolean;
  /** Slugs des produits « Vous aimerez aussi » (sinon : même famille). */
  relatedSlugs?: string[];
  /** Silhouette de secours du panier (non affichée tant que le visuel neutre est utilisé). */
  art: ArtShape;
  tone: Tone;
};

export type SubCategory = { slug: string; name: string };

/** Famille de produits (grande catégorie de la boutique). */
export type Category = {
  id: string;
  slug: string;
  name: string;
  href: string;
  image?: string;
  art: ArtShape;
  tone: Tone;
  /** Pastille de l'accueil : fond pastel uni et couleur du trait de l'icône. */
  fond: string;
  trait: string;
  sousCategories: SubCategory[];
};

export type Besoin = {
  slug: string;
  name: string;
  /** Une phrase (8 à 12 mots) : conseil cosmétique général, sans promesse médicale. */
  resume: string;
  icone: IconName;
  couleur: "sage" | "blush";
  /** 3 conseils courts, informatifs. */
  conseils: [string, string, string];
};

export type Brand = {
  id: string;
  /** URL : /marques/<slug>. */
  slug: string;
  name: string;
  /** Marque à confirmer avec le client avant mise en ligne. */
  confirmed: boolean;
  /** Univers de la marque (une marque peut en avoir plusieurs ; vide = à classer). */
  types: BrandTypeId[];
  /** Mise en avant dans « À la une ». */
  featured: boolean;
  /** Nom en texte uniquement : jamais de logo ni de packshot de marque. */
  wordmark?: "serif" | "sans" | "spaced" | "italic";
};

export type Article = {
  slug: string;
  title: string;
  summary: string;
  tone: Tone;
  /** Photo de la carte et de l'en-tête (absente : fond de couleur + numéro). */
  image?: string;
  imageAlt?: string;
  /** object-position CSS pour le cadrage 16/10 (défaut : center). */
  imagePosition?: string;
  sections: { heading: string; text: string }[];
  /** Famille de la boutique dont on recommande les produits (voir data/categories.ts). */
  famille?: string;
};


export type Promo = {
  id: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  theme: "sage" | "green" | "sand";
  /** Petit libellé au-dessus du titre. */
  eyebrow?: string;
  /** Met le titre en valeur avec l'accent corail (offres chiffrées). */
  highlight?: boolean;
  image?: string;
  art: ArtShape[];
};

export type NavItem = { label: string; href: string; accent?: boolean };
