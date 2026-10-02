import type { NavItem } from "@/types/catalog";

export const announcements = [
  "Livraison au Bénin & à l'international",
  "Produits authentiques",
  "Conseils d'experts",
];

export const mainNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Boutique", href: "/boutique" },
  { label: "Promotions", href: "/promotions" },
  { label: "Nos marques", href: "/marques" },
  { label: "Conseils", href: "/conseils" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export const trustItems = [
  { icon: "truck", title: "Livraison rapide", text: "Au Bénin et à l'international." },
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
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Boutique",
    links: [
      { label: "Visage", href: "/boutique/visage" },
      { label: "Corps", href: "/boutique/corps" },
      { label: "Cheveux", href: "/boutique/cheveux" },
      { label: "Maquillage", href: "/boutique/maquillage" },
      { label: "Bien-être", href: "/boutique/complements" },
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
