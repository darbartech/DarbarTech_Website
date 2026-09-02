"use client";

import { useState } from "react";
import {
  Archive,
  Download,
  Paperclip,
  Search,
  Megaphone,
} from "lucide-react";
import {
  Card,
  EmptyState,
  FilterChip,
  PageHeader,
  StatusBadge,
} from "../components/ui";
import { notices } from "../data";

const categories = ["All", "Exam Notice", "Holiday Notice", "Payment Notice"];

export default function NoticesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [items, setItems] = useState(notices);
  const [toast, setToast] = useState<string | null>(null);

  const markRead = (id: number) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "Read" } : n)),
    );

  const archiveNotice = (id: number) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "Archived" } : n)),
    );

  const visible = items.filter((notice) => {
    const matchesSearch =
      search.trim() === "" ||
      notice.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || notice.category === category;
    const notArchived = notice.status !== "Archived";
    return matchesSearch && matchesCategory && notArchived;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notices & Announcements"
        subtitle="Official notices and announcements from the DarbarTech office."
      />

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex min-w-55 flex-1 items-center gap-2 rounded-xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) px-4 py-2.5 text-sm">
          <Search size={15} style={{ color: "var(--tertiary-text-dashboard)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notices..."
            className="w-full outline-none text-(--text-primary-dashboard)"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <FilterChip
              key={cat}
              label={cat}
              active={category === cat}
              onClick={() => setCategory(cat)}
            />
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={<Megaphone size={24} />}
          title="No notices found"
          description="Try a different search term or category."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {visible.map((notice) => (
            <Card key={notice.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "var(--secondary-bg-dashboard)" }}
                  >
                    <Megaphone
                      size={18}
                      style={{ color: "var(--secondary-text-dashboard)" }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-(--text-primary-dashboard)">
                        {notice.title}
                      </h3>
                      <StatusBadge status={notice.status} />
                      {notice.priority === "Important" && (
                        <span className="rounded-full bg-(--danger-dashboard)/10 px-2.5 py-1 text-[11px] font-semibold text-(--danger-dashboard)">
                          {notice.priority}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-(--text-primary-dashboard)/70">
                      {notice.description}
                    </p>
                    <p className="mt-2 text-[11px] text-(--tertiary-text-dashboard)">
                      {notice.date} • {notice.category} • {notice.author}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => archiveNotice(notice.id)}
                    title="Archive"
                    className="rounded-lg p-2 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
                  >
                    <Archive size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setToast("Attachment downloaded.");
                      setTimeout(() => setToast(null), 3000);
                    }}
                    title="Download attachment"
                    className="rounded-lg p-2 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
                  >
                    <Download size={15} />
                  </button>
                  {notice.status === "New" && (
                    <button
                      type="button"
                      onClick={() => markRead(notice.id)}
                      className="rounded-lg bg-(--bg-lightblue) px-3 py-2 text-xs font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-(--tertiary-text-dashboard)">
                <Paperclip size={12} />
                Attachment available
              </div>
            </Card>
          ))}
        </div>
      )}

      {toast && (
        <div className="fixed bottom-20 right-4 z-50 rounded-xl bg-(--success-dashboard) px-4 py-3 text-sm font-medium text-(--bg-primary-dashboard) shadow-lg lg:bottom-6">
          {toast}
        </div>
      )}
    </div>
  );
}