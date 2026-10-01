"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Révélation au scroll sûre : l'élément est VISIBLE par défaut (SSR, sans JS, prefers-reduced-motion,
 * ou déjà dans l'écran). Il n'est masqué (`hidden = true`) que s'il est sous la ligne de flottaison,
 * puis démasqué une seule fois quand il entre dans le viewport.
 * L'élément observé ne doit pas être lui-même clipé (Chrome ignore alors son intersection).
 */
export function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setHidden(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setHidden(false);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, hidden] as const;
}

/** Parallax autorisé : desktop, pointeur précis, pas de prefers-reduced-motion. */
export function useDesktopMotion() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(
      window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);
  return ok;
}
