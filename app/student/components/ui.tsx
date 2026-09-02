import React from "react";

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-(--text-primary-dashboard)">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-(--tertiary-text-dashboard)">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) p-5 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  action,
  titleClassName = "text-sm",
}: {
  title: string;
  action?: React.ReactNode;
  titleClassName?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <p className={`font-semibold text-(--text-primary-dashboard) ${titleClassName}`}>
        {title}
      </p>
      {action}
    </div>
  );
}

const statusColors: Record<string, string> = {
  // course
  Active: "bg-(--success-dashboard)/10 text-(--success-dashboard)",
  Upcoming: "bg-(--info-dashboard)/10 text-(--info-dashboard)",
  Completed: "bg-(--violet-dashboard)/10 text-(--violet-dashboard)",
  "On Hold": "bg-(--warning-dashboard)/10 text-(--warning-dashboard)",
  Expired: "bg-(--danger-dashboard)/10 text-(--danger-dashboard)",

  // assignment
  Pending: "bg-(--warning-dashboard)/10 text-(--warning-dashboard)",
  Draft: "bg-(--secondary-bg-dashboard) text-(--tertiary-text-dashboard)",
  Submitted: "bg-(--info-dashboard)/10 text-(--info-dashboard)",
  Late: "bg-(--danger-dashboard)/10 text-(--danger-dashboard)",
  Reviewed: "bg-(--success-dashboard)/10 text-(--success-dashboard)",
  "Revision Required": "bg-(--warning-dashboard)/10 text-(--warning-dashboard)",

  // class
  Live: "bg-(--danger-dashboard)/10 text-(--danger-dashboard)",
  Cancelled: "bg-(--secondary-bg-dashboard) text-(--tertiary-text-dashboard)",
  Rescheduled: "bg-(--warning-dashboard)/10 text-(--warning-dashboard)",

  // support
  Open: "bg-(--info-dashboard)/10 text-(--info-dashboard)",
  "In Progress": "bg-(--warning-dashboard)/10 text-(--warning-dashboard)",
  Waiting: "bg-(--violet-dashboard)/10 text-(--violet-dashboard)",
  Resolved: "bg-(--success-dashboard)/10 text-(--success-dashboard)",
  Closed: "bg-(--secondary-bg-dashboard) text-(--tertiary-text-dashboard)",

  // notice
  New: "bg-(--info-dashboard)/10 text-(--info-dashboard)",
  Read: "bg-(--secondary-bg-dashboard) text-(--tertiary-text-dashboard)",
  Important: "bg-(--danger-dashboard)/10 text-(--danger-dashboard)",
  Archived: "bg-(--secondary-bg-dashboard) text-(--tertiary-text-dashboard)",

  // certificate
  Issued: "bg-(--success-dashboard)/10 text-(--success-dashboard)",
};

export function StatusBadge({
  status,
}: {
  status: string;
}) {
  const color = statusColors[status] ?? "bg-(--secondary-bg-dashboard) text-(--tertiary-text-dashboard)";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${color}`}
    >
      {status}
    </span>
  );
}

export function ProgressBar({
  percent,
  thin = false,
}: {
  percent: number;
  thin?: boolean;
}) {
  return (
    <div
      className={`w-full overflow-hidden rounded-full ${
        thin ? "h-1.5" : "h-2"
      }`}
      style={{ background: "var(--secondary-bg-dashboard)" }}
    >
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${percent}%`, background: "var(--bg-lightblue)" }}
      />
    </div>
  );
}

export function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <span
          className="text-[11px] font-medium leading-tight"
          style={{ color: "var(--tertiary-text-dashboard)" }}
        >
          {label}
        </span>
        <span style={{ color: "var(--secondary-text-dashboard)" }}>{icon}</span>
      </div>
      <p
        className="text-2xl font-bold"
        style={{ color: "var(--text-primary-dashboard)" }}
      >
        {value}
      </p>
      {sub && (
        <p
          className="mt-1 text-xs"
          style={{ color: "var(--tertiary-text-dashboard)" }}
        >
          {sub}
        </p>
      )}
    </Card>
  );
}

export function Avatar({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md" | "lg";
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const sizeClass =
    size === "sm"
      ? "h-8 w-8 text-xs"
      : size === "lg"
        ? "h-14 w-14 text-lg"
        : "h-10 w-10 text-sm";

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${sizeClass}`}
      style={{
        background: "var(--secondary-bg-dashboard)",
        color: "var(--secondary-text-dashboard)",
      }}
    >
      {initials}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-(--border-primary-dashboard) bg-(--primary-dashboard) p-10 text-center">
      <span
        className="mb-3 flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: "var(--secondary-bg-dashboard)" }}
      >
        <span style={{ color: "var(--secondary-text-dashboard)" }}>{icon}</span>
      </span>
      <p className="text-sm font-semibold text-(--text-primary-dashboard)">
        {title}
      </p>
      {description && (
        <p className="mt-1 max-w-sm text-xs text-(--tertiary-text-dashboard)">
          {description}
        </p>
      )}
    </div>
  );
}

export function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex
        shrink-0
        items-center
        rounded-full
        border
        px-4
        py-2
        text-sm
        font-medium
        transition
        hover:cursor-pointer
        ${
          active
            ? "border-(--bg-lightblue) bg-(--bg-lightblue) text-(--text-primary-dashboard)"
            : "border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) text-(--text-primary-dashboard)/70 hover:bg-(--secondary-bg-dashboard)"
        }
      `}
    >
      {label}
    </button>
  );
}