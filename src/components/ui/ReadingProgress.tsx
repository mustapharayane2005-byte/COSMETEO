"use client";

import { m, useScroll } from "framer-motion";

/** Trait de 2 px en haut de page : scaleX lié à la progression de lecture. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-[#5A534E]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
