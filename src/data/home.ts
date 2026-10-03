import type { ArtShape, Tone } from "@/types/catalog";
import { seuilLivraisonTexte } from "./site";

/** Textes et visuels éditoriaux de la homepage (hors catalogue). */

export const hero = {
  label: "— VOTRE BEAUTÉ AU QUOTIDIEN",
  title: "Le meilleur du soin au quotidien",
  subtitle: "Soins, dermatologie, beauté et bien-être, au service de toute la famille.",
  subtitleMobile: "Beauté, santé, hygiène et bien-être au quotidien.",
  primary: { label: "DÉCOUVRIR NOS PRODUITS →", href: "/boutique" },
  chips: ["Produits authentiques", "Conseils d'experts", "Livraison gratuite", "Paiement sécurisé"],
  /** Images actuelles, conservées comme placeholders. */
  imageDesktop: "/images/hero-famille-desktop.jpg",
  imageMobile: "/images/hero-famille-desktop.jpg",
  imageAlt: "Famille réunie sur un lit blanc",
};

export const banners = [
  {
    id: "octobre-rose",
    title: "Octobre rose : Prévenir c'est prendre soin de soi",
    cta: "DÉCOUVRIR",
    href: "/conseils",
    theme: "blush",
    imageDesktop: "/images/banniere-octobre-rose-desktop.webp",
    imageMobile: "/images/banniere-octobre-rose-mobile.webp",
  },
  {
    id: "dermo",
    title: "Les essentiels dermo-cosmétiques",
    cta: "VOIR LA SÉLECTION",
    href: "/boutique/visage",
    theme: "sage",
    imageDesktop: "/images/marques/banniere-dermo-vide-desktop.webp",
    imageMobile: "/images/marques/banniere-dermo-vide-mobile.webp",
  },
] as const;

/** Grandes cartes « Par univers ». `art` / `tone` : visuel de secours si l'image manque. */
export type Univers = {
  name: string;
  href: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  art: ArtShape;
  tone: Tone;
};

export const univers: Univers[] = [
  {
    name: "Soins visage",
    href: "/boutique/visage",
    image: "/images/routine-soin.jpg",
    imageAlt: "",
    imagePosition: "center",
    art: "dropper",
    tone: "sage",
  },
  {
    name: "Soins homme",
    href: "/boutique/homme",
    image: "/images/univers/soins-homme.webp",
    imageAlt: "Homme au visage serein appliquant un soin",
    imagePosition: "center 30%",
    art: "tube",
    tone: "cream",
  },
  {
    name: "Bébé & enfant",
    href: "/boutique/bebe-enfant",
    image: "/images/univers/bebe-enfant.webp",
    imageAlt: "Bébé souriant dans une serviette à capuche",
    imagePosition: "center 30%",
    art: "pump",
    tone: "sand",
  },
];

/** Bande de réassurance (le seuil de livraison est un exemple à valider avec le client). */
export const trustStrip = [
  { icon: "truck", title: "Livraison gratuite", text: seuilLivraisonTexte },
  { icon: "lock", title: "Paiement sécurisé", text: "Mobile Money et carte bancaire" },
  { icon: "chat", title: "Conseils d'experts", text: "Une équipe à votre écoute" },
] as const;

export const sections = {
  categories: { title: "Explorez nos univers" },
  univers: { title: "Par univers" },
  conseils: { title: "Nos conseils", cta: "Tous les conseils →", href: "/conseils" },
  bestSellers: {
    title: "Nos produits phares",
    subtitle: "Les produits préférés de nos clients.",
    href: "/boutique?tri=meilleures-ventes",
  },
  newArrivals: { title: "Nos nouveautés", cta: "Voir tout →", href: "/nouveautes" },
  brands: { title: "Les grandes marques au meilleur prix", cta: "Toutes les marques →", href: "/marques" },
};
