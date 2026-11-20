import { NOEL } from "@/data/site";

/** Image « Famille réunie autour des cadeaux de Noël » (chemin dans NOEL.images.cadeaux). Rien n'est affiché tant que le chemin est null. */
export default function NoelImage({ className = "", position = "center" }: { className?: string; position?: string }) {
  const base = NOEL.images.cadeaux;
  if (!base) return null;
  return (
    <picture>
      <source srcSet={`${base}.webp`} type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${base}.jpg`}
        alt="Famille réunie autour des cadeaux de Noël"
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 size-full object-cover ${className}`}
        style={{ objectPosition: position }}
      />
    </picture>
  );
}
