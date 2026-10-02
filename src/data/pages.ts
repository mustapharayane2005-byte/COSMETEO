/**
 * Pages « Bientôt disponible » (chemin → titre). Une route catch-all ne génère que ces chemins ;
 * tout le reste renvoie une vraie 404. Retirer une entrée quand la vraie page est créée.
 */
export const placeholderPages: Record<string, string> = {
  compte: "Mon compte",
  favoris: "Mes favoris",
  "a-propos": "À propos",
  contact: "Contact",
  conseils: "Conseils",
  faq: "FAQ",
  livraison: "Livraison",
  paiement: "Paiement",
  retours: "Retours",
  "mentions-legales": "Mentions légales",
  cgv: "Conditions générales de vente",
  confidentialite: "Confidentialité",
  routines: "Nos routines",
  "routines/peau-eclatante": "Routine peau éclatante",
  "routines/peau": "Routines peau",
  "routines/cheveux": "Routines cheveux",
  "routines/bien-etre": "Routines bien-être",
};
