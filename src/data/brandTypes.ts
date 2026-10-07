/** Univers de marques (filtre de /marques). Textes informatifs, sans promesse médicale. */
export type BrandTypeId = "k-beauty" | "us-beauty" | "french-beauty" | "nutribeauty" | "hair-care";

export type BrandTypeDef = { id: BrandTypeId; label: string; bg: string; line: string };

export const brandTypes: BrandTypeDef[] = [
  { id: "k-beauty", label: "K-beauty", bg: "#F6E7E3", line: "Textures légères et routines en plusieurs étapes." },
  { id: "us-beauty", label: "US-beauty", bg: "#E4EBEF", line: "Des soins efficaces, pensés pour toutes les peaux." },
  { id: "french-beauty", label: "French beauty", bg: "#E6EDE6", line: "L'expertise des laboratoires français." },
  { id: "nutribeauty", label: "Nutribeauty", bg: "#F1E8DA", line: "La beauté qui commence de l'intérieur." },
  { id: "hair-care", label: "Hair care", bg: "#F6E4D6", line: "Cuir chevelu, longueurs et pointes." },
];

export const getBrandType = (id: string) => brandTypes.find((t) => t.id === id);
