"use client";

import { useState } from "react";
import {
  CalendarClock,
  ChevronDown,
  ChevronUp,
  Paperclip,
  UserRound,
} from "lucide-react";
import { Card, PageHeader, StatusBadge } from "../components/ui";
import { assignments } from "../data";

export default function AssignmentsPage() {
  const [openId, setOpenId] = useState<number | null>(assignments[0]?.id ?? null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [files, setFiles] = useState<Record<number, string>>({});
  const [toast, setToast] = useState<{ text: string; ok: boolean } | null>(null);

  const showToast = (text: string, ok = true) => {
    setToast({ text, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = () => {
    showToast(`Assignment submitted successfully.`);
    setOpenId(null);
  };

  const handleDraft = () => {
    showToast("Draft saved — you can continue later.");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assignments"
        subtitle="Track, complete and submit your assignments before the deadline."
      />

      <div className="flex flex-col gap-4">
        {assignments.map((assignment) => {
          const open = openId === assignment.id;

          return (
            <Card key={assignment.id} className="p-5">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : assignment.id)}
                className="flex w-full flex-wrap items-center justify-between gap-3 text-left hover:cursor-pointer"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-(--text-primary-dashboard)">
                      {assignment.title}
                    </h3>
                    <StatusBadge status={assignment.status} />
                  </div>
                  <p className="mt-1 text-xs text-(--tertiary-text-dashboard)">
                    {assignment.course} • {assignment.module} •{" "}
                    {assignment.instructor}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-(--text-primary-dashboard)/70">
                    <CalendarClock size={13} />
                    Due {assignment.dueDate} • {assignment.totalMarks} marks
                  </p>
                </div>

                <span className="text-(--tertiary-text-dashboard)">
                  {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>

              {open && (
                <div className="mt-4 space-y-4 border-t border-(--border-primary-dashboard) pt-4">
                  <div>
                    <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                      Instructions
                    </p>
                    <p className="mt-1 text-sm leading-6 text-(--text-primary-dashboard)/70">
                      {assignment.instructions}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-3">
                    <Info label="Assigned" value={assignment.assignedDate} />
                    <Info label="Due Date" value={assignment.dueDate} />
                    <Info
                      label="Maximum Marks"
                      value={`${assignment.totalMarks}`}
                    />
                  </div>

                  {assignment.feedback && (
                    <div
                      className="rounded-xl px-4 py-3"
                      style={{ background: "var(--secondary-bg-dashboard)" }}
                    >
                      <p className="flex items-center gap-1.5 text-xs font-semibold text-(--text-primary-dashboard)">
                        <UserRound size={13} /> Instructor feedback
                      </p>
                      <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">
                        {assignment.feedback}
                      </p>
                    </div>
                  )}

                  {["Pending", "Draft"].includes(assignment.status) && (
                    <div className="flex flex-col gap-3">
                      <textarea
                        value={answers[assignment.id] ?? ""}
                        onChange={(e) =>
                          setAnswers({
                            ...answers,
                            [assignment.id]: e.target.value,
                          })
                        }
                        placeholder="Type your answer here..."
                        rows={4}
                        className="w-full resize-none rounded-xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-4 py-3 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue)"
                      />

                      <div className="flex flex-wrap items-center gap-3">
                        <label className="flex flex-1 min-w-60 items-center gap-2 rounded-xl border border-dashed border-(--border-primary-dashboard) px-4 py-3 text-sm text-(--tertiary-text-dashboard) hover:cursor-pointer">
                          <Paperclip size={15} />
                          {files[assignment.id] ?? "Attach a file..."}
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const name = e.target.files?.[0]?.name;
                              if (name)
                                setFiles({ ...files, [assignment.id]: name });
                            }}
                          />
                        </label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleDraft()}
                            className="rounded-lg px-4 py-2.5 text-sm font-semibold hover:cursor-pointer"
                            style={{
                              background: "var(--secondary-bg-dashboard)",
                              color: "var(--text-primary-dashboard)",
                            }}
                          >
                            Save Draft
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSubmit()}
                            className="rounded-lg bg-(--bg-lightblue) px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {toast && (
        <div
          className={`fixed bottom-20 right-4 z-50 rounded-xl px-4 py-3 text-sm font-medium text-(--bg-primary-dashboard) shadow-lg lg:bottom-6 ${
            toast.ok ? "bg-(--success-dashboard)" : "bg-(--danger-dashboard)"
          }`}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
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