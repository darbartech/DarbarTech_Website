"use client";

import { useState } from "react";
import {
  Clock,
  Play,
  Video,
  FileVideo2,
  Lock,
  Radio,
  X,
} from "lucide-react";
import { Card, PageHeader, StatusBadge } from "../components/ui";
import { onlineClasses } from "../data";

type OnlineClass = (typeof onlineClasses)[number];

export default function OnlineClassesPage() {
  const [joined, setJoined] = useState<number | null>(null);
  const [details, setDetails] = useState<OnlineClass | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Online Classes"
        subtitle="Join live sessions and revisit recordings for your enrolled courses."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {onlineClasses.map((item) => (
          <Card key={item.id} className="flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: "var(--secondary-bg-dashboard)" }}
              >
                <Video
                  size={20}
                  style={{ color: "var(--secondary-text-dashboard)" }}
                />
              </div>
              <StatusBadge status={item.status} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-(--text-primary-dashboard)">
              {item.topic}
            </h3>
            <p className="mt-1 text-xs text-(--tertiary-text-dashboard)">
              {item.course} • {item.instructor}
            </p>

            <div className="mt-4 flex flex-col gap-1.5 text-xs text-(--tertiary-text-dashboard)">
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {item.date} • {item.time}
              </span>
              <span className="flex items-center gap-1.5">
                <Video size={13} />
                {item.platform}
              </span>
            </div>

            <div className="mt-5">
              {item.status === "Live" ? (
                <button
                  type="button"
                  onClick={() => setJoined(item.id)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-(--bg-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                  style={{ background: "var(--bg-lightblue)" }}
                >
                  <Play size={15} />
                  {joined === item.id ? "Joined — Meeting open" : "Join Class"}
                </button>
              ) : item.status === "Upcoming" ? (
                <button
                  type="button"
                  onClick={() => setDetails(item)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                  style={{ background: "var(--secondary-bg-dashboard)" }}
                >
                  View Details
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      showToast("Opening recording — it will start shortly.")
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                    style={{ background: "var(--secondary-bg-dashboard)" }}
                  >
                    <FileVideo2 size={15} /> View Recording
                  </button>
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    title="Only for enrolled students"
                    style={{ background: "var(--secondary-bg-dashboard)" }}
                  >
                    <Lock size={14} style={{ color: "var(--tertiary-text-dashboard)" }} />
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* ================= DETAILS MODAL ================= */}
      {details && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-6 shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "var(--secondary-bg-dashboard)" }}>
                <Radio size={20} style={{ color: "var(--secondary-text-dashboard)" }} />
              </div>
              <button type="button" onClick={() => setDetails(null)} aria-label="Close" className="rounded-lg p-1.5 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <h3 className="text-base font-semibold text-(--text-primary-dashboard)">
              {details.topic}
            </h3>
            <p className="mt-1 text-xs text-(--tertiary-text-dashboard)">
              {details.course} • {details.instructor}
            </p>
            <div className="mt-5 flex flex-col gap-2.5 rounded-xl px-4 py-3 text-sm" style={{ background: "var(--secondary-bg-dashboard)" }}>
              <p className="flex items-center gap-2 text-(--text-primary-dashboard)/80">
                <Clock size={14} /> {details.date} at {details.time}
              </p>
              <p className="flex items-center gap-2 text-(--text-primary-dashboard)/80">
                <Video size={14} /> {details.platform}
              </p>
              <p className="flex items-center gap-2 text-(--text-primary-dashboard)/80">
                <Play size={14} /> Meeting link shared before class starts
              </p>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setDetails(null)}
                className="rounded-lg bg-(--bg-lightblue) px-5 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TOAST ================= */}
      {toast && (
        <div className="fixed bottom-20 right-4 z-50 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg lg:bottom-6">
          {toast}
        </div>
      )}
    </div>
  );
}