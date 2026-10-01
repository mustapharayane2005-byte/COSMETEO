import Link from "next/link";
import Media from "@/components/ui/Media";
import type { Promo } from "@/types/catalog";
import s from "./PromoCard.module.css";

export default function PromoCard({ promo }: { promo: Promo }) {
  return (
    <article className={`${s.card} ${s[promo.theme]}`}>
      <div className={s.visual}>
        <Media
          src={promo.image}
          alt=""
          art={promo.art}
          variant="scene"
          tone={promo.theme === "green" ? "green" : promo.theme === "sand" ? "sand" : "sage"}
          sizes="(min-width: 1024px) 34vw, 90vw"
        />
      </div>
      <div className={s.copy}>
        {promo.eyebrow && (
          <p className={`${s.eyebrow} ${promo.highlight ? s.eyebrowAccent : ""}`}>{promo.eyebrow}</p>
        )}
        <h3 className={s.title}>
          {promo.highlight ? (
            <>
              <span className={s.small}>Jusqu&apos;à</span> <span className={s.big}>-30%</span>
            </>
          ) : (
            promo.title
          )}
        </h3>
        <p className={s.text}>{promo.text}</p>
        <Link href={promo.href} className={s.cta}>
          {promo.cta}
        </Link>
      </div>
    </article>
  );
}
