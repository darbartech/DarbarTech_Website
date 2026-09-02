"use client";

import React, { useState } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";
import AdminNavbar from "../common/AdminNavbar";
import Topbar from "../TopBar";
import { useSidebarStore } from "@/store/sidebarStore";

const Page = () => {
  const { collapsed } = useSidebarStore();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [toast, setToast] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => setToast(null), 2500);
  };

  const handlePasswordChange = (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");

      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");

      return;
    }

    setError(null);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    showToast("Password updated successfully.");
  };

  return (
    <div className="flex min-h-screen bg-(--bg-primary-dashboard)">
      <AdminNavbar />

      <main
        className={`min-h-screen min-w-0 flex-1 ${
          !collapsed ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <Topbar />

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
              Security
            </h1>

            <p className="mt-2 text-sm text-(--text-primary-dashboard)/70">
              Manage your password and account protection.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* ================= CHANGE PASSWORD ================= */}

            <div className="rounded-2xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) p-6 shadow-sm">
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
                  <label
                    htmlFor="security-current"
                    className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)"
                  >
                    Current Password
                  </label>

                  <input
                    id="security-current"
                    type="password"
                    value={currentPassword}
                    onChange={(event) =>
                      setCurrentPassword(event.target.value)
                    }
                    required
                    className="w-full rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-4 py-2.5 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue) focus:ring-2 focus:ring-(--bg-lightblue)/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="security-new"
                    className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)"
                  >
                    New Password
                  </label>

                  <input
                    id="security-new"
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    required
                    className="w-full rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-4 py-2.5 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue) focus:ring-2 focus:ring-(--bg-lightblue)/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="security-confirm"
                    className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)"
                  >
                    Confirm New Password
                  </label>

                  <input
                    id="security-confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    required
                    className="w-full rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-4 py-2.5 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue) focus:ring-2 focus:ring-(--bg-lightblue)/20"
                  />
                </div>

                {error && (
                  <p className="text-sm text-(--danger-dashboard)">{error}</p>
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

            <div className="h-fit rounded-2xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) p-6 shadow-sm">
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

              <div className="flex items-center justify-between gap-4 rounded-xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-4">
                <div>
                  <p className="text-sm font-medium text-(--text-primary-dashboard)">
                    {twoFactorEnabled ? "Enabled" : "Disabled"}
                  </p>

                  <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
                    {twoFactorEnabled
                      ? "Your account is protected by 2FA."
                      : "Requires an authenticator app on login."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setTwoFactorEnabled((current) => !current)
                  }
                  role="switch"
                  aria-checked={twoFactorEnabled}
                  aria-label="Toggle two-factor authentication"
                  className={`
                    flex
                    h-7
                    w-12
                    shrink-0
                    items-center
                    rounded-full
                    p-1
                    transition-colors
                    hover:cursor-pointer
                    ${
                      twoFactorEnabled
                        ? "bg-(--bg-lightblue)"
                        : "bg-(--secondary-bg-dashboard)"
                    }
                  `}
                >
                  <span
                    className={`
                      h-5
                      w-5
                      rounded-full
                      bg-(--bg-primary-dashboard)
                      shadow
                      transition-transform
                      ${twoFactorEnabled ? "translate-x-5" : "translate-x-0"}
                    `}
                  />
                </button>
              </div>

              <p className="mt-4 text-xs leading-5 text-(--tertiary-text-dashboard)">
                Two-factor authentication adds a verification step when you
                sign in, keeping your account safe even if your password is
                compromised.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ================= TOAST ================= */}

      {toast && (
        <div className="fixed bottom-6 right-6 z-100 rounded-xl border border-(--border-primary-dashboard) bg-(--text-primary-dashboard) px-5 py-3 text-sm font-medium text-(--bg-primary-dashboard) shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Page;