import Link from "next/link";
import s from "./Logo.module.css";

/** Wordmark texte, sans icône. `tone="light"` pour les fonds sombres (footer). */
export default function Logo({
  tone = "dark",
  variant,
}: {
  tone?: "dark" | "light";
  variant?: "header" | "headerCompact";
}) {
  return (
    <Link href="/" className={`${s.logo} ${tone === "light" ? s.light : ""} ${variant ? s[variant] : ""}`} aria-label="cosméteo, accueil">
      cosméteo
    </Link>
  );
}
