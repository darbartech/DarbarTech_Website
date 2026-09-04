"use client";

import { Suspense, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, Users } from "lucide-react";
import { filterStudents } from "@/lib/students/filter";
import { sortStudents } from "@/lib/students/sort";
import { getCourseOptions, getStudents } from "@/lib/students/data";
import {
  buildStudentQuery,
  parseStudentQuery,
} from "@/lib/students/url";
import type { SortRule, StudentFilters } from "@/lib/students/types";
import SortControls from "./SortControls";
import FilterPanel from "./FilterPanel";
import StudentTable from "./StudentTable";
import Can from "@/components/common/Can";

const PAGE_SIZE = 10;

const DEFAULT_RULES: SortRule[] = [
  { key: "enrollmentDate", direction: "desc" },
];

function InsightsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const students = useMemo(() => getStudents(), []);
  const courseOptions = useMemo(() => getCourseOptions(), []);

  const parsed = useMemo(
    () =>
      parseStudentQuery(
        new URLSearchParams(searchParams.toString()),
        courseOptions.map((c) => c.id),
      ),
    [searchParams, courseOptions],
  );

  const filteredSorted = useMemo(() => {
    const filtered = filterStudents(students, parsed.filters);
    return sortStudents(filtered, parsed.sortRules);
  }, [students, parsed.filters, parsed.sortRules]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSorted.length / PAGE_SIZE),
  );
  const safePage = Math.min(parsed.page, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pageStudents = filteredSorted.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  const hasActiveState =
    parsed.sortRules.some(
      (rule) =>
        rule.key !== "enrollmentDate" || rule.direction !== "desc",
    ) ||
    parsed.sortRules.length !== 1 ||
    (parsed.filters.courseIds?.length ?? 0) > 0 ||
    (parsed.filters.achievementTypes?.length ?? 0) > 0 ||
    Boolean(parsed.filters.enrolledAfter) ||
    Boolean(parsed.filters.enrolledBefore);

  const applyState = (
    sortRules: SortRule[],
    filters: StudentFilters,
    page = 1,
  ) => {
    const safeRules = sortRules.length > 0 ? sortRules : DEFAULT_RULES;
    const query = buildStudentQuery(safeRules, filters, page);
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const handleChangeRules = (rules: SortRule[]) =>
    applyState(rules, parsed.filters, 1);

  const handleChangeFilters = (filters: StudentFilters) =>
    applyState(parsed.sortRules, filters, 1);

  const handleReset = () =>
    applyState(DEFAULT_RULES, {}, 1);

  const goToPage = (page: number) =>
    applyState(parsed.sortRules, parsed.filters, page);

  const activeFilterCount =
    (parsed.filters.courseIds?.length ?? 0) +
    (parsed.filters.achievementTypes?.length ?? 0) +
    (parsed.filters.enrolledAfter ? 1 : 0) +
    (parsed.filters.enrolledBefore ? 1 : 0);

  return (
    <section className="px-4 py-2">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-(--text-primary-dashboard) sm:text-3xl">
            Student Insights
          </h1>
          <p className="mt-2 text-sm text-(--tertiary-text-dashboard) sm:text-base">
            Sort and filter students by course, achievements and timing.
          </p>
        </div>

        <Can permission="users.view">
          <span className="inline-flex items-center gap-2 rounded-full bg-(--secondary-bg-dashboard) px-4 py-2 text-sm font-medium text-(--text-primary-dashboard)">
            <Users size={16} className="text-(--secondary-text-dashboard)" />
            {filteredSorted.length} students
          </span>
        </Can>
      </div>

      {/* Sort controls */}
      <div className="mb-4 rounded-xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <SlidersHorizontal
            size={16}
            className="text-(--secondary-text-dashboard)"
          />
          <h2 className="text-sm font-semibold text-(--text-primary-dashboard)">
            Sort
          </h2>
          {activeFilterCount > 0 && (
            <span className="ml-auto rounded-full bg-(--bg-lightblue) px-2.5 py-0.5 text-xs font-medium text-(--text-primary-dashboard)">
              {activeFilterCount} filter
              {activeFilterCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <SortControls
          rules={parsed.sortRules}
          onChangeRules={handleChangeRules}
        />
      </div>

      {/* Filter panel + table */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) p-4 shadow-sm lg:col-span-1">
          <h2 className="mb-4 text-sm font-semibold text-(--text-primary-dashboard)">
            Filters
          </h2>
          <FilterPanel
            courseOptions={courseOptions}
            filters={parsed.filters}
            onChangeFilters={handleChangeFilters}
            onReset={handleReset}
          />
        </div>

        <div className="space-y-4 lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-(--secondary-text-dashboard)">
            <span>
              Showing{" "}
              {filteredSorted.length === 0
                ? 0
                : startIndex + 1}
              –
              {Math.min(startIndex + PAGE_SIZE, filteredSorted.length)} of{" "}
              {filteredSorted.length} students
            </span>
            {hasActiveState && (
              <button
                type="button"
                onClick={handleReset}
                className="text-sm font-medium text-(--bg-lightblue) transition hover:underline hover:cursor-pointer"
              >
                Reset all
              </button>
            )}
          </div>

          <StudentTable students={pageStudents} />

          {/* Pagination */}
          {filteredSorted.length > PAGE_SIZE && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-(--secondary-text-dashboard)">
                Page {safePage} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
                  className="rounded-lg border border-(--border-primary-dashboard) px-3 py-2 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage === totalPages}
                  className="rounded-lg border border-(--border-primary-dashboard) px-3 py-2 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function StudentsInsightsPage() {
  return (
    <Suspense fallback={null}>
      <InsightsContent />
    </Suspense>
  );
}
