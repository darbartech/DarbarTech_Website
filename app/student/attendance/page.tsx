"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Clock3, UserCheck } from "lucide-react";
import {
  Card,
  CardHeader,
  PageHeader,
  ProgressBar,
  StatCard,
} from "../components/ui";
import { attendanceSummary, courses } from "../data";

const history = [
  { date: "02 Sep 2026", course: "Full Stack Web Development", status: "Present" },
  { date: "02 Sep 2026", course: "UI/UX Design", status: "Late" },
  { date: "01 Sep 2026", course: "Full Stack Web Development", status: "Present" },
  { date: "29 Aug 2026", course: "UI/UX Design", status: "Present" },
  { date: "28 Aug 2026", course: "Full Stack Web Development", status: "Absent" },
  { date: "27 Aug 2026", course: "UI/UX Design", status: "Excused" },
];

const statusIcons: Record<string, React.ReactNode> = {
  Present: <CheckCircle2 size={14} style={{ color: "#16a34a" }} />,
  Late: <Clock3 size={14} style={{ color: "#f59e0b" }} />,
  Absent: <XCircle size={14} style={{ color: "#dc2626" }} />,
  Excused: <UserCheck size={14} style={{ color: "#6b7280" }} />,
};

export default function AttendancePage() {
  const overall = Math.round(
    attendanceSummary.reduce((s, a) => s + a.percent, 0) /
      attendanceSummary.length,
  );

  const [courseFilter, setCourseFilter] = useState("All");

  const visibleHistory =
    courseFilter === "All"
      ? history
      : history.filter((h) => h.course === courseFilter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        subtitle="Monitor your presence across all enrolled courses."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<UserCheck size={16} />} label="Overall Attendance" value={`${overall}%`} />
        <StatCard icon={<CheckCircle2 size={16} />} label="Present" value="42" />
        <StatCard icon={<XCircle size={16} />} label="Absent" value="4" />
        <StatCard icon={<Clock3 size={16} />} label="Late" value="3" sub="2 excused" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        {/* COURSE-WISE */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader title="Course-wise Attendance" />
            <div className="flex flex-col gap-5">
              {courses
                .filter((c) => c.status === "Active")
                .map((course) => {
                  const percent = attendanceSummary.find(
                    (a) => a.course === course.title,
                  )?.percent ?? course.attendance;
                  return (
                    <div key={course.id}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="font-medium text-(--text-primary-dashboard)">
                          {course.title}
                        </span>
                        <span className="font-semibold" style={{ color: "var(--secondary-text-dashboard)" }}>
                          {percent}%
                        </span>
                      </div>
                      <ProgressBar percent={percent} />
                    </div>
                  );
                })}
            </div>
          </Card>
        </div>

        {/* HISTORY */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title="Attendance History"
              action={
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="rounded-lg border border-(--border-primary-dashboard) bg-(--primary-dashboard) px-3 py-1.5 text-xs text-(--text-primary-dashboard) outline-none hover:cursor-pointer"
                >
                  <option value="All">All courses</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              }
            />
            <div className="overflow-x-auto">
              <table className="w-full min-w-100 border-collapse text-left">
                <thead>
                  <tr>
                    {["Date", "Course", "Status"].map((h) => (
                      <th
                        key={h}
                        className="border-b border-(--border-primary-dashboard) px-4 py-2.5 text-xs font-semibold text-(--tertiary-text-dashboard)"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleHistory.map((row, i) => (
                    <tr key={i} className="border-b border-(--border-primary-dashboard) last:border-b-0">
                      <td className="px-4 py-3 text-sm text-(--text-primary-dashboard)">
                        {row.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-(--text-primary-dashboard)/80">
                        {row.course}
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1.5 text-sm text-(--text-primary-dashboard)/80">
                          {statusIcons[row.status]}
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}