import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  /** Classes du conteneur (taille, rayon, aspect-ratio). */
  className?: string;
  /** Classes de l'image (object-position…). */
  imgClassName?: string;
  /** Simple fondu à l'entrée dans l'écran (data-reveal="image" : fondu + dézoom léger). `false` : affichage direct. */
  fade?: boolean;
};

/** Grande image : conteneur arrondi + next/image en cover, sans parallax ni masque. */
export default function RevealImage({ src, alt, sizes, className = "", imgClassName = "", fade = true }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`} data-reveal={fade ? "image" : undefined}>
      <Image src={src} alt={alt} fill quality={90} sizes={sizes} loading="lazy" className={`object-cover ${imgClassName}`} />
    </div>
  );
}
