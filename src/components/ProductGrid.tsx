import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/catalog";
import s from "./ProductGrid.module.css";

type Props = {
  products: Product[];
  /** 4 colonnes (cartes larges) ou 6 (cartes denses) sur grand écran. */
  columns?: 4 | 6;
};

/** Cartes visibles par défaut (aucune animation dépendant d’un script). 2 colonnes mobile → 3 tablette → `columns` desktop. */
export default function ProductGrid({ products, columns = 4 }: Props) {
  return (
    <ul className={s.grid} data-cols={columns}>
      {products.map((p, i) => (
        <li key={p.slug}>
          <div className="h-full">
            <ProductCard product={p} compact={columns === 6} priority={i < 4} />
          </div>
        </li>
      ))}
    </ul>
  );
}
