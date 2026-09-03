"use client";

import { useState } from "react";
import { Clock, MapPin } from "lucide-react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const schedule: Record<string, { time: string; course: string; room: string }[]> = {
  Mon: [
    { time: "9:00 AM", course: "Full Stack Web Development", room: "Room 101" },
    { time: "1:00 PM", course: "Database Design & Management", room: "Room 203" },
  ],
  Tue: [
    { time: "10:30 AM", course: "UI/UX Design Fundamentals", room: "Lab 3" },
  ],
  Wed: [
    { time: "9:00 AM", course: "Full Stack Web Development", room: "Room 101" },
    { time: "1:00 PM", course: "Database Design & Management", room: "Room 203" },
  ],
  Thu: [
    { time: "10:30 AM", course: "UI/UX Design Fundamentals", room: "Lab 3" },
  ],
  Fri: [
    { time: "9:00 AM", course: "Full Stack Web Development", room: "Room 101" },
    { time: "3:00 PM", course: "Video Editing Masterclass", room: "Room 105" },
  ],
  Sat: [],
};

const courseColors: Record<string, string> = {
  "Full Stack Web Development": "#3b82f6",
  "UI/UX Design Fundamentals": "#8b5cf6",
  "Database Design & Management": "#10b981",
  "Video Editing Masterclass": "#f59e0b",
};

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Mon");

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
          Class Schedule
        </h1>
        <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">
          Your weekly teaching schedule at a glance.
        </p>
      </div>

      {/* ================= DAY SELECTOR ================= */}

      <div className="flex flex-wrap gap-2">
        {weekDays.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => setSelectedDay(day)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition hover:cursor-pointer ${
              selectedDay === day
                ? "border-(--bg-lightblue) bg-(--bg-lightblue) text-(--text-primary-dashboard)"
                : "border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) text-(--text-primary-dashboard)/70 hover:bg-(--secondary-bg-dashboard)"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* ================= WEEKLY GRID ================= */}

      <div className="overflow-x-auto">
        <div className="min-w-max rounded-2xl border border-(--border-primary-dashboard) bg-(--primary-dashboard)">
          <div className="grid grid-cols-6 border-b border-(--border-primary-dashboard)">
            {weekDays.map((day) => (
              <div
                key={day}
                className={`border-r border-(--border-primary-dashboard) px-3 py-3 text-center text-xs font-semibold last:border-r-0 ${
                  selectedDay === day
                    ? "bg-(--bg-lightblue) text-(--text-primary-dashboard)"
                    : "text-(--tertiary-text-dashboard)"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-6">
            {weekDays.map((day) => (
              <div key={day} className="min-h-60 border-r border-(--border-primary-dashboard) p-2 last:border-r-0">
                {schedule[day].length === 0 ? (
                  <p className="mt-4 text-center text-xs text-(--tertiary-text-dashboard)/50">
                    No classes
                  </p>
                ) : (
                  schedule[day].map((item, i) => (
                    <div
                      key={i}
                      className="mb-2 rounded-lg px-3 py-2.5"
                      style={{ background: "var(--secondary-bg-dashboard)" }}
                    >
                      <p className="text-[11px] font-semibold text-(--text-primary-dashboard)">
                        {item.time}
                      </p>
                      <p className="mt-0.5 text-[10px] leading-4 text-(--text-primary-dashboard)/70">
                        {item.course}
                      </p>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-(--tertiary-text-dashboard)">
                        <MapPin size={9} />
                        {item.room}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= TODAY'S CLASSES ================= */}

      <div className="rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm">
        <p className="mb-4 text-sm font-semibold text-(--text-primary-dashboard)">
          {selectedDay}&apos;s Classes
        </p>
        {schedule[selectedDay].length === 0 ? (
          <p className="text-sm text-(--tertiary-text-dashboard)">
            No classes scheduled for {selectedDay}.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {schedule[selectedDay].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-(--border-primary-dashboard) p-4"
              >
                <div
                  className="h-10 w-1 rounded-full"
                  style={{ background: courseColors[item.course] ?? "#6b7280" }}
                />
                <div>
                  <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                    {item.course}
                  </p>
                  <div className="mt-1 flex gap-3 text-[11px] text-(--tertiary-text-dashboard)">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {item.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {item.room}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
