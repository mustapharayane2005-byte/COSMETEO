import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@/types/catalog";
import s from "./ProductSection.module.css";

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  link?: { label: string; href: string };
  products: Product[];
  /** "grid" : 2 → 4 colonnes. "carousel" : rail horizontal. */
  layout?: "grid" | "carousel";
  tinted?: boolean;
};

/** En-tête de section + grille ou carrousel : « incontournables » et « nouveautés ». */
export default function ProductSection({ id, title, subtitle, link, products, layout = "grid", tinted }: Props) {
  return (
    <section className={`section ${tinted ? s.tinted : ""}`} aria-labelledby={id}>
      <div className="container">
        <header className={s.head} data-reveal>
          <div>
            <h2 id={id} className="h2">
              {title}
            </h2>
            {subtitle && <p className={`lead ${s.sub}`}>{subtitle}</p>}
          </div>
          {link && (
            <Link href={link.href} className={s.more}>
              {link.label}
            </Link>
          )}
        </header>
        {layout === "carousel" ? (
          <ProductCarousel label={title}>
            {products.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} compact />
              </li>
            ))}
          </ProductCarousel>
        ) : (
          <ProductGrid products={products} columns={4} />
        )}
      </div>
    </section>
  );
}
