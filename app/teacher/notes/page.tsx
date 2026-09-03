"use client";

import { useState } from "react";
import { Archive, Pencil, Pin, Plus, Search, Trash2, X } from "lucide-react";

type Note = {
  id: number;
  title: string;
  course: string;
  content: string;
  pinned: boolean;
  archived: boolean;
  created: string;
};

const initialNotes: Note[] = [
  { id: 1, title: "React Hooks Lecture Notes", course: "Full Stack Web Development", content: "Covered useState, useEffect, useContext. Need to add custom hooks section next class.", pinned: true, archived: false, created: "02 Sep 2026" },
  { id: 2, title: "Student Progress Tracker", course: "UI/UX Design Fundamentals", content: "Maria and Olivia are ahead. Raj needs extra help with Figma auto-layout.", pinned: false, archived: false, created: "01 Sep 2026" },
  { id: 3, title: "Quiz Revision Notes", course: "Database Design & Management", content: "Normalization forms — need to include more real-world examples for 3NF.", pinned: false, archived: false, created: "28 Aug 2026" },
  { id: 4, title: "Old Class Notes", course: "Full Stack Web Development", content: "Previous batch questions about middleware that may come up again.", pinned: false, archived: true, created: "15 Aug 2026" },
];

const courseFilters = ["All", "Full Stack Web Development", "UI/UX Design Fundamentals", "Database Design & Management"];

const inputClass =
  "w-full rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-3 py-2.5 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue)";

export default function NotesPage() {
  const [notes, setNotes] = useState(initialNotes);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [showArchived, setShowArchived] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", course: courseFilters[1], content: "" });

  const filtered = notes.filter((n) => {
    const matchSearch = search.trim() === "" || n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase());
    const matchCourse = courseFilter === "All" || n.course === courseFilter;
    const matchArchived = showArchived ? true : !n.archived;
    return matchSearch && matchCourse && matchArchived;
  });

  const pinned = filtered.filter((n) => n.pinned && !n.archived);
  const unpinned = filtered.filter((n) => !n.pinned && !n.archived);
  const archived = filtered.filter((n) => n.archived);

  const openCreate = () => { setEditingId(null); setForm({ title: "", course: courseFilters[1], content: "" }); setEditorOpen(true); };
  const openEdit = (id: number) => { const n = notes.find((x) => x.id === id); if (!n) return; setEditingId(id); setForm({ title: n.title, course: n.course, content: n.content }); setEditorOpen(true); };
  const togglePin = (id: number) => setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  const toggleArchive = (id: number) => setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, archived: !n.archived } : n)));
  const deleteNote = (id: number) => setNotes((prev) => prev.filter((n) => n.id !== id));

  const saveNote = () => {
    if (editingId === null) {
      const id = Math.max(0, ...notes.map((n) => n.id)) + 1;
      setNotes((prev) => [{ id, title: form.title || "Untitled note", course: form.course, content: form.content, pinned: false, archived: false, created: "03 Sep 2026" }, ...prev]);
    } else {
      setNotes((prev) => prev.map((n) => (n.id === editingId ? { ...n, title: form.title || n.title, course: form.course, content: form.content } : n)));
    }
    setEditorOpen(false);
  };

  const renderNote = (note: Note) => (
    <div key={note.id} className={`rounded-xl border border-(--border-primary-dashboard) p-4 ${note.pinned ? "ring-1 ring-(--bg-lightblue)/30" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-(--text-primary-dashboard)">{note.title}</p>
          <p className="mt-0.5 text-[11px] text-(--tertiary-text-dashboard)">{note.course}</p>
        </div>
        <button type="button" onClick={() => togglePin(note.id)} className="rounded-lg p-1.5 transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer">
          <Pin size={14} style={{ color: note.pinned ? "var(--bg-lightblue)" : "var(--tertiary-text-dashboard)", fill: note.pinned ? "var(--bg-lightblue)" : "none" }} />
        </button>
      </div>
      <p className="mt-2 line-clamp-3 text-xs leading-5 text-(--text-primary-dashboard)/70">{note.content}</p>
      <div className="mt-3 flex items-center justify-between border-t border-(--border-primary-dashboard) pt-3">
        <span className="text-[11px] text-(--tertiary-text-dashboard)">{note.created}</span>
        <div className="flex gap-1">
          <button type="button" onClick={() => openEdit(note.id)} className="rounded-lg p-1.5 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"><Pencil size={13} /></button>
          <button type="button" onClick={() => toggleArchive(note.id)} className="rounded-lg p-1.5 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"><Archive size={13} /></button>
          <button type="button" onClick={() => deleteNote(note.id)} className="rounded-lg p-1.5 text-(--danger-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"><Trash2 size={13} /></button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">Notes</h1>
          <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">Private notes for managing your classes.</p>
        </div>
        <button type="button" onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-(--bg-lightblue) px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer">
          <Plus size={15} /> Create Note
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex min-w-55 flex-1 items-center gap-2 rounded-xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) px-4 py-2.5 text-sm">
          <Search size={15} style={{ color: "var(--tertiary-text-dashboard)" }} />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notes..." className="w-full outline-none text-(--text-primary-dashboard)" />
        </label>
        <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} className="rounded-xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) px-3 py-2.5 text-sm text-(--text-primary-dashboard) outline-none hover:cursor-pointer">
          {courseFilters.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>
        <button type="button" onClick={() => setShowArchived((v) => !v)} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:cursor-pointer ${showArchived ? "border-(--bg-lightblue) bg-(--bg-lightblue) text-(--text-primary-dashboard)" : "border-(--border-primary-dashboard) bg-(--primary-dashboard) text-(--text-primary-dashboard)/70 hover:bg-(--secondary-bg-dashboard)"}`}>
          <Archive size={15} /> Archived
        </button>
      </div>

      <div className="space-y-4">
        {pinned.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-(--tertiary-text-dashboard)">Pinned</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{pinned.map(renderNote)}</div>
          </div>
        )}
        {unpinned.length > 0 && (
          <div>
            {pinned.length > 0 && <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-(--tertiary-text-dashboard)">Other Notes</p>}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{unpinned.map(renderNote)}</div>
          </div>
        )}
        {showArchived && archived.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-(--tertiary-text-dashboard)">Archived</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{archived.map(renderNote)}</div>
          </div>
        )}
      </div>

      {editorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-(--bg-dashboard-hero)/40 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-semibold text-(--text-primary-dashboard)">{editingId === null ? "Create Note" : "Edit Note"}</h3>
              <button type="button" onClick={() => setEditorOpen(false)} className="rounded-lg p-1.5 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-(--tertiary-text-dashboard)">Title</span>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Note title" className={inputClass} />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-(--tertiary-text-dashboard)">Course</span>
                <select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className={inputClass}>
                  {courseFilters.slice(1).map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-(--tertiary-text-dashboard)">Content</span>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={5} placeholder="Write your note..." className={`${inputClass} resize-none`} />
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setEditorOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer">Cancel</button>
              <button type="button" onClick={saveNote} className="rounded-lg bg-(--bg-lightblue) px-5 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer">{editingId === null ? "Create" : "Save"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
