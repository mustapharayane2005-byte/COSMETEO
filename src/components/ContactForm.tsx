"use client";

import { useState } from "react";

const field =
  "w-full rounded-2xl border border-[#E3DDD3] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#6B6B68] focus-visible:border-green";

/** Formulaire visuel : aucun envoi réel tant que le service de messagerie n'est pas branché. */
export default function ContactForm() {
  const [done, setDone] = useState(false);
  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label className="grid gap-1.5 text-sm font-medium">
        Nom
        <input name="nom" type="text" required autoComplete="name" className={field} placeholder="Votre nom" />
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        Email
        <input name="email" type="email" required autoComplete="email" className={field} placeholder="vous@exemple.com" />
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        Message
        <textarea name="message" required rows={5} className={field} placeholder="Comment pouvons-nous vous aider ?" />
      </label>
      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-green px-8 text-sm font-semibold uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#0f2a22]"
      >
        Envoyer
      </button>
      {done && (
        <p role="status" className="text-sm text-[var(--muted)]">
          Formulaire de démonstration : aucun message n&apos;a été envoyé.
        </p>
      )}
    </form>
  );
}
