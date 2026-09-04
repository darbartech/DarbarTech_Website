import { Users } from "lucide-react";
import type { Student } from "@/lib/students/types";
import StudentRow from "./StudentRow";

export default function StudentTable({
  students,
}: {
  students: Student[];
}) {
  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-(--border-primary-dashboard) bg-(--primary-dashboard) px-6 py-16 text-center">
        <span
          className="mb-3 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: "var(--secondary-bg-dashboard)" }}
        >
          <Users size={22} style={{ color: "var(--secondary-text-dashboard)" }} />
        </span>
        <p className="text-sm font-semibold text-(--text-primary-dashboard)">
          No students found
        </p>
        <p className="mt-1 max-w-sm text-xs text-(--tertiary-text-dashboard)">
          Try adjusting or clearing the filters and sort rules to see more
          students.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-(--border-primary-dashboard)">
      <table className="w-full min-w-175 border-collapse">
        <thead>
          <tr>
            {[
              "Student",
              "Course",
              "Enrollment Date",
              "Completion",
              "Last Active",
              "Duration",
              "Achievements",
            ].map((header) => (
              <th
                key={header}
                className="bg-(--bg-table) px-5 py-4 text-left text-sm font-semibold text-(--text-primary-dashboard)"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <StudentRow
              key={student.id}
              student={student}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
