"use client";

import { useRef } from "react";

/** Rail horizontal : défilement natif + glisser à la souris. */
export default function DragRail({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, x: 0, left: 0, moved: false });

  const stop = () => {
    drag.current.active = false;
    if (ref.current) ref.current.style.scrollSnapType = "";
  };

  return (
    <ul
      ref={ref}
      className={`${className ?? ""} cursor-grab active:cursor-grabbing`}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        drag.current = { active: true, x: e.clientX, left: ref.current.scrollLeft, moved: false };
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d.active || !ref.current) return;
        const dx = e.clientX - d.x;
        if (Math.abs(dx) > 8) d.moved = true;
        if (!d.moved) return; // seuil de 8 px avant de capturer le mouvement
        ref.current.style.scrollSnapType = "none";
        ref.current.scrollLeft = d.left - dx;
      }}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onClickCapture={(e) => {
        if (drag.current.moved) {
          e.preventDefault();
          e.stopPropagation();
          drag.current.moved = false;
        }
      }}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </ul>
  );
}
