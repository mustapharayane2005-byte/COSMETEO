import type { ArtShape } from "@/types/catalog";

/** Textes et visuels éditoriaux de la homepage (hors catalogue). */

export const hero = {
  label: "— VOTRE PARAPHARMACIE BEAUTÉ",
  title: "Des soins experts pour une beauté au quotidien",
  subtitle: "Parapharmacie, dermatologie, beauté et bien-être, au service de toute la famille.",
  subtitleMobile: "Beauté, santé, hygiène et bien-être au quotidien.",
  primary: { label: "DÉCOUVRIR NOS PRODUITS →", href: "/boutique" },
  chips: ["Produits authentiques", "Conseils d'experts", "Livraison rapide", "Paiement sécurisé"],
  /** Images actuelles, conservées comme placeholders. */
  imageDesktop: "/images/hero-desktop.jpg",
  imageMobile: "/images/hero-mobile.jpg",
  imageAlt: "Portrait en gros plan d'une femme à la peau lumineuse",
};

export const banners = [
  {
    id: "octobre-rose",
    title: "Octobre rose : Prévenir c'est prendre soin de soi",
    cta: "DÉCOUVRIR",
    href: "/conseils",
    theme: "blush",
  },
  {
    id: "dermo",
    title: "Les essentiels dermo-cosmétiques",
    cta: "VOIR LA SÉLECTION",
    href: "/boutique/visage",
    theme: "sage",
  },
] as const;

/** Grandes cartes « Par univers » (images actuelles / visuels de substitution). */
export const univers = [
  { name: "Soins visage", href: "/boutique/visage", image: "/images/routine-soin.jpg", art: "dropper", tone: "sage" },
  { name: "Soins homme", href: "/boutique/homme", art: "tube", tone: "cream" },
  { name: "Bébé & enfant", href: "/boutique/bebe-enfant", art: "pump", tone: "sand" },
] as const;

/** Bande de réassurance (le seuil de livraison est un exemple à valider avec le client). */
export const trustStrip = [
  { icon: "truck", title: "Livraison rapide", text: "Dès 25 000 FCFA d'achat" },
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
