/**
 * Fade + translateY 24 px, 0.6 s, une seule fois. Aucun JS propre : l'attribut data-reveal est géré par
 * <RevealObserver /> (IntersectionObserver partagé) et par les règles CSS de globals.css.
 * Mobile et prefers-reduced-motion : contenu visible directement.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  /** Délai en secondes (stagger : index × 0.09 dans les grilles). */
  delay?: number;
  className?: string;
}) {
  return (
    <div data-reveal className={className} style={delay ? ({ "--d": `${Math.round(delay * 1000)}ms` } as React.CSSProperties) : undefined}>
      {children}
    </div>
  );
}
