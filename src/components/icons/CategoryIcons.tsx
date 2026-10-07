import type { ComponentType, SVGProps } from "react";

/** Jeu d'icônes des catégories : dessins au trait fin (viewBox 48×48), couleur = currentColor, aucun aplat. */
type P = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: P) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SoinsVisage = (p: P) => (
  <Svg {...p}>
    <path d="M16 22c0-6.500 3.500-10.500 8-10.500s8 4 8 10.500c0 7.500-3.500 12.500-8 12.500s-8-5-8-12.500Z" />
    <path d="M16 21c4.500 0 7-3 8-7.500 1 4.500 3.500 7.500 8 7.500" />
    <path d="M16 22c-3.500.500-5 5.500-4.500 12 .300 3.500 1.800 6 3.800 7" />
    <path d="M32 22c3.500.500 5 5.500 4.500 12-.300 3.500-1.800 6-3.800 7" />
    <path d="M20.500 25h1.500M26 25h1.500" />
    <path d="M24 26v3.200h-1.200" />
    <path d="M21.500 31.200c1.500 1.300 3.500 1.300 5 0" />
  </Svg>
);

export const SoinsCorps = (p: P) => (
  <Svg {...p}>
    <rect x="13" y="22" width="22" height="20" rx="4.500" />
    <rect x="19" y="17" width="10" height="5" rx="1.500" />
    <path d="M24 17v-6.500" />
    <path d="M24 10.500h8.500l2 2.500" />
    <path d="M19 30h10M19 35h6" />
  </Svg>
);

export const Cheveux = (p: P) => (
  <Svg {...p}>
    <path d="M24 34c-7-5 5-9.500 0-15.500S29 11 24 6" />
    <path d="M7 36c10-4 24-4 34 0" />
    <path d="M20 38c0 3.500 1.500 5.500 4 5.500s4-2 4-5.500" />
  </Svg>
);

export const Homme = (p: P) => (
  <Svg {...p}>
    <circle cx="20" cy="28" r="9.500" />
    <path d="M26.700 21.300 38 10" />
    <path d="M29.500 10H38v8.500" />
  </Svg>
);

export const BebeEnfant = (p: P) => (
  <Svg {...p}>
    <circle cx="24" cy="26" r="12.500" />
    <path d="M24 13.500c-1-3 .500-5.500 3-5.500s3 3 .800 3.800c-1.500.500-2.500-.500-2-1.600" />
    <path d="M11.600 23.500c-3.500-.500-3.800 5.500-.200 5.500" />
    <path d="M36.400 23.500c3.500-.500 3.800 5.500.200 5.500" />
    <path d="M19.500 25h.1M28.500 25h.1" strokeWidth={2.600} />
    <path d="M20 30c2.500 2.800 5.500 2.800 8 0" />
  </Svg>
);
export const MamanBebe = BebeEnfant;

export const SanteBienEtre = (p: P) => (
  <Svg {...p}>
    <path d="M24 40S7.500 30.500 7.500 19.500A8.500 8.500 0 0 1 24 16.200a8.500 8.500 0 0 1 16.500 3.300C40.500 30.500 24 40 24 40Z" />
  </Svg>
);

export const Hygiene = (p: P) => (
  <Svg {...p}>
    <rect x="6" y="24" width="27" height="16" rx="5" />
    <path d="M11 30c2-2 4-2 6 0s4 2 6 0 3-1.500 5-.500" />
    <path d="M11 35h8" />
    <circle cx="35" cy="17" r="4.500" />
    <circle cx="28" cy="11" r="2.800" />
    <circle cx="41" cy="27" r="2.200" />
  </Svg>
);

export const Beaute = (p: P) => (
  <Svg {...p}>
    <rect x="9" y="29" width="14" height="13" rx="2" />
    <path d="M10.500 29v-6.500h11V29" />
    <path d="M12 22.500v-7l7-6.500v13.500" />
    <rect x="29" y="20" width="10" height="22" rx="2" />
    <path d="M29 27h10" />
  </Svg>
);

export const Maquillage = (p: P) => (
  <Svg {...p}>
    <rect x="7" y="29" width="14" height="13" rx="2" />
    <path d="M8.500 29v-6.500h11V29" />
    <path d="M10 22.500v-7l7-6.500v13.500" />
    <path d="M41 7 31 24" />
    <path d="M31 24c-4 .500-6.500 3-6.500 7.500 4.500 0 7.500-2.500 8.500-6.500" />
  </Svg>
);

export const Solaire = (p: P) => (
  <Svg {...p}>
    <circle cx="24" cy="24" r="7.500" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <path key={a} d="M24 10.500v4.500" transform={`rotate(${a} 24 24)`} />
    ))}
  </Svg>
);

export const FemmeEnceinte = (p: P) => (
  <Svg {...p}>
    <circle cx="21" cy="9" r="3.800" />
    <path d="M19 15c-3 5-2.500 11 .500 16L17 43" />
    <path d="M23.500 15.500c3 2.500 11 7 10.500 15-.300 4.500-4 6.500-9 6" />
    <path d="M25 37l1 6" />
    <path d="M28.500 31c-2.500-2.500-5-.200-2.800 2.200l2.800 2.600 2.800-2.600c2.200-2.400-.300-4.700-2.800-2.200Z" />
  </Svg>
);

export const Promotions = (p: P) => (
  <Svg {...p}>
    <path d="M26 6h13.500a2.500 2.500 0 0 1 2.500 2.500V22L22 42 6 26 26 6Z" />
    <circle cx="35" cy="13" r="2.200" />
    <circle cx="20" cy="25" r="2.200" />
    <circle cx="28" cy="33" r="2.200" />
    <path d="M30 22 18 36" transform="rotate(-8 24 29)" />
  </Svg>
);

/** Icône neutre : étoile à quatre branches. */
export const Etoile = (p: P) => (
  <Svg {...p}>
    <path d="M24 7c1.500 9 7.500 15 17 17-9.500 2-15.500 8-17 17-1.500-9-7.500-15-17-17 9.500-2 15.500-8 17-17Z" />
  </Svg>
);

export const categoryIcons: Record<string, ComponentType<P>> = {
  visage: SoinsVisage,
  corps: SoinsCorps,
  cheveux: Cheveux,
  homme: Homme,
  "bebe-enfant": BebeEnfant,
  "sante-bien-etre": SanteBienEtre,
  hygiene: Hygiene,
  beaute: Beaute,
  solaire: Solaire,
  "femme-enceinte": FemmeEnceinte,
  promotions: Promotions,
};
