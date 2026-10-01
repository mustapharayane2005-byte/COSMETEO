"use client";

import { m } from "framer-motion";
import { useSyncExternalStore } from "react";

const MOBILE = "(max-width: 767px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(MOBILE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Durées réduites de 30 % sur mobile. */
export function useDurationScale() {
  return useSyncExternalStore(
    subscribe,
    () => (window.matchMedia(MOBILE).matches ? 0.7 : 1),
    () => 1,
  );
}

type Props = {
  children: React.ReactNode;
  /** Délai en secondes (stagger : index × 0.08 dans les grilles). */
  delay?: number;
  /** Décalage vertical de départ en px. */
  y?: number;
  className?: string;
};

/**
 * Fade + translateY à l'entrée dans le viewport, une seule fois.
 * prefers-reduced-motion : contenu visible d'emblée (règle [data-m-reveal] dans globals.css).
 */
export default function Reveal({ children, delay = 0, y = 32, className }: Props) {
  const scale = useDurationScale();
  return (
    <m.div
      data-m-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8 * scale, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
