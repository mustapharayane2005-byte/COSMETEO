"use client";

import { useEffect } from "react";

/** Les marquees CSS (animation « marquee ») accélèrent légèrement pendant le scroll, puis reviennent à 1×. */
export default function MarqueeBoost() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lastY = window.scrollY;
    let boost = 0;
    let raf = 0;
    const onScroll = () => {
      const y = window.scrollY;
      boost = Math.min(3, boost + Math.abs(y - lastY) / 60);
      lastY = y;
    };
    const tick = () => {
      boost *= 0.94;
      const rate = 1 + boost;
      for (const a of document.getAnimations()) {
        if ((a as CSSAnimation).animationName === "marquee") a.playbackRate = rate;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
