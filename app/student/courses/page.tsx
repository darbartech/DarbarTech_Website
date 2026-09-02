import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardList,
  UserRound,
} from "lucide-react";
import {
  Card,
  FilterChip,
  PageHeader,
  ProgressBar,
  StatusBadge,
} from "../components/ui";
import { courses } from "../data";

const filters = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Upcoming", value: "Upcoming" },
  { label: "Completed", value: "Completed" },
];

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const raw = (await searchParams).status;
  const activeFilter =
    typeof raw === "string" && filters.some((f) => f.value === raw)
      ? raw
      : "All";

  const visible =
    activeFilter === "All"
      ? courses
      : courses.filter((c) => c.status === activeFilter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Courses"
        subtitle="Browse all courses you are enrolled in and track your progress."
      />

      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <Link key={filter.value} href={`/student/courses?status=${filter.value}`}>
            <FilterChip
              label={filter.label}
              active={activeFilter === filter.value}
            />
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((course) => (
          <Card key={course.id} className="flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: "var(--secondary-bg-dashboard)" }}
              >
                <BookOpen
                  size={20}
                  style={{ color: "var(--secondary-text-dashboard)" }}
                />
              </div>
              <StatusBadge status={course.status} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-(--text-primary-dashboard)">
              {course.title}
            </h3>
            <p className="mt-1 text-xs text-(--tertiary-text-dashboard)">
              {course.code} • {course.batch} • {course.instructor}
            </p>

            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs">
                <span style={{ color: "var(--tertiary-text-dashboard)" }}>
                  Progress
                </span>
                <span className="font-semibold text-(--text-primary-dashboard)">
                  {course.progress}%
                </span>
              </div>
              <ProgressBar percent={course.progress} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-(--tertiary-text-dashboard)">
              <span className="flex items-center gap-1.5">
                <BookOpen size={13} />
                {course.lessonsCompleted}/{course.lessonsTotal} lessons
              </span>
              <span className="flex items-center gap-1.5">
                <ClipboardList size={13} />
                {course.pendingAssignments} pending
              </span>
              <span className="flex items-center gap-1.5">
                <UserRound size={13} />
                {course.attendance}% attendance
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays size={13} />
                {course.nextClass}
              </span>
            </div>

            <Link
              href={`/student/courses/${course.id}`}
              className="mt-5 flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-(--bg-primary-dashboard) transition hover:opacity-90"
              style={{ background: "var(--bg-dashboard-hero)" }}
            >
              Open Course <ArrowRight size={15} />
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}