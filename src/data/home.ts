import type { ArtShape } from "@/types/catalog";

/** Textes et visuels éditoriaux de la homepage (hors catalogue). */

export const hero = {
  label: "Prenez soin de vous",
  title: "Votre glow up commence ici.",
  primary: { label: "DÉCOUVRIR LES SOINS", href: "/boutique" },
  secondary: { label: "VOIR LES NOUVEAUTÉS →", href: "/nouveautes" },
  checks: ["Soins sélectionnés", "Marques authentiques", "Livraison rapide"],
  /** Desktop. Option mobile : déposer /public/images/hero-mobile.jpg (détecté automatiquement). */
  image: "/images/hero-desktop.jpg",
  imageAlt: "Portrait en gros plan d'une femme à la peau lumineuse",
  art: ["jar", "dropper", "pump"] as ArtShape[],
};

export const sections = {
  categories: { title: "Explorez nos univers" },
  bestSellers: {
    title: "Nos incontournables",
    subtitle: "Les produits préférés de nos clients.",
    href: "/boutique?tri=meilleures-ventes",
  },
  newArrivals: { title: "Nos nouveautés", cta: "Voir tout →", href: "/nouveautes" },
  brands: { title: "Les grandes marques au meilleur prix", cta: "Toutes les marques →", href: "/marques" },
};

export const editorial = {
  eyebrow: "Rituels COSMÉTÉO",
  title: "Votre routine, votre moment.",
  text: "Découvrez des sélections pensées pour prendre soin de votre peau, de vos cheveux et de votre bien-être.",
  cta: { label: "EXPLORER LES ROUTINES →", href: "/routines" },
  tags: [
    { label: "Peau", href: "/routines/peau" },
    { label: "Cheveux", href: "/routines/cheveux" },
    { label: "Bien-être", href: "/routines/bien-etre" },
  ],
  image: "/images/routine.jpg",
  imageAlt: "Moment de soin du visage dans une salle de bain lumineuse",
};
