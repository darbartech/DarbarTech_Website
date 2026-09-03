"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/auth/auth-store";
import { ShieldX } from "lucide-react";

const HOME_MAP = {
  superadmin: "/admin",
  admin: "/admin",
  teacher: "/teacher",
  student: "/student",
} as const;

export default function UnauthorizedPage() {
  const user = useAuthStore((s) => s.user);
  const home = user ? HOME_MAP[user.role] : "/login";

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--bg-primary-dashboard) px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-(--danger-dashboard)/10">
          <ShieldX size={40} className="text-(--danger-dashboard)" />
        </div>
        <h1 className="text-6xl font-bold text-(--text-primary-dashboard)">
          403
        </h1>
        <h2 className="mt-4 text-xl font-semibold text-(--text-primary-dashboard)">
          Access Denied
        </h2>
        <p className="mt-2 text-sm text-(--text-primary-dashboard)/70">
          You don&apos;t have permission to access this page.
        </p>
        <Link
          href={home}
          className="mt-8 inline-block rounded-lg bg-(--bg-lightblue) px-6 py-3 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
