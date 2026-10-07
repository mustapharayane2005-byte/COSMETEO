import Image from "next/image";
import Link from "next/link";
import s from "./Logo.module.css";

/** Ratio du viewBox des SVG monochromes (3906 × 1501). */
const W = 3906;
const H = 1501;

/**
 * Logo unique, monochrome. `tone="light"` = version blanche pour fonds verts ou sombres (footer) ;
 * sinon version noire. `variant="header"` = 108 px (150 px dès le desktop) ; sinon 168 px.
 */
export default function Logo({
  tone = "dark",
  variant = "full",
  priority = false,
}: {
  tone?: "dark" | "light";
  variant?: "full" | "header";
  priority?: boolean;
}) {
  return (
    <Link href="/" className={`${s.logo} ${variant === "header" ? s.header : ""}`} aria-label="cosméteo – accueil">
      <Image
        src={tone === "light" ? "/images/logo/cosmeteo-mono-blanc.svg" : "/images/logo/cosmeteo-mono-noir.svg"}
        alt="cosméteo"
        width={W}
        height={H}
        unoptimized
        priority={priority}
        className={s.mark}
      />
    </Link>
  );
}
