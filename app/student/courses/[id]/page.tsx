import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  FileText,
  Link2,
  PlayCircle,
  UserRound,
  Video,
} from "lucide-react";
import {
  Card,
  CardHeader,
  PageHeader,
  ProgressBar,
  StatusBadge,
} from "../../components/ui";
import { courses } from "../../data";

const modules = [
  {
    module: "Module 1",
    title: "Web Fundamentals",
    lessons: [
      { name: "HTML Basics", type: "Video", done: true },
      { name: "CSS Layouts", type: "Text", done: true },
      { name: "JavaScript Intro", type: "Video", done: true },
    ],
  },
  {
    module: "Module 2",
    title: "Frontend Tooling",
    lessons: [
      { name: "Git & GitHub", type: "Code", done: true },
      { name: "Package Managers", type: "Text", done: true },
    ],
  },
  {
    module: "Module 3",
    title: "React",
    lessons: [
      { name: "Components & Props", type: "Video", done: true },
      { name: "State & Effects", type: "Video", done: true },
      { name: "Project Work", type: "Assignment", done: true },
    ],
  },
  {
    module: "Module 4",
    title: "Advanced React",
    lessons: [
      { name: "Context API", type: "Video", done: false },
      { name: "Routing", type: "Text", done: false },
    ],
  },
];

const lessonTypeIcons: Record<string, React.ReactNode> = {
  Video: <Video size={13} />,
  Text: <FileText size={13} />,
  Code: <Link2 size={13} />,
  Assignment: <ClipboardListIcon />,
};

function ClipboardListIcon() {
  return (
    <span className="inline-flex items-center">
      <BookOpen size={13} />
    </span>
  );
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  const course = courses.find((c) => c.id === id) ?? courses[0];

  const allLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const doneLessons = modules.reduce(
    (sum, m) => sum + m.lessons.filter((l) => l.done).length,
    0,
  );

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/student/courses"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium hover:cursor-pointer"
          style={{ color: "var(--bg-lightblue)" }}
        >
          <ArrowLeft size={15} />
          Back to My Courses
        </Link>
        <PageHeader
          title={course.title}
          subtitle={`${course.code} • ${course.batch} • Start ${course.startDate} — End ${course.endDate}`}
          actions={<StatusBadge status={course.status} />}
        />
      </div>

      {/* ================= OVERVIEW + PROGRESS ================= */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="Course Overview" />
            <p className="text-sm leading-6 text-(--text-primary-dashboard)/70">
              {course.description}
            </p>
            <div className="mt-5">
              <div className="mb-1 flex justify-between text-xs">
                <span style={{ color: "var(--tertiary-text-dashboard)" }}>
                  Course Progress
                </span>
                <span className="font-semibold text-(--text-primary-dashboard)">
                  {doneLessons} of {allLessons} lessons completed ({course.progress}%)
                </span>
              </div>
              <ProgressBar percent={course.progress} />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <OverviewStat label="Lessons" value={`${doneLessons}/${allLessons}`} />
              <OverviewStat label="Attendance" value={`${course.attendance}%`} />
              <OverviewStat label="Assignments" value={`${course.pendingAssignments} pending`} />
              <OverviewStat label="Next Class" value={course.nextClass} />
            </div>
          </Card>
        </div>

        {/* INSTRUCTOR */}
        <div className="space-y-4">
          <Card>
            <CardHeader title="Instructor" />
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: "var(--secondary-bg-dashboard)" }}
              >
                <UserRound
                  size={22}
                  style={{ color: "var(--secondary-text-dashboard)" }}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                  {course.instructor}
                </p>
                <p className="text-xs text-(--tertiary-text-dashboard)">
                  Course Instructor
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Link
                href="/student/chat"
                className="flex-1 rounded-lg bg-(--bg-lightblue) px-3 py-2 text-center text-xs font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
              >
                Message
              </Link>
              <Link
                href="/student/chat"
                className="flex-1 rounded-lg px-3 py-2 text-center text-xs font-semibold transition hover:opacity-90 hover:cursor-pointer"
                style={{
                  background: "var(--secondary-bg-dashboard)",
                  color: "var(--text-primary-dashboard)",
                }}
              >
                Ask a question
              </Link>
            </div>
          </Card>

          <Card>
            <CardHeader title="Class Schedule" />
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-(--text-primary-dashboard)/80">
                <CalendarDays size={15} />
                {course.nextClass}
              </span>
              <Link
                href="/student/schedule"
                className="text-xs font-semibold"
                style={{ color: "var(--bg-lightblue)" }}
              >
                View
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* ================= MODULES & LESSONS ================= */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        {modules.map((mod) => {
          const moduleDone = mod.lessons.every((l) => l.done);
          return (
            <Card key={mod.module} className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-(--bg-lightblue)">
                    {mod.module}
                  </p>
                  <h3 className="mt-0.5 text-base font-semibold text-(--text-primary-dashboard)">
                    {mod.title}
                  </h3>
                </div>
                {moduleDone && (
                  <CheckCircle2
                    size={18}
                    style={{ color: "var(--bg-lightblue)" }}
                  />
                )}
              </div>

              <ul className="mt-4 flex flex-col gap-2">
                {mod.lessons.map((lesson) => (
                  <li
                    key={lesson.name}
                    className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm transition hover:bg-(--secondary-bg-dashboard)"
                  >
                    <span className="flex min-w-0 items-center gap-2 text-(--text-primary-dashboard)">
                      {lesson.done ? (
                        <CheckCircle2 size={14} style={{ color: "var(--bg-lightblue)" }} />
                      ) : (
                        <PlayCircle
                          size={14}
                          style={{ color: "var(--tertiary-text-dashboard)" }}
                        />
                      )}
                      <span className="truncate">{lesson.name}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-(--tertiary-text-dashboard)">
                      {lessonTypeIcons[lesson.type]}
                      {lesson.type}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function OverviewStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl px-3 py-2.5" style={{ background: "var(--secondary-bg-dashboard)" }}>
      <p className="text-[11px] font-medium text-(--tertiary-text-dashboard)">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-(--text-primary-dashboard)">
        {value}
      </p>
    </div>
  );
}