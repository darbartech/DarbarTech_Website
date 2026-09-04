export type AchievementType =
  | "certificate"
  | "badge"
  | "award"
  | "milestone";

export type AchievementLevel = "beginner" | "intermediate" | "advanced";

export interface Achievement {
  id: string;
  title: string;
  type: AchievementType;
  level: AchievementLevel;
  earnedAt: string;
  points: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  courseId: string;
  courseName: string;
  enrollmentDate: string;
  completionDate?: string;
  lastActiveAt?: string;
  achievements: Achievement[];
  achievementScore: number;
}

export type SortDirection = "asc" | "desc";

export type SortKey =
  | "course"
  | "enrollmentDate"
  | "lastActive"
  | "achievements"
  | "duration";

export interface SortRule {
  key: SortKey;
  direction: SortDirection;
}

export interface StudentFilters {
  courseIds?: string[];
  achievementTypes?: AchievementType[];
  enrolledAfter?: string;
  enrolledBefore?: string;
}
