import PromoCard from "@/components/PromoCard";
import { promos } from "@/data/promos";
import s from "./PromoSection.module.css";

export default function PromoSection() {
  return (
    <section className={s.section} aria-label="Offres et sélections">
      <ul className={`container ${s.grid}`}>
        {promos.map((p, i) => (
          <li key={p.id} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
            <PromoCard promo={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
