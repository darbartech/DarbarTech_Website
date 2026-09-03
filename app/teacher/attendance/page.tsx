"use client";

import { useState } from "react";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

const classList = [
  { id: 1, name: "Full Stack Web Development — Section A" },
  { id: 2, name: "UI/UX Design Fundamentals — Section B" },
  { id: 3, name: "Database Design & Management — Section A" },
];

const studentsData: Record<number, { name: string; status: "present" | "absent" | "late" | null }[]> = {
  1: [
    { name: "Alex Johnson", status: "present" },
    { name: "Maria Garcia", status: "present" },
    { name: "Raj Patel", status: "late" },
    { name: "Emma Wilson", status: "present" },
    { name: "Liam Brown", status: "absent" },
    { name: "Sophia Lee", status: "present" },
  ],
  2: [
    { name: "Olivia Davis", status: "present" },
    { name: "Noah Kim", status: "absent" },
    { name: "Ava Patel", status: "present" },
    { name: "Ethan Roy", status: "present" },
    { name: "Isabella Chen", status: "late" },
  ],
  3: [
    { name: "James Miller", status: "present" },
    { name: "Mia Johnson", status: "present" },
    { name: "Lucas White", status: null },
    { name: "Amelia Scott", status: null },
    { name: "Benjamin Hall", status: null },
  ],
};

const statusStyles: Record<string, string> = {
  present: "bg-emerald-500/15 text-emerald-400",
  absent: "bg-red-500/15 text-red-400",
  late: "bg-amber-500/15 text-amber-400",
  unset: "bg-(--secondary-bg-dashboard) text-(--tertiary-text-dashboard)",
};

const statusIcons: Record<string, React.ReactNode> = {
  present: <CheckCircle2 size={14} />,
  absent: <XCircle size={14} />,
  late: <Clock size={14} />,
};

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState(classList[0].id);
  const [date, setDate] = useState("2026-09-03");
  const [students, setStudents] = useState(studentsData);

  const currentStudents = students[selectedClass] ?? [];
  const marked = currentStudents.filter((s) => s.status !== null).length;
  const total = currentStudents.length;

  const toggleStatus = (idx: number, status: "present" | "absent" | "late") => {
    setStudents((prev) => ({
      ...prev,
      [selectedClass]: prev[selectedClass].map((s, i) =>
        i === idx ? { ...s, status } : s
      ),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
          Attendance
        </h1>
        <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">
          Mark and manage attendance for your classes.
        </p>
      </div>

      {/* ================= CONTROLS ================= */}

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(Number(e.target.value))}
          className="rounded-xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) px-3 py-2.5 text-sm text-(--text-primary-dashboard) outline-none hover:cursor-pointer"
        >
          {classList.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) px-3 py-2.5 text-sm text-(--text-primary-dashboard) outline-none hover:cursor-pointer"
        />

        <span className="ml-auto text-sm text-(--tertiary-text-dashboard)">
          {marked}/{total} marked
        </span>
      </div>

      {/* ================= STUDENT LIST ================= */}

      <div className="rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-90 border-collapse text-left">
            <thead>
              <tr>
                {["Student", "Status", "Action"].map((h) => (
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
              {currentStudents.map((student, idx) => (
                <tr
                  key={idx}
                  className="border-b border-(--border-primary-dashboard) last:border-b-0"
                >
                  <td className="px-4 py-3 text-sm font-medium text-(--text-primary-dashboard)">
                    {student.name}
                  </td>
                  <td className="px-4 py-3">
                    {student.status ? (
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[student.status]}`}>
                        {statusIcons[student.status]}
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    ) : (
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles["unset"]}`}>
                        Not Marked
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      {(["present", "absent", "late"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleStatus(idx, s)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition hover:cursor-pointer ${
                            student.status === s
                              ? statusStyles[s]
                              : "bg-(--secondary-bg-dashboard) text-(--tertiary-text-dashboard) hover:text-(--text-primary-dashboard)"
                          }`}
                        >
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
