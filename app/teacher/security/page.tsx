"use client";

import { useState } from "react";
import { CheckCircle2, KeyRound, MapPin, ShieldCheck } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-3 py-2.5 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue)";

const sessions = [
  { device: "Chrome on Windows — Kathmandu, NP", ip: "103.137.204.18", time: "Active now", current: true },
  { device: "Safari on iPhone — Kathmandu, NP", ip: "27.34.53.12", time: "2 hours ago", current: false },
  { device: "Firefox on MacBook — Kathmandu, NP", ip: "113.199.44.7", time: "Yesterday", current: false },
];

export default function SecurityPage() {
  const [twoFA, setTwoFA] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Password changed successfully.");
  };

  const revokeSession = (ip: string) => {
    showToast(`Signed out device (${ip})`);
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">Security</h1>
        <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">Manage your password, 2FA and active sessions.</p>
      </div>

      {/* ================= CHANGE PASSWORD ================= */}

      <div className="rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <KeyRound size={16} className="text-(--secondary-text-dashboard)" />
          <p className="text-sm font-semibold text-(--text-primary-dashboard)">Change Password</p>
        </div>
        <form onSubmit={changePassword} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-(--tertiary-text-dashboard)">Current Password</span>
            <input type="password" placeholder="Enter current password" className={inputClass} />
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-(--tertiary-text-dashboard)">New Password</span>
              <input type="password" placeholder="Enter new password" className={inputClass} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-(--tertiary-text-dashboard)">Confirm New Password</span>
              <input type="password" placeholder="Confirm new password" className={inputClass} />
            </label>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="rounded-lg bg-(--bg-lightblue) px-6 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer">
              Change Password
            </button>
          </div>
        </form>
      </div>

      {/* ================= TWO-FACTOR AUTH ================= */}

      <div className="rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-(--secondary-text-dashboard)" />
            <div>
              <p className="text-sm font-semibold text-(--text-primary-dashboard)">Two-Factor Authentication</p>
              <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
                {twoFA ? "Enabled — verify via authenticator app" : "Disabled — your account is less secure"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { setTwoFA(!twoFA); showToast(twoFA ? "2FA disabled." : "2FA enabled."); }}
            className={`relative h-7 w-12 rounded-full transition hover:cursor-pointer ${twoFA ? "bg-(--bg-lightblue)" : "bg-(--secondary-bg-dashboard)"}`}
          >
            <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${twoFA ? "left-6" : "left-0.5"}`} />
          </button>
        </div>
      </div>

      {/* ================= ACTIVE SESSIONS ================= */}

      <div className="rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <MapPin size={16} className="text-(--secondary-text-dashboard)" />
          <p className="text-sm font-semibold text-(--text-primary-dashboard)">Active Sessions</p>
        </div>
        <div className="flex flex-col gap-3">
          {sessions.map((session, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-xl border border-(--border-primary-dashboard) p-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-(--text-primary-dashboard)">{session.device}</p>
                  {session.current && (
                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/15 text-emerald-400">
                      <CheckCircle2 size={10} /> Current
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
                  IP {session.ip} • {session.time}
                </p>
              </div>
              {!session.current && (
                <button type="button" onClick={() => revokeSession(session.ip)} className="shrink-0 rounded-lg bg-(--secondary-bg-dashboard) px-3 py-2 text-xs font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer">
                  Sign Out
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-20 right-4 z-50 rounded-xl bg-(--success-dashboard) px-4 py-3 text-sm font-medium text-(--bg-primary-dashboard) shadow-lg lg:bottom-6">
          {toast}
        </div>
      )}
    </div>
  );
}
