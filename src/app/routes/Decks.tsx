import { useEffect, useState } from "react";
import { db } from "@/lib/db";

interface Deck { id: string; title: string; level: "N5" | "N4"; counts?: { total: number; new: number; due: number } }

export default function Decks() {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    (async () => {
      const d = await db();
      const all = await d.getAll("decks");
      if (all.length === 0) {
        // initial seed
        await (await import("@/lib/db/seeds")).seed();
        setDecks(await d.getAll("decks"));
      } else {
        setDecks(all);
      }
    })();
  }, []);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Decks</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {decks.map((deck) => (
          <article key={deck.id} className="rounded-2xl border border-slate-800 p-4 bg-slate-900">
            <h2 className="font-medium">{deck.title}</h2>
            <p className="text-sm text-slate-400">Level {deck.level}</p>
            <div className="mt-2 text-sm flex gap-4">
              <span>New: {deck.counts?.new ?? 0}</span>
              <span>Due: {deck.counts?.due ?? 0}</span>
              <span>Total: {deck.counts?.total ?? 0}</span>
            </div>
            <a href="/study" className="inline-block mt-3 text-emerald-400 hover:underline">Start</a>
          </article>
        ))}
      </div>
    </div>
  );
}
