"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAuthStore } from "./auth-store";
import type { Role } from "./types";
import type { Permission } from "./permissions";
import { hasPermission } from "./permissions";
import useModalFocus from "@/lib/use-modal-focus";

interface AuthContextValue {
  can: (permission: Permission) => boolean;
  hasRole: (role: Role) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  can: () => false,
  hasRole: () => false,
  hasAnyRole: () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const sessionExpiry = useAuthStore((s) => s.sessionExpiry);
  const logout = useAuthStore((s) => s.logout);
  const refreshSession = useAuthStore((s) => s.refreshSession);

  const [showWarning, setShowWarning] = useState(false);
  const [remainingMs, setRemainingMs] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const can = useCallback(
    (permission: Permission) => {
      if (!user) return false;
      return hasPermission(user.role, permission);
    },
    [user]
  );

  const hasRole = useCallback(
    (role: Role) => user?.role === role,
    [user]
  );

  const hasAnyRole = useCallback(
    (roles: Role[]) => (user ? roles.includes(user.role) : false),
    [user]
  );

  useEffect(() => {
    if (!isAuthenticated || !sessionExpiry) return;

    const check = () => {
      const diff = sessionExpiry - Date.now();

      if (diff <= 0) {
        logout();
        return;
      }

      setRemainingMs(diff);
      setShowWarning(diff <= 2 * 60 * 1000);
    };

    check();
    intervalRef.current = setInterval(check, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAuthenticated, sessionExpiry, logout]);

  const formatRemaining = () => {
    const totalSec = Math.max(0, Math.floor(remainingMs / 1000));
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const modalRef = useModalFocus(showWarning, () => setShowWarning(false));

  return (
    <AuthContext.Provider value={{ can, hasRole, hasAnyRole }}>
      {children}

      {showWarning && (
        <div
          ref={modalRef}
          role="alertdialog"
          aria-modal="true"
          aria-label="Session expiring"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-(--bg-dashboard-hero)/60 p-4"
        >
          <div className="w-full max-w-sm rounded-2xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-(--text-primary-dashboard)">
              Session Expiring
            </h2>
            <p className="mt-2 text-sm text-(--text-primary-dashboard)/70">
              Your session is about to expire. You will be signed out in{" "}
              <span className="font-mono font-semibold">
                {formatRemaining()}
              </span>
              .
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  refreshSession();
                  setShowWarning(false);
                }}
                className="flex-1 rounded-lg bg-(--bg-lightblue) px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
              >
                Continue Session
              </button>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setShowWarning(false);
                }}
                className="flex-1 rounded-lg border border-(--border-primary-dashboard) px-4 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}
