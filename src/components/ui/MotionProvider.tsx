"use client";

import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";

/** Charge uniquement les fonctionnalités DOM de framer-motion (composants `m`) : bundle allégé. `reducedMotion="user"` : pas de mouvement de position si l'utilisateur le demande. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </MotionConfig>
  );
}
