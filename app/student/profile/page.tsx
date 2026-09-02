"use client";

import { useRouter } from "next/navigation";
import {
  Bell,
  CalendarDays,
  Camera,
  KeyRound,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  PageHeader,
  ProgressBar,
  StatusBadge,
} from "../components/ui";
import { courses, student } from "../data";

type ProfileForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  gender: string;
  section: string;
};

const emptyForm: ProfileForm = {
  name: student.name,
  email: student.email,
  phone: student.phone,
  address: student.address,
  dob: student.dob,
  gender: student.gender,
  section: student.section,
};

export default function ProfilePage() {
  const router = useRouter();
  const [openTab, setOpenTab] = useState<"personal" | "academic">("personal");
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [editOpen, setEditOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const saveEdit = () => {
    setEditOpen(false);
    showToast("Profile updated successfully.");
  };

  const saveContact = () => {
    setContactOpen(false);
    showToast("Contact information updated successfully.");
  };

  const savePassword = () => {
    setPasswordOpen(false);
    showToast("Password changed successfully.");
  };

  const personalInfo = [
    { label: "Full Name", value: form.name },
    { label: "Student ID", value: student.id },
    { label: "Email", value: form.email },
    { label: "Phone Number", value: form.phone },
    { label: "Address", value: form.address },
    { label: "Date of Birth", value: form.dob },
    { label: "Gender", value: form.gender },
    { label: "Enrollment Date", value: student.enrolledDate },
    { label: "Student Status", value: "Active" },
  ];

  const academicInfo = [
    { label: "Current Program", value: student.program },
    { label: "Batch", value: student.batch },
    { label: "Section", value: form.section },
    {
      label: "Assigned Instructors",
      value: "Sarah M., Anna K., David R.",
    },
    { label: "Course Start Date", value: "15 Jul 2024" },
    { label: "Expected Completion", value: "30 Jun 2025" },
    { label: "Academic Status", value: student.academicStatus },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal and academic information."
        actions={
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-(--bg-lightblue) px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
          >
            <Pencil size={15} />
            Edit Profile
          </button>
        }
      />

      {/* ================= PROFILE HERO ================= */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 text-(--bg-primary-dashboard) sm:p-8"
        style={{ background: "var(--bg-dashboard-hero)" }}
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="relative">
            <Avatar name={form.name} size="lg" />
            <button
              type="button"
              title="Change profile photo"
              onClick={() => photoRef.current?.click()}
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full text-(--bg-primary-dashboard) transition hover:opacity-80 hover:cursor-pointer"
              style={{ background: "var(--bg-lightblue)" }}
            >
              <Camera size={14} />
            </button>
            <input
              ref={photoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={() => showToast("Profile photo updated.")}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold">{form.name}</h2>
            <p className="mt-1 text-sm opacity-80">
              {student.program} • {student.batch} - {form.section}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <StatusBadge status={student.academicStatus === "Active" ? "Active" : "Upcoming"} />
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium">
                <ShieldCheck size={12} />
                {student.id}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        {/* ================= INFO CARDS ================= */}
        <div className="lg:col-span-2">
          <Card>
            <div className="mb-5 flex gap-2">
              {(["personal", "academic"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setOpenTab(tab)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition hover:cursor-pointer ${
                    openTab === tab
                      ? "bg-(--bg-lightblue) text-(--text-primary-dashboard)"
                      : "bg-(--secondary-bg-dashboard) text-(--tertiary-text-dashboard)"
                  }`}
                >
                  {tab === "personal" ? "Personal Information" : "Academic Information"}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {openTab === "personal" ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {personalInfo.map((item) => (
                    <div key={item.label}>
                      <p className="text-xs font-medium text-(--tertiary-text-dashboard)">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-(--text-primary-dashboard)">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {academicInfo.map((item) => (
                      <div key={item.label}>
                        <p className="text-xs font-medium text-(--tertiary-text-dashboard)">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-(--text-primary-dashboard)">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-(--text-primary-dashboard)">
                      <CalendarDays size={15} />
                      Enrolled Courses
                    </p>
                    <div className="flex flex-col gap-3">
                      {courses.map((course) => (
                        <div key={course.id}>
                          <div className="mb-1 flex justify-between text-xs">
                            <span className="font-medium text-(--text-primary-dashboard)">
                              {course.title}
                            </span>
                            <span className="text-(--tertiary-text-dashboard)">
                              {course.progress}%
                            </span>
                          </div>
                          <ProgressBar percent={course.progress} thin />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="space-y-4">
          <Card>
            <CardHeader title="Profile Actions" />
            <div className="flex flex-col gap-2">
              <button onClick={() => setEditOpen(true)} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer">
                <Pencil size={16} /> Edit Profile
              </button>
              <button onClick={() => photoRef.current?.click()} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer">
                <Camera size={16} /> Change Profile Photo
              </button>
              <button onClick={() => setPasswordOpen(true)} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer">
                <KeyRound size={16} /> Change Password
              </button>
              <button onClick={() => setContactOpen(true)} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer">
                <Mail size={16} /> Update Contact Information
              </button>
              <button onClick={() => router.push("/student/settings")} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer">
                <Bell size={16} /> Manage Notification Preferences
              </button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Contact with Us" />
            <div className="flex flex-col gap-3 text-sm">
              <p className="flex items-center gap-2 text-(--text-primary-dashboard)/80">
                <Phone size={15} style={{ color: "var(--bg-lightblue)" }} />
                +977 1-5555555
              </p>
              <p className="flex items-center gap-2 text-(--text-primary-dashboard)/80">
                <Mail size={15} style={{ color: "var(--bg-lightblue)" }} />
                info@darbartech.com
              </p>
              <p className="flex items-center gap-2 text-(--text-primary-dashboard)/80">
                <MapPin size={15} style={{ color: "var(--bg-lightblue)" }} />
                Kathmandu, Nepal
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* ================= EDIT PROFILE MODAL ================= */}
      {editOpen && (
        <Modal title="Edit Profile" onClose={() => setEditOpen(false)}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full Name">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Phone Number">
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Address">
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Date of Birth">
              <input
                type="text"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Gender">
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className={inputClass}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Section">
              <select
                value={form.section}
                onChange={(e) => setForm({ ...form, section: e.target.value })}
                className={inputClass}
              >
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>
            </Field>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button type="button" onClick={() => setEditOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer">
              Cancel
            </button>
            <button type="button" onClick={saveEdit} className="rounded-lg bg-(--bg-lightblue) px-5 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer">
              Save Changes
            </button>
          </div>
        </Modal>
      )}

      {/* ================= CONTACT MODAL ================= */}
      {contactOpen && (
        <Modal title="Update Contact Information" onClose={() => setContactOpen(false)}>
          <div className="flex flex-col gap-4">
            <Field label="Email">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Phone Number">
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
              />
            </Field>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button type="button" onClick={() => setContactOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer">
              Cancel
            </button>
            <button type="button" onClick={saveContact} className="rounded-lg bg-(--bg-lightblue) px-5 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer">
              Save Changes
            </button>
          </div>
        </Modal>
      )}

      {/* ================= PASSWORD MODAL ================= */}
      {passwordOpen && (
        <Modal title="Change Password" onClose={() => setPasswordOpen(false)}>
          <div className="flex flex-col gap-4">
            <Field label="Current Password">
              <input type="password" placeholder="Enter current password" className={inputClass} />
            </Field>
            <Field label="New Password">
              <input type="password" placeholder="Enter new password" className={inputClass} />
            </Field>
            <Field label="Confirm New Password">
              <input type="password" placeholder="Confirm new password" className={inputClass} />
            </Field>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button type="button" onClick={() => setPasswordOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer">
              Cancel
            </button>
            <button type="button" onClick={savePassword} className="rounded-lg bg-(--bg-lightblue) px-5 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer">
              Change Password
            </button>
          </div>
        </Modal>
      )}

      {/* ================= TOAST ================= */}
      {toast && (
        <div className="fixed bottom-20 right-4 z-50 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg lg:bottom-6">
          {toast}
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-3 py-2.5 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue)";

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-semibold text-(--text-primary-dashboard)">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-(--tertiary-text-dashboard)">{label}</span>
      {children}
    </label>
  );
}