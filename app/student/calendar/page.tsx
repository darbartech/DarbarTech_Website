import {
  CalendarCheck2,
  FileEdit,
  GraduationCap,
  Megaphone,
} from "lucide-react";
import { Card, CardHeader, PageHeader } from "../components/ui";

const monthGrid = [
  { day: 0, month: "Prev" as const, events: [] as string[] },
  { day: 1, month: "Sep" as const, events: [] as string[] },
  { day: 2, month: "Sep" as const, events: [] as string[] },
  { day: 3, month: "Sep" as const, events: ["Wireframe due"] },
  { day: 4, month: "Sep" as const, events: [] as string[] },
  { day: 5, month: "Sep" as const, events: ["Module 3 Project due"] },
  { day: 6, month: "Sep" as const, events: [] as string[] },
  { day: 7, month: "Sep" as const, events: [] as string[] },
  { day: 8, month: "Sep" as const, events: ["React Context API class"] },
  { day: 9, month: "Sep" as const, events: [] as string[] },
  { day: 10, month: "Sep" as const, events: ["Prototyping class"] },
  { day: 11, month: "Sep" as const, events: [] as string[] },
  { day: 12, month: "Sep" as const, events: ["Node.js class"] },
  { day: 13, month: "Sep" as const, events: [] as string[] },
  { day: 14, month: "Sep" as const, events: [] as string[] },
  { day: 15, month: "Sep" as const, events: ["REST APIs class", "Fee deadline"] },
  { day: 16, month: "Sep" as const, events: [] as string[] },
  { day: 17, month: "Sep" as const, events: ["Design Systems class"] },
  { day: 18, month: "Sep" as const, events: [] as string[] },
  { day: 19, month: "Sep" as const, events: [] as string[] },
  { day: 20, month: "Sep" as const, events: [] as string[] },
  { day: 21, month: "Sep" as const, events: [] as string[] },
  { day: 22, month: "Sep" as const, events: [] as string[] },
  { day: 23, month: "Sep" as const, events: ["Mid-term exams"] },
  { day: 24, month: "Sep" as const, events: ["Mid-term exams"] },
  { day: 25, month: "Sep" as const, events: ["Mid-term exams"] },
  { day: 26, month: "Sep" as const, events: ["Mid-term exams"] },
  { day: 27, month: "Sep" as const, events: [] as string[] },
  { day: 28, month: "Sep" as const, events: [] as string[] },
  { day: 29, month: "Sep" as const, events: [] as string[] },
  { day: 30, month: "Sep" as const, events: [] as string[] },
];

const deadlines = [
  { label: "Submit 'Wireframe Exercise'", date: "Thu 03 Sep", icon: FileEdit },
  { label: "Module 3 Project", date: "Fri 05 Sep", icon: FileEdit },
  { label: "Mid-term Examination", date: "Wed 23 Sep — Sat 26 Sep", icon: GraduationCap },
  { label: "Fee second installment", date: "Tue 15 Sep", icon: Megaphone },
  { label: "React Context API Class", date: "Mon 08 Sep", icon: CalendarCheck2 },
];

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Calendar"
        subtitle="Classes, assignments, exams and important deadlines in one place."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="September 2026" />
            <div className="m-0 overflow-x-auto">
              <div className="min-w-160">
                <div className="grid grid-cols-7 border-b border-(--border-primary-dashboard)">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="px-3 py-2 text-center text-xs font-semibold text-(--tertiary-text-dashboard)">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {monthGrid.map((cell, i) => (
                    <div key={i} className="min-h-22 border-b border-r border-(--border-primary-dashboard) p-1.5">
                      <span className={`text-xs font-medium ${cell.month === "Prev" ? "text-(--tertiary-text-dashboard)/40" : "text-(--text-primary-dashboard)"}`}>
                        {cell.day || ""}
                      </span>
                      <div className="mt-0.5 space-y-0.5">
                        {cell.events.map((event, j) => (
                          <div key={j} className="truncate rounded px-1 py-0.5 text-[9px] font-medium" style={{ background: "var(--secondary-bg-dashboard)", color: "var(--secondary-text-dashboard)" }}>
                            {event}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader title="Upcoming Deadlines" />
            <div className="flex flex-col gap-4">
              {deadlines.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: "var(--secondary-bg-dashboard)" }}
                    >
                      <Icon size={15} style={{ color: "var(--secondary-text-dashboard)" }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
                        {item.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}