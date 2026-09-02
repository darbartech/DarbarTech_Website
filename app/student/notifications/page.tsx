"use client";

import { useState } from "react";
import { Bell, BellOff, Check, CheckCheck, Trash2 } from "lucide-react";
import {
  Card,
  EmptyState,
  FilterChip,
  PageHeader,
} from "../components/ui";
import { notifications } from "../data";

const filters = ["All", "Unread", "Assignments", "Classes", "Results"];

export default function NotificationsPage() {
  const [items, setItems] = useState(notifications);
  const [filter, setFilter] = useState("All");

  const markRead = (id: number) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  const remove = (id: number) =>
    setItems((prev) => prev.filter((n) => n.id !== id));

  const unreadCount = items.filter((n) => !n.read).length;

  const visible = items.filter((n) => {
    if (filter === "Unread") return !n.read;
    if (filter === "Assignments") return n.type.includes("assignment");
    if (filter === "Classes") return n.type.includes("class") || n.type.includes("reminder");
    if (filter === "Results") return n.type.includes("result");
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        subtitle={
          unreadCount > 0
            ? `You have ${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}.`
            : "You're all caught up."
        }
        actions={
          unreadCount > 0 ? (
            <button
              type="button"
              onClick={markAllRead}
              className="flex items-center gap-2 rounded-lg bg-(--bg-lightblue) px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
            >
              <CheckCheck size={15} />
              Mark all as read
            </button>
          ) : undefined
        }
      />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <FilterChip
            key={f}
            label={f}
            active={filter === f}
            onClick={() => setFilter(f)}
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={<BellOff size={24} />}
          title="No notifications"
          description="New updates will appear here."
        />
      ) : (
        <Card className="p-2">
          <div className="flex flex-col divide-y divide-(--border-primary-dashboard)">
            {visible.map((notice) => (
              <button
                key={notice.id}
                type="button"
                onClick={() => markRead(notice.id)}
                className={`flex items-start gap-3 rounded-xl px-3 py-3.5 text-left transition hover:cursor-pointer ${
                  !notice.read ? "bg-(--bg-table)" : ""
                }`}
              >
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    notice.read ? "opacity-40" : ""
                  }`}
                  style={{ background: "var(--secondary-bg-dashboard)" }}
                >
                  <Bell size={16} style={{ color: "var(--secondary-text-dashboard)" }} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-(--bg-lightblue)">
                      {notice.type}
                    </p>
                    <span className="text-[11px] text-(--tertiary-text-dashboard)">
                      {notice.time}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-(--text-primary-dashboard)">
                    {notice.text}
                  </p>
                </div>

                {!notice.read && (
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--bg-lightblue)" }} />
                )}

                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(notice.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.stopPropagation();
                      remove(notice.id);
                    }
                  }}
                  className="rounded-lg p-1.5 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard)"
                  title="Remove"
                >
                  <Trash2 size={14} />
                </span>
              </button>
            ))}
          </div>
        </Card>
      )}

      <div className="flex items-center gap-1.5 text-xs text-(--tertiary-text-dashboard)">
        <Check size={13} />
        Notifications are also delivered via email.
      </div>
    </div>
  );
}