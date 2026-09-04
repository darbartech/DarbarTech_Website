import type { Student, StudentFilters } from "./types";

function parseDate(value: string | undefined): number | null {
  if (!value) return null;
  const time = Date.parse(value);
  return Number.isNaN(time) ? null : time;
}

/**
 * Applies filters to a student array without mutating the input.
 *
 * - courseIds: student.courseId must match one of the selected ids.
 * - achievementTypes: student must have at least one achievement of a
 *   selected type.
 * - enrolledAfter / enrolledBefore: inclusive date-range boundaries.
 *
 * Empty / omitted filters do not restrict results.
 */
export function filterStudents(
  students: Student[],
  filters: StudentFilters,
): Student[] {
  const courseIds = filters.courseIds?.length
    ? new Set(filters.courseIds)
    : null;
  const achievementTypes = filters.achievementTypes?.length
    ? new Set(filters.achievementTypes)
    : null;
  const after = parseDate(filters.enrolledAfter);
  const before = parseDate(filters.enrolledBefore);

  return students.filter((student) => {
    if (courseIds && !courseIds.has(student.courseId)) return false;

    if (
      achievementTypes &&
      !student.achievements.some((achievement) =>
        achievementTypes.has(achievement.type),
      )
    ) {
      return false;
    }

    if (after !== null) {
      const enrolled = parseDate(student.enrollmentDate);
      if (enrolled === null || enrolled < after) return false;
    }

    if (before !== null) {
      const enrolled = parseDate(student.enrollmentDate);
      if (enrolled === null || enrolled > before) return false;
    }

    return true;
  });
}
