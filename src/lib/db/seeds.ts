import { db } from "./index";
import type { ReviewCard } from "@/lib/srs/types";

export async function seed() {
  const d = await db();
  // Minimal sample deck + 3 cards
  await d.put("decks", { id: "n5-core", title: "N5 Core", level: "N5", counts: { total: 3, new: 3, due: 3 } });

  const now = new Date().toISOString();
  const base: Omit<ReviewCard, "id"> = {
    deckId: "n5-core",
    kind: "vocabMeaning",
    state: "new",
    due: now,
    intervalDays: 0,
    easeFactor: 2.5,
    reps: 0,
    lapses: 0,
    payload: { prompt: "学生", answer: "student" },
  };
  await d.put("cards", { id: "c1", ...base });
  await d.put("cards", { id: "c2", ...base, payload: { prompt: "先生", answer: "teacher" } });
  await d.put("cards", { id: "c3", ...base, payload: { prompt: "学校", answer: "school" } });
}
