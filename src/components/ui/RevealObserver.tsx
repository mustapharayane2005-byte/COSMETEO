"use client";

import { useEffect } from "react";

/**
 * Apparition au scroll : UN SEUL IntersectionObserver partagé (desktop et mobile), aucune lib, aucun écouteur
 * scroll/wheel/touchmove. Chaque élément reçoit `is-visible` une seule fois puis n'est plus observé ; l'animation
 * est en CSS pur (globals.css). L'état masqué n'existe que si <html> porte `js` ; un filet à 2,5 s révèle tout ce
 * qui serait resté invisible.
 */
export default function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-stagger]"));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const safety = window.setTimeout(() => {
      els.forEach((el) => el.classList.add("is-visible"));
      io.disconnect();
    }, 2500);

    return () => {
      window.clearTimeout(safety);
      io.disconnect();
    };
  }, []);

  return null;
}
