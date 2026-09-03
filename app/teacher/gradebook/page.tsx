"use client";

import { useState } from "react";

const students: { name: string; id: string; grades: Record<string, number | null> }[] = [
  { name: "Alex Johnson", id: "STU001", grades: { "React Hooks Lab": 42, "UI/UX Wireframe": 88, "DB Normalization Quiz": 25 } },
  { name: "Maria Garcia", id: "STU002", grades: { "React Hooks Lab": 48, "UI/UX Wireframe": 92, "DB Normalization Quiz": 28 } },
  { name: "Raj Patel", id: "STU003", grades: { "React Hooks Lab": 35, "UI/UX Wireframe": 76, "DB Normalization Quiz": 22 } },
  { name: "Emma Wilson", id: "STU004", grades: { "React Hooks Lab": 50, "UI/UX Wireframe": 95, "DB Normalization Quiz": 30 } },
  { name: "Liam Brown", id: "STU005", grades: { "React Hooks Lab": null, "UI/UX Wireframe": 82, "DB Normalization Quiz": 20 } },
  { name: "Sophia Lee", id: "STU006", grades: { "React Hooks Lab": 44, "UI/UX Wireframe": null, "DB Normalization Quiz": 27 } },
];

const assignmentMax: Record<string, number> = {
  "React Hooks Lab": 50,
  "UI/UX Wireframe": 100,
  "DB Normalization Quiz": 30,
};

const courseList = [
  { id: 1, name: "Full Stack Web Development" },
  { id: 2, name: "UI/UX Design Fundamentals" },
  { id: 3, name: "Database Design & Management" },
];

export default function GradebookPage() {
  const [selectedCourse, setSelectedCourse] = useState(courseList[0].id);
  const assignmentNames = Object.keys(assignmentMax);

  const getAvg = (grades: Record<string, number | null>) => {
    const entries = Object.entries(grades).filter(([, v]) => v !== null);
    if (entries.length === 0) return "—";
    const total = entries.reduce((sum, [key, val]) => sum + ((val ?? 0) / assignmentMax[key]) * 100, 0);
    return (total / entries.length).toFixed(1);
  };

  const getGradeColor = (avg: string) => {
    if (avg === "—") return "text-(--tertiary-text-dashboard)";
    const n = parseFloat(avg);
    if (n >= 80) return "text-(--success-dashboard)";
    if (n >= 60) return "text-(--warning-dashboard)";
    return "text-(--danger-dashboard)";
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
          Gradebook
        </h1>
        <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">
          View and manage student grades across assignments.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(Number(e.target.value))}
          className="rounded-xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) px-3 py-2.5 text-sm text-(--text-primary-dashboard) outline-none hover:cursor-pointer"
        >
          {courseList.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-110 border-collapse text-left">
            <thead>
              <tr>
                {["Student", ...assignmentNames, "Average"].map((h) => (
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
              {students.map((student) => {
                const avg = getAvg(student.grades);
                return (
                  <tr
                    key={student.id}
                    className="border-b border-(--border-primary-dashboard) last:border-b-0"
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-(--text-primary-dashboard)">
                        {student.name}
                      </p>
                      <p className="text-[11px] text-(--tertiary-text-dashboard)">
                        {student.id}
                      </p>
                    </td>
                    {assignmentNames.map((name) => (
                      <td key={name} className="px-4 py-3 text-sm text-(--text-primary-dashboard)/80">
                        {student.grades[name] !== null
                          ? `${student.grades[name]}/${assignmentMax[name]}`
                          : <span className="text-(--tertiary-text-dashboard)">—</span>}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${getGradeColor(avg)}`}>
                        {avg}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
