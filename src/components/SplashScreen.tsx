import Logo from "@/components/ui/Logo";
import { noelActif } from "@/data/site";

/** Durée d'affichage avant retrait (ms) : 2 s d'habitude, 1,2 s pendant Noël (fondu de 300 ms inclus, voir globals.css). */
const DUREE = noelActif() ? 1200 : 2000;

/**
 * Lu avant le premier rendu : une seule fois par visite (sessionStorage « splash-vu »).
 * Le retrait visuel est 100 % CSS ; ce script ne fait que lever le blocage du scroll (filet CSS en plus).
 */
export const splashScript = `(function(){var h=document.documentElement;try{if(sessionStorage.getItem("splash-vu")){h.classList.add("splash-off");return}sessionStorage.setItem("splash-vu","1")}catch(e){}h.classList.add("splash-on");setTimeout(function(){h.classList.remove("splash-on");var s=document.getElementById("splash");if(s)s.setAttribute("aria-hidden","true")},${DUREE})})()`;

const AMPOULES = 8;

/** Écran de chargement rendu dans le HTML serveur ; se retire seul en CSS (voir globals.css). Pendant Noël : fond crème, fil doré et lumières. */
export default function SplashScreen() {
  const noel = noelActif();
  return (
    <div id="splash" className={`splash${noel ? " splash-noel" : ""}`} role="status" aria-label="Chargement de COSMETEO">
      <div className="splash-inner">
        <Logo tone={noel ? "dark" : "light"} variant="splash" link={false} priority className="splash-logo" />
        {noel ? (
          <span className="splash-thread" aria-hidden="true">
            <span className="splash-track">
              <span className="splash-fill" />
            </span>
            {Array.from({ length: AMPOULES }, (_, i) => (
              <span
                key={i}
                className="splash-bulb"
                style={{ left: `${(i + 0.5) * (100 / AMPOULES)}%`, animationDelay: `${0.15 + i * 0.1}s` }}
              />
            ))}
            <svg className="splash-star" width="14" height="14" viewBox="0 0 10 10">
              <path d="M5 0l1.2 3.8L10 5 6.2 6.2 5 10 3.8 6.2 0 5l3.8-1.2z" fill="#c9a45c" />
            </svg>
          </span>
        ) : (
          <span className="splash-track" aria-hidden="true">
            <span className="splash-fill" />
          </span>
        )}
      </div>
    </div>
  );
}
