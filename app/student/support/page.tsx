"use client";

import { useState } from "react";
import { LifeBuoy, Plus, Send } from "lucide-react";
import { Card, CardHeader, PageHeader, StatusBadge } from "../components/ui";

const categories = [
  "Technical issue",
  "Course issue",
  "Instructor issue",
  "Schedule issue",
  "Assignment issue",
  "Attendance issue",
  "Account issue",
  "Certificate issue",
  "General inquiry",
];

type Ticket = {
  id: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  created: string;
};

const initialTickets: Ticket[] = [
  {
    id: "ST-1024",
    subject: "Cannot open Module 4 video",
    category: "Technical issue",
    priority: "High",
    status: "In Progress",
    created: "31 Aug 2026",
  },
  {
    id: "ST-1001",
    subject: "Request certificate re-issue",
    category: "Certificate issue",
    priority: "Normal",
    status: "Resolved",
    created: "20 Aug 2026",
  },
];

export default function SupportPage() {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [tickets, setTickets] = useState(initialTickets);
  const [submitted, setSubmitted] = useState(false);

  const submitTicket = () => {
    if (!subject.trim() || !description.trim()) return;
    setTickets((prev) => [
      {
        id: `ST-${2000 + tickets.length + 1}`,
        subject: subject.trim(),
        category,
        priority,
        status: "Open",
        created: "Today",
      },
      ...prev,
    ]);
    setSubject("");
    setDescription("");
    setPriority("Normal");
    setOpen(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support & Help Center"
        subtitle="Need help? Create a ticket and our team will respond."
        actions={
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg bg-(--bg-lightblue) px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
          >
            {open ? <Plus size={15} className="rotate-45" /> : <Plus size={15} />}
            New Ticket
          </button>
        }
      />

      {open && (
        <Card>
          <CardHeader title="Raise a Support Ticket" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-(--text-primary-dashboard)">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Briefly describe your issue"
                className="w-full rounded-xl border border-(--border-primary-dashboard) px-4 py-2.5 text-sm outline-none text-(--text-primary-dashboard) focus:ring-2 focus:ring-(--bg-lightblue)/40"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-(--text-primary-dashboard)">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-(--border-primary-dashboard) px-4 py-2.5 text-sm text-(--text-primary-dashboard) outline-none hover:cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-(--text-primary-dashboard)">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-xl border border-(--border-primary-dashboard) px-4 py-2.5 text-sm text-(--text-primary-dashboard) outline-none hover:cursor-pointer"
              >
                {["Low", "Normal", "High"].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-(--text-primary-dashboard)">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe the issue in detail..."
                className="w-full resize-none rounded-xl border border-(--border-primary-dashboard) px-4 py-2.5 text-sm outline-none text-(--text-primary-dashboard) focus:ring-2 focus:ring-(--bg-lightblue)/40"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={submitTicket}
                className="flex items-center gap-2 rounded-lg bg-(--bg-lightblue) px-5 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
              >
                <Send size={15} />
                Submit Ticket
              </button>
            </div>
          </div>
        </Card>
      )}

      {submitted && (
        <div className="rounded-xl bg-(--success-dashboard) px-4 py-3 text-sm font-medium text-(--bg-primary-dashboard)">
          Your support ticket has been submitted. We&apos;ll get back to you soon.
        </div>
      )}

      <div className="flex flex-col gap-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: "var(--secondary-bg-dashboard)" }}>
                  <LifeBuoy size={18} style={{ color: "var(--secondary-text-dashboard)" }} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-(--text-primary-dashboard)">
                      {ticket.subject}
                    </h3>
                    <StatusBadge status={ticket.status} />
                  </div>
                  <p className="mt-1 text-xs text-(--tertiary-text-dashboard)">
                    {ticket.id} • {ticket.category} • {ticket.priority} priority • Created {ticket.created}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}