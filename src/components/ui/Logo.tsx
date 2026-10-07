import Link from "next/link";
import LogoMark from "./LogoMark";
import s from "./Logo.module.css";

/**
 * Logo unique (SVG inline). `tone="light"` = version pour fonds verts (footer) ;
 * `variant="header"` = 108 px (150 px dès le desktop) ; sinon 168 px.
 */
export default function Logo({
  tone = "dark",
  variant = "full",
}: {
  tone?: "dark" | "light";
  variant?: "full" | "header";
}) {
  return (
    <Link href="/" className={`${s.logo} ${variant === "header" ? s.header : ""}`} aria-label="COSMETEO – accueil">
      <LogoMark background={tone === "light" ? "dark" : "light"} className={s.mark} />
    </Link>
  );
}
