"use client";

import RouteGuard from "@/components/common/RouteGuard";
import { useSidebarStore } from "@/store/sidebarStore";
import AdminNavbar from "./common/AdminNavbar";
import Topbar from "./TopBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed } = useSidebarStore();

  return (
    <RouteGuard allowedRoles={["superadmin", "admin"]}>
      <div className="flex min-h-screen bg-(--bg-primary-dashboard)">
        <AdminNavbar />
        <main
          id="main-content"
          className={`min-h-screen min-w-0 flex-1 transition-all ${
            !collapsed ? "lg:ml-64" : "lg:ml-20"
          }`}
        >
          <Topbar />
          <div className="px-4 py-2">{children}</div>
        </main>
      </div>
    </RouteGuard>
  );
}
