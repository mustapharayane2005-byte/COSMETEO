"use client";

import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

function Word({ word, progress, from, to }: { word: string; progress: MotionValue<number>; from: number; to: number }) {
  const opacity = useTransform(progress, [from, to], [0.2, 1]);
  return (
    <m.span style={{ opacity }} className="inline-block">
      {word}
      {" "}
    </m.span>
  );
}

/** Paragraphe dont les mots passent de 0.2 à 1 d'opacité au fil du scroll (effet « lecture »). */
export default function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} from={i / words.length} to={Math.min(1, (i + 2) / words.length)} />
      ))}
    </p>
  );
}
