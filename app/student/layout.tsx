"use client";

import { useSidebarStore } from "@/store/sidebarStore";
import StudentSidebar from "./common/StudentSidebar";
import StudentTopBar from "./common/StudentTopBar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed } = useSidebarStore();

  return (
    <div className="flex min-h-screen bg-(--bg-primary-dashboard)">
      <StudentSidebar />

      <div
        className={`flex min-w-0 flex-1 flex-col transition-all ${collapsed ? "lg:ml-20" : "lg:ml-64"}`}
      >
        <StudentTopBar />

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}