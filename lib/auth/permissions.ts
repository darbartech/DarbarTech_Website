import type { Role } from "./types";

export type Permission =
  | "users.view"
  | "users.create"
  | "users.edit"
  | "users.delete"
  | "users.manage_roles"
  | "courses.view"
  | "courses.create"
  | "courses.edit"
  | "courses.delete"
  | "courses.manage_all"
  | "attendance.view"
  | "attendance.mark"
  | "assignments.create"
  | "assignments.grade"
  | "materials.upload"
  | "grades.view"
  | "grades.manage"
  | "certificates.view"
  | "cms.manage"
  | "jobs.manage"
  | "security.manage"
  | "security.manage_self"
  | "audit.view"
  | "notifications.manage"
  | "themes.manage"
  | "chat.access"
  | "schedule.view"
  | "classes.view"
  | "classes.manage";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  superadmin: [
    "users.view",
    "users.create",
    "users.edit",
    "users.delete",
    "users.manage_roles",
    "courses.view",
    "courses.create",
    "courses.edit",
    "courses.delete",
    "courses.manage_all",
    "attendance.view",
    "attendance.mark",
    "assignments.create",
    "assignments.grade",
    "materials.upload",
    "grades.view",
    "grades.manage",
    "certificates.view",
    "cms.manage",
    "jobs.manage",
    "security.manage",
    "security.manage_self",
    "audit.view",
    "notifications.manage",
    "themes.manage",
    "chat.access",
    "schedule.view",
    "classes.view",
    "classes.manage",
  ],
  admin: [
    "users.view",
    "courses.view",
    "courses.create",
    "courses.edit",
    "courses.delete",
    "courses.manage_all",
    "attendance.view",
    "cms.manage",
    "jobs.manage",
    "security.manage_self",
    "notifications.manage",
    "themes.manage",
    "certificates.view",
  ],
  teacher: [
    "courses.view",
    "courses.edit",
    "attendance.view",
    "attendance.mark",
    "assignments.create",
    "assignments.grade",
    "materials.upload",
    "grades.view",
    "grades.manage",
    "security.manage_self",
    "chat.access",
    "schedule.view",
    "classes.view",
    "classes.manage",
  ],
  student: [
    "courses.view",
    "attendance.view",
    "grades.view",
    "certificates.view",
    "security.manage_self",
    "chat.access",
    "schedule.view",
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function hasAnyRole(userRole: Role, roles: Role[]): boolean {
  return roles.includes(userRole);
}

export function getPermissionsForRole(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}
