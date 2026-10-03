import Link from "next/link";
import LogoMark from "./LogoMark";
import s from "./Logo.module.css";

/**
 * Logo unique (SVG inline). `tone="light"` = version pour fonds verts (footer) ;
 * `variant="header"` = 132 px (190 px dès le desktop) ; sinon 210 px.
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
