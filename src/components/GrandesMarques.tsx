import Image from "next/image";
import Link from "next/link";
import s from "./GrandesMarques.module.css";

const produits = [
  { src: "/images/marques/produit-cerave.webp", alt: "Produit CeraVe", w: 471, h: 530 },
  { src: "/images/marques/produit-la-roche-posay.webp", alt: "Produit La Roche-Posay", w: 285, h: 640 },
  { src: "/images/marques/produit-eucerin.webp", alt: "Produit Eucerin", w: 480, h: 561 },
  { src: "/images/marques/produit-sva.webp", alt: "Produit SVA", w: 434, h: 640 },
];

/** Bannière « Les grandes marques » : 4 visuels produits côte à côte, légèrement superposés (2 sur mobile). */
export default function GrandesMarques() {
  return (
    <section className="container my-11 lg:my-14" aria-labelledby="grandes-marques-title">
      <div className={s.banner} data-reveal>
        <ul className={s.media} aria-label="Produits de marques">
          {produits.map((p, i) => (
            <li key={p.src} className={`${s.card} ${i > 1 ? s.extra : ""}`}>
              <Image src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" sizes="(min-width: 1024px) 160px, 40vw" className={s.img} />
            </li>
          ))}
        </ul>
        <div className={s.text}>
          <p className={s.label}>DERMO-COSMÉTIQUE</p>
          <h2 id="grandes-marques-title" className={s.title}>
            Les grandes marques pour une peau saine
          </h2>
          <Link href="/marques" className={s.cta}>
            VOIR LA SÉLECTION →
          </Link>
        </div>
      </div>
    </section>
  );
}
