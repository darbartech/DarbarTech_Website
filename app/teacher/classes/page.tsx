"use client";

import { useState } from "react";
import { Clock, Users } from "lucide-react";

const classes = [
  { name: "Full Stack Web Development", section: "A", students: 24, schedule: "Mon, Wed, Fri — 9:00 AM", status: "Active" },
  { name: "UI/UX Design Fundamentals", section: "B", students: 22, schedule: "Tue, Thu — 10:30 AM", status: "Active" },
  { name: "Database Design & Management", section: "A", students: 20, schedule: "Mon, Wed — 1:00 PM", status: "Active" },
  { name: "Video Editing Masterclass", section: "C", students: 20, schedule: "Fri — 3:00 PM", status: "Upcoming" },
];

export default function ClassesPage() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
          My Classes
        </h1>
        <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">
          Manage your assigned classes and sections.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {classes.map((cls, i) => (
          <div
            key={i}
            className="rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm"
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                  {cls.name}
                </p>
                <p className="mt-0.5 text-[11px] text-(--tertiary-text-dashboard)">
                  Section {cls.section}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${
                  cls.status === "Active"
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-amber-500/15 text-amber-400"
                }`}
              >
                {cls.status}
              </span>
            </div>

            <div className="flex flex-col gap-2 rounded-xl bg-(--secondary-bg-dashboard) px-4 py-3">
              <div className="flex items-center gap-2 text-xs text-(--text-primary-dashboard)/80">
                <Users size={13} className="text-(--tertiary-text-dashboard)" />
                {cls.students} Students
              </div>
              <div className="flex items-center gap-2 text-xs text-(--text-primary-dashboard)/80">
                <Clock size={13} className="text-(--tertiary-text-dashboard)" />
                {cls.schedule}
              </div>
            </div>

            <button
              type="button"
              onClick={() => showToast(`Viewing ${cls.name}`)}
              className="mt-3 w-full rounded-lg bg-(--bg-lightblue) px-4 py-2 text-xs font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {toast && (
        <div className="fixed bottom-20 right-4 z-50 rounded-xl bg-(--success-dashboard) px-4 py-3 text-sm font-medium text-(--bg-primary-dashboard) shadow-lg lg:bottom-6">
          {toast}
        </div>
      )}
    </div>
  );
}
