import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
  mobileSidebar: boolean;
  collapsed: boolean;

  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  toggleCollapsed: () => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      mobileSidebar: false,
      collapsed: false,

      toggleMobileSidebar: () =>
        set((state) => ({
          mobileSidebar: !state.mobileSidebar,
        })),

      closeMobileSidebar: () =>
        set({
          mobileSidebar: false,
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