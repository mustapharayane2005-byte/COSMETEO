import Image from "next/image";
import Link from "next/link";
import s from "./GrandesMarques.module.css";

/** Bannière « Les grandes marques » : image desktop / mobile avec les produits intégrés (rien n'est superposé). */
export default function GrandesMarques() {
  return (
    <section className="container my-14" aria-labelledby="grandes-marques-title">
      <div className={s.banner} data-reveal>
        <div className={s.media}>
          <Image
            src="/images/marques/marques-desktop.webp"
            alt=""
            fill
            quality={90}
            loading="lazy"
            sizes="(min-width: 1024px) 645px, 0px"
            className="hidden object-cover object-right lg:block"
          />
          <Image
            src="/images/marques/marques-mobile.webp"
            alt=""
            fill
            quality={90}
            loading="lazy"
            sizes="(min-width: 1024px) 0px, 100vw"
            className="object-cover object-[center_bottom] lg:hidden"
          />
        </div>
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
      <p className={s.note}>
        Marques citées à titre d&apos;illustration. Les marques appartiennent à leurs propriétaires respectifs.
      </p>
    </section>
  );
}
