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
};

export default function ProductCard({ product, compact }: Props) {
  const discount = discountPercent(product.price, product.oldPrice);
  const badge = product.badge ?? (discount ? { label: `-${discount}%`, kind: "promo" as const } : undefined);
  const href = `/produit/${product.slug}`;

  return (
    <article className={s.card}>
      <div className={s.media}>
        <Link href={href} tabIndex={-1} aria-hidden="true" className={s.mediaLink}>
          <Media
            src={product.images[0]}
            alt={product.name}
            art={product.art}
            tone={product.tone}
            sizes="(min-width: 1280px) 300px, (min-width: 768px) 30vw, 46vw"
          />
          {/* 2e image au survol (appareils avec souris) */}
          <div className={s.alt}>
            <Media
              src={product.images[1]}
              alt=""
              art={product.art}
              tone={product.tone}
              variant="scene"
              sizes="(min-width: 1280px) 300px, 30vw"
            />
          </div>
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
          <Link href={href}>{product.name}</Link>
        </h3>
        {!compact && <p className={s.desc}>{product.shortDescription}</p>}
        <p className={s.prices}>
          <span className={s.price}>{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <>
              <span className="sr-only">Ancien prix :</span>
              <s className={s.old}>{formatPrice(product.oldPrice)}</s>
            </>
          )}
        </p>
        <AddToCartButton product={product} className={s.add} />
      </div>
    </article>
  );
}
