/** Fonds pastel (variables de globals.css). Le rose est exclu de la rotation : il se place à la main, une ou deux fois par page. */
const cycle = ["sauge", "sable", "bleu", "peche", "vert"] as const;

/** Fond de l'élément n d'une liste : deux voisins (±1, ±2, ±3, ±4) n'ont jamais la même couleur. */
export const pastel = (i: number) => `var(--pastel-${cycle[((i % cycle.length) + cycle.length) % cycle.length]})`;
