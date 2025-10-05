import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import { review } from "@/lib/srs/engine";
import { DefaultConfig } from "@/lib/srs/config";
import type { ReviewCard } from "@/lib/srs/types";
import CardPrompt from "@/components/CardPrompt";

export default function Study() {
  const [queue, setQueue] = useState<ReviewCard[]>([]);
  const [current, setCurrent] = useState<ReviewCard | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    (async () => {
      const d = await db();
      const due = (await d.getAll("cards")).filter((c) => new Date(c.due) <= new Date());
      setQueue(due);
      setCurrent(due[0] ?? null);
    })();
  }, []);

  const onGrade = async (grade: "again" | "hard" | "good" | "easy") => {
    if (!current) return;
    const r = review(current, grade, DefaultConfig);
    const d = await db();
    await d.put("cards", r.card);
    const nextQ = queue.slice(1);
    if (r.card.state === "learning" || r.card.state === "relearning") {
      nextQ.splice(1, 0, r.card); // requeue soon
    }
    setQueue(nextQ);
    setCurrent(nextQ[0] ?? null);
    setShowAnswer(false);
  };

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!current) return;
      if (e.key === "Enter") { setShowAnswer((v) => !v); }
      if (!showAnswer) return;
      if (e.key === "1") onGrade("again");
      if (e.key === "2") onGrade("hard");
      if (e.key === "3") onGrade("good");
      if (e.key === "4") onGrade("easy");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, showAnswer, queue]);

  if (!current) return <p>No cards due right now. 🎉</p>;

  const total = queue.length + (current ? 1 : 0);

  return (
    <div className="grid gap-4">
      <div className="text-sm text-slate-400">Remaining: {total}</div>
      <CardPrompt
        card={current}
        showAnswer={showAnswer}
        onReveal={() => setShowAnswer(true)}
        onGrade={onGrade}
      />
    </div>
  );
}
