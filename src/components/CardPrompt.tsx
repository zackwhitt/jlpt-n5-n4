import type { ReviewCard } from "@/lib/srs/types";

export default function CardPrompt({ card, showAnswer, onReveal, onGrade }: {
  card: ReviewCard;
  showAnswer: boolean;
  onReveal: () => void;
  onGrade: (g: "again" | "hard" | "good" | "easy") => void;
}) {
  const payload = card.payload ?? {};
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 grid gap-4">
      <div className="text-slate-300 text-sm">{card.kind}</div>
      <div className="text-4xl font-jp">{payload.prompt ?? "—"}</div>
      {showAnswer ? (
        <div className="grid gap-3">
          <div className="text-xl">{payload.answer ?? "(no answer)"}</div>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded bg-slate-800" onClick={() => onGrade("again")}>1 · Again</button>
            <button className="px-3 py-2 rounded bg-slate-800" onClick={() => onGrade("hard")}>2 · Hard</button>
            <button className="px-3 py-2 rounded bg-emerald-700" onClick={() => onGrade("good")}>3 · Good</button>
            <button className="px-3 py-2 rounded bg-blue-700" onClick={() => onGrade("easy")}>4 · Easy</button>
          </div>
        </div>
      ) : (
        <button className="justify-self-start bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded" onClick={onReveal}>Reveal (Enter)</button>
      )}
    </div>
  );
}
