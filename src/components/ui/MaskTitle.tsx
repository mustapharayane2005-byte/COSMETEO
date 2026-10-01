"use client";

import { useDurationScale } from "./Reveal";
import { useRevealOnScroll } from "./useRevealOnScroll";

/** Titre de section révélé derrière un masque (translateY 100 % → 0). Visible par défaut si le JS échoue. */
export default function MaskTitle({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, hidden] = useRevealOnScroll<HTMLSpanElement>();
  const scale = useDurationScale();
  return (
    <span ref={ref} className="block overflow-hidden pb-[0.1em]">
      <span
        className="block"
        style={{
          transform: hidden ? "translateY(100%)" : "none",
          transition: `transform ${0.9 * scale}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        }}
      >
        {children}
      </span>
    </span>
  );
}
