"use client";

import React, { useState } from "react";
import { Palette } from "lucide-react";
import AdminNavbar from "../common/AdminNavbar";
import Topbar from "../TopBar";
import { useSidebarStore } from "@/store/sidebarStore";

const themeOptions = [
  {
    id: "default",
    name: "Default",
    description: "The classic DarbarTech dashboard look.",
    colors: ["#0b1526", "#00d2ff", "#f59e0b"],
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "A deep, dark theme for late-night work.",
    colors: ["#0f172a", "#6366f1", "#22d3ee"],
  },
  {
    id: "forest",
    name: "Forest",
    description: "Calming green tones across the portal.",
    colors: ["#052e16", "#10b981", "#f59e0b"],
  },
  {
    id: "violet",
    name: "Violet",
    description: "A fresh purple-based accent palette.",
    colors: ["#1e1b4b", "#a855f7", "#f43f5e"],
  },
];

const Page = () => {
  const { collapsed } = useSidebarStore();

  const [selectedTheme, setSelectedTheme] = useState("default");

  const [toast, setToast] = useState<string | null>(null);

  const selectTheme = (id: string) => {
    setSelectedTheme(id);

    setToast("Theme applied.");

    setTimeout(() => setToast(null), 2500);
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
              Themes
            </h1>

            <p className="mt-2 text-sm text-(--text-primary-dashboard)/70">
              Choose the look and feel of your admin portal.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {themeOptions.map((theme) => {
              const isActive = selectedTheme === theme.id;

              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => selectTheme(theme.id)}
                  className={`
                    overflow-hidden
                    rounded-2xl
                    border
                    bg-(--primary-dashboard)
                    text-left
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-md
                    hover:cursor-pointer
                    ${
                      isActive
                        ? "border-(--bg-lightblue) ring-2 ring-(--bg-lightblue)/30"
                        : "border-(--border-primary-dashboard)"
                    }
                  `}
                >
                  <div className="flex h-24 items-center justify-center gap-2 px-4">
                    {theme.colors.map((color) => (
                      <span
                        key={color}
                        className="h-10 w-10 rounded-full border border-(--text-primary-dashboard)/10"
                        style={{ background: color }}
                      />
                    ))}
                  </div>

                  <div className="border-t border-(--border-primary-dashboard) p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                        {theme.name}
                      </p>

                      {isActive && (
                        <span className="rounded-full bg-(--bg-lightblue) px-2.5 py-1 text-[10px] font-semibold text-(--text-primary-dashboard)">
                          Active
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-(--tertiary-text-dashboard)">
                      {theme.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) p-5 shadow-sm">
            <Palette
              size={18}
              className="text-(--secondary-text-dashboard)"
            />

            <p className="text-sm text-(--tertiary-text-dashboard)">
              Theme customization is a preview. Full theming takes effect with
              the design system.
            </p>
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