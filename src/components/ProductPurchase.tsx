"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import Icon from "@/components/ui/Icon";
import { discountPercent, formatPrice } from "@/lib/format";
import type { Product } from "@/types/catalog";

const primary =
  "inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-green bg-green text-[1.125rem] font-semibold uppercase tracking-[0.02em] text-ivory transition-colors hover:bg-green-deep disabled:cursor-not-allowed disabled:opacity-50";
const outline =
  "inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-green text-[1.125rem] font-semibold uppercase tracking-[0.02em] text-green transition-colors hover:bg-green hover:text-ivory disabled:cursor-not-allowed disabled:opacity-50";

/** Bloc d'achat de la fiche produit : variantes, quantité, ajout au panier / achat direct. */
export default function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [variant, setVariant] = useState(product.variants?.options[0]);
  const [qty, setQty] = useState(1);
  const discount = discountPercent(product.price, product.oldPrice);

  const add = () => addItem(product, { qty, variant });
  const buyNow = () => {
    addItem(product, { qty, variant, openDrawer: false });
    router.push("/panier"); // le paiement n'existe pas encore : on mène au récapitulatif
  };

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{product.brand}</p>
      <h1 className="h2 mt-3">{product.name}</h1>
      <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-2xl">{formatPrice(product.price)}</span>
        {product.oldPrice && (
          <>
            <span className="sr-only">Ancien prix :</span>
            <s className="text-[var(--muted)]">{formatPrice(product.oldPrice)}</s>
            {discount && (
              <span className="rounded-full bg-rose px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-green">
                -{discount}%
              </span>
            )}
          </>
        )}
      </p>
      <p className="mt-4 max-w-md text-[var(--muted)]">{product.shortDescription}</p>

      {product.variants && (
        <fieldset className="mt-7">
          <legend className="mb-3 text-[1.125rem] font-semibold uppercase tracking-[0.02em]">
            {product.variants.label} : <span className="font-normal">{variant}</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.variants.options.map((o) => (
              <label key={o} className="cursor-pointer">
                <input
                  type="radio"
                  name="variant"
                  value={o}
                  checked={variant === o}
                  onChange={() => setVariant(o)}
                  className="peer sr-only"
                />
                <span className="inline-flex min-h-11 items-center rounded-full border border-[var(--line-strong)] px-5 text-sm transition-colors peer-checked:border-green peer-checked:bg-green peer-checked:text-ivory peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
                  {o}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-7">
        <p className="mb-3 text-[1.125rem] font-semibold uppercase tracking-[0.02em]">Quantité</p>
        <div className="inline-flex items-center rounded-full border border-[var(--line-strong)]">
          <button type="button" aria-label="Diminuer la quantité" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-11 place-items-center">
            <Icon name="minus" size={16} />
          </button>
          <span className="min-w-8 text-center" aria-live="polite">{qty}</span>
          <button type="button" aria-label="Augmenter la quantité" onClick={() => setQty((q) => Math.min(20, q + 1))} className="grid size-11 place-items-center">
            <Icon name="plus" size={16} />
          </button>
        </div>
      </div>

      <div className="mt-7 grid gap-3">
        <button type="button" className={primary} disabled={!product.inStock} onClick={add}>
          {product.inStock ? "AJOUTER AU PANIER" : "RUPTURE DE STOCK"}
        </button>
        <button type="button" className={outline} disabled={!product.inStock} onClick={buyNow}>
          ACHETER MAINTENANT
        </button>
      </div>

      {/* mobile : barre d'ajout fixe en bas, à portée de pouce */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-4 border-t border-[var(--line)] bg-ivory/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
        <p className="shrink-0 leading-tight">
          <span className="block text-base">{formatPrice(product.price)}</span>
          {product.oldPrice && <s className="text-xs text-[var(--muted)]">{formatPrice(product.oldPrice)}</s>}
        </p>
        <button type="button" className={primary} disabled={!product.inStock} onClick={add}>
          {product.inStock ? "AJOUTER AU PANIER" : "RUPTURE DE STOCK"}
        </button>
      </div>
    </div>
  );
}
