"use client";

import { useState } from "react";
import {
  Archive,
  Pencil,
  Pin,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { EmptyState, PageHeader } from "../components/ui";
import { notes } from "../data";

const courseFilters = ["All", "Full Stack Web Development", "UI/UX Design", "Database Design"];

type NoteForm = {
  title: string;
  course: string;
  module: string;
  lesson: string;
  tags: string;
  content: string;
};

const emptyForm: NoteForm = {
  title: "",
  course: courseFilters[1],
  module: "Module 1",
  lesson: "Lesson 1",
  tags: "",
  content: "",
};

export default function NotesPage() {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [showArchived, setShowArchived] = useState(false);
  const [items, setItems] = useState(notes);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<NoteForm>(emptyForm);

  const filtered = items.filter((note) => {
    const matchesSearch =
      search.trim() === "" ||
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());
    const matchesCourse =
      courseFilter === "All" || note.course === courseFilter;
    const matchesArchived = showArchived ? note.archived : !note.archived;
    return matchesSearch && matchesCourse && matchesArchived;
  });

  const visible = showArchived ? filtered : filtered.filter((n) => !n.archived);
  const pinned = visible.filter((n) => n.pinned);
  const unpinned = visible.filter((n) => !n.pinned);

  const togglePin = (id: number) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
    );

  const toggleArchive = (id: number) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, archived: !n.archived } : n)),
    );

  const deleteNote = (id: number) =>
    setItems((prev) => prev.filter((n) => n.id !== id));

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setEditorOpen(true);
  };

  const openEdit = (id: number) => {
    const note = items.find((n) => n.id === id);
    if (!note) return;
    setEditingId(id);
    setForm({
      title: note.title,
      course: note.course,
      module: note.module,
      lesson: note.lesson,
      tags: note.tags.join(", "),
      content: note.content,
    });
    setEditorOpen(true);
  };

  const saveNote = () => {
    const now = "02 Sep 2026";
    if (editingId === null) {
      const id = Math.max(0, ...items.map((n) => n.id)) + 1;
      setItems((prev) => [
        {
          id,
          title: form.title || "Untitled note",
          course: form.course,
          module: form.module,
          lesson: form.lesson,
          tags: form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          content: form.content,
          pinned: false,
          archived: false,
          created: now,
          updated: now,
        },
        ...prev,
      ]);
    } else {
      setItems((prev) =>
        prev.map((n) =>
          n.id === editingId
            ? {
                ...n,
                title: form.title || n.title,
                course: form.course,
                module: form.module,
                lesson: form.lesson,
                tags: form.tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
                content: form.content,
                updated: now,
              }
            : n,
        ),
      );
    }
    setEditorOpen(false);
  };

  const renderNote = (id: number) => {
    const note = items.find((n) => n.id === id);
    if (!note) return null;

    return (
      <div
        key={note.id}
        className={`rounded-lg border border-(--border-primary-dashboard) p-4 ${
          note.pinned ? "ring-1 ring-(--bg-lightblue)/30" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-(--text-primary-dashboard)">
              {note.title}
            </p>
            <p className="mt-0.5 text-[11px] text-(--tertiary-text-dashboard)">
              {note.course} • {note.lesson}
            </p>
          </div>
          <button
            type="button"
            onClick={() => togglePin(id)}
            title={note.pinned ? "Unpin note" : "Pin note"}
            className="rounded-lg p-1.5 transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
          >
            <Pin
              size={14}
              style={{
                color: note.pinned
                  ? "var(--bg-lightblue)"
                  : "var(--tertiary-text-dashboard)",
                fill: note.pinned ? "var(--bg-lightblue)" : "none",
              }}
            />
          </button>
        </div>

        <p className="mt-2 line-clamp-3 text-xs leading-5 text-(--text-primary-dashboard)/70">
          {note.content}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md px-2 py-0.5 text-[10px] font-semibold"
              style={{
                background: "var(--secondary-bg-dashboard)",
                color: "var(--secondary-text-dashboard)",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-(--border-primary-dashboard) pt-3">
          <span className="text-[11px] text-(--tertiary-text-dashboard)">
            Updated {note.updated}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => openEdit(id)}
              title="Edit note"
              className="rounded-lg p-1.5 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
            >
              <Pencil size={13} />
            </button>
            <button
              type="button"
              onClick={() => toggleArchive(id)}
              title={note.archived ? "Unarchive" : "Archive"}
              className="rounded-lg p-1.5 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
            >
              <Archive size={13} />
            </button>
            <button
              type="button"
              onClick={() => deleteNote(id)}
              title="Delete note"
              className="rounded-lg p-1.5 text-red-500 transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Notes"
        subtitle="Private notes for your courses and lessons. Only you can see them."
        actions={
          <button
            type="button"
            onClick={openCreate}
            className="flex items-center gap-2 rounded-lg bg-(--bg-lightblue) px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
          >
            <Plus size={15} />
            Create Note
          </button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex min-w-55 flex-1 items-center gap-2 rounded-xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) px-4 py-2.5 text-sm">
          <Search size={15} style={{ color: "var(--tertiary-text-dashboard)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full outline-none text-(--text-primary-dashboard)"
          />
        </label>

        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="rounded-xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) px-3 py-2.5 text-sm text-(--text-primary-dashboard) outline-none hover:cursor-pointer"
        >
          {courseFilters.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setShowArchived((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:cursor-pointer ${
            showArchived
              ? "border-(--bg-lightblue) bg-(--bg-lightblue) text-(--text-primary-dashboard)"
              : "border-(--border-primary-dashboard) bg-(--primary-dashboard) text-(--text-primary-dashboard)/70"
          }`}
        >
          <Archive size={15} />
          Archived
        </button>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={<StickyNoteIcon />}
          title="No notes found"
          description="Create your first note for a course or lesson."
        />
      ) : (
        <div className="space-y-4">
          {pinned.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-(--tertiary-text-dashboard)">
                Pinned
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {pinned.map((note) => renderNote(note.id))}
              </div>
            </div>
          )}

          <div>
            {pinned.length > 0 && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-(--tertiary-text-dashboard)">
                Other Notes
              </p>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {unpinned.map((note) => renderNote(note.id))}
            </div>
          </div>
        </div>
      )}

      {/* ================= CREATE / EDIT MODAL ================= */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-semibold text-(--text-primary-dashboard)">
                {editingId === null ? "Create Note" : "Edit Note"}
              </h3>
              <button
                type="button"
                onClick={() => setEditorOpen(false)}
                aria-label="Close"
                className="rounded-lg p-1.5 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <Field label="Title">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Redux Toolbox Notes"
                  className={inputClass}
                />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Course">
                  <select
                    value={form.course}
                    onChange={(e) => setForm({ ...form, course: e.target.value })}
                    className={inputClass}
                  >
                    {courseFilters.slice(1).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Module">
                  <input
                    type="text"
                    value={form.module}
                    onChange={(e) => setForm({ ...form, module: e.target.value })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Lesson">
                  <input
                    type="text"
                    value={form.lesson}
                    onChange={(e) => setForm({ ...form, lesson: e.target.value })}
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field label="Tags (comma separated)">
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="React, Hooks"
                  className={inputClass}
                />
              </Field>
              <Field label="Content">
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={5}
                  placeholder="Write your note..."
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditorOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveNote}
                className="rounded-lg bg-(--bg-lightblue) px-5 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
              >
                {editingId === null ? "Create Note" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-3 py-2.5 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue)";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-(--tertiary-text-dashboard)">{label}</span>
      {children}
    </label>
  );
}

function StickyNoteIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
      <path d="M15 3v6h6" />
    </svg>
  );
}