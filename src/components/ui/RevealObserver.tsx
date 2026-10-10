"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal], [data-reveal-stagger]";

/**
 * Apparition au scroll : UN SEUL IntersectionObserver partagé (desktop et mobile), aucune lib, aucun écouteur
 * scroll/wheel/touchmove. Chaque élément reçoit `is-visible` une seule fois puis n'est plus observé ; l'animation
 * est en CSS pur (globals.css). L'état masqué n'existe que si <html> porte `js`.
 *
 * Les éléments ajoutés APRÈS le premier rendu (grille qui change de filtre, liste de recherche, contenu chargé
 * plus tard…) sont pris en charge par un MutationObserver : sans cela ils restaient à opacity 0 (zone blanche).
 * Filet de sécurité : tout élément observé depuis plus de 2,5 s est révélé, quoi qu'il arrive.
 */
export default function RevealObserver() {
  useEffect(() => {
    const seen = new WeakSet<Element>();
    const timers = new Set<number>();

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

    const scan = () => {
      const fresh: HTMLElement[] = [];
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (seen.has(el) || el.classList.contains("is-visible")) return;
        seen.add(el);
        fresh.push(el);
        io.observe(el);
      });
      if (fresh.length === 0) return;
      const t = window.setTimeout(() => {
        timers.delete(t);
        fresh.forEach((el) => {
          el.classList.add("is-visible");
          io.unobserve(el);
        });
      }, 2500);
      timers.add(t);
    };

    scan();

    let frame = 0;
    const mo = new MutationObserver(() => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return null;
}
