"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/auth/auth-store";
import type { Role } from "@/lib/auth/types";

const ROLE_ROUTES: Record<Role, string[]> = {
  superadmin: ["/admin", "/teacher", "/student"],
  admin: ["/admin"],
  teacher: ["/teacher"],
  student: ["/student"],
};

const ROLE_HOME: Record<Role, string> = {
  superadmin: "/admin",
  admin: "/admin",
  teacher: "/teacher",
  student: "/student",
};

export default function RouteGuard({
  allowedRoles,
  children,
}: {
  allowedRoles: Role[];
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      router.replace("/unauthorized");
      return;
    }

    const allowedPrefixes = ROLE_ROUTES[user.role];
    const hasAccess = allowedPrefixes.some((prefix) =>
      prefix === "/admin"
        ? pathname === "/admin" || pathname.startsWith("/admin/")
        : prefix === "/teacher"
          ? pathname === "/teacher" || pathname.startsWith("/teacher/")
          : prefix === "/student"
            ? pathname === "/student" || pathname.startsWith("/student/")
            : false
    );

    if (!hasAccess) {
      router.replace(ROLE_HOME[user.role]);
    }
  }, [isAuthenticated, user, allowedRoles, pathname, router, hasHydrated]);

  if (!hasHydrated) return null;
  if (!isAuthenticated || !user) return null;
  if (!allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}
