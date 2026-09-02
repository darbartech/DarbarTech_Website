"use client";

import { useState } from "react";
import { Bell, KeyRound, Palette, ShieldCheck, X } from "lucide-react";
import { Card, CardHeader, PageHeader } from "../components/ui";
import { student } from "../data";

type ToggleRow = {
  label: string;
  enabled: boolean;
};

const initialPrefs: ToggleRow[] = [
  { label: "New assignment alerts", enabled: true },
  { label: "Assignment deadline reminders", enabled: true },
  { label: "Class reminders", enabled: true },
  { label: "Class cancellations / rescheduling", enabled: true },
  { label: "New notices", enabled: true },
  { label: "Instructor messages", enabled: true },
  { label: "Exam announcements", enabled: false },
  { label: "Newsletter emails", enabled: false },
];

export default function SettingsPage() {
  const [prefs, setPrefs] = useState(initialPrefs);
  const [toast, setToast] = useState<string | null>(null);
  const [modal, setModal] = useState<"password" | "2fa" | null>(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const toggle = (index: number) =>
    setPrefs((prev) =>
      prev.map((p, i) => (i === index ? { ...p, enabled: !p.enabled } : p)),
    );

  const save = () => {
    setToast("Preferences saved successfully.");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Manage your notification preferences and account settings."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
        <Card>
          <CardHeader
            title="Notification Preferences"
            action={<Bell size={15} style={{ color: "var(--tertiary-text-dashboard)" }} />}
          />
          <div className="flex flex-col divide-y divide-(--border-primary-dashboard)">
            {prefs.map((pref, i) => (
              <div key={pref.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <p className="text-sm text-(--text-primary-dashboard)">
                  {pref.label}
                </p>
                <button
                  type="button"
                  role="switch"
                  aria-checked={pref.enabled}
                  onClick={() => toggle(i)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition hover:cursor-pointer ${
                    pref.enabled ? "bg-(--bg-lightblue)" : "bg-(--secondary-bg-dashboard)"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                      pref.enabled ? "left-5.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={save}
            className="mt-5 rounded-lg bg-(--bg-lightblue) px-5 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
          >
            Save Preferences
          </button>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader
              title="Security"
              action={<ShieldCheck size={15} style={{ color: "var(--tertiary-text-dashboard)" }} />}
            />
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setModal("password")}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
              >
                <KeyRound size={16} /> Change Password
              </button>
              <button
                type="button"
                onClick={() => setModal("2fa")}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
              >
                <ShieldCheck size={16} /> Two-Factor Authentication
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between rounded-lg px-3 py-2.5" style={{ background: "var(--secondary-bg-dashboard)" }}>
              <p className="text-sm text-(--text-primary-dashboard)">
                Two-Factor Authentication
              </p>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${
                  twoFactorEnabled
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {twoFactorEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Appearance"
              action={<Palette size={15} style={{ color: "var(--tertiary-text-dashboard)" }} />}
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-(--text-primary-dashboard)">
                Theme
              </p>
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-sm font-medium text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                style={{ background: "var(--secondary-bg-dashboard)" }}
              >
                System
              </button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Account" />
            <div className="flex flex-col gap-1.5 text-xs text-(--tertiary-text-dashboard)">
              <p>Signed in as {student.email}</p>
              <p>Student ID: {student.id}</p>
            </div>
          </Card>
        </div>
      </div>

      {/* ================= PASSWORD MODAL ================= */}
      {modal === "password" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-semibold text-(--text-primary-dashboard)">
                Change Password
              </h3>
              <button
                type="button"
                onClick={() => setModal(null)}
                aria-label="Close"
                className="rounded-lg p-1.5 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="Current password"
                className={inputClass}
              />
              <input
                type="password"
                placeholder="New password"
                className={inputClass}
              />
              <input
                type="password"
                placeholder="Confirm new password"
                className={inputClass}
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setModal(null);
                  setToast("Password changed successfully.");
                  setTimeout(() => setToast(null), 3000);
                }}
                className="rounded-lg bg-(--bg-lightblue) px-5 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2FA MODAL ================= */}
      {modal === "2fa" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-semibold text-(--text-primary-dashboard)">
                Two-Factor Authentication
              </h3>
              <button
                type="button"
                onClick={() => setModal(null)}
                aria-label="Close"
                className="rounded-lg p-1.5 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-(--text-primary-dashboard)/70">
              Add an extra layer of security to your account by requiring a
              one-time code in addition to your password on sign-in.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setTwoFactorEnabled((v) => !v);
                  setModal(null);
                  setToast(
                    twoFactorEnabled
                      ? "Two-factor authentication disabled."
                      : "Two-factor authentication enabled.",
                  );
                  setTimeout(() => setToast(null), 3000);
                }}
                className="rounded-lg bg-(--bg-lightblue) px-5 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
              >
                {twoFactorEnabled ? "Disable" : "Enable 2FA"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-20 right-4 z-50 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg lg:bottom-6">
          {toast}
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-3 py-2.5 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue)";