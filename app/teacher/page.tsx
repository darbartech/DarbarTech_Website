"use client";

import { useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  GraduationCap,
  MoreHorizontal,
  PenLine,
  Upload,
} from "lucide-react";

const stats: { title: string; value: string; icon: React.ReactNode }[] = [
  { title: "Assigned Classes", value: "4", icon: <BookOpen size={18} /> },
  { title: "Total Students", value: "86", icon: <GraduationCap size={18} /> },
  { title: "Pending Grading", value: "12", icon: <Clock size={18} /> },
  { title: "Upcoming Classes", value: "3", icon: <FileText size={18} /> },
];

const submissions = [
  { student: "Alex Johnson", assignment: "React Hooks Lab", time: "10 min ago", course: "Full Stack Dev" },
  { student: "Maria Garcia", assignment: "UI/UX Wireframe Project", time: "35 min ago", course: "UI/UX Design" },
  { student: "Raj Patel", assignment: "Database Normalization Quiz", time: "1 hour ago", course: "Database Design" },
];

const quickActions = [
  { label: "Mark Attendance", icon: <CheckCircle size={16} />, href: "/teacher/attendance" },
  { label: "Create Assignment", icon: <PenLine size={16} />, href: "/teacher/assignments" },
  { label: "Upload Material", icon: <Upload size={16} />, href: "/teacher/materials" },
];

export default function TeacherDashboardPage() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">
          Welcome back! Here is your teaching overview.
        </p>
      </div>

      {/* ================= STAT CARDS ================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl bg-(--primary-dashboard) p-4 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[11px] font-medium text-(--tertiary-text-dashboard)">
                {stat.title}
              </span>
              <span className="text-(--secondary-text-dashboard)">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-(--text-primary-dashboard)">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* ================= RECENT SUBMISSIONS ================= */}

      <div className="rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-(--text-primary-dashboard)">
            Recent Submissions
          </p>
          <MoreHorizontal size={18} className="text-(--tertiary-text-dashboard)" />
        </div>
        <div className="flex flex-col gap-3">
          {submissions.map((sub, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-(--border-primary-dashboard) p-4"
            >
              <div>
                <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                  {sub.student}
                </p>
                <p className="text-[11px] text-(--tertiary-text-dashboard)">
                  {sub.assignment} • {sub.course}
                </p>
              </div>
              <span className="shrink-0 rounded-lg px-3 py-1 text-[11px] font-medium bg-(--secondary-bg-dashboard) text-(--tertiary-text-dashboard)">
                {sub.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}

      <div className="rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm">
        <p className="mb-4 text-sm font-semibold text-(--text-primary-dashboard)">
          Quick Actions
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => showToast(`${action.label} clicked`)}
              className="flex items-center justify-center gap-2 rounded-xl bg-(--bg-lightblue) px-4 py-3 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-20 right-4 z-50 rounded-xl bg-(--success-dashboard) px-4 py-3 text-sm font-medium text-(--bg-primary-dashboard) shadow-lg lg:bottom-6">
          {toast}
        </div>
      )}
    </div>
  );
}
