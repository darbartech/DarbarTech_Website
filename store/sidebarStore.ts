import { create } from "zustand";

interface SidebarStore {
  mobileOpen: boolean;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  mobileOpen: false,

  toggleMobileSidebar: () =>
    set((state) => ({
      mobileOpen: !state.mobileOpen,
    })),

  closeMobileSidebar: () =>
    set({
      mobileOpen: false,
    }),
}));