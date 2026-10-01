"use client";

import { useEffect } from "react";

/**
 * Apparition au scroll : un seul IntersectionObserver partagé, aucune lib.
 * Sans JS, sur mobile (< 768 px) ou avec prefers-reduced-motion, la classe `reveal-ready` n'est jamais
 * ajoutée : tout le contenu reste visible directement.
 */
export default function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches) return;

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
