export type Grade = "again" | "hard" | "good" | "easy";
export type ReviewState = "new" | "learning" | "review" | "relearning" | "suspended" | "leech";

export interface SrsConfig {
  newPerDay: number;
  maxReviewsPerDay: number;
  learningStepsMinutes: number[];
  graduatingIntervalDays: number;
  easyBonus: number;
  leechThreshold: number;
  minIntervalDays: number;
  maxIntervalDays: number;
}

export interface ReviewCard {
  id: string;
  deckId: string;
  kind: string;
  state: ReviewState;
  due: string;
  intervalDays: number;
  easeFactor: number;
  reps: number;
  lapses: number;
  stepIndex?: number;
  payload: any;
}

export interface ReviewResult { card: ReviewCard; nextDue: string }
