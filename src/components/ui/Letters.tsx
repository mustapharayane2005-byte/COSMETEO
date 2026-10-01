"use client";

import { m } from "framer-motion";
import { useDurationScale } from "./Reveal";
import { useRevealOnScroll } from "./useRevealOnScroll";

/** Mot révélé lettre par lettre (stagger 40 ms) quand il entre à l'écran. Visible par défaut sans JS. */
export default function Letters({ text }: { text: string }) {
  const [ref, hidden] = useRevealOnScroll<HTMLSpanElement>();
  const scale = useDurationScale();
  return (
    <span ref={ref} aria-hidden="true">
      {[...text].map((c, i) => (
        <m.span
          key={i}
          className="inline-block"
          initial={false}
          animate={{ opacity: hidden ? 0 : 1, y: hidden ? "40%" : 0 }}
          transition={{ duration: 0.6 * scale, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
        >
          {c}
        </m.span>
      ))}
    </span>
  );
}
