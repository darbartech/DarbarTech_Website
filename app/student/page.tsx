"use client";

import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock,
  GraduationCap,
  MapPin,
  TrendingUp,
  UserCheck,
  Video,
} from "lucide-react";
import Link from "next/link";
import {
  Avatar,
  Card,
  CardHeader,
  EmptyState,
  ProgressBar,
  StatCard,
  StatusBadge,
} from "./components/ui";
import {
  assignments,
  attendanceSummary,
  courses,
  messages,
  notices,
  student,
  todaySchedule,
  upcomingClasses,
} from "./data";

export default function StudentDashboard() {
  const enrolled = courses.length;
  const activeCourses = courses.filter((c) => c.status === "Active");
  const completedCount = courses.filter((c) => c.status === "Completed").length;
  const upcomingCount = courses.filter((c) => c.status === "Upcoming").length;

  const lessonsCompleted = courses.reduce(
    (sum, c) => sum + c.lessonsCompleted,
    0,
  );
  const lessonsTotal = courses.reduce((sum, c) => sum + c.lessonsTotal, 0);
  const overallProgress = Math.round(
    (lessonsCompleted / lessonsTotal) * 100,
  );

  const pendingAssignments = assignments.filter((a) =>
    ["Pending", "Draft"].includes(a.status),
  );

  const overallAttendance = Math.round(
    attendanceSummary.reduce((sum, a) => sum + a.percent, 0) /
      attendanceSummary.length,
  );
  const presentTotal = attendanceSummary.reduce((sum, a) => sum + a.present, 0);
  const absentTotal = attendanceSummary.reduce((sum, a) => sum + a.absent, 0);
  const lateTotal = attendanceSummary.reduce((sum, a) => sum + a.late, 0);

  return (
    <div className="space-y-6">
      {/* ================= WELCOME BANNER ================= */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 text-(--bg-primary-dashboard) sm:p-7"
        style={{ background: "var(--bg-dashboard-hero)" }}
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full opacity-20 blur-2xl" style={{ background: "var(--color-shape)" }} />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full px-4 py-1 text-xs font-medium text-(--bg-primary-dashboard)/90" style={{ background: "rgba(255,255,255,0.08)" }}>
              {student.program} • {student.batch} - {student.section}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-(--bg-primary-dashboard)">
              Welcome back,{" "}
              <span style={{ color: "var(--bg-lightblue)" }}>{student.name.split(" ")[0]}!</span>
            </h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href="/student/courses"
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition hover:opacity-90"
                style={{ background: "rgba(255,255,255,0.08)", color: "var(--bg-primary-dashboard)" }}
              >
                <BookOpen size={15} /> My Courses
              </Link>
              <Link
                href="/student/schedule"
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition hover:opacity-90"
                style={{ background: "rgba(255,255,255,0.08)", color: "var(--bg-primary-dashboard)" }}
              >
                <CalendarDays size={15} /> Today&apos;s Schedule
              </Link>
              <Link
                href="/student/assignments"
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition hover:opacity-90"
                style={{ background: "rgba(255,255,255,0.08)", color: "var(--bg-primary-dashboard)" }}
              >
                <ClipboardList size={15} /> Submit Assignment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SUMMARY STATS ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<BookOpen size={16} />}
          label="My Courses"
          value={`${enrolled}`}
          sub={`${activeCourses.length} active • ${completedCount} completed • ${upcomingCount} upcoming`}
        />
        <StatCard
          icon={<TrendingUp size={16} />}
          label="Learning Progress"
          value={`${overallProgress}%`}
          sub={`${lessonsCompleted} of ${lessonsTotal} lessons completed`}
        />
        <StatCard
          icon={<ClipboardList size={16} />}
          label="Pending Assignments"
          value={`${pendingAssignments.length}`}
          sub="Needs your attention"
        />
        <StatCard
          icon={<UserCheck size={16} />}
          label="Overall Attendance"
          value={`${overallAttendance}%`}
          sub={`${presentTotal} present • ${absentTotal} absent • ${lateTotal} late`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 xl:gap-5">
        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-4 xl:col-span-2 xl:space-y-5">
          {/* COURSE PROGRESS */}
          <Card>
            <CardHeader
              title="Course Progress"
              titleClassName="text-lg"
              action={
                <Link href="/student/courses" className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--bg-lightblue)" }}>
                  View all <ArrowRight size={13} />
                </Link>
              }
            />
            <div className="mb-5 flex items-end justify-between rounded-xl px-4 py-3" style={{ background: "var(--secondary-bg-dashboard)" }}>
              <div>
                <p className="text-xs text-(--tertiary-text-dashboard)">Overall learning</p>
                <p className="mt-1 text-2xl font-bold text-(--text-primary-dashboard)">
                  {overallProgress}%
                </p>
              </div>
              <div className="text-right text-xs text-(--tertiary-text-dashboard)">
                <p>{lessonsCompleted} lessons completed</p>
                <p>{lessonsTotal - lessonsCompleted} lessons remaining</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {activeCourses.map((course) => (
                <div key={course.id}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-(--text-primary-dashboard)">
                      {course.title}
                    </span>
                    <span className="text-(--tertiary-text-dashboard)">
                      {course.lessonsCompleted}/{course.lessonsTotal} lessons • {course.progress}%
                    </span>
                  </div>
                  <ProgressBar percent={course.progress} thin />
                </div>
              ))}
            </div>
          </Card>

          {/* TODAY'S SCHEDULE */}
          <Card>
            <CardHeader
              title="Today's Schedule"
              titleClassName="text-lg"
              action={
                <Link href="/student/schedule" className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--bg-lightblue)" }}>
                  Full schedule <ArrowRight size={13} />
                </Link>
              }
            />
            <div className="flex flex-col divide-y divide-(--border-primary-dashboard)">
              {todaySchedule.map((item) => (
                <div key={item.title} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center rounded-xl px-3 py-2 text-center" style={{ background: "var(--secondary-bg-dashboard)" }}>
                      <span className="text-sm font-bold text-(--text-primary-dashboard)">
                        {item.time.split(" ")[0]}
                      </span>
                      <span className="text-[10px] font-semibold text-(--tertiary-text-dashboard)">
                        {item.time.split(" ")[1]}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                        {item.title}
                      </p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-(--tertiary-text-dashboard)">
                        <span className="inline-flex items-center gap-1">
                          <UserCheck size={11} /> {item.instructor}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          {item.mode === "Online" ? <Video size={11} /> : <MapPin size={11} />}
                          {item.mode}
                        </span>
                      </p>
                    </div>
                  </div>

                  {item.live ? (
                    <Link
                      href="/student/online-classes"
                      className="rounded-lg px-4 py-2 text-xs font-semibold text-(--bg-primary-dashboard) transition hover:opacity-90"
                      style={{ background: "var(--bg-dashboard-hero)" }}
                    >
                      Join Class
                    </Link>
                  ) : (
                    <StatusBadge status={item.mode === "Online" ? "Upcoming" : "Completed"} />
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* UPCOMING CLASSES */}
          <Card>
            <CardHeader
              title="Upcoming Classes"
              titleClassName="text-lg"
              action={
                <Link href="/student/online-classes" className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--bg-lightblue)" }}>
                  View all <ArrowRight size={13} />
                </Link>
              }
            />
            <div className="flex flex-col divide-y divide-(--border-primary-dashboard)">
              {upcomingClasses.slice(0, 5).map((item, i) => (
                <div key={i} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center rounded-xl px-3 py-2 text-center" style={{ background: "var(--secondary-bg-dashboard)" }}>
                      <span className="text-[10px] font-semibold uppercase text-(--tertiary-text-dashboard)">
                        {item.date.split(" ")[0]}
                      </span>
                      <span className="text-sm font-bold text-(--text-primary-dashboard)">
                        {item.date.split(" ")[1]}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                        {item.topic}
                      </p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-(--tertiary-text-dashboard)">
                        <span className="inline-flex items-center gap-1">
                          <Clock size={11} /> {item.date} • {item.time}
                        </span>
                        <span>{item.course}</span>
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-(--tertiary-text-dashboard)">
                        {item.mode === "Online" ? <Video size={11} /> : <MapPin size={11} />}
                        {item.instructor} • {item.mode}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={item.mode === "Online" ? "/student/online-classes" : "/student/courses"}
                    className="rounded-lg bg-(--bg-lightblue) px-4 py-2 text-xs font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                  >
                    {item.mode === "Online" ? "Join" : "Details"}
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          {/* PENDING ASSIGNMENTS */}
          <Card>
            <CardHeader
              title="Pending Assignments"
              titleClassName="text-lg"
              action={
                <Link href="/student/assignments" className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--bg-lightblue)" }}>
                  View all <ArrowRight size={13} />
                </Link>
              }
            />
            {pendingAssignments.length ? (
              <div className="flex flex-col divide-y divide-(--border-primary-dashboard)">
                {pendingAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                        {assignment.title}
                      </p>
                      <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
                        {assignment.course} • Due {assignment.dueDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={assignment.status} />
                      <Link
                        href="/student/assignments"
                        className="rounded-lg bg-(--bg-lightblue) px-4 py-2 text-xs font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                      >
                        Submit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<CheckCircle2 size={24} />}
                title="All caught up!"
                description="You have no pending assignments."
              />
            )}
          </Card>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-4 xl:space-y-5">
          {/* MY COURSES */}
          <Card>
            <CardHeader
              title="My Courses"
              titleClassName="text-lg"
              action={
                <Link href="/student/courses" className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--bg-lightblue)" }}>
                  View all <ArrowRight size={13} />
                </Link>
              }
            />
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: "var(--secondary-bg-dashboard)" }}>
                <p className="text-sm font-medium text-(--text-primary-dashboard)">Total enrolled</p>
                <p className="text-xl font-bold text-(--text-primary-dashboard)">{enrolled}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl px-2 py-3" style={{ background: "var(--secondary-bg-dashboard)" }}>
                  <p className="text-lg font-bold text-(--success-dashboard)">{activeCourses.length}</p>
                  <p className="text-[11px] font-medium text-(--tertiary-text-dashboard)">Active</p>
                </div>
                <div className="rounded-xl px-2 py-3" style={{ background: "var(--secondary-bg-dashboard)" }}>
                  <p className="text-lg font-bold text-(--violet-dashboard)">{completedCount}</p>
                  <p className="text-[11px] font-medium text-(--tertiary-text-dashboard)">Completed</p>
                </div>
                <div className="rounded-xl px-2 py-3" style={{ background: "var(--secondary-bg-dashboard)" }}>
                  <p className="text-lg font-bold text-(--info-dashboard)">{upcomingCount}</p>
                  <p className="text-[11px] font-medium text-(--tertiary-text-dashboard)">Upcoming</p>
                </div>
              </div>
            </div>
          </Card>

          {/* ATTENDANCE */}
          <Card>
            <CardHeader
              title="Attendance"
              titleClassName="text-lg"
              action={
                <Link href="/student/attendance" className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--bg-lightblue)" }}>
                  View all <ArrowRight size={13} />
                </Link>
              }
            />
            <div className="mb-4 flex items-center justify-between rounded-xl px-4 py-3" style={{ background: "var(--secondary-bg-dashboard)" }}>
              <p className="text-sm font-medium text-(--text-primary-dashboard)">Overall attendance</p>
              <p className="text-xl font-bold text-(--success-dashboard)">{overallAttendance}%</p>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl px-2 py-2.5" style={{ background: "var(--secondary-bg-dashboard)" }}>
                <p className="text-sm font-bold text-(--success-dashboard)">{presentTotal}</p>
                <p className="text-[11px] font-medium text-(--tertiary-text-dashboard)">Present</p>
              </div>
              <div className="rounded-xl px-2 py-2.5" style={{ background: "var(--secondary-bg-dashboard)" }}>
                <p className="text-sm font-bold text-(--danger-dashboard)">{absentTotal}</p>
                <p className="text-[11px] font-medium text-(--tertiary-text-dashboard)">Absent</p>
              </div>
              <div className="rounded-xl px-2 py-2.5" style={{ background: "var(--secondary-bg-dashboard)" }}>
                <p className="text-sm font-bold text-(--warning-dashboard)">{lateTotal}</p>
                <p className="text-[11px] font-medium text-(--tertiary-text-dashboard)">Late</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {attendanceSummary.map((item) => (
                <div key={item.course}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="truncate font-medium text-(--text-primary-dashboard)">
                      {item.course}
                    </span>
                    <span className="shrink-0 text-(--tertiary-text-dashboard)">{item.percent}%</span>
                  </div>
                  <ProgressBar percent={item.percent} thin />
                </div>
              ))}
            </div>
          </Card>

          {/* LATEST NOTICES */}
          <Card>
            <CardHeader
              title="Latest Notices"
              titleClassName="text-lg"
              action={
                <Link href="/student/notices" className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--bg-lightblue)" }}>
                  View all <ArrowRight size={13} />
                </Link>
              }
            />
            <div className="flex flex-col gap-4">
              {notices.slice(0, 3).map((notice) => (
                <div key={notice.id} className="flex gap-3">
                  <span
                    className="mt-1 h-2 w-2 shrink-0 rounded-full"
                    title={notice.status === "New" ? "Unread" : "Read"}
                    style={{
                      background:
                        notice.status === "New"
                          ? "var(--bg-lightblue)"
                          : "var(--border-primary-dashboard)",
                    }}
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                        {notice.title}
                      </p>
                      {notice.status === "New" && <span className="rounded-full bg-(--info-dashboard)/10 px-2 py-0.5 text-[10px] font-semibold text-(--info-dashboard)">New</span>}
                      {notice.priority === "Important" && <span className="rounded-full bg-(--danger-dashboard)/10 px-2 py-0.5 text-[10px] font-semibold text-(--danger-dashboard)">Important</span>}
                    </div>
                    <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
                      {notice.date} • {notice.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* RECENT MESSAGES */}
          <Card>
            <CardHeader
              title="Recent Messages"
              titleClassName="text-lg"
              action={
                <Link href="/student/chat" className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--bg-lightblue)" }}>
                  Open chat <ArrowRight size={13} />
                </Link>
              }
            />
            <div className="flex flex-col gap-4">
              {messages.slice(0, 3).map((message) => (
                <div key={message.id} className="flex items-center gap-3">
                  <Avatar name={message.from} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-(--text-primary-dashboard)">
                        {message.from}
                      </p>
                      <span className="shrink-0 text-[11px] text-(--tertiary-text-dashboard)">
                        {message.time}
                      </span>
                    </div>
                    <p className="truncate text-xs text-(--tertiary-text-dashboard)">
                      {message.text}
                    </p>
                  </div>
                  {message.unread > 0 && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-(--bg-primary-dashboard)" style={{ background: "var(--bg-lightblue)" }}>
                      {message.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-(--border-primary-dashboard) pt-4">
        <p className="text-xs text-(--tertiary-text-dashboard)">
          DarbarTech — Group of Technology • Student Portal
        </p>
        <GraduationCap size={16} style={{ color: "var(--tertiary-text-dashboard)" }} />
      </footer>
    </div>
  );
}