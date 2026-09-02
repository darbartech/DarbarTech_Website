import { CheckCircle2, Clock } from "lucide-react";
import { Card, CardHeader, PageHeader } from "../components/ui";
import { activity } from "../data";

const iconByAction = (action: string) => {
  if (action.toLowerCase().includes("joined")) return "Join Class";
  if (action.toLowerCase().includes("submitted")) return "Assignment";
  if (action.toLowerCase().includes("downloaded")) return "Material";
  if (action.toLowerCase().includes("viewed")) return "Notice";
  if (action.toLowerCase().includes("completed")) return "Lesson";
  return "Activity";
};

const iconColors: Record<string, { bg: string; color: string }> = {
  "Join Class": { bg: "#dbeafe", color: "#2563eb" },
  Assignment: { bg: "#fef3c7", color: "#d97706" },
  Material: { bg: "#ede9fe", color: "#7c3aed" },
  Notice: { bg: "#fce7f3", color: "#db2777" },
  Lesson: { bg: "#d1fae5", color: "#059669" },
  Activity: { bg: "#e5e7eb", color: "#4b5563" },
};

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Activity"
        subtitle="Track your recent learning actions."
      />

      <Card>
        <CardHeader
          title="Recent Activity"
          action={<Clock size={16} style={{ color: "var(--tertiary-text-dashboard)" }} />}
        />

        <div className="flex flex-col gap-6">
          {activity.map((group) => (
            <div key={group.date}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-(--tertiary-text-dashboard)">
                {group.date}
              </p>
              <div className="flex flex-col gap-2.5">
                {group.items.map((action, i) => {
                  const type = iconByAction(action);
                  const colors = iconColors[type];
                  return (
                    <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2.5" style={{ background: "var(--secondary-bg-dashboard)" }}>
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                        style={{ background: colors.bg, color: colors.color }}
                      >
                        <CheckCircle2 size={15} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-(--text-primary-dashboard)">
                          {action}
                        </p>
                        <p className="text-[11px] text-(--tertiary-text-dashboard)">
                          {type}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}