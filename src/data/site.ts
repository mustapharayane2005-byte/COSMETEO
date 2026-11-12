/** Accroche sous le logo (un seul endroit pour la changer). */
export const accrocheLogo = "BEAUTÉ & SOINS";

export const announcements = [
  "Livraison partout au Bénin",
  "Paiement par Mobile Money et carte bancaire",
  "Produits authentiques",
  "Conseils d'experts",
];

export const trustItems = [
  { icon: "truck", title: "Livraison partout au Bénin", text: "Voir les conditions de livraison et de retour." },
  { icon: "badge", title: "Produits authentiques", text: "Une sélection vérifiée." },
  { icon: "chat", title: "Conseils & service client", text: "Une équipe à votre écoute." },
  { icon: "lock", title: "Paiement sécurisé", text: "Mobile Money et carte bancaire." },
] as const;

export const footerColumns = [
  {
    title: "COSMETEO",
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
      { label: "Bébé & Enfant", href: "/boutique/bebe-enfant" },
      { label: "Accessoires", href: "/boutique/accessoires" },
      { label: "Promotions", href: "/promotions" },
      { label: "Nouveautés", href: "/nouveautes" },
    ],
  },
  {
    title: "Service client",
    links: [
      { label: "Livraison & retours", href: "/livraison" },
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

/**
 * Thème de Noël. Pour l'éteindre : passer `actif` à false (ligne « actif » ci-dessous).
 * Il s'éteint aussi tout seul après `dateFin` (incluse) ; hors dates, le site est exactement comme avant.
 */
export const NOEL = {
  actif: true,
  dateDebut: "2026-11-01",
  dateFin: "2026-12-31",
  message: "Idées cadeaux de Noël",
  lien: "/cadeaux",
};

/** Vrai si le thème est actif et que la date du jour est comprise entre dateDebut et dateFin (inclus). */
export function noelActif(now: Date = new Date()): boolean {
  if (!NOEL.actif) return false;
  const debut = new Date(`${NOEL.dateDebut}T00:00:00`);
  const fin = new Date(`${NOEL.dateFin}T23:59:59.999`);
  return now >= debut && now <= fin;
}

/** Pop-up d'inscription e-mail : passer à false pour l'éteindre. */
export const POPUP_EMAIL_ACTIF = true;
