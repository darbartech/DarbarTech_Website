"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  CalendarDays,
  Clock,
  List,
  MapPin,
  UserRound,
  Video,
} from "lucide-react";
import { Card, PageHeader, StatusBadge } from "../components/ui";
import { upcomingClasses } from "../data";

const views = ["List", "Week", "Month"] as const;

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthGrid = [
  { day: 0, month: "Prev", events: [] as string[] },
  { day: 1, month: "Sep", events: [] as string[] },
  { day: 2, month: "Sep", events: [] as string[] },
  { day: 3, month: "Sep", events: [] as string[] },
  { day: 4, month: "Sep", events: [] as string[] },
  { day: 5, month: "Sep", events: [] as string[] },
  { day: 6, month: "Sep", events: ["React.js Live Session"] },
  { day: 7, month: "Sep", events: [] as string[] },
  { day: 8, month: "Sep", events: ["Context API"] },
  { day: 9, month: "Sep", events: [] as string[] },
  { day: 10, month: "Sep", events: ["Prototyping"] },
  { day: 11, month: "Sep", events: [] as string[] },
  { day: 12, month: "Sep", events: ["Node.js Intro"] },
  { day: 13, month: "Sep", events: [] as string[] },
  { day: 14, month: "Sep", events: [] as string[] },
  { day: 15, month: "Sep", events: ["REST APIs"] },
  { day: 16, month: "Sep", events: [] as string[] },
  { day: 17, month: "Sep", events: ["Design Systems"] },
  { day: 18, month: "Sep", events: [] as string[] },
  { day: 19, month: "Sep", events: [] as string[] },
  { day: 20, month: "Sep", events: [] as string[] },
  { day: 21, month: "Sep", events: [] as string[] },
  { day: 22, month: "Sep", events: [] as string[] },
  { day: 23, month: "Sep", events: [] as string[] },
  { day: 24, month: "Sep", events: [] as string[] },
  { day: 25, month: "Sep", events: [] as string[] },
  { day: 26, month: "Sep", events: [] as string[] },
  { day: 27, month: "Sep", events: [] as string[] },
  { day: 28, month: "Sep", events: [] as string[] },
  { day: 29, month: "Sep", events: [] as string[] },
  { day: 30, month: "Sep", events: [] as string[] },
];

export default function SchedulePage() {
  const [view, setView] = useState<(typeof views)[number]>("List");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Class Schedule"
        subtitle="Your upcoming classes and sessions at a glance."
      />

      <div className="flex flex-wrap items-center gap-2">
        {views.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition hover:cursor-pointer ${
              view === v
                ? "border-(--bg-lightblue) bg-(--bg-lightblue) text-(--text-primary-dashboard)"
                : "border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) text-(--text-primary-dashboard)/70 hover:bg-(--secondary-bg-dashboard)"
            }`}
          >
            {v === "List" ? <List size={15} /> : v === "Week" ? <CalendarDays size={15} /> : <Calendar size={15} />}
            {v}
          </button>
        ))}
      </div>

      {view === "List" && (
        <Card>
          <div className="flex flex-col divide-y divide-(--border-primary-dashboard)">
            {upcomingClasses.map((item, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center rounded-xl px-3 py-2 text-center" style={{ background: "var(--secondary-bg-dashboard)" }}>
                    <span className="text-[10px] font-semibold uppercase text-(--tertiary-text-dashboard)">
                      {item.date.split(" ")[0]}
                    </span>
                    <span className="text-sm font-bold text-(--text-primary-dashboard)">
                      {item.date.split(" ")[1]}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                      {item.topic}
                    </p>
                    <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
                      {item.course}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-(--tertiary-text-dashboard)">
                      <span className="inline-flex items-center gap-1">
                        <Clock size={11} /> {item.time}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <UserRound size={11} /> {item.instructor}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        {item.mode === "Online" ? (
                          <Video size={11} />
                        ) : (
                          <MapPin size={11} />
                        )}
                        {item.mode}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <StatusBadge status="Upcoming" />
                  <Link
                    href={item.mode === "Online" ? "/student/online-classes" : "/student/courses"}
                    className="rounded-lg bg-(--bg-lightblue) px-4 py-2 text-xs font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                  >
                    {item.mode === "Online" ? "Join Class" : "Details"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {view === "Week" && (
        <div className="overflow-x-auto">
          <div className="min-w-max rounded-2xl border border-(--border-primary-dashboard) bg-(--primary-dashboard)">
            <div className="grid grid-cols-7 border-b border-(--border-primary-dashboard)">
              {weekDays.map((day) => (
                <div key={day} className="border-r border-(--border-primary-dashboard) px-3 py-3 text-center text-xs font-semibold text-(--tertiary-text-dashboard) last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {weekDays.map((day, i) => (
                <div key={day} className="min-h-40 border-r border-(--border-primary-dashboard) p-2 last:border-r-0">
                  {upcomingClasses
                    .filter((item) => item.date.startsWith(day))
                    .map((item, j) => (
                      <div key={j} className="mb-2 rounded-lg px-2 py-1.5" style={{ background: "var(--secondary-bg-dashboard)" }}>
                        <p className="text-[11px] font-semibold text-(--text-primary-dashboard)">
                          {item.time.split(" ")[0]}
                        </p>
                        <p className="text-[10px] text-(--text-primary-dashboard)/70">
                          {item.topic}
                        </p>
                      </div>
                    ))}
                  {i === 2 && <div className="text-center text-4xl text-(--tertiary-text-dashboard)/10">8</div>}
                  {i === 0 && <div className="text-center text-4xl text-(--tertiary-text-dashboard)/10">8</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === "Month" && (
        <div className="overflow-x-auto">
          <div className="min-w-max rounded-2xl border border-(--border-primary-dashboard) bg-(--primary-dashboard)">
            <div className="grid grid-cols-7 border-b border-(--border-primary-dashboard)">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="border-r border-(--border-primary-dashboard) px-3 py-3 text-center text-xs font-semibold text-(--tertiary-text-dashboard) last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {monthGrid.map((cell, i) => (
                <div key={i} className={cell.month === "Prev" ? "border-r border-(--border-primary-dashboard) p-2" : "min-h-24 border-r border-(--border-primary-dashboard) p-2 last:border-r-0"}>
                  <span className={`text-xs font-medium ${cell.month === "Prev" ? "text-(--tertiary-text-dashboard)/40" : "text-(--text-primary-dashboard)"}`}>
                    {cell.day}
                  </span>
                  {cell.events.map((event, j) => (
                    <div key={j} className="mt-1.5 truncate rounded-md px-1.5 py-1 text-[10px] font-semibold" style={{ background: "var(--secondary-bg-dashboard)", color: "var(--secondary-text-dashboard)" }}>
                      {event}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}