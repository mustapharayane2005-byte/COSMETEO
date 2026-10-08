import Image from "next/image";
import type { ArtShape, Tone } from "@/types/catalog";
import ProductArt from "./ProductArt";
import s from "./Media.module.css";

type Props = {
  /** Vraie photo (chemin /public ou URL autorisée). Absente → visuel de substitution. */
  src?: string;
  alt: string;
  /** Objets du visuel de substitution (1 = packshot, 2-3 = nature morte). */
  art?: ArtShape | ArtShape[];
  tone?: Tone;
  /** "packshot" : produit centré. "scene" : feuillages + objets (hero, catégories, éditorial). */
  variant?: "packshot" | "scene";
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Sans photo : visuel neutre #F5F5F5 avec la marque et le nom du produit (au lieu d'une silhouette). */
  placeholder?: { brand: string; name: string };
};

const leaves = [
  { x: 40, y: 330, r: -28, s: 1.15, o: 0.5 },
  { x: 120, y: 360, r: -8, s: 1.4, o: 0.35 },
  { x: 330, y: 340, r: 24, s: 1.25, o: 0.5 },
  { x: 270, y: 380, r: 8, s: 1.5, o: 0.3 },
  { x: 372, y: 440, r: 38, s: 1, o: 0.4 },
  { x: 20, y: 470, r: -40, s: 0.9, o: 0.4 },
];

function Scene() {
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className={s.scene}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx={285} cy={150} r={86} fill="var(--art-sun)" opacity={0.55} />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`} opacity={l.o}>
          <path d="M0 0C40-50 40-150 0-200-40-150-40-50 0 0Z" fill="var(--art-leaf)" />
          <path d="M0 0V-190" stroke="var(--art-bg)" strokeWidth={1.5} opacity={0.6} />
        </g>
      ))}
      <rect y={410} width={400} height={90} fill="var(--art-ground)" opacity={0.5} />
    </svg>
  );
}

export default function Media({
  src,
  alt,
  art = "bottle",
  tone = "sage",
  variant = "packshot",
  sizes,
  priority,
  className,
  placeholder,
}: Props) {
  if (!src && placeholder) {
    return (
      <div className={`${s.neutral} ${className ?? ""}`} role="img" aria-label={`${placeholder.brand} ${placeholder.name}`}>
        <span className={s.neutralBrand}>{placeholder.brand}</span>
        <span className={s.neutralName}>{placeholder.name}</span>
      </div>
    );
  }
  const shapes = Array.isArray(art) ? art : [art];
  return (
    <div className={`${s.media} ${src ? s.skeleton : ""} ${className ?? ""}`} data-tone={tone}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={s.photo} />
      ) : variant === "scene" ? (
        <>
          <Scene />
          <div className={s.stack} role="img" aria-label={alt} data-count={Math.min(shapes.length, 3)}>
            {shapes.slice(0, 3).map((shape, i) => (
              <ProductArt key={i} shape={shape} className={s.stackItem} />
            ))}
          </div>
        </>
      ) : (
        <div className={s.packshot} role="img" aria-label={alt}>
          <ProductArt shape={shapes[0]} className={s.packshotArt} />
        </div>
      )}
    </div>
  );
}
