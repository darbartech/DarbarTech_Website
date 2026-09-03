"use client";

import { useState } from "react";
import { Clock, Play, Video, FileVideo2 } from "lucide-react";

const sessions = [
  { id: 1, topic: "React Context API Deep Dive", course: "Full Stack Web Development", date: "05 Sep 2026", time: "4:00 PM", platform: "Google Meet", status: "Upcoming" },
  { id: 2, topic: "User Persona Workshop", course: "UI/UX Design Fundamentals", date: "06 Sep 2026", time: "10:00 AM", platform: "Zoom", status: "Upcoming" },
  { id: 3, topic: "SQL Joins Live Coding", course: "Database Design & Management", date: "01 Sep 2026", time: "2:00 PM", platform: "Google Meet", status: "Completed" },
  { id: 4, topic: "Introduction to React Hooks", course: "Full Stack Web Development", date: "28 Aug 2026", time: "4:00 PM", platform: "Zoom", status: "Completed" },
  { id: 5, topic: "Color Theory Fundamentals", course: "UI/UX Design Fundamentals", date: "25 Aug 2026", time: "10:00 AM", platform: "Google Meet", status: "Completed" },
];

export default function OnlineClassesPage() {
  const [toast, setToast] = useState<string | null>(null);

  const upcoming = sessions.filter((s) => s.status === "Upcoming");
  const past = sessions.filter((s) => s.status === "Completed");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const renderSession = (session: typeof sessions[0], isPast: boolean) => (
    <div key={session.id} className="rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: "var(--secondary-bg-dashboard)" }}>
          <Video size={20} style={{ color: "var(--secondary-text-dashboard)" }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                {session.topic}
              </p>
              <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
                {session.course}
              </p>
            </div>
            <span className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${
              isPast
                ? "bg-(--secondary-bg-dashboard) text-(--tertiary-text-dashboard)"
                : "bg-emerald-500/15 text-emerald-400"
            }`}>
              {session.status}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-(--tertiary-text-dashboard)">
            <span className="flex items-center gap-1">
              <Clock size={11} /> {session.date} • {session.time}
            </span>
            <span className="flex items-center gap-1">
              <Video size={11} /> {session.platform}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {isPast ? (
          <button
            type="button"
            onClick={() => showToast(`Opening recording for "${session.topic}"`)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-(--secondary-bg-dashboard) px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
          >
            <FileVideo2 size={15} /> View Recording
          </button>
        ) : (
          <button
            type="button"
            onClick={() => showToast(`Joining "${session.topic}" session`)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-(--bg-lightblue) px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
          >
            <Play size={15} /> Start Session
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
          Online Classes
        </h1>
        <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">
          Manage your live online sessions and recordings.
        </p>
      </div>

      {/* ================= UPCOMING ================= */}

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-(--tertiary-text-dashboard)">
          Upcoming Sessions ({upcoming.length})
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {upcoming.map((s) => renderSession(s, false))}
        </div>
      </div>

      {/* ================= PAST ================= */}

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-(--tertiary-text-dashboard)">
          Past Sessions ({past.length})
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {past.map((s) => renderSession(s, true))}
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
