import Link from "next/link";
import s from "./Logo.module.css";

/**
 * Logo unique : wordmark Cormorant Garamond + deux petites feuilles au-dessus du « O ».
 * `tone="light"` pour les fonds verts (footer). `variant="header"` : 28 px sans sous-titre sur mobile.
 */
export default function Logo({
  tone = "dark",
  variant = "full",
}: {
  tone?: "dark" | "light";
  variant?: "full" | "header";
}) {
  return (
    <Link
      href="/"
      className={`${s.logo} ${variant === "header" ? s.header : ""} ${tone === "light" ? s.light : ""}`}
      aria-label="COSMETEO, parapharmacie et beauté – accueil"
    >
      <span className={s.word} aria-hidden="true">
        COSMETE
        <span className={s.o}>
          O
          <svg className={s.leaves} viewBox="0 0 24 16" focusable="false">
            <path className={s.leafRose} d="M6.5 14C3.2 12 2.8 6.6 5.2 2.2c3.6 1.4 5.6 5.8 4 10.2-.7 1-2 1.7-2.7 1.6Z" />
            <path className={s.leafGreen} d="M16.5 14c3.2-1.6 4.6-6.2 3-10.4-3.5.5-6.2 4.2-5.4 8.8.4 1.1 1.5 1.7 2.4 1.6Z" />
          </svg>
        </span>
      </span>
      <span className={s.sub} aria-hidden="true">
        PARAPHARMACIE &amp; BEAUTÉ
      </span>
    </Link>
  );
}
