"use client";

import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useDurationScale } from "./Reveal";
import { useDesktopMotion, useRevealOnScroll } from "./useRevealOnScroll";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  /** Classes du conteneur (taille, rayon, aspect-ratio). */
  className?: string;
  /** Classes de l'image (object-position…). */
  imgClassName?: string;
  /** Parallax -4 % → +4 % (image à 108 %). Réservé aux images de plus de 1500 px de large, desktop. */
  parallax?: boolean;
  /** "inset" : révélation de haut en bas. "iris" : cercle qui s'ouvre depuis le bas (forme arche). */
  reveal?: "inset" | "iris";
};

const CLIP = {
  inset: { hidden: "inset(0 0 100% 0)", shown: "inset(0 0 0% 0)" },
  iris: { hidden: "circle(0% at 50% 100%)", shown: "circle(150% at 50% 100%)" },
};

/** Grande image : révélation clip-path au scroll + parallax vertical léger. Aucun zoom. */
export default function RevealImage({ src, alt, sizes, className = "", imgClassName = "", parallax, reveal = "inset" }: Props) {
  const [ref, hidden] = useRevealOnScroll<HTMLDivElement>();
  const scale = useDurationScale();
  const desktop = useDesktopMotion();
  const target = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const moving = parallax && desktop;

  return (
    <div
      ref={(el) => {
        ref.current = el;
        target.current = el;
      }}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          clipPath: hidden ? CLIP[reveal].hidden : CLIP[reveal].shown,
          transition: `clip-path ${1 * scale}s cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        {moving ? (
          <m.div className="absolute inset-x-0 -top-[4%] h-[108%]" style={{ y }}>
            <Image src={src} alt={alt} fill quality={90} sizes={sizes} loading="lazy" className={`object-cover ${imgClassName}`} />
          </m.div>
        ) : (
          <Image src={src} alt={alt} fill quality={90} sizes={sizes} loading="lazy" className={`object-cover ${imgClassName}`} />
        )}
      </div>
    </div>
  );
}
