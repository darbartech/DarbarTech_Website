"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Search, Menu, X, ChevronRight } from "lucide-react";
import { useSidebarStore } from "@/store/sidebarStore";
import ProfileAvatar from "@/components/common/ProfileAvatar";
import { useAuthStore } from "@/lib/auth/auth-store";

const searchIndex = [
  { label: "Analytics", path: "/admin" },
  { label: "Jobs", path: "/admin/jobs" },
  { label: "Courses", path: "/admin/courses" },
  { label: "Hero Management", path: "/admin/cms/hero-management" },
  { label: "Product Management", path: "/admin/cms/product-management" },
  { label: "Users", path: "/admin/users" },
  { label: "Notifications", path: "/admin/notifications" },
  { label: "Security", path: "/admin/security" },
  { label: "AI & Chat", path: "/admin/ai-chat" },
  { label: "Profile", path: "/admin/profile" },
];

const notifications = [
  {
    id: 1,
    title: "New student enrolled",
    description: "Hari Karki enrolled in Full Stack Web Development.",
    time: "2 minutes ago",
  },
  {
    id: 2,
    title: "New job application",
    description: "Sita Sharma applied for Frontend Dev at CloudSync.",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "Payment received",
    description: "Gita Gurung paid for Advanced TypeScript Development.",
    time: "Yesterday",
  },
];

const Topbar = () => {
  const { mobileSidebar, toggleMobileSidebar } = useSidebarStore();
  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredResults = query.trim()
    ? searchIndex.filter((item) =>
        item.label.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : searchIndex;

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter" && filteredResults.length > 0) {
      router.push(filteredResults[0].path);
      setQuery("");
      setIsSearchOpen(false);
    } else if (event.key === "Escape") {
      setIsSearchOpen(false);
    }
  };

  return (
    <div
      className={`flex w-full bg-(--bg-primary-dashboard) min-h-12 items-center justify-between gap-4 border-b border-(--border-primary-dashboard) pb-3 sm:pb-4 sticky top-0 z-10 p-5`}
    >
      {/* Page Navigation */}
      <div className="flex min-w-0 items-center gap-4 sm:gap-6 ">
        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileSidebar ? "Close sidebar" : "Open sidebar"}
          title={mobileSidebar ? "Close sidebar" : "Open sidebar"}
          className="rounded-lg p-2 text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:text-(--bg-dashboard-hero) lg:hidden"
          onClick={toggleMobileSidebar}
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="hidden shrink-0 text-lg font-semibold text-(--text-primary-dashboard) md:text-xl md:block">
          Admin Portal
        </h1>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        {/* Search */}
        <div className="relative">
          <form
            className="flex items-center gap-2 border border-(--border-primary-dashboard) rounded-3xl px-2 text-xs md:text-base md:py-1 md:px-5"
            onSubmit={(event) => {
              event.preventDefault();

              if (filteredResults.length > 0) {
                router.push(filteredResults[0].path);
                setQuery("");
                setIsSearchOpen(false);
              }
            }}
          >
            <input
              type="text"
              placeholder="Search anything..."
              aria-label="Search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              onKeyDown={handleKeyDown}
              className=" text-(--text-primary-dashboard) outline-none "
            />
            <button
              type="submit"
              className="rounded-lg p-2 text-(--text-primary-dashboard) hover:cursor-pointer "
              title="Search"
            >
              {" "}
              <Search className="h-5 w-5 hover:cursor-pointer" />
            </button>
          </form>

          {/* Search dropdown */}
          {isSearchOpen && query.trim() && (
            <div className="absolute top-full z-20 mt-2 w-64 overflow-hidden rounded-xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) shadow-lg md:w-72">
              {filteredResults.length > 0 ? (
                filteredResults.slice(0, 6).map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => {
                      setQuery("");
                      setIsSearchOpen(false);
                    }}
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard)"
                  >
                    <span>{item.label}</span>
                    <ChevronRight
                      size={14}
                      className="text-(--tertiary-text-dashboard)"
                    />
                  </Link>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-(--tertiary-text-dashboard)">
                  No results found
                </p>
              )}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            title="Notifications"
            onClick={() => setShowNotifications((current) => !current)}
            className="relative rounded-lg p-2 text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:text-(--bg-dashboard-hero) hover:cursor-pointer"
          >
            <Bell className="h-5 w-5" />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-(--bg-lightblue)" />
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowNotifications(false)}
              />

              <div className="absolute right-0 top-full z-30 mt-2 w-80 overflow-hidden rounded-xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) shadow-lg">
                <div className="flex items-center justify-between border-b border-(--border-primary-dashboard) px-4 py-3">
                  <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                    Notifications
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="rounded-lg p-1 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard)"
                  >
                    <X size={15} />
                  </button>
                </div>

                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="border-b border-(--border-primary-dashboard) px-4 py-3 transition hover:bg-(--secondary-bg-dashboard)"
                  >
                    <p className="text-sm font-medium text-(--text-primary-dashboard)">
                      {notification.title}
                    </p>

                    <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
                      {notification.description}
                    </p>

                    <p className="mt-1 text-[11px] text-(--secondary-text-dashboard)">
                      {notification.time}
                    </p>
                  </div>
                ))}

                <Link
                  href="/admin/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="block px-4 py-3 text-center text-sm font-medium text-(--bg-lightblue) transition hover:bg-(--secondary-bg-dashboard)"
                >
                  View all notifications
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Profile */}
        <button
          type="button"
          aria-label="Profile"
          title="Profile"
          onClick={() => router.push("/admin/profile")}
          className="flex items-center gap-2 rounded-lg p-1 pl-1.5 text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
        >
          <ProfileAvatar name={user?.name || "Admin"} picture={user?.profilePicture} size="sm" />
          <span className="hidden max-w-[10rem] truncate text-sm font-medium md:block">
            {user?.name || "Admin"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Topbar;