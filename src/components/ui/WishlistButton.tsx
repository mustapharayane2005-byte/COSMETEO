"use client";

import { useState } from "react";
import Icon from "./Icon";
import s from "./WishlistButton.module.css";

/**
 * Bouton favoris — état purement visuel pour l'instant.
 * Plus tard : brancher un contexte/serveur de wishlist (props `active` + `onToggle`).
 */
export default function WishlistButton({ productName }: { productName: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      className={`${s.btn} ${on ? s.on : ""}`}
      aria-pressed={on}
      aria-label={`${on ? "Retirer des" : "Ajouter aux"} favoris : ${productName}`}
      onClick={() => setOn((v) => !v)}
    >
      <Icon name="heart" size={20} fill={on ? "currentColor" : "none"} />
    </button>
  );
}
