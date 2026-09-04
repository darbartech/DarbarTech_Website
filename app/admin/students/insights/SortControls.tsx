"use client";

import { ArrowDown, ArrowUp, Plus, X } from "lucide-react";
import type { SortDirection, SortKey, SortRule } from "@/lib/students/types";

const SORT_KEYS: { key: SortKey; label: string }[] = [
  { key: "course", label: "Course" },
  { key: "enrollmentDate", label: "Enrollment Date" },
  { key: "lastActive", label: "Last Active" },
  { key: "achievements", label: "Achievements" },
  { key: "duration", label: "Duration" },
];

const MAX_RULES = 3;

const selectClass =
  "rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-3 py-2 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue) focus:ring-2 focus:ring-(--bg-lightblue)/20";

export default function SortControls({
  rules,
  onChangeRules,
}: {
  rules: SortRule[];
  onChangeRules: (rules: SortRule[]) => void;
}) {
  const updateRule = (index: number, patch: Partial<SortRule>) => {
    onChangeRules(
      rules.map((rule, i) => (i === index ? { ...rule, ...patch } : rule)),
    );
  };

  const removeRule = (index: number) => {
    onChangeRules(rules.filter((_, i) => i !== index));
  };

  const addRule = () => {
    if (rules.length >= MAX_RULES) return;
    const used = new Set(rules.map((r) => r.key));
    const nextKey = (SORT_KEYS.map((k) => k.key) as SortKey[]).find(
      (key) => !used.has(key),
    );
    onChangeRules([...rules, { key: nextKey ?? "course", direction: "asc" }]);
  };

  const toggleDirection = (index: number) => {
    const direction: SortDirection =
      rules[index].direction === "asc" ? "desc" : "asc";
    updateRule(index, { direction });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-2 shadow-sm"
          >
            {index > 0 && (
              <span
                className="text-[11px] font-medium uppercase tracking-wide text-(--secondary-text-dashboard)"
                aria-hidden="true"
              >
                then
              </span>
            )}

            <label className="sr-only" htmlFor={`sort-key-${index}`}>
              Sort key {index + 1}
            </label>
            <select
              id={`sort-key-${index}`}
              value={rule.key}
              onChange={(event) =>
                updateRule(index, { key: event.target.value as SortKey })
              }
              className={selectClass}
            >
              {SORT_KEYS.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => toggleDirection(index)}
              aria-label={`Sort ${rule.key} ${
                rule.direction === "asc" ? "ascending" : "descending"
              }`}
              aria-pressed={rule.direction === "asc"}
              title={`${
                rule.direction === "asc" ? "Ascending" : "Descending"
              }`}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
            >
              {rule.direction === "asc" ? (
                <ArrowUp size={16} />
              ) : (
                <ArrowDown size={16} />
              )}
            </button>

            <button
              type="button"
              onClick={() => removeRule(index)}
              aria-label={`Remove sort ${SORT_KEYS.find((k) => k.key === rule.key)?.label ?? rule.key}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:text-(--danger-dashboard) hover:cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {rules.length < MAX_RULES && (
          <button
            type="button"
            onClick={addRule}
            className="flex items-center gap-1.5 rounded-lg border border-dashed border-(--border-primary-dashboard) px-3 py-2 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
          >
            <Plus size={15} />
            Add sort
          </button>
        )}
      </div>
    </div>
  );
}
