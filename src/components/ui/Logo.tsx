import Image from "next/image";
import Link from "next/link";
import { accrocheLogo } from "@/data/site";
import s from "./Logo.module.css";

/** Ratio du viewBox des SVG monochromes (3906 × 1501). */
const W = 3906;
const H = 1501;

/**
 * Logo unique, monochrome, avec son accroche (texte réel, exactement de la largeur du logo).
 * `tone="light"` = version blanche pour fonds verts ou sombres ; sinon version noire.
 * `variant` : "header" = 108 px (150 px dès le desktop), "splash" = 200 px (260 px dès 768 px), "full" = 168 px.
 * `compact` : sans accroche (header mobile). `link={false}` : sans lien (écran de chargement).
 */
export default function Logo({
  tone = "dark",
  variant = "full",
  priority = false,
  compact = false,
  link = true,
  className = "",
}: {
  tone?: "dark" | "light";
  variant?: "full" | "header" | "splash";
  priority?: boolean;
  compact?: boolean;
  link?: boolean;
  className?: string;
}) {
  const classes = `${s.logo} ${s[variant]} ${tone === "light" ? s.light : ""} ${className}`;
  const content = (
    <>
      <Image
        src={tone === "light" ? "/images/logo/cosmeteo-mono-blanc.svg" : "/images/logo/cosmeteo-mono-noir.svg"}
        alt="cosméteo"
        width={W}
        height={H}
        unoptimized
        priority={priority}
        className={s.mark}
      />
      {!compact && <span className={s.tagline}>{accrocheLogo}</span>}
    </>
  );
  return link ? (
    <Link href="/" className={classes} aria-label="cosméteo – accueil">
      {content}
    </Link>
  ) : (
    <div className={classes}>{content}</div>
  );
}
