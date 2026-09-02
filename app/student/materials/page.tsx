"use client";

import { useState } from "react";
import {
  Download,
  Eye,
  File,
  FileImage,
  Film,
  FolderArchive,
  FileText,
  Presentation,
  X,
} from "lucide-react";
import { Card, EmptyState, PageHeader, FilterChip } from "../components/ui";
import { materials } from "../data";

const typeIcons: Record<string, React.ReactNode> = {
  PDF: <FileText size={17} />,
  Video: <Film size={17} />,
  PPT: <Presentation size={17} />,
  ZIP: <FolderArchive size={17} />,
  DOC: <File size={17} />,
  IMG: <FileImage size={17} />,
};

const typeColors: Record<string, string> = {
  PDF: "#ef4444",
  Video: "#8b5cf6",
  PPT: "#f97316",
  ZIP: "#f59e0b",
  DOC: "#3b82f6",
};

export default function MaterialsPage() {
  const [activeType, setActiveType] = useState("All");
  const [preview, setPreview] = useState<(typeof materials)[number] | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const types = ["All", ...Array.from(new Set(materials.map((m) => m.type)))];
  const visible =
    activeType === "All"
      ? materials
      : materials.filter((m) => m.type === activeType);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Learning Materials"
        subtitle="Download notes, slides and resources for your courses."
      />

      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <FilterChip
            key={type}
            label={type}
            active={activeType === type}
            onClick={() => setActiveType(type)}
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={<File size={24} />}
          title="No materials found"
          description="Materials for this filter will appear here."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((material, i) => (
            <Card key={i} className="flex flex-col gap-3 p-5">
              <div className="flex items-start gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: "var(--secondary-bg-dashboard)",
                    color: typeColors[material.type] ?? "var(--secondary-text-dashboard)",
                  }}
                >
                  {typeIcons[material.type]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                    {material.name}
                  </p>
                  <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
                    {material.course} • {material.module}
                  </p>
                  <p className="mt-0.5 text-[11px] text-(--tertiary-text-dashboard)">
                    Added {material.added}
                  </p>
                </div>
              </div>

              <div className="mt-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => setPreview(material)}
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
            </Card>
          ))}
        </div>
      )}

      {/* ================= PREVIEW MODAL ================= */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-(--bg-dashboard-hero)/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-6 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  background: "var(--secondary-bg-dashboard)",
                  color: typeColors[preview.type] ?? "var(--secondary-text-dashboard)",
                }}
              >
                {typeIcons[preview.type] ?? <File size={17} />}
              </div>
              <button
                type="button"
                onClick={() => setPreview(null)}
                aria-label="Close"
                className="rounded-lg p-1.5 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <h3 className="mt-4 text-base font-semibold text-(--text-primary-dashboard)">
              {preview.name}
            </h3>
            <div className="mt-2 flex flex-col gap-1.5 rounded-xl px-4 py-3 text-sm" style={{ background: "var(--secondary-bg-dashboard)" }}>
              <p className="text-(--text-primary-dashboard)/80">{preview.course} • {preview.module}</p>
              <p className="text-(--text-primary-dashboard)/80">Type: {preview.type}</p>
              <p className="text-(--text-primary-dashboard)/80">Added: {preview.added}</p>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  showToast("Opening preview...");
                }}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  showToast(`Downloading "${preview.name}"...`);
                }}
                className="flex items-center gap-2 rounded-lg bg-(--bg-lightblue) px-5 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
              >
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TOAST ================= */}
      {toast && (
        <div className="fixed bottom-20 right-4 z-50 rounded-xl bg-(--success-dashboard) px-4 py-3 text-sm font-medium text-(--bg-primary-dashboard) shadow-lg lg:bottom-6">
          {toast}
        </div>
      )}
    </div>
  );
}