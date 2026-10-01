"use client";

import { useEffect } from "react";

/**
 * Apparition progressive des sections : ~20 lignes, pas de bibliothèque.
 * Sans JS (ou avec prefers-reduced-motion) tout reste visible : la classe
 * `reveal-ready` n'est ajoutée qu'une fois les éléments déjà à l'écran marqués.
 */
export default function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const vh = window.innerHeight;
    for (const el of els) {
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-in");
    }
    document.documentElement.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.filter((el) => !el.classList.contains("is-in")).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
