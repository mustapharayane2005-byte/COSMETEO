import Image from "next/image";
import { produitsBanniere } from "@/data/marques-banniere";
import s from "./DermoProducts.module.css";

/** Produits posés sur le podium de la bannière dermo. Fondu simple (data-reveal, CSS), aucun parallax ni listener. */
export default function DermoProducts() {
  return (
    <div className={s.layer} data-reveal>
      {produitsBanniere.map((p) => (
        <Image
          key={p.file}
          src={p.file}
          alt={p.alt}
          width={p.width}
          height={p.height}
          loading="lazy"
          sizes="(min-width: 1024px) 130px, 110px"
          className={s.item}
          style={
            {
              "--ml": `${p.mobile.left}%`,
              "--mb": `${p.mobile.bottom}%`,
              "--mh": `${p.mobile.height}%`,
              "--mr": `${p.mobile.rotate}deg`,
              "--dl": `${p.desktop.left}%`,
              "--db": `${p.desktop.bottom}%`,
              "--dh": `${p.desktop.height}%`,
              "--dr": `${p.desktop.rotate}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
