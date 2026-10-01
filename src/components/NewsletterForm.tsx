"use client";

import { useId, useState } from "react";
import s from "./NewsletterForm.module.css";

/** Démo : aucune donnée n'est envoyée. Brancher l'inscription (API/ESP) dans onSubmit. */
export default function NewsletterForm() {
  const id = useId();
  const [done, setDone] = useState(false);

  return (
    <form
      className={s.form}
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <div className={s.row}>
        <label htmlFor={id} className="sr-only">
          Votre adresse e-mail
        </label>
        <input id={id} type="email" required placeholder="Votre adresse e-mail" autoComplete="email" className={s.input} />
        <button type="submit" className={s.btn}>
          S&apos;INSCRIRE
        </button>
      </div>
      <p className={s.status} role="status">
        {done ? "Merci ! (démo : aucune donnée envoyée)" : "Pas de spam. Désinscription à tout moment."}
      </p>
    </form>
  );
}
