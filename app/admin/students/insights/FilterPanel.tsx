"use client";

import { RotateCcw } from "lucide-react";
import type { CourseOption } from "@/lib/students/data";
import type {
  AchievementType,
  StudentFilters,
} from "@/lib/students/types";
import { allowedAchievementTypes } from "@/lib/students/url";

const TYPE_LABELS: Record<AchievementType, string> = {
  certificate: "Certificate",
  badge: "Badge",
  award: "Award",
  milestone: "Milestone",
};

const inputClass =
  "rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-3 py-2 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue) focus:ring-2 focus:ring-(--bg-lightblue)/20";

const checkClass =
  "h-4 w-4 cursor-pointer accent-(--bg-lightblue)";

export default function FilterPanel({
  courseOptions,
  filters,
  onChangeFilters,
  onReset,
}: {
  courseOptions: CourseOption[];
  filters: StudentFilters;
  onChangeFilters: (filters: StudentFilters) => void;
  onReset: () => void;
}) {
  const toggleCourse = (id: string) => {
    const current = filters.courseIds ?? [];
    const next = current.includes(id)
      ? current.filter((c) => c !== id)
      : [...current, id];
    onChangeFilters({ ...filters, courseIds: next });
  };

  const toggleType = (type: AchievementType) => {
    const current = filters.achievementTypes ?? [];
    const next = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    onChangeFilters({ ...filters, achievementTypes: next });
  };

  const hasActive =
    (filters.courseIds?.length ?? 0) > 0 ||
    (filters.achievementTypes?.length ?? 0) > 0 ||
    Boolean(filters.enrolledAfter) ||
    Boolean(filters.enrolledBefore);

  return (
    <div className="flex flex-col gap-5">
      {/* Courses */}
      <fieldset>
        <legend className="mb-2 text-xs font-medium uppercase tracking-wide text-(--secondary-text-dashboard)">
          Course
        </legend>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {courseOptions.map((course) => (
            <label
              key={course.id}
              className="flex items-center gap-2 text-sm text-(--text-primary-dashboard)"
            >
              <input
                type="checkbox"
                checked={(filters.courseIds ?? []).includes(course.id)}
                onChange={() => toggleCourse(course.id)}
                className={checkClass}
              />
              {course.name}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Achievement types */}
      <fieldset>
        <legend className="mb-2 text-xs font-medium uppercase tracking-wide text-(--secondary-text-dashboard)">
          Achievement Type
        </legend>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {allowedAchievementTypes.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 text-sm text-(--text-primary-dashboard)"
            >
              <input
                type="checkbox"
                checked={(filters.achievementTypes ?? []).includes(type)}
                onChange={() => toggleType(type)}
                className={checkClass}
              />
              {TYPE_LABELS[type]}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Enrollment date range */}
      <fieldset>
        <legend className="mb-2 text-xs font-medium uppercase tracking-wide text-(--secondary-text-dashboard)">
          Enrollment Date
        </legend>
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-2 text-sm text-(--text-primary-dashboard)">
            From
            <input
              type="date"
              value={filters.enrolledAfter ?? ""}
              onChange={(event) =>
                onChangeFilters({
                  ...filters,
                  enrolledAfter: event.target.value || undefined,
                })
              }
              className={inputClass}
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-(--text-primary-dashboard)">
            To
            <input
              type="date"
              value={filters.enrolledBefore ?? ""}
              onChange={(event) =>
                onChangeFilters({
                  ...filters,
                  enrolledBefore: event.target.value || undefined,
                })
              }
              className={inputClass}
            />
          </label>
        </div>
      </fieldset>

      <button
        type="button"
        onClick={onReset}
        disabled={!hasActive}
        className="flex w-fit items-center gap-1.5 rounded-lg border border-(--border-primary-dashboard) px-3 py-2 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RotateCcw size={15} />
        Reset Filters
      </button>
    </div>
  );
}
