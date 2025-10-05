import { DefaultConfig } from "./config";
import type { Grade, ReviewCard, ReviewResult, SrsConfig } from "./types";

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));
const addDays = (d: Date, days: number) => new Date(d.getTime() + days * 86400000);
const addMinutes = (d: Date, mins: number) => new Date(d.getTime() + mins * 60000);

export function review(input: ReviewCard, grade: Grade, cfg: SrsConfig = DefaultConfig, now = new Date()): ReviewResult {
  const c: ReviewCard = { ...input };
  c.reps += 1;
  const steps = cfg.learningStepsMinutes;
  const minIvl = cfg.minIntervalDays;
  const maxIvl = cfg.maxIntervalDays;

  const scheduleLearning = (idx: number) => {
    c.state = c.state === "review" ? "relearning" : "learning";
    c.stepIndex = idx;
    c.intervalDays = 0;
    const dueDate = addMinutes(now, steps[idx]);
    c.due = dueDate.toISOString();
    return { card: c, nextDue: c.due } as ReviewResult;
  };

  if (!c.easeFactor) c.easeFactor = 2.5;
  if (!c.state) c.state = "new";

  if (c.lapses >= cfg.leechThreshold) {
    c.state = "leech";
    c.due = addDays(now, 7).toISOString();
    return { card: c, nextDue: c.due };
  }

  switch (c.state) {
    case "new":
    case "learning":
    case "relearning": {
      if (grade === "again") {
        c.lapses += c.state === "relearning" ? 1 : 0;
        c.easeFactor = clamp(c.easeFactor - 0.2, 1.3, 3.0);
        return scheduleLearning(0);
      }
      if (grade === "hard") {
        c.easeFactor = clamp(c.easeFactor - 0.15, 1.3, 3.0);
        return scheduleLearning(c.stepIndex ? c.stepIndex : 0);
      }
      if (grade === "good") {
        const nextIdx = (c.stepIndex ?? -1) + 1;
        if (nextIdx < steps.length) return scheduleLearning(nextIdx);
        c.state = "review";
        c.intervalDays = Math.max(minIvl, cfg.graduatingIntervalDays);
        c.due = addDays(now, c.intervalDays).toISOString();
        return { card: c, nextDue: c.due };
      }
      if (grade === "easy") {
        c.state = "review";
        c.easeFactor = clamp(c.easeFactor + 0.15, 1.3, 3.0);
        c.intervalDays = Math.max(minIvl, Math.round(cfg.graduatingIntervalDays * cfg.easyBonus));
        c.due = addDays(now, c.intervalDays).toISOString();
        return { card: c, nextDue: c.due };
      }
      break;
    }
    case "review": {
      const ivl = c.intervalDays || minIvl;
      if (grade === "again") {
        c.lapses += 1;
        c.easeFactor = clamp(c.easeFactor - 0.2, 1.3, 3.0);
        return scheduleLearning(0);
      }
      if (grade === "hard") {
        c.easeFactor = clamp(c.easeFactor - 0.15, 1.3, 3.0);
        const next = clamp(Math.round(ivl * 1.2), minIvl, maxIvl);
        c.intervalDays = next;
        c.due = addDays(now, next).toISOString();
        return { card: c, nextDue: c.due };
      }
      if (grade === "good") {
        const next = clamp(Math.round(ivl * c.easeFactor), minIvl, maxIvl);
        c.intervalDays = next;
        c.due = addDays(now, next).toISOString();
        return { card: c, nextDue: c.due };
      }
      if (grade === "easy") {
        c.easeFactor = clamp(c.easeFactor + 0.15, 1.3, 3.0);
        const next = clamp(Math.round(ivl * c.easeFactor * cfg.easyBonus), minIvl, maxIvl);
        c.intervalDays = next;
        c.due = addDays(now, next).toISOString();
        return { card: c, nextDue: c.due };
      }
      break;
    }
  }
  c.due = c.due || now.toISOString();
  return { card: c, nextDue: c.due };
}
