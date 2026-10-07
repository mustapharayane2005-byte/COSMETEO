"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import Icon from "@/components/ui/Icon";

/** Chatbot flottant — visuel uniquement, non connecté. */
export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-[84px] right-4 z-40 flex flex-col items-end gap-3 font-ui md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="w-[260px] rounded-2xl bg-ivory p-4 text-sm shadow-xl ring-1 ring-brown/10"
            role="status"
          >
            <p className="font-display text-lg text-[#1A1A1A]">Conseillère COSMÉTÉO</p>
            <p className="mt-1 text-brown/70">Notre assistant beauté arrive bientôt.</p>
          </m.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Assistant COSMÉTÉO (bientôt disponible)"
        className="grid size-14 place-items-center rounded-full bg-green text-ivory shadow-lg transition hover:scale-105"
      >
        <Icon name={open ? "close" : "chat"} size={24} />
      </button>
    </div>
  );
}
