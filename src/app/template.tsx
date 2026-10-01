"use client";

// Fondu de 0,3 s entre les pages. Le premier chargement n'est jamais animé (le hero reste visible tout de suite).
let firstRender = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const animate = !firstRender;
  firstRender = false;
  return <div className={animate ? "motion-safe:animate-[pageFade_0.3s_ease-out_both]" : undefined}>{children}</div>;
}
