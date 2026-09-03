import type { User } from "./types";

export function canAccessCourse(user: User, courseOwnerId: string): boolean {
  if (user.role === "superadmin" || user.role === "admin") return true;
  if (user.role === "teacher") return user.id === courseOwnerId;
  return false;
}

export function canEditCourse(user: User, courseOwnerId: string): boolean {
  if (user.role === "superadmin") return true;
  if (user.role === "admin" || user.role === "teacher")
    return user.id === courseOwnerId;
  return false;
}

export function canManageStudent(
  user: User,
  studentCourseOwnerId: string
): boolean {
  if (user.role === "superadmin" || user.role === "admin") return true;
  if (user.role === "teacher") return user.id === studentCourseOwnerId;
  return false;
}

export function canEditAssignment(
  user: User,
  assignmentOwnerId: string
): boolean {
  if (user.role === "superadmin") return true;
  if (user.role === "teacher") return user.id === assignmentOwnerId;
  return false;
}
