import type { Achievement, AchievementLevel } from "./types";

export const levelWeight: Record<AchievementLevel, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

/**
 * Computes the aggregate achievement score for a student.
 *
 * score = Σ (achievement.points × levelWeight[achievement.level])
 *
 * Kept as a pure, framework-independent function so the aggregate can
 * later be persisted (denormalized) on the student record without changing
 * the frontend sorting contract.
 */
export function computeAchievementScore(
  achievements: Achievement[],
): number {
  return achievements.reduce(
    (sum, achievement) =>
      sum +
      achievement.points * (levelWeight[achievement.level] ?? 0),
    0,
  );
}
