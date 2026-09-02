"use client";

import React, { useState } from "react";
import { Pencil, X } from "lucide-react";
import AdminNavbar from "../common/AdminNavbar";
import Topbar from "../TopBar";
import { useSidebarStore } from "@/store/sidebarStore";

const Page = () => {
  const { collapsed } = useSidebarStore();

  const [name, setName] = useState("Roban Shrestha");
  const [email, setEmail] = useState("roban@darbartech.com");
  const [phone, setPhone] = useState("+977 9800000000");

  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const [draftEmail, setDraftEmail] = useState(email);
  const [draftPhone, setDraftPhone] = useState(phone);

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => setToast(null), 2500);
  };

  const openEdit = () => {
    setDraftName(name);
    setDraftEmail(email);
    setDraftPhone(phone);
    setIsEditing(true);
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();

    setName(draftName);
    setEmail(draftEmail);
    setPhone(draftPhone);

    setIsEditing(false);
    showToast("Profile updated successfully.");
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
              Profile
            </h1>

            <p className="mt-2 text-sm text-(--text-primary-dashboard)/70">
              Manage your account information.
            </p>
          </div>

          <div className="max-w-2xl rounded-2xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--bg-lightblue) text-xl font-bold text-(--text-primary-dashboard)">
                  {name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <p className="text-lg font-semibold text-(--text-primary-dashboard)">
                    {name}
                  </p>

                  <p className="text-sm text-(--tertiary-text-dashboard)">
                    Superadmin
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={openEdit}
                className="flex items-center gap-2 rounded-lg bg-(--bg-lightblue) px-4 py-2 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
              >
                <Pencil size={15} />

                Edit Profile
              </button>
            </div>

            <dl className="space-y-4">
              <div className="flex gap-4">
                <dt className="w-28 shrink-0 text-sm text-(--text-primary-dashboard)/70">
                  Email
                </dt>

                <dd className="text-sm text-(--text-primary-dashboard)">
                  {email}
                </dd>
              </div>

              <div className="flex gap-4">
                <dt className="w-28 shrink-0 text-sm text-(--text-primary-dashboard)/70">
                  Phone
                </dt>

                <dd className="text-sm text-(--text-primary-dashboard)">
                  {phone}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      {/* ================= EDIT MODAL ================= */}

      {isEditing && (
        <div
          className="fixed inset-0 z-200 flex items-center justify-center bg-(--bg-dashboard-hero)/40 px-4 backdrop-blur-sm"
          onClick={() => setIsEditing(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-(--text-primary-dashboard)">
                  Edit Profile
                </h2>

                <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">
                  Update your account information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                aria-label="Close modal"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)"
                >
                  Name
                </label>

                <input
                  id="profile-name"
                  type="text"
                  value={draftName}
                  onChange={(event) => setDraftName(event.target.value)}
                  required
                  className="w-full rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-4 py-2.5 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue) focus:ring-2 focus:ring-(--bg-lightblue)/20"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-email"
                  className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)"
                >
                  Email
                </label>

                <input
                  id="profile-email"
                  type="email"
                  value={draftEmail}
                  onChange={(event) => setDraftEmail(event.target.value)}
                  required
                  className="w-full rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-4 py-2.5 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue) focus:ring-2 focus:ring-(--bg-lightblue)/20"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-phone"
                  className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)"
                >
                  Phone Number
                </label>

                <input
                  id="profile-phone"
                  type="tel"
                  value={draftPhone}
                  onChange={(event) => setDraftPhone(event.target.value)}
                  required
                  className="w-full rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-4 py-2.5 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue) focus:ring-2 focus:ring-(--bg-lightblue)/20"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-lg border border-(--border-primary-dashboard) px-4 py-2.5 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-(--bg-lightblue) px-5 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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