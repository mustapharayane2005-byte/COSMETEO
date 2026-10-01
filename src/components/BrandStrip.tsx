import MaskTitle from "@/components/ui/MaskTitle";
import Link from "next/link";
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
            <MaskTitle>{sections.brands.title}</MaskTitle>
          </h2>
          <Link href={sections.brands.href} className={s.more}>
            {sections.brands.cta}
          </Link>
        </header>
        <ul className={s.grid} data-reveal>
          {brands.map((b) => (
            <li key={b.id} className={s.cell}>
              {b.logo ? (
                <Image src={b.logo} alt={b.name} width={140} height={48} className={s.logo} />
              ) : (
                <span className={`${s.wordmark} ${s[b.wordmark ?? "serif"]}`}>{b.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
