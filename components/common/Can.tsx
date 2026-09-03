"use client";

import { useAuth } from "@/lib/auth/use-auth";
import type { Role } from "@/lib/auth/types";
import type { Permission } from "@/lib/auth/permissions";

interface CanProps {
  permission?: Permission;
  role?: Role;
  roles?: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function Can({
  permission,
  role,
  roles,
  children,
  fallback = null,
}: CanProps) {
  const { can, hasRole, hasAnyRole } = useAuth();

  let allowed = false;

  if (permission) {
    allowed = can(permission);
  } else if (role) {
    allowed = hasRole(role);
  } else if (roles) {
    allowed = hasAnyRole(roles);
  } else {
    allowed = true;
  }

  return allowed ? <>{children}</> : <>{fallback}</>;
}
