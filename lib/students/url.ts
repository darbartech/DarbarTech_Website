import type {
  AchievementType,
  SortDirection,
  SortKey,
  SortRule,
  StudentFilters,
} from "./types";

export const allowedSortKeys: SortKey[] = [
  "course",
  "enrollmentDate",
  "lastActive",
  "achievements",
  "duration",
];

export const allowedDirections: SortDirection[] = ["asc", "desc"];

export const allowedAchievementTypes: AchievementType[] = [
  "certificate",
  "badge",
  "award",
  "milestone",
];

const DEFAULT_SORT: SortRule = { key: "enrollmentDate", direction: "desc" };

function isSortKey(value: string | null): value is SortKey {
  return value !== null && (allowedSortKeys as string[]).includes(value);
}

function isDirection(value: string | null): value is SortDirection {
  return value === "asc" || value === "desc";
}

function isAchievementType(value: string): value is AchievementType {
  return (allowedAchievementTypes as string[]).includes(value);
}

export interface ParsedStudentQuery {
  sortRules: SortRule[];
  filters: StudentFilters;
  courseOptions: string[];
  page: number;
}

function splitValues(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

/**
 * Parses and validates URL query parameters into a safe, typed state.
 *
 * Unknown or invalid values fall back to safe defaults rather than breaking
 * the page or producing invalid query behavior.
 */
export function parseStudentQuery(
  searchParams: URLSearchParams,
  availableCourseIds: string[],
): ParsedStudentQuery {
  const available = new Set(availableCourseIds);

  // ---- sorting ----
  const sortRules: SortRule[] = [];
  const sortRaw = searchParams.getAll("sort");
  const dirRaw = searchParams.getAll("dir");

  const count = Math.max(sortRaw.length, dirRaw.length);
  for (let i = 0; i < count; i += 1) {
    const key = sortRaw[i] ?? null;
    if (!isSortKey(key)) continue;
    const rawDir = dirRaw[i] ?? searchParams.get("dir");
    sortRules.push({
      key,
      direction: isDirection(rawDir) ? rawDir : DEFAULT_SORT.direction,
    });
  }

  if (sortRules.length === 0) {
    const singleKey = searchParams.get("sort");
    if (isSortKey(singleKey)) {
      sortRules.push({
        key: singleKey,
        direction: isDirection(searchParams.get("dir"))
          ? (searchParams.get("dir") as SortDirection)
          : DEFAULT_SORT.direction,
      });
    } else {
      sortRules.push({ ...DEFAULT_SORT });
    }
  }

  // ---- filtering ----
  const courseIds = splitValues(searchParams.get("courseId")).filter((id) =>
    available.has(id),
  );

  const achievementTypes = splitValues(
    searchParams.get("achievementType"),
  ).filter(isAchievementType);

  let enrolledAfter = searchParams.get("enrolledAfter") ?? undefined;
  let enrolledBefore = searchParams.get("enrolledBefore") ?? undefined;

  if (enrolledAfter && Number.isNaN(Date.parse(enrolledAfter))) {
    enrolledAfter = undefined;
  }
  if (enrolledBefore && Number.isNaN(Date.parse(enrolledBefore))) {
    enrolledBefore = undefined;
  }

  // ---- pagination ----
  const pageRaw = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;

  return {
    sortRules,
    filters: { courseIds, achievementTypes, enrolledAfter, enrolledBefore },
    courseOptions: [...courseIds],
    page,
  };
}

/**
 * Builds a query-string representation used to keep the URL synchronized with
 * the UI. Only active rules/filters are serialized so invalid/empty state
 * collapses cleanly.
 */
export function buildStudentQuery(
  rules: SortRule[],
  filters: StudentFilters,
  page = 1,
): string {
  const params = new URLSearchParams();

  rules.forEach((rule) => {
    params.append("sort", rule.key);
    params.append("dir", rule.direction);
  });

  if (filters.courseIds?.length) {
    params.set("courseId", filters.courseIds.join(","));
  }
  if (filters.achievementTypes?.length) {
    params.set("achievementType", filters.achievementTypes.join(","));
  }
  if (filters.enrolledAfter) {
    params.set("enrolledAfter", filters.enrolledAfter);
  }
  if (filters.enrolledBefore) {
    params.set("enrolledBefore", filters.enrolledBefore);
  }
  if (page > 1) {
    params.set("page", String(page));
  }

  return params.toString();
}
