import type { SortDirection, SortKey, SortRule, Student } from "./types";

function parseDate(value: string | undefined): number | null {
  if (!value) return null;
  const time = Date.parse(value);
  return Number.isNaN(time) ? null : time;
}

type Comparable = string | number | null;

function resolveValue(student: Student, key: SortKey): Comparable {
  switch (key) {
    case "course":
      return student.courseName.toLowerCase();
    case "enrollmentDate":
      return parseDate(student.enrollmentDate);
    case "lastActive":
      return parseDate(student.lastActiveAt);
    case "achievements":
      return student.achievementScore;
    case "duration":
      return parseDate(student.enrollmentDate);
  }
}

function compareComparable(
  a: Comparable,
  b: Comparable,
  direction: SortDirection,
): number {
  // Missing (null) values always sort last, regardless of direction.
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;

  let result: number;
  if (typeof a === "string" && typeof b === "string") {
    result = a.localeCompare(b);
  } else {
    result = (a as number) - (b as number);
  }

  return direction === "desc" ? -result : result;
}

/**
 * Stable multi-key sort. Does not mutate the input.
 *
 * - The first rule is the highest priority.
 * - Subsequent rules act as tiebreakers.
 * - An ascending `id` comparison is appended as a final tiebreaker so results
 *   are fully deterministic across identical sort inputs.
 * - `duration` is defined as elapsed time (`now - enrollmentDate`); comparing
 *   it reduces to comparing the enrollment timestamp with the direction
 *   flipped so longest/shortest semantics are preserved.
 */
export function sortStudents(
  students: Student[],
  rules: SortRule[],
): Student[] {
  const comparators = rules
    .filter(
      (rule) =>
        rule &&
        (rule.key === "course" ||
          rule.key === "enrollmentDate" ||
          rule.key === "lastActive" ||
          rule.key === "achievements" ||
          rule.key === "duration") &&
        (rule.direction === "asc" || rule.direction === "desc"),
    )
    .map((rule) => {
      // duration: largest elapsed (now - enrollmentDate) first when descending,
      // which is the smallest enrollment timestamp. Flip direction accordingly.
      const isDuration = rule.key === "duration";
      return (a: Student, b: Student) => {
        const av = resolveValue(a, rule.key);
        const bv = resolveValue(b, rule.key);
        const direction: SortDirection = isDuration
          ? rule.direction === "desc"
            ? "asc"
            : "desc"
          : rule.direction;
        return compareComparable(av, bv, direction);
      };
    });

  return students
    .slice()
    .sort((a, b) => {
      for (const compare of comparators) {
        const result = compare(a, b);
        if (result !== 0) return result;
      }
      return a.id.localeCompare(b.id);
    });
}
