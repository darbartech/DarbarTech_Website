/** Formats an ISO 8601 date string into a short, human-readable form. */
export function formatISODate(value: string | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Duration in days between a date and now (or a given `now`). Negative-safe. */
export function daysSince(value: string | undefined, now = Date.now()): number {
  if (!value) return 0;
  const time = Date.parse(value);
  if (Number.isNaN(time)) return 0;
  return Math.max(0, Math.floor((now - time) / 86_400_000));
}
