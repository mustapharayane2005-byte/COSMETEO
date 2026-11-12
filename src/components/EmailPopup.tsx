"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import { POPUP_EMAIL_ACTIF, POPUP_EMAIL_DELAI_SECONDES } from "@/data/site";
import s from "./EmailPopup.module.css";

const DELAI_MS = POPUP_EMAIL_DELAI_SECONDES * 1000;
const SORTIE_MS = 400;
const PAUSE_MS = 30 * 24 * 60 * 60 * 1000;
const CLE_ARRIVEE = "popup-email-arrivee";
const CLE_VU = "popup-email-vu";
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function pageExclue(chemin: string) {
  return ["/panier", "/commande", "/admin"].some((p) => chemin === p || chemin.startsWith(p + "/"));
}

function dejaVu(): boolean {
  try {
    const t = Number(localStorage.getItem(CLE_VU));
    return t > 0 && Date.now() - t < PAUSE_MS;
  } catch {
    return false;
  }
}

/** Comme l'ancien formulaire du site : démo, l'e-mail n'est envoyé nulle part. Brancher l'inscription (API/ESP) dans envoyer(). */
export default function EmailPopup() {
  const pathname = usePathname();
  const { isOpen: tiroirOuvert } = useCart();
  const [pret, setPret] = useState(false); // le délai est écoulé (ou aperçu)
  const [ferme, setFerme] = useState(false);
  const [apercu, setApercu] = useState(false);
  const [email, setEmail] = useState("");
  const [accepte, setAccepte] = useState(false);
  const [done, setDone] = useState(false);
  const [entre, setEntre] = useState(false);
  const [sortant, setSortant] = useState(false);

  const exclu = pageExclue(pathname);

  // Décompte : l'heure d'arrivée est gardée en sessionStorage, il continue d'une page à l'autre.
  useEffect(() => {
    if (!POPUP_EMAIL_ACTIF || pret || ferme) return;
    if (new URLSearchParams(window.location.search).get("popup") === "apercu") {
      setApercu(true);
      setPret(true);
      return;
    }
    if (dejaVu()) return;
    let arrivee = Date.now();
    try {
      const v = Number(sessionStorage.getItem(CLE_ARRIVEE));
      if (v > 0) arrivee = v;
      else sessionStorage.setItem(CLE_ARRIVEE, String(arrivee));
    } catch {}
    const t = setTimeout(() => setPret(true), Math.max(0, DELAI_MS - (Date.now() - arrivee)));
    return () => clearTimeout(t);
  }, [pret, ferme]);

  const visible = POPUP_EMAIL_ACTIF && pret && !ferme && !exclu && !tiroirOuvert;

  const fermer = useCallback(() => {
    setSortant(true);
    setTimeout(() => setFerme(true), SORTIE_MS);
    if (apercu) return;
    try {
      localStorage.setItem(CLE_VU, String(Date.now()));
    } catch {}
  }, [apercu]);

  // Entrée : on laisse le panneau se monter hors écran, puis on le fait glisser.
  useEffect(() => {
    if (!visible) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setEntre(true)));
    return () => cancelAnimationFrame(id);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fermer();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, fermer]);

  if (!visible) return null;

  const valide = EMAIL_OK.test(email.trim()) && accepte;

  return (
    <div className={s.zone}>
      <div
        className={`${s.dialog} ${entre && !sortant ? s.ouvert : ""}`}
        role="dialog"
        aria-labelledby="popup-email-titre"
      >
        <button type="button" className={s.close} onClick={fermer} aria-label="Fermer">
          ×
        </button>
        {done ? (
          <p className={s.merci} role="status">
            Merci, c&apos;est noté.
          </p>
        ) : (
          <>
            <h2 id="popup-email-titre" className={s.title}>
              Restez informé(e)
            </h2>
            <p className={s.text}>
              Laissez votre e-mail pour être prévenu(e) des nouveaux produits et de nos offres.
            </p>
            <form
              className={s.form}
              onSubmit={(e) => {
                e.preventDefault();
                if (!valide) return;
                setDone(true);
                if (!apercu) {
                  try {
                    localStorage.setItem(CLE_VU, String(Date.now()));
                  } catch {}
                }
              }}
            >
              <label htmlFor="popup-email" className="sr-only">
                Votre adresse e-mail
              </label>
              <input
                id="popup-email"
                type="email"
                autoComplete="email"
                placeholder="Votre adresse e-mail"
                className={s.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className={s.consent}>
                <input type="checkbox" checked={accepte} onChange={(e) => setAccepte(e.target.checked)} />
                <span>J&apos;accepte de recevoir des e-mails de Cosméteo. Je peux me désinscrire à tout moment.</span>
              </label>
              <button type="submit" className={s.btn} disabled={!valide}>
                Je m&apos;inscris
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
