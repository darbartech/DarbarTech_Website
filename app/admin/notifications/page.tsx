"use client";

import React, { useState } from "react";
import { Bell, Check } from "lucide-react";
import AdminNavbar from "../common/AdminNavbar";
import Topbar from "../TopBar";
import { useSidebarStore } from "@/store/sidebarStore";

const initialNotifications = [
  {
    id: 1,
    title: "New student enrolled",
    description: "Hari Karki enrolled in Full Stack Web Development.",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "New job application",
    description: "Sita Sharma applied for Frontend Dev at CloudSync.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "Payment received",
    description: "Gita Gurung paid for Advanced TypeScript Development.",
    time: "Yesterday",
    read: false,
  },
  {
    id: 4,
    title: "Course published",
    description: "Modern UI/UX Design is now live for students.",
    time: "2 days ago",
    read: true,
  },
];

type NotificationItem = (typeof initialNotifications)[number];

const Page = () => {
  const { collapsed } = useSidebarStore();

  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const markAsRead = (id: number) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  return (
    <div className="flex min-h-screen bg-(--bg-primary-dashboard)">
      <AdminNavbar />

      <main
        className={`min-h-screen min-w-0 flex-1 ${
          !collapsed ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <Topbar />

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
                Notifications
              </h1>

              <p className="mt-2 text-sm text-(--text-primary-dashboard)/70">
                Stay up to date with activity across the platform.
              </p>
            </div>

            <button
              type="button"
              onClick={markAllAsRead}
              className="flex shrink-0 items-center gap-2 rounded-lg border border-(--border-primary-dashboard) px-4 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
            >
              <Check size={16} />

              Mark all as read
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                type="button"
                onClick={() => markAsRead(notification.id)}
                className={`
                  flex
                  w-full
                  items-start
                  gap-4
                  rounded-2xl
                  border
                  border-(--border-primary-dashboard)
                  p-4
                  text-left
                  transition
                  hover:bg-(--secondary-bg-dashboard)
                  hover:cursor-pointer
                  sm:p-5
                  ${
                    notification.read
                      ? "bg-(--primary-dashboard)"
                      : "bg-(--primary-dashboard) shadow-sm"
                  }
                `}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--secondary-bg-dashboard) text-(--secondary-text-dashboard)">
                  <Bell size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                      {notification.title}
                    </p>

                    {!notification.read && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-(--bg-lightblue)" />
                    )}
                  </div>

                  <p className="mt-1 text-sm text-(--tertiary-text-dashboard)">
                    {notification.description}
                  </p>

                  <p className="mt-1.5 text-xs text-(--secondary-text-dashboard)">
                    {notification.time}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;