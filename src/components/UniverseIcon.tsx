import type { BrandTypeId } from "@/data/brandTypes";

const paths: Record<BrandTypeId, React.ReactNode> = {
  /** feuille de thé */
  "k-beauty": (
    <>
      <path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14Z" />
      <path d="M5 19 14 10" />
    </>
  ),
  /** étoile */
  "us-beauty": <path d="m12 4 2.4 5 5.4.7-4 3.8 1 5.4L12 16.3 7.2 18.9l1-5.4-4-3.8 5.4-.7L12 4Z" />,
  /** goutte */
  "french-beauty": <path d="M12 4c3.5 4.2 5.5 7 5.5 10a5.5 5.5 0 0 1-11 0c0-3 2-5.800 5.500-10Z" />,
  /** gélule */
  nutribeauty: (
    <>
      <rect x="3.500" y="9" width="17" height="6" rx="3" transform="rotate(-35 12 12)" />
      <path d="m9.300 8.900 5.400 6.200" />
    </>
  ),
  /** mèche de cheveux */
  "hair-care": <path d="M9 4c-3 4 3 5 0 8s3 4 0 8M15 4c-3 4 3 5 0 8s3 4 0 8" />,
};

/** Icône ligne fine verte (cercle blanc fourni par la carte). */
export default function UniverseIcon({ id }: { id: BrandTypeId }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 fill-none stroke-[#173C32]"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[id]}
    </svg>
  );
}
