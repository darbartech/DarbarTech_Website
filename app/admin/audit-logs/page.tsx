"use client";

import { useState } from "react";
import { Search, Download, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const auditLogs = [
  { id: 1, date: "03 Sep 2026, 10:23 AM", actor: "Super Admin", action: "Changed user role", resource: "User Management", description: "Changed role of ops@darbartech.com from teacher to admin", status: "success" as const },
  { id: 2, date: "03 Sep 2026, 09:45 AM", actor: "Admin", action: "Created course", resource: "Course Management", description: "Created course 'React Advanced Patterns'", status: "success" as const },
  { id: 3, date: "02 Sep 2026, 04:12 PM", actor: "Teacher", action: "Graded assignment", resource: "Gradebook", description: "Graded 'Module 3 Project' for Alex Johnson — 42/50", status: "success" as const },
  { id: 4, date: "02 Sep 2026, 02:30 PM", actor: "Admin", action: "Updated CMS content", resource: "CMS", description: "Updated hero banner text and image", status: "success" as const },
  { id: 5, date: "02 Sep 2026, 11:15 AM", actor: "Unknown", action: "Failed login attempt", resource: "Authentication", description: "Failed login for admin@darbartech.com from 192.168.1.50", status: "failed" as const },
  { id: 6, date: "01 Sep 2026, 03:48 PM", actor: "Super Admin", action: "Deleted user", resource: "User Management", description: "Deleted user account STU-045 (withdrawn student)", status: "success" as const },
  { id: 7, date: "01 Sep 2026, 01:20 PM", actor: "Admin", action: "Exported report", resource: "Reports", description: "Exported attendance report for Batch 12", status: "success" as const },
  { id: 8, date: "01 Sep 2026, 10:05 AM", actor: "Teacher", action: "Uploaded material", resource: "Materials", description: "Uploaded 'React Context API Notes' to Full Stack Web Dev", status: "success" as const },
  { id: 9, date: "31 Aug 2026, 04:55 PM", actor: "Admin", action: "Changed theme settings", resource: "Themes", description: "Updated primary dashboard background color", status: "success" as const },
  { id: 10, date: "31 Aug 2026, 11:30 AM", actor: "Student", action: "Submitted assignment", resource: "Assignments", description: "Submitted 'Wireframe Exercise' for UI/UX Design", status: "success" as const },
  { id: 11, date: "30 Aug 2026, 09:15 AM", actor: "Super Admin", action: "Enabled 2FA", resource: "Security", description: "Enabled two-factor authentication for admin@darbartech.com", status: "success" as const },
  { id: 12, date: "30 Aug 2026, 08:00 AM", actor: "Unknown", action: "Failed login attempt", resource: "Authentication", description: "Failed login for sarah@darbartech.com from 10.0.0.1", status: "failed" as const },
];

const PAGE_SIZE = 10;

const statusStyles: Record<string, string> = {
  success: "bg-(--success-dashboard)/10 text-(--success-dashboard)",
  failed: "bg-(--danger-dashboard)/10 text-(--danger-dashboard)",
  warning: "bg-(--warning-dashboard)/10 text-(--warning-dashboard)",
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = auditLogs.filter((log) => {
    const matchesSearch =
      !search ||
      log.actor.toLowerCase().includes(search.toLowerCase()) ||
      log.description.toLowerCase().includes(search.toLowerCase());
    const matchesAction = actionFilter === "all" || log.action.toLowerCase().includes(actionFilter.toLowerCase());
    return matchesSearch && matchesAction;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
          Audit Logs
        </h1>
        <p className="mt-2 text-sm text-(--text-primary-dashboard)/70">
          Security and activity logs for your organization.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-3 py-2">
          <Search size={16} className="text-(--tertiary-text-dashboard)" />
          <input
            type="text"
            placeholder="Search actor or description..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-48 bg-transparent text-sm text-(--text-primary-dashboard) outline-none md:w-64"
          />
        </div>

        <select
          value={actionFilter}
          onChange={(e) => { setActionFilter(e.target.value); setCurrentPage(1); }}
          className="rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-3 py-2 text-sm text-(--text-primary-dashboard) outline-none hover:cursor-pointer"
        >
          <option value="all">All Actions</option>
          <option value="role">Role Changes</option>
          <option value="created">Created</option>
          <option value="graded">Graded</option>
          <option value="login">Login Attempts</option>
          <option value="deleted">Deleted</option>
          <option value="uploaded">Uploaded</option>
        </select>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-3 py-2 text-sm text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
        >
          <Calendar size={14} />
          Last 30 days
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-(--bg-lightblue) px-3 py-2 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
        >
          <Download size={14} />
          Export
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-(--border-primary-dashboard)">
              <th className="px-4 py-3 text-xs font-semibold text-(--tertiary-text-dashboard)">Date</th>
              <th className="px-4 py-3 text-xs font-semibold text-(--tertiary-text-dashboard)">Actor</th>
              <th className="px-4 py-3 text-xs font-semibold text-(--tertiary-text-dashboard)">Action</th>
              <th className="px-4 py-3 text-xs font-semibold text-(--tertiary-text-dashboard)">Resource</th>
              <th className="px-4 py-3 text-xs font-semibold text-(--tertiary-text-dashboard)">Description</th>
              <th className="px-4 py-3 text-xs font-semibold text-(--tertiary-text-dashboard)">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((log) => (
              <tr key={log.id} className="border-b border-(--border-primary-dashboard) last:border-b-0 transition hover:bg-(--secondary-bg-dashboard)/50">
                <td className="px-4 py-3 text-xs text-(--tertiary-text-dashboard)">{log.date}</td>
                <td className="px-4 py-3 text-sm font-medium text-(--text-primary-dashboard)">{log.actor}</td>
                <td className="px-4 py-3 text-sm text-(--text-primary-dashboard)">{log.action}</td>
                <td className="px-4 py-3 text-sm text-(--text-primary-dashboard)/70">{log.resource}</td>
                <td className="max-w-xs truncate px-4 py-3 text-sm text-(--text-primary-dashboard)/70">{log.description}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${statusStyles[log.status]}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-(--tertiary-text-dashboard)">
                  No audit logs match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-(--tertiary-text-dashboard)">
            Showing {startIdx + 1} to {Math.min(startIdx + PAGE_SIZE, filtered.length)} of {filtered.length} logs
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex items-center gap-1 rounded-lg border border-(--border-primary-dashboard) px-3 py-1.5 text-xs font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} /> Previous
            </button>
            <span className="text-xs text-(--tertiary-text-dashboard)">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="flex items-center gap-1 rounded-lg border border-(--border-primary-dashboard) px-3 py-1.5 text-xs font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
