import Link from "next/link";
import NoelDecor from "@/components/NoelDecor";
import NoelImage from "@/components/NoelImage";
import ProductCard from "@/components/ProductCard";
import { cadeauxActif } from "@/data/noel";
import { cadeauxProducts } from "@/data/products";
import s from "./CadeauxSection.module.css";

/** Accueil : section « Idées cadeaux » (Noël), affichée seulement s'il y a au moins un produit au badge « Cadeau ». */
export default function CadeauxSection() {
  if (!cadeauxActif()) return null;
  const produits = cadeauxProducts.slice(0, 4);
  return (
    <section className={`${s.section} section`} aria-labelledby="cadeaux-title">
      <NoelDecor className={s.decor} />
      <div className="container relative">
        <header className={s.head} data-reveal>
          <p className={s.eyebrow}>— NOËL</p>
          <div className={s.titleRow}>
            <h2 id="cadeaux-title" className="h2">
              Idées cadeaux
            </h2>
            <Link href="/cadeaux" className={s.more}>
              Voir tout →
            </Link>
          </div>
        </header>
        <div className={s.layout}>
          <Link href="/cadeaux" className={s.hero}>
            <NoelImage />
            <span aria-hidden="true" className={s.shade} />
            <span className={s.caption}>
              <span className={s.captionTitle}>Offrez du soin à toute la famille</span>
              <span className={s.captionSub}>Coffrets et idées cadeaux de Noël</span>
            </span>
          </Link>
          <ul className={s.products}>
            {produits.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} compact />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
