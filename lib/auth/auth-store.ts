import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, User } from "./types";
import { authService } from "./auth-service";

const SESSION_DURATION = 30 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION = 5 * 60 * 1000;

const SESSION_COOKIE = "session_active";
const SESSION_COOKIE_MAX_AGE = SESSION_DURATION / 1000;

function setSessionCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_COOKIE}=true; path=/; max-age=${SESSION_COOKIE_MAX_AGE}; samesite=lax`;
}

function clearSessionCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      sessionExpiry: null,
      failedAttempts: 0,
      lockoutUntil: null,
      hasHydrated: false,

      login: async (email: string, password: string) => {
        const { lockoutUntil: lockout } = get();
        if (lockout && Date.now() < lockout) {
          const remaining = Math.ceil((lockout - Date.now()) / 1000);
          return {
            success: false,
            message: `Too many failed attempts. Try again in ${Math.floor(remaining / 60)}m ${remaining % 60}s.`,
          };
        }

        set({ isLoading: true });
        try {
          const result = await authService.login(email, password);
          if (result.success && result.user) {
            const expiry = Date.now() + SESSION_DURATION;
            setSessionCookie();
            set({
              user: result.user,
              isAuthenticated: true,
              sessionExpiry: expiry,
              failedAttempts: 0,
              lockoutUntil: null,
            });
          } else {
            const attempts = get().failedAttempts + 1;
            if (attempts >= MAX_FAILED_ATTEMPTS) {
              set({
                failedAttempts: attempts,
                lockoutUntil: Date.now() + LOCKOUT_DURATION,
              });
            } else {
              set({ failedAttempts: attempts });
            }
          }
          return result;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (data) => {
        set({ isLoading: true });
        try {
          const result = await authService.register(data);
          return result;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        authService.logout();
        clearSessionCookie();
        set({
          user: null,
          isAuthenticated: false,
          sessionExpiry: null,
          failedAttempts: 0,
          lockoutUntil: null,
        });
      },

      refreshSession: () => {
        const { isAuthenticated } = get();
        if (isAuthenticated) {
          setSessionCookie();
          set({ sessionExpiry: Date.now() + SESSION_DURATION });
        }
      },

      setUser: (user: User) => {
        set({ user });
      },

      setProfilePicture: (picture: string) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, profilePicture: picture } });
        }
      },

      setHasHydrated: (value: boolean) => {
        set({ hasHydrated: value });
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        sessionExpiry: state.sessionExpiry,
      }),
    }
  )
);
