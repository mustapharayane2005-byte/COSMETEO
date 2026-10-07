import Logo from "@/components/ui/Logo";

/**
 * Lu avant le premier rendu : une seule fois par visite (sessionStorage « splash-vu »).
 * Le retrait visuel est 100 % CSS ; ce script ne fait que lever le blocage du scroll (filet CSS en plus).
 */
export const splashScript = `(function(){var h=document.documentElement;try{if(sessionStorage.getItem("splash-vu")){h.classList.add("splash-off");return}sessionStorage.setItem("splash-vu","1")}catch(e){}h.classList.add("splash-on");setTimeout(function(){h.classList.remove("splash-on");var s=document.getElementById("splash");if(s)s.setAttribute("aria-hidden","true")},2000)})()`;

/** Écran de chargement de 2 s, rendu dans le HTML serveur ; se retire seul en CSS (voir globals.css). */
export default function SplashScreen() {
  return (
    <div id="splash" className="splash" role="status" aria-label="Chargement de COSMETEO">
      <div className="splash-inner">
        <Logo tone="light" variant="splash" link={false} priority className="splash-logo" />
        <span className="splash-track" aria-hidden="true">
          <span className="splash-fill" />
        </span>
      </div>
    </div>
  );
}
