"use client";

import { useState } from "react";
import type { Card } from "@/lib/tasks";

type Props = { cards: Card[]; accentText: string; accentSoft: string; accentBg: string; gradient: string };

export default function FlashcardDeck({ cards, accentText, accentSoft, accentBg, gradient }: Props) {
  const [deck, setDeck] = useState(cards);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());

  const card = deck[i];
  const go = (d: number) => {
    setFlipped(false);
    setI((x) => (x + d + deck.length) % deck.length);
  };
  const shuffle = () => {
    setDeck([...deck].sort(() => Math.random() - 0.5));
    setI(0);
    setFlipped(false);
  };
  const toggleKnown = () =>
    setKnown((s) => {
      const n = new Set(s);
      if (n.has(card.front)) n.delete(card.front);
      else n.add(card.front);
      return n;
    });

  const isKnown = known.has(card.front);

  return (
    <div
      className="space-y-4"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        else if (e.key === "ArrowLeft") go(-1);
        else if (e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      <div className="flex items-center justify-between text-xs font-medium text-neutral-500">
        <span>
          Card {i + 1} of {deck.length}
        </span>
        <span className={accentText}>
          {known.size} / {deck.length} known
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
        <div className={`h-full ${accentBg} transition-all`} style={{ width: `${(known.size / deck.length) * 100}%` }} />
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? "Show question" : "Show answer"}
        className="block w-full [perspective:1200px]"
      >
        <div
          className={`relative min-h-[240px] w-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
        >
          <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-black/10 p-6 text-center [backface-visibility:hidden] dark:border-white/10 ${accentSoft}`}>
            <span className={`mb-3 text-[11px] font-bold uppercase tracking-widest ${accentText}`}>Question</span>
            <p className="text-lg font-semibold leading-snug">{card.front}</p>
            <span className="mt-4 text-xs text-neutral-500">Click to flip</span>
          </div>
          <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} p-6 text-center text-white [backface-visibility:hidden] [transform:rotateY(180deg)]`}>
            <span className="mb-3 text-[11px] font-bold uppercase tracking-widest opacity-80">Answer</span>
            <p className="text-base leading-relaxed">{card.back}</p>
          </div>
        </div>
      </button>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <button onClick={() => go(-1)} className="rounded-lg border border-black/10 px-3 py-2 text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10">
            ← Prev
          </button>
          <button onClick={() => go(1)} className="rounded-lg border border-black/10 px-3 py-2 text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10">
            Next →
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={shuffle} className="rounded-lg px-3 py-2 text-sm text-neutral-500 hover:bg-black/5 dark:hover:bg-white/10">
            Shuffle
          </button>
          <button
            onClick={toggleKnown}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${isKnown ? `${accentBg} text-white` : `${accentSoft} ${accentText}`}`}
          >
            {isKnown ? "✓ Known" : "Mark as known"}
          </button>
        </div>
      </div>
      <p className="text-xs text-neutral-400">Tip: click the card or press Space to flip, arrow keys to move.</p>
    </div>
  );
}
