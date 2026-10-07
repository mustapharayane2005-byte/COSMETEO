import Image from "next/image";
import Link from "next/link";
import s from "./GrandesMarques.module.css";

const produits = [
  { src: "/images/marques/produit-cerave.webp", marque: "CeraVe", w: 266, h: 640 },
  { src: "/images/marques/produit-la-roche-posay.webp", marque: "La Roche-Posay", w: 269, h: 640 },
  { src: "/images/marques/produit-eucerin.webp", marque: "Eucerin", w: 239, h: 640 },
  { src: "/images/marques/produit-mixa.webp", marque: "Mixa", w: 520, h: 510 },
];

/** Bannière « Les grandes marques » : 4 cartes produits égales, alignées, en quinconce sur desktop ; grille 2 × 2 sur mobile. */
export default function GrandesMarques() {
  return (
    <section className="container my-11 lg:my-14" aria-labelledby="grandes-marques-title">
      <div className={s.banner} data-reveal>
        <ul className={s.media} aria-label="Produits de marques">
          {produits.map((p) => (
            <li key={p.src} className={s.item}>
              <span className={s.card}>
                <Image src={p.src} alt={`Produit ${p.marque}`} width={p.w} height={p.h} loading="lazy" sizes="(min-width: 1024px) 150px, 40vw" className={s.img} />
              </span>
              <span className={s.brand}>{p.marque}</span>
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
