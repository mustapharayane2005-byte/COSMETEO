"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Smooth scroll Lenis, désactivé sur écran tactile et si l'utilisateur préfère moins de mouvement. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return; // mobile / tactile : scroll natif
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    let raf = 0;
    let locked = false;
    const loop = (time: number) => {
      // fige le smooth scroll quand un menu / tiroir verrouille le body
      const now = document.body.style.overflow === "hidden";
      if (now !== locked) {
        locked = now;
        if (now) lenis.stop();
        else lenis.start();
      }
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
