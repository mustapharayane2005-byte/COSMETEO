import type { NavItem } from "@/types/catalog";
import meta from "./catalogue-meta.json";

/** Montant d'achat à partir duquel la livraison est gratuite : à changer ici uniquement. */
/** Accroche sous le logo (un seul endroit pour la changer). */
export const accrocheLogo = "BEAUTÉ & SOINS";

export const seuilLivraisonGratuite = 25000;
export const seuilLivraisonTexte = `À partir de ${seuilLivraisonGratuite.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FCFA d'achat`;

export const announcements = [
  "Livraison au Bénin & à l'international",
  "Paiement par Mobile Money et carte bancaire",
  "Produits authentiques",
  "Conseils d'experts",
];

/** Le lien « Promotions » n'apparaît que s'il y a au moins un produit en promotion (catalogue-meta.json, généré par npm run catalogue). */
export const mainNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Boutique", href: "/boutique" },
  { label: "Promotions", href: "/promotions" },
  { label: "Nos marques", href: "/marques" },
  { label: "Conseils", href: "/conseils" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
].filter((i) => i.href !== "/promotions" || meta.promos > 0);

export const trustItems = [
  { icon: "truck", title: "Livraison gratuite", text: seuilLivraisonTexte },
  { icon: "badge", title: "Produits authentiques", text: "Une sélection vérifiée." },
  { icon: "chat", title: "Conseils & service client", text: "Une équipe à votre écoute." },
  { icon: "lock", title: "Paiement sécurisé", text: "Mobile Money et carte bancaire." },
] as const;

export const footerColumns = [
  {
    title: "COSMÉTÉO",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Contact", href: "/contact" },
      { label: "Conseils", href: "/conseils" },
      { label: "Nos marques", href: "/marques" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Boutique",
    links: [
      { label: "Visage", href: "/boutique/visage" },
      { label: "Corps", href: "/boutique/corps" },
      { label: "Homme", href: "/boutique/homme" },
      { label: "Cheveux", href: "/boutique/cheveux" },
      { label: "Promotions", href: "/promotions" },
      { label: "Nouveautés", href: "/nouveautes" },
    ],
  },
  {
    title: "Service client",
    links: [
      { label: "Livraison", href: "/livraison" },
      { label: "Paiement", href: "/paiement" },
      { label: "Retours", href: "/retours" },
      { label: "Nous contacter", href: "/contact" },
    ],
  },
];

/** URLs à remplacer par les vrais comptes. */
export const socials = [
  { icon: "instagram", label: "Instagram", href: "https://instagram.com" },
  { icon: "facebook", label: "Facebook", href: "https://facebook.com" },
  { icon: "tiktok", label: "TikTok", href: "https://tiktok.com" },
  { icon: "whatsapp", label: "WhatsApp", href: "https://wa.me/" },
] as const;

// Passer actif à false pour un moyen de paiement tant qu'il ne fonctionne pas réellement sur le site.
export const paiements = [
  { nom: "Visa", fichier: "/images/paiement/visa.svg", alt: "Visa", hauteur: 18, actif: true },
  { nom: "Mastercard", fichier: "/images/paiement/mastercard-symbole.png", alt: "Mastercard", hauteur: 28, actif: true },
  { nom: "MTN MoMo", fichier: "/images/paiement/mtn-momo.png", alt: "MTN MoMo", hauteur: 30, actif: true },
];
