"use client";

import { useState } from "react";
import { Camera, Mail, Pencil, Phone, ShieldCheck } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-3 py-2.5 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue)";

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "Sarah Mitchell",
    email: "sarah.mitchell@darbartech.com",
    phone: "+977 9841-123456",
    department: "Web Development",
  });
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const saveProfile = () => {
    showToast("Profile updated successfully.");
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">Profile</h1>
        <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">Manage your personal and professional information.</p>
      </div>

      {/* ================= PROFILE HERO ================= */}

      <div className="relative overflow-hidden rounded-2xl p-6 text-(--bg-primary-dashboard) sm:p-8" style={{ background: "var(--bg-dashboard-hero)" }}>
        <div className="flex flex-wrap items-center gap-6">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold" style={{ background: "var(--bg-lightblue)" }}>
              SM
            </div>
            <button type="button" onClick={() => showToast("Profile photo upload")} className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full text-(--bg-primary-dashboard) transition hover:opacity-80 hover:cursor-pointer" style={{ background: "var(--bg-lightblue)" }}>
              <Camera size={14} />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{form.name}</h2>
            <p className="mt-1 text-sm opacity-80">{form.department} • Lead Instructor</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-(--bg-primary-dashboard)/10 px-3 py-1 text-[11px] font-medium">
                <ShieldCheck size={12} /> Teacher ID: TCH-0042
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PROFILE FORM ================= */}

      <div className="rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-(--text-primary-dashboard)">Personal Information</p>
          <Pencil size={16} className="text-(--tertiary-text-dashboard)" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-(--tertiary-text-dashboard)">Full Name</span>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1 text-xs font-medium text-(--tertiary-text-dashboard)"><Mail size={12} /> Email</span>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1 text-xs font-medium text-(--tertiary-text-dashboard)"><Phone size={12} /> Phone</span>
            <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-(--tertiary-text-dashboard)">Department</span>
            <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className={inputClass}>
              <option>Web Development</option>
              <option>UI/UX Design</option>
              <option>Database</option>
              <option>Multimedia</option>
            </select>
          </label>
        </div>
        <div className="mt-5 flex justify-end">
          <button type="button" onClick={saveProfile} className="rounded-lg bg-(--bg-lightblue) px-6 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer">
            Save Profile
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-20 right-4 z-50 rounded-xl bg-(--success-dashboard) px-4 py-3 text-sm font-medium text-(--bg-primary-dashboard) shadow-lg lg:bottom-6">
          {toast}
        </div>
      )}
    </div>
  );
}
