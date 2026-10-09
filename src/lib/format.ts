const NBSP = " ";

/** 13900 → "13 900 FCFA" (espaces insécables, rendu identique serveur/client). */
export function formatPrice(amount: number): string {
  const grouped = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
  return `${grouped}${NBSP}FCFA`;
}

/** Pourcentage de remise arrondi, ou null s'il n'y a pas de promotion. */
export function discountPercent(price?: number, compareAtPrice?: number): number | null {
  if (!price || !compareAtPrice || compareAtPrice <= price) return null;
  return Math.round((1 - price / compareAtPrice) * 100);
}
