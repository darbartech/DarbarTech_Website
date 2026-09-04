"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Search, Menu } from "lucide-react";
import { useSidebarStore } from "@/store/sidebarStore";
import { student } from "../data";
import ProfileAvatar from "@/components/common/ProfileAvatar";
import { useAuthStore } from "@/lib/auth/auth-store";

const searchIndex = [
  { label: "Dashboard", href: "/student" },
  { label: "My Profile", href: "/student/profile" },
  { label: "My Courses", href: "/student/courses" },
  { label: "Class Schedule", href: "/student/schedule" },
  { label: "Online Classes", href: "/student/online-classes" },
  { label: "Assignments", href: "/student/assignments" },
  { label: "Notes", href: "/student/notes" },
  { label: "Learning Materials", href: "/student/materials" },
  { label: "Attendance", href: "/student/attendance" },
  { label: "Assessments & Results", href: "/student/results" },
  { label: "Notices", href: "/student/notices" },
  { label: "Chat", href: "/student/chat" },
  { label: "Calendar", href: "/student/calendar" },
  { label: "Certificates", href: "/student/certificates" },
  { label: "Notifications", href: "/student/notifications" },
  { label: "Support", href: "/student/support" },
  { label: "Activity", href: "/student/activity" },
];

const StudentTopBar = () => {
  const { toggleMobileSidebar } = useSidebarStore();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const matches = query.trim()
    ? searchIndex.filter((item) =>
        item.label.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : [];

  const go = (href: string) => {
    router.push(href);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="sticky top-0 z-10 flex w-full min-h-12 items-center justify-between gap-4 border-b border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-5 pb-3 sm:pb-4">
      <div className="flex min-w-0 items-center gap-4 sm:gap-6">
        <button
          type="button"
          aria-label="Open sidebar"
          title="Open sidebar"
          className="rounded-lg p-2 text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:text-(--bg-dashboard-hero) lg:hidden"
          onClick={toggleMobileSidebar}
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="hidden shrink-0 text-lg font-semibold text-(--text-primary-dashboard) md:text-xl md:block">
          Student Portal
        </h1>

        <span className="hidden truncate text-sm text-(--secondary-text-dashboard) md:block">
          DarbarTech — Group of Technology
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <form
          className="relative flex items-center gap-2 rounded-3xl border border-(--border-primary-dashboard) px-2 text-xs md:px-5 md:py-1 md:text-base"
          onSubmit={(e) => {
            e.preventDefault();
            if (matches.length > 0) go(matches[0].href);
          }}
        >
          <input
            type="text"
            placeholder="Search courses, lessons..."
            aria-label="Search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            className="w-24 outline-none text-(--text-primary-dashboard) md:w-48"
          />
          <button
            type="submit"
            className="rounded-lg p-2 text-(--text-primary-dashboard) hover:cursor-pointer"
            title="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          {open && matches.length > 0 && (
            <div className="absolute right-0 top-full z-20 mt-2 w-64 overflow-hidden rounded-xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) shadow-lg">
              {matches.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onMouseDown={() => go(item.href)}
                  className="block w-full px-4 py-2.5 text-left text-xs font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </form>

        <Link
          href="/student/notifications"
          aria-label="Notifications"
          title="Notifications"
          className="relative rounded-lg p-2 text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:text-(--bg-dashboard-hero) hover:cursor-pointer"
        >
          <Bell className="h-5 w-5" />
          <span
            className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full"
            style={{ background: "var(--bg-lightblue)" }}
          />
        </Link>

        <Link
          href="/student/profile"
          aria-label="Profile"
          title="Profile"
          className="flex items-center gap-2 rounded-lg p-1 pl-1.5 transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
        >
          <ProfileAvatar name={user?.name || student.name} picture={user?.profilePicture} size="sm" />
          <span className="hidden max-w-[10rem] truncate text-sm font-medium text-(--text-primary-dashboard) md:block">
            {user?.name || student.name}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default StudentTopBar;