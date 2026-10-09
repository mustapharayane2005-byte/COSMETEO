import Link from "next/link";
import AddToCartButton from "@/components/cart/AddToCartButton";
import Media from "@/components/ui/Media";
import WishlistButton from "@/components/ui/WishlistButton";
import { discountPercent, formatPrice } from "@/lib/format";
import type { Product } from "@/types/catalog";
import s from "./ProductCard.module.css";

type Props = {
  product: Product;
  /** Masque la description (grilles denses). */
  compact?: boolean;
  /** Carte visible dès l'affichage : image chargée sans lazy-load. */
  priority?: boolean;
};

export default function ProductCard({ product, compact, priority }: Props) {
  const discount = discountPercent(product.price, product.oldPrice);
  const badge = product.badge ?? (discount ? { label: `-${discount}%`, kind: "promo" as const } : undefined);
  const href = `/produit/${product.slug}`;

  return (
    <article className={`${s.card} ${product.inStock ? "" : s.off}`}>
      <div className={s.media}>
        <Link href={href} tabIndex={-1} aria-hidden="true" className={s.mediaLink}>
          <Media
            src={product.images[0]}
            alt={product.name}
            art={product.art}
            tone={product.tone}
            contain
            priority={priority}
            placeholder={{ brand: product.brand, name: product.name }}
            sizes="(min-width: 1280px) 300px, (min-width: 768px) 30vw, 46vw"
          />
          {/* 2e image au survol (appareils avec souris), seulement si elle existe */}
          {product.images[1] && (
            <div className={s.alt}>
              <Media src={product.images[1]} alt="" contain sizes="(min-width: 1280px) 300px, 30vw" />
            </div>
          )}
        </Link>
        {badge && <span className={`${s.badge} ${s[badge.kind]}`}>{badge.label}</span>}
        <div className={s.wish}>
          <WishlistButton productName={product.name} />
        </div>
        <AddToCartButton product={product} className={s.quick} />
      </div>

      <div className={s.body}>
        <p className={s.brand}>{product.brand}</p>
        <h3 className={s.name}>
          <Link href={href}>{product.name}{product.format ? ` · ${product.format}` : ""}</Link>
        </h3>
        {!compact && (product.shortDescription ?? product.description) && (
          <p className={s.desc}>{product.shortDescription ?? product.description}</p>
        )}
        <p className={s.prices}>
          <span className={s.price}>{product.price != null ? formatPrice(product.price) : "Prix bientôt disponible"}</span>
          {product.oldPrice && (
            <>
              <span className="sr-only">Ancien prix :</span>
              <s className={s.old}>{formatPrice(product.oldPrice)}</s>
            </>
          )}
        </p>
        {!product.inStock && <p className={s.stock}>Indisponible</p>}
        <AddToCartButton product={product} className={s.add} />
      </div>
    </article>
  );
}
