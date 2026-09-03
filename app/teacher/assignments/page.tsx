"use client";

import { useState } from "react";
import { CalendarClock, ChevronDown, ChevronUp, Plus, X } from "lucide-react";

const existingAssignments = [
  { id: 1, title: "React Hooks Lab", course: "Full Stack Web Development", dueDate: "2026-09-10", totalMarks: 50, status: "Active", submissions: 18 },
  { id: 2, title: "UI/UX Wireframe Project", course: "UI/UX Design Fundamentals", dueDate: "2026-09-15", totalMarks: 100, status: "Active", submissions: 12 },
  { id: 3, title: "Database Normalization Quiz", course: "Database Design & Management", dueDate: "2026-09-05", totalMarks: 30, status: "Closed", submissions: 20 },
];

const inputClass =
  "w-full rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-3 py-2.5 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue)";

export default function AssignmentsPage() {
  const [showForm, setShowForm] = useState(false);
  const [assignments, setAssignments] = useState(existingAssignments);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    totalMarks: "",
    course: "Full Stack Web Development",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const createAssignment = () => {
    if (!form.title.trim() || !form.dueDate) return;
    const newAssignment = {
      id: assignments.length + 1,
      title: form.title,
      course: form.course,
      dueDate: form.dueDate,
      totalMarks: Number(form.totalMarks) || 100,
      status: "Active",
      submissions: 0,
    };
    setAssignments((prev) => [newAssignment, ...prev]);
    setForm({ title: "", description: "", dueDate: "", totalMarks: "", course: "Full Stack Web Development" });
    setShowForm(false);
    showToast("Assignment created successfully.");
  };

  return (
    <div className="space-y-6">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
            Assignments
          </h1>
          <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">
            Create and manage assignments for your classes.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-(--bg-lightblue) px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
        >
          <Plus size={15} />
          Create Assignment
        </button>
      </div>

      {/* ================= CREATE FORM ================= */}

      {showForm && (
        <div className="rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-(--text-primary-dashboard)">
              New Assignment
            </p>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg p-1.5 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-(--tertiary-text-dashboard)">Title</span>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Assignment title"
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-(--tertiary-text-dashboard)">Description</span>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                placeholder="Assignment description or instructions"
                className={`${inputClass} resize-none`}
              />
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-(--tertiary-text-dashboard)">Course</span>
                <select
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  className={inputClass}
                >
                  <option>Full Stack Web Development</option>
                  <option>UI/UX Design Fundamentals</option>
                  <option>Database Design & Management</option>
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-(--tertiary-text-dashboard)">Due Date</span>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-(--tertiary-text-dashboard)">Total Marks</span>
                <input
                  type="number"
                  value={form.totalMarks}
                  onChange={(e) => setForm({ ...form, totalMarks: e.target.value })}
                  placeholder="100"
                  className={inputClass}
                />
              </label>
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={createAssignment}
              className="rounded-lg bg-(--bg-lightblue) px-5 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
            >
              Create
            </button>
          </div>
        </div>
      )}

      {/* ================= ASSIGNMENT LIST ================= */}

      <div className="flex flex-col gap-4">
        {assignments.map((a) => {
          const open = expandedId === a.id;
          return (
            <div key={a.id} className="rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm">
              <button
                type="button"
                onClick={() => setExpandedId(open ? null : a.id)}
                className="flex w-full flex-wrap items-center justify-between gap-3 text-left hover:cursor-pointer"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-(--text-primary-dashboard)">
                      {a.title}
                    </h3>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                        a.status === "Active"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-(--secondary-bg-dashboard) text-(--tertiary-text-dashboard)"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-(--tertiary-text-dashboard)">
                    {a.course}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-(--text-primary-dashboard)/70">
                    <CalendarClock size={13} />
                    Due {a.dueDate} • {a.totalMarks} marks • {a.submissions} submissions
                  </p>
                </div>
                <span className="text-(--tertiary-text-dashboard)">
                  {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>

              {open && (
                <div className="mt-4 border-t border-(--border-primary-dashboard) pt-4">
                  <p className="text-sm text-(--text-primary-dashboard)/70">
                    {a.status === "Active"
                      ? `${a.submissions} students have submitted. ${30 - a.submissions} pending.`
                      : "This assignment is closed."}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {toast && (
        <div className="fixed bottom-20 right-4 z-50 rounded-xl bg-(--success-dashboard) px-4 py-3 text-sm font-medium text-(--bg-primary-dashboard) shadow-lg lg:bottom-6">
          {toast}
        </div>
      )}
    </div>
  );
}
