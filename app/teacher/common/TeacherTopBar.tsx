"use client";

import { useRouter } from "next/navigation";
import { Menu, Bell, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSidebarStore } from "@/store/sidebarStore";
import { useAuthStore } from "@/lib/auth/auth-store";
import ProfileAvatar from "@/components/common/ProfileAvatar";

const searchIndex = [
  { label: "Dashboard", href: "/teacher" },
  { label: "My Classes", href: "/teacher/classes" },
  { label: "Attendance", href: "/teacher/attendance" },
  { label: "Assignments", href: "/teacher/assignments" },
  { label: "Gradebook", href: "/teacher/gradebook" },
  { label: "Materials", href: "/teacher/materials" },
  { label: "Schedule", href: "/teacher/schedule" },
  { label: "Online Classes", href: "/teacher/online-classes" },
  { label: "Chat", href: "/teacher/chat" },
  { label: "Profile", href: "/teacher/profile" },
  { label: "Security", href: "/teacher/security" },
];

export default function TeacherTopBar() {
  const { toggleMobileSidebar } = useSidebarStore();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? searchIndex.filter((i) =>
        i.label.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="sticky top-0 z-10 flex w-full min-h-12 items-center justify-between gap-4 border-b border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-5 pb-3 sm:pb-4">
      <button
        type="button"
        onClick={toggleMobileSidebar}
        className="rounded-lg p-2 text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:text-(--bg-dashboard-hero) lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      <div className="hidden shrink-0 md:block">
        <h1 className="text-lg font-semibold text-(--text-primary-dashboard) md:text-xl">
          Teacher Portal
        </h1>
        <p className="text-xs text-(--tertiary-text-dashboard)">
          DarbarTech — Group of Technology
        </p>
      </div>

      <div className="ml-auto flex items-center gap-3" ref={searchRef}>
        <div className="relative">
          <div className="flex items-center gap-2 rounded-3xl border border-(--border-primary-dashboard) px-3 py-1.5">
            <Search size={16} className="text-(--tertiary-text-dashboard)" />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSearch(true);
              }}
              onFocus={() => query.trim() && setShowSearch(true)}
              className="w-24 outline-none text-sm text-(--text-primary-dashboard) md:w-48"
            />
          </div>

          {showSearch && filtered.length > 0 && (
            <div className="absolute right-0 top-full z-20 mt-2 w-64 overflow-hidden rounded-xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) shadow-lg">
              {filtered.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => {
                    router.push(item.href);
                    setQuery("");
                    setShowSearch(false);
                  }}
                  className="block w-full px-4 py-2.5 text-left text-xs font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => router.push("/teacher/chat")}
          className="relative rounded-lg p-2 text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:text-(--bg-dashboard-hero) hover:cursor-pointer"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-(--info-dashboard)" />
        </button>

        <button
          type="button"
          onClick={() => router.push("/teacher/profile")}
          className="flex items-center gap-2 rounded-lg p-1 pl-1.5 text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
          aria-label="Profile"
        >
          <ProfileAvatar name={user?.name || "Teacher"} picture={user?.profilePicture} size="sm" />
          <span className="hidden max-w-[10rem] truncate text-sm font-medium md:block">
            {user?.name || "Teacher"}
          </span>
        </button>
      </div>
    </div>
  );
}
