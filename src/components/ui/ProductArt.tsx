import type { ArtShape } from "@/types/catalog";

/**
 * Silhouettes de produits vectorielles (substituts de photos).
 * Couleurs pilotées par les variables CSS --art-body / --art-cap / --art-label
 * définies par le `tone` du parent (voir Media.module.css).
 */

const BODY = "var(--art-body)";
const CAP = "var(--art-cap)";
const LABEL = "var(--art-label)";

function Label({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} fill={LABEL} opacity={0.94} />
      <rect x={x + 6} y={y + 8} width={w - 12} height={2} rx={1} fill={BODY} />
      <rect x={x + 6} y={y + 14} width={(w - 12) * 0.6} height={2} rx={1} fill={BODY} opacity={0.6} />
    </g>
  );
}

function Shine({ x, y, h }: { x: number; y: number; h: number }) {
  return <rect x={x} y={y} width={5} height={h} rx={2.5} fill="#fff" opacity={0.2} />;
}

const shapes: Record<ArtShape, React.ReactNode> = {
  pump: (
    <>
      <rect x={34} y={62} width={52} height={86} rx={12} fill={BODY} />
      <rect x={52} y={50} width={16} height={14} fill={CAP} />
      <rect x={46} y={36} width={28} height={14} rx={4} fill={CAP} />
      <rect x={70} y={38} width={18} height={6} rx={3} fill={CAP} />
      <Label x={42} y={90} w={36} h={34} />
      <Shine x={39} y={70} h={70} />
    </>
  ),
  tube: (
    <>
      <path d="M36 22h48l5 110H31L36 22Z" fill={BODY} />
      <rect x={34} y={16} width={52} height={8} rx={2} fill={CAP} />
      <rect x={42} y={132} width={36} height={16} rx={4} fill={CAP} />
      <Label x={42} y={60} w={36} h={34} />
      <Shine x={40} y={34} h={86} />
    </>
  ),
  jar: (
    <>
      <rect x={20} y={96} width={80} height={52} rx={11} fill={BODY} />
      <rect x={24} y={74} width={72} height={24} rx={6} fill={CAP} />
      <Label x={34} y={108} w={52} h={26} />
      <Shine x={26} y={104} h={36} />
    </>
  ),
  dropper: (
    <>
      <rect x={36} y={74} width={48} height={74} rx={11} fill={BODY} />
      <rect x={48} y={60} width={24} height={16} rx={3} fill={CAP} />
      <rect x={52} y={26} width={16} height={36} rx={8} fill={CAP} />
      <Label x={42} y={92} w={36} h={34} />
      <Shine x={41} y={82} h={56} />
    </>
  ),
  bottle: (
    <>
      <rect x={36} y={50} width={48} height={98} rx={14} fill={BODY} />
      <rect x={52} y={40} width={16} height={12} fill={BODY} />
      <rect x={47} y={20} width={26} height={22} rx={4} fill={CAP} />
      <Label x={42} y={84} w={36} h={38} />
      <Shine x={41} y={60} h={78} />
    </>
  ),
  perfume: (
    <>
      <rect x={28} y={66} width={64} height={82} rx={9} fill={BODY} />
      <rect x={54} y={56} width={12} height={12} fill={CAP} />
      <rect x={45} y={26} width={30} height={32} rx={4} fill={CAP} />
      <Label x={40} y={92} w={40} h={30} />
      <Shine x={34} y={74} h={64} />
    </>
  ),
  capsule: (
    <>
      <rect x={28} y={74} width={64} height={74} rx={9} fill={BODY} />
      <rect x={30} y={50} width={60} height={26} rx={6} fill={CAP} />
      <Label x={38} y={90} w={44} h={40} />
      <Shine x={33} y={82} h={56} />
    </>
  ),
  compact: (
    <>
      <circle cx={60} cy={98} r={46} fill={BODY} />
      <circle cx={60} cy={98} r={31} fill={CAP} />
      <circle cx={60} cy={98} r={22} fill={LABEL} opacity={0.9} />
      <path d="M30 72a42 42 0 0 1 28-14" stroke="#fff" strokeWidth={4} strokeLinecap="round" opacity={0.25} fill="none" />
    </>
  ),
};

export default function ProductArt({ shape, className }: { shape: ArtShape; className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden="true" focusable="false">
      <ellipse cx={60} cy={150} rx={34} ry={4} fill="#000" opacity={0.12} />
      {shapes[shape]}
    </svg>
  );
}
