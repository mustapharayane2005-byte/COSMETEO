import Link from "next/link";
import Letters from "./Letters";
import s from "./Logo.module.css";

/** Wordmark texte, sans icône. `tone="light"` pour les fonds sombres (footer). */
export default function Logo({
  tone = "dark",
  variant,
  animated,
}: {
  tone?: "dark" | "light";
  variant?: "header" | "headerCompact";
  /** Révélation lettre par lettre (footer). */
  animated?: boolean;
}) {
  return (
    <Link href="/" className={`${s.logo} ${tone === "light" ? s.light : ""} ${variant ? s[variant] : ""}`} aria-label="cosméteo, accueil">
      {animated ? <Letters text="cosméteo" /> : "cosméteo"}
    </Link>
  );
}
