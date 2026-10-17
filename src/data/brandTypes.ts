/** Univers de marques (filtre de /marques). Textes informatifs, sans promesse médicale. */
export type BrandTypeId = "k-beauty" | "us-beauty" | "french-beauty" | "nutribeauty" | "hair-care";

export type BrandTypeDef = { id: BrandTypeId; label: string; bg: string; line: string; dark?: boolean };

/** K-beauty en premier. Sélection (#2B2B2B) : marques sans univers, aucune carte dédiée pour l'instant. */
export const brandTypes: BrandTypeDef[] = [
  { id: "k-beauty", label: "K-beauty", bg: "#4B2E4F", dark: true, line: "Textures légères et routines en plusieurs étapes." },
  { id: "us-beauty", label: "US-beauty", bg: "#1F2F4A", dark: true, line: "Des soins efficaces, pensés pour toutes les peaux." },
  { id: "french-beauty", label: "French beauty", bg: "#1F4A3D", dark: true, line: "L'expertise des laboratoires français." },
  { id: "nutribeauty", label: "Nutribeauty", bg: "#F1E8DA", line: "La beauté qui commence de l'intérieur." },
  { id: "hair-care", label: "Hair care", bg: "#5A3B2A", dark: true, line: "Cuir chevelu, longueurs et pointes." },
];

export const getBrandType = (id: string) => brandTypes.find((t) => t.id === id);
