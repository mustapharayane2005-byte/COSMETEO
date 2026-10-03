/**
 * Produits posés sur le podium de la bannière « Les essentiels dermo-cosmétiques ».
 * Valeurs en % de la zone image : `left` = centre horizontal du produit, `bottom` = bas du produit (mesuré depuis
 * le bas de la zone), `height` = hauteur du produit, `rotate` = inclinaison en degrés (2° max, un seul produit).
 * `mobile` : zone 4/3 en haut de la bannière (< 1024 px). `desktop` : moitié droite de la bannière (≥ 1024 px).
 */
export type Pose = { left: number; bottom: number; height: number; rotate: number };

export type ProduitBanniere = {
  file: string;
  width: number;
  height: number;
  alt: string;
  mobile: Pose;
  desktop: Pose;
};

export const produitsBanniere: ProduitBanniere[] = [
  {
    file: "/images/marques/cerave.webp",
    width: 313,
    height: 744,
    alt: "Daily Moisturizing Lotion, CeraVe",
    mobile: { left: 34, bottom: 28, height: 50, rotate: 0 },
    desktop: { left: 33, bottom: 28, height: 56, rotate: 0 },
  },
  {
    file: "/images/marques/loreal-paris.webp",
    width: 530,
    height: 814,
    alt: "Crème démaquillante Fleurs Rares, L'Oréal Paris",
    mobile: { left: 51, bottom: 27, height: 56, rotate: 0 },
    desktop: { left: 56, bottom: 27, height: 64, rotate: 0 },
  },
  {
    file: "/images/marques/garnier.webp",
    width: 402,
    height: 777,
    alt: "Clean+ Invigorating Daily Scrub, Garnier",
    mobile: { left: 68, bottom: 28, height: 46, rotate: 2 },
    desktop: { left: 78, bottom: 28, height: 54, rotate: 2 },
  },
];
