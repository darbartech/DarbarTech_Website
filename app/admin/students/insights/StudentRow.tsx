import { Award, CalendarDays, Clock } from "lucide-react";
import type { Student } from "@/lib/students/types";
import { daysSince, formatISODate } from "@/lib/students/format";

export default function StudentRow({
  student,
  index,
}: {
  student: Student;
  index: number;
}) {
  const achievementCount = student.achievements.length;

  return (
    <tr
      className="border-t border-(--border-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard)"
      aria-rowindex={index + 1}
    >
      {/* Student */}
      <td className="px-5 py-4 text-sm">
        <p className="font-medium text-(--text-primary-dashboard)">
          {student.name}
        </p>
        <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
          {student.email}
        </p>
      </td>

      {/* Course */}
      <td className="px-5 py-4 text-sm text-(--text-primary-dashboard)">
        {student.courseName}
      </td>

      {/* Enrollment date */}
      <td className="px-5 py-4 text-sm text-(--text-primary-dashboard)">
        <span className="flex items-center gap-1.5">
          <CalendarDays size={14} className="text-(--tertiary-text-dashboard)" />
          {formatISODate(student.enrollmentDate)}
        </span>
      </td>

      {/* Completion */}
      <td className="px-5 py-4 text-sm text-(--text-primary-dashboard)">
        {student.completionDate
          ? formatISODate(student.completionDate)
          : "—"}
      </td>

      {/* Last active */}
      <td className="px-5 py-4 text-sm text-(--text-primary-dashboard)">
        <span className="flex items-center gap-1.5">
          <Clock size={14} className="text-(--tertiary-text-dashboard)" />
          {student.lastActiveAt ? formatISODate(student.lastActiveAt) : "—"}
        </span>
      </td>

      {/* Duration */}
      <td className="px-5 py-4 text-sm text-(--text-primary-dashboard)">
        {daysSince(student.enrollmentDate)} days
      </td>

      {/* Achievements */}
      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-1.5">
          <Award size={15} className="text-(--bg-lightblue)" />
          <span className="text-sm font-semibold text-(--text-primary-dashboard)">
            {student.achievementScore}
          </span>
          <span className="text-xs text-(--tertiary-text-dashboard)">
            ({achievementCount}
            {achievementCount === 1 ? " award" : " awards"})
          </span>
        </span>
      </td>
    </tr>
  );
}
