"use client";

import RouteGuard from "@/components/common/RouteGuard";
import { useSidebarStore } from "@/store/sidebarStore";
import TeacherSidebar from "./common/TeacherSidebar";
import TeacherTopBar from "./common/TeacherTopBar";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed } = useSidebarStore();

  return (
    <RouteGuard allowedRoles={["teacher"]}>
      <div className="flex min-h-screen bg-(--bg-primary-dashboard)">
        <TeacherSidebar />
        <main
          id="main-content"
          className={`min-h-screen min-w-0 flex-1 transition-all ${
            !collapsed ? "lg:ml-64" : "lg:ml-20"
          }`}
        >
          <TeacherTopBar />
          <div className="p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </RouteGuard>
  );
}
