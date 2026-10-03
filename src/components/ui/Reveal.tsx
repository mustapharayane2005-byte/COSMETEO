/**
 * Fondu + translateY 22 px, une seule fois (classe `is-visible` posée par <RevealObserver />, animation en CSS pur
 * dans globals.css). Contenu visible sans JS et avec prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  /** Délai en secondes (stagger : 70 ms par rang dans les grilles). */
  delay?: number;
  className?: string;
}) {
  return (
    <div data-reveal className={className} style={delay ? ({ "--d": `${Math.round(delay * 1000)}ms` } as React.CSSProperties) : undefined}>
      {children}
    </div>
  );
}
