"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  Monitor,
  Smartphone,
  LogOut,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { useToastStore } from "@/components/common/toast-store";

const mockSessions = [
  { id: 1, device: "Chrome on Windows", location: "Kathmandu, Nepal", lastActive: "2 minutes ago", current: true },
  { id: 2, device: "Safari on iPhone", location: "Kathmandu, Nepal", lastActive: "3 hours ago", current: false },
  { id: 3, device: "Firefox on Linux", location: "Pokhara, Nepal", lastActive: "2 days ago", current: false },
];

const backupCodes = [
  "A7K2-M9X1", "B3L8-N4P6", "C5R1-Q8T3", "D9W4-S2V7",
  "E2F6-U5Y8", "G7H3-V1Z4", "J4K9-W6A2", "L8M5-X3B1",
];

const Page = () => {
  const addToast = useToastStore((s) => s.addToast);

  // ================= CHANGE PASSWORD =================
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handlePasswordChange = (event: React.FormEvent) => {
    event.preventDefault();
    setPasswordError(null);

    if (!currentPassword) {
      setPasswordError("Current password is required.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(newPassword)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      setPasswordError("Password must contain at least one number.");
      return;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) {
      setPasswordError("Password must contain at least one special character.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    addToast("Password updated successfully.", "success");
  };

  // ================= TWO-FACTOR AUTH =================
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorStep, setTwoFactorStep] = useState<0 | 1 | 2 | 3>(0);
  const [verificationCode, setVerificationCode] = useState("");
  const [codesCopied, setCodesCopied] = useState(false);

  const handleEnable2FA = () => {
    setTwoFactorStep(1);
  };

  const handleVerify2FA = () => {
    if (verificationCode.length !== 6) {
      addToast("Please enter a 6-digit verification code.", "error");
      return;
    }
    setTwoFactorStep(3);
    setTwoFactorEnabled(true);
    addToast("Two-factor authentication enabled successfully.", "success");
  };

  const handleDisable2FA = () => {
    setTwoFactorEnabled(false);
    setTwoFactorStep(0);
    addToast("Two-factor authentication disabled.", "info");
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
    setCodesCopied(true);
    setTimeout(() => setCodesCopied(false), 2000);
  };

  // ================= SESSIONS =================
  const [sessions, setSessions] = useState(mockSessions);

  const signOutSession = (id: number) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    addToast("Session signed out successfully.", "success");
  };

  const signOutAllOther = () => {
    setSessions((prev) => prev.filter((s) => s.current));
    addToast("All other sessions signed out.", "success");
  };

  const inputClass =
    "w-full rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-4 py-2.5 pr-10 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue) focus:ring-2 focus:ring-(--bg-lightblue)/20";

  return (
    <>
      <section className="px-4 py-2">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
            Security
          </h1>
          <p className="mt-2 text-sm text-(--text-primary-dashboard)/70">
            Manage your password, two-factor authentication, and active sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* ================= CHANGE PASSWORD ================= */}
          <div className="rounded-2xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--secondary-bg-dashboard) text-(--secondary-text-dashboard)">
                <KeyRound size={18} />
              </div>
              <h2 className="text-base font-semibold text-(--text-primary-dashboard)">
                Change Password
              </h2>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="security-current" className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    id="security-current"
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className={inputClass}
                  />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-(--tertiary-text-dashboard) hover:cursor-pointer" aria-label={showCurrent ? "Hide password" : "Show password"}>
                    {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="security-new" className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="security-new"
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className={inputClass}
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-(--tertiary-text-dashboard) hover:cursor-pointer" aria-label={showNew ? "Hide password" : "Show password"}>
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="security-confirm" className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="security-confirm"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={inputClass}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-(--tertiary-text-dashboard) hover:cursor-pointer" aria-label={showConfirm ? "Hide password" : "Show password"}>
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {passwordError && (
                <p className="text-sm text-(--danger-dashboard)">{passwordError}</p>
              )}

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="rounded-lg bg-(--bg-lightblue) px-5 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* ================= TWO-FACTOR AUTH ================= */}
          <div className="h-fit rounded-2xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--secondary-bg-dashboard) text-(--secondary-text-dashboard)">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-(--text-primary-dashboard)">
                  Two-Factor Authentication
                </h2>
                <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
                  Add an extra layer of security to your account.
                </p>
              </div>
            </div>

            {twoFactorStep === 0 && (
              <>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-4">
                  <div>
                    <p className="text-sm font-medium text-(--text-primary-dashboard)">
                      {twoFactorEnabled ? "Enabled" : "Disabled"}
                    </p>
                    <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
                      {twoFactorEnabled ? "Your account is protected by 2FA." : "Requires an authenticator app on login."}
                    </p>
                  </div>
                  {twoFactorEnabled ? (
                    <button
                      type="button"
                      onClick={handleDisable2FA}
                      className="rounded-lg border border-(--danger-dashboard)/30 bg-(--danger-dashboard)/10 px-4 py-2 text-xs font-semibold text-(--danger-dashboard) transition hover:opacity-80 hover:cursor-pointer"
                    >
                      Disable
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleEnable2FA}
                      className="rounded-lg bg-(--bg-lightblue) px-4 py-2 text-xs font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                    >
                      Enable
                    </button>
                  )}
                </div>
                <p className="mt-4 text-xs leading-5 text-(--tertiary-text-dashboard)">
                  Two-factor authentication adds a verification step when you sign in, keeping your account safe even if your password is compromised.
                </p>
              </>
            )}

            {twoFactorStep === 1 && (
              <div className="space-y-4">
                <p className="text-sm text-(--text-primary-dashboard)">
                  Step 1: Scan this QR code with your authenticator app.
                </p>
                <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-(--border-primary-dashboard) bg-(--bg-primary-dashboard)">
                  <div className="text-center">
                    <div className="mx-auto mb-2 grid grid-cols-5 gap-1">
                      {[1,0,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,0,1,1,0,1,0,1,1].map((v, i) => (
                        <div key={i} className={`h-4 w-4 rounded-sm ${v ? "bg-(--text-primary-dashboard)" : "bg-transparent"}`} />
                      ))}
                    </div>
                    <p className="text-[10px] text-(--tertiary-text-dashboard)">QR Code placeholder</p>
                  </div>
                </div>
                <p className="text-xs text-(--tertiary-text-dashboard)">
                  Or enter this key manually: <span className="font-mono font-semibold text-(--text-primary-dashboard)">JBSWY3DPEHPK3PXP</span>
                </p>
                <button
                  type="button"
                  onClick={() => setTwoFactorStep(2)}
                  className="rounded-lg bg-(--bg-lightblue) px-5 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                >
                  Continue
                </button>
              </div>
            )}

            {twoFactorStep === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-(--text-primary-dashboard)">
                  Step 2: Enter the 6-digit code from your authenticator app.
                </p>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-4 py-3 text-center font-mono text-xl tracking-[0.3em] text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue) focus:ring-2 focus:ring-(--bg-lightblue)/20"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setTwoFactorStep(1)}
                    className="flex-1 rounded-lg border border-(--border-primary-dashboard) px-4 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleVerify2FA}
                    className="flex-1 rounded-lg bg-(--bg-lightblue) px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                  >
                    Verify & Enable
                  </button>
                </div>
              </div>
            )}

            {twoFactorStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-(--success-dashboard)">
                  <CheckCircle2 size={18} />
                  <p className="text-sm font-semibold">2FA Enabled Successfully</p>
                </div>
                <p className="text-sm text-(--text-primary-dashboard)">
                  Step 3: Save your backup codes. Store them securely — they won&apos;t be shown again.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.map((code) => (
                    <div key={code} className="rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-3 py-2 text-center font-mono text-sm text-(--text-primary-dashboard)">
                      {code}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={copyBackupCodes}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-(--border-primary-dashboard) px-4 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
                >
                  {codesCopied ? <><CheckCircle2 size={14} /> Copied!</> : <><Copy size={14} /> Copy All Codes</>}
                </button>
                <button
                  type="button"
                  onClick={() => setTwoFactorStep(0)}
                  className="w-full rounded-lg bg-(--bg-lightblue) px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= ACTIVE SESSIONS ================= */}
        <div className="mt-5 rounded-2xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--secondary-bg-dashboard) text-(--secondary-text-dashboard)">
                <Monitor size={18} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-(--text-primary-dashboard)">
                  Active Sessions
                </h2>
                <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
                  Devices currently signed in to your account.
                </p>
              </div>
            </div>
            {sessions.filter((s) => !s.current).length > 0 && (
              <button
                type="button"
                onClick={signOutAllOther}
                className="rounded-lg border border-(--danger-dashboard)/30 bg-(--danger-dashboard)/10 px-4 py-2 text-xs font-semibold text-(--danger-dashboard) transition hover:opacity-80 hover:cursor-pointer"
              >
                Sign out all other sessions
              </button>
            )}
          </div>

          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-4"
              >
                <div className="flex items-center gap-3">
                  {session.device.includes("iPhone") ? (
                    <Smartphone size={18} className="text-(--tertiary-text-dashboard)" />
                  ) : (
                    <Monitor size={18} className="text-(--tertiary-text-dashboard)" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-(--text-primary-dashboard)">
                        {session.device}
                      </p>
                      {session.current && (
                        <span className="rounded-full bg-(--success-dashboard)/10 px-2 py-0.5 text-[10px] font-semibold text-(--success-dashboard)">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-(--tertiary-text-dashboard)">
                      {session.location} — Last active: {session.lastActive}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <button
                    type="button"
                    onClick={() => signOutSession(session.id)}
                    className="flex items-center gap-1.5 rounded-lg border border-(--border-primary-dashboard) px-3 py-1.5 text-xs font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
                  >
                    <LogOut size={12} />
                    Sign out
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
