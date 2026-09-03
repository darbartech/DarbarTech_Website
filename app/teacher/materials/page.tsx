"use client";

import { useState } from "react";
import {
  Download,
  Eye,
  FileText,
  Film,
  Presentation,
  Upload,
} from "lucide-react";

const materials = [
  { id: 1, name: "React Hooks Complete Guide", type: "PDF", course: "Full Stack Web Development", added: "02 Sep 2026" },
  { id: 2, name: "State Management Lecture Recording", type: "Video", course: "Full Stack Web Development", added: "01 Sep 2026" },
  { id: 3, name: "Figma Design Systems Workshop", type: "PPT", course: "UI/UX Design Fundamentals", added: "28 Aug 2026" },
  { id: 4, name: "SQL Joins Cheat Sheet", type: "PDF", course: "Database Design & Management", added: "25 Aug 2026" },
  { id: 5, name: "API Design Best Practices", type: "Video", course: "Full Stack Web Development", added: "22 Aug 2026" },
  { id: 6, name: "User Research Methodology", type: "PPT", course: "UI/UX Design Fundamentals", added: "20 Aug 2026" },
];

const typeIcons: Record<string, React.ReactNode> = {
  PDF: <FileText size={17} />,
  Video: <Film size={17} />,
  PPT: <Presentation size={17} />,
};

const typeColors: Record<string, string> = {
  PDF: "#ef4444",
  Video: "#8b5cf6",
  PPT: "#f97316",
};

const filterOptions = ["All", "PDF", "Video", "PPT"];

export default function MaterialsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [toast, setToast] = useState<string | null>(null);

  const visible = activeFilter === "All" ? materials : materials.filter((m) => m.type === activeFilter);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
            Course Materials
          </h1>
          <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">
            Upload and manage learning resources for your classes.
          </p>
        </div>
        <button
          type="button"
          onClick={() => showToast("Upload dialog would open here")}
          className="flex items-center gap-2 rounded-lg bg-(--bg-lightblue) px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
        >
          <Upload size={15} />
          Upload Material
        </button>
      </div>

      {/* ================= FILTERS ================= */}

      <div className="flex flex-wrap gap-2">
        {filterOptions.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setActiveFilter(type)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition hover:cursor-pointer ${
              activeFilter === type
                ? "border-(--bg-lightblue) bg-(--bg-lightblue) text-(--text-primary-dashboard)"
                : "border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) text-(--text-primary-dashboard)/70 hover:bg-(--secondary-bg-dashboard)"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* ================= MATERIALS GRID ================= */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((material) => (
          <div
            key={material.id}
            className="rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: "var(--secondary-bg-dashboard)",
                  color: typeColors[material.type],
                }}
              >
                {typeIcons[material.type]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                  {material.name}
                </p>
                <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
                  {material.course}
                </p>
                <p className="mt-0.5 text-[11px] text-(--tertiary-text-dashboard)">
                  Added {material.added}
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => showToast(`Previewing "${material.name}"`)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                style={{ background: "var(--secondary-bg-dashboard)" }}
              >
                <Eye size={13} /> View
              </button>
              <button
                type="button"
                onClick={() => showToast(`Downloading "${material.name}"...`)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-(--bg-lightblue) px-3 py-2 text-xs font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
              >
                <Download size={13} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {toast && (
        <div className="fixed bottom-20 right-4 z-50 rounded-xl bg-(--success-dashboard) px-4 py-3 text-sm font-medium text-(--bg-primary-dashboard) shadow-lg lg:bottom-6">
          {toast}
        </div>
      )}
    </div>
  );
}
