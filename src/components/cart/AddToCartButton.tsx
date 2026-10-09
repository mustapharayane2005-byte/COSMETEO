"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import type { Product } from "@/types/catalog";
import { useCart } from "./CartContext";

type Props = { product: Product; className: string };

export default function AddToCartButton({ product, className }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <button
      type="button"
      className={className}
      data-product-id={product.slug}
      disabled={!product.inStock || product.price == null}
      onClick={() => {
        addItem(product, { variant: product.variants?.options[0] });
        setAdded(true);
      }}
    >
      <Icon name={added ? "check" : "bag"} size={18} />
      <span>{added ? "Ajouté" : "Ajouter"}</span>
      <span className="sr-only"> : {product.name}</span>
    </button>
  );
}
