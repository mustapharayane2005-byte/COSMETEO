# COSMÉTÉO — Homepage

Next.js (App Router) + TypeScript, CSS Modules, aucune lib d'animation/UI.

```
npm run dev      # développement
npm run build    # production
```
> Windows : lancer les commandes depuis le chemin `C:\Users\Hp\COSMETEO` (casse exacte du dossier), sinon le build échoue (`workStore`).

## Remplacer les placeholders
- Produits : `src/data/products.ts` (type `Product`, `src/types/catalog.ts`). Renseigner `image`.
- Catégories : `src/data/categories.ts` ; marques/logos : `src/data/brands.ts` (`logo`) ; promos : `src/data/promos.ts`.
- Photos éditoriales : `src/data/home.ts` → `hero.image`, `editorial.image` (mettre les fichiers dans `public/images/`).
- Tant que `image` est absent, `components/ui/Media` affiche un visuel vectoriel de substitution.
- Liens : les routes (/boutique, /panier…) n'existent pas encore.
- Points d'ancrage futurs : `Header` (`cartCount`, recherche), `ProductCard` (`data-product-id`, ajout panier), `WishlistButton`, `NewsletterForm`.
