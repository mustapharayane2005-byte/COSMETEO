import Image from "next/image";
import { brands } from "@/data/brands";
import { sections } from "@/data/home";
import s from "./BrandStrip.module.css";

export default function BrandStrip() {
  return (
    <section className={`section ${s.section}`} aria-labelledby="brands-title">
      <div className="container">
        <header className={s.head} data-reveal>
          <h2 id="brands-title" className="h2">
            {sections.brands.title}
          </h2>
        </header>
        <div className={s.band} data-reveal>
          <div className={s.track}>
            {[false, true].map((copy) => (
              <ul key={String(copy)} className={`${s.list} ${copy ? s.copy : ""}`} aria-hidden={copy || undefined}>
                {brands.map((b) => (
                  <li key={b.id} className={s.cell}>
                    {b.logo ? (
                      <Image src={b.logo} alt={copy ? "" : b.name} width={140} height={48} className={s.logo} draggable={false} />
                    ) : (
                      <span className={`${s.wordmark} ${s[b.wordmark ?? "serif"]}`}>{b.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
