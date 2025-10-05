import type { SrsConfig } from "./types";
export const DefaultConfig: SrsConfig = {
  newPerDay: 15,
  maxReviewsPerDay: 120,
  learningStepsMinutes: [1, 10],
  graduatingIntervalDays: 1,
  easyBonus: 1.3,
  leechThreshold: 8,
  minIntervalDays: 1,
  maxIntervalDays: 365,
};
