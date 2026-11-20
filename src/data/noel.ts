import { cadeauxProducts } from "@/data/products";
import { noelActif } from "@/data/site";

/** Vrai pendant Noël ET s'il existe au moins un produit au badge « Cadeau » : sert à afficher (ou non) tout ce qui mène à /cadeaux. */
export const cadeauxActif = (): boolean => noelActif() && cadeauxProducts.length > 0;

/** Destination du bandeau : /cadeaux si la page est active, sinon /boutique. */
export const noelLien = (): string => (cadeauxActif() ? "/cadeaux" : "/boutique");
