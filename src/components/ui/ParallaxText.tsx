"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useDesktopMotion } from "./useRevealOnScroll";

/** Le texte du hero monte 12 % plus vite que la page (desktop uniquement). */
export default function ParallaxText({ children, className }: { children: React.ReactNode; className?: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => -v * 0.12);
  const desktop = useDesktopMotion();
  return (
    <m.div className={className} style={desktop ? { y } : undefined}>
      {children}
    </m.div>
  );
}
