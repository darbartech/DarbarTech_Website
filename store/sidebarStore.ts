import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
  mobileOpen: boolean;
  collapsed: boolean;

  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  toggleCollapsed: () => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      mobileOpen: false,
      collapsed: false,

      toggleMobileSidebar: () =>
        set((state) => ({
          mobileOpen: !state.mobileOpen,
        })),

      closeMobileSidebar: () =>
        set({
          mobileOpen: false,
        }),

      toggleCollapsed: () =>
        set((state) => ({
          collapsed: !state.collapsed,
        })),
    }),
    {
      name: "sidebar-storage",
    }
  )
);