"use client";

import React from "react";

import { useSidebarStore } from "@/store/sidebarStore";

import AdminNavbar from "../../common/AdminNavbar";
import Topbar from "../../TopBar";

import { Pencil, Trash2 } from "lucide-react";

const heroData = [
  {
    id: 1,
    name: "heading",
    content: "Create, impact and apply synthetic",
  },
  {
    id: 2,
    name: "subheading",
    content: "Build meaningful digital experiences for everyone.",
  },
  {
    id: 3,
    name: "button",
    content: "Explore our services",
  },
];

const Page = () => {
  const { collapsed } = useSidebarStore();

  return (
    <div className="flex min-h-screen bg-(--bg-primary-dashboard)">
      {/* Sidebar */}
      <AdminNavbar />

      {/* Main Content */}
      <main
        className={`min-h-screen min-w-0 flex-1 ${
          !collapsed ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        {/* Navigation */}
        <Topbar />

        {/* Table Section */}
        <section className="px-4 py-6 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
              Hero Management
            </h1>

            <p className="mt-2 text-sm text-(--text-primary-dashboard)/70">
              Manage the content displayed in the hero section.
            </p>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto rounded-xl border border-(--border-primary-dashboard)">
            <table className="w-full min-w-175 border-collapse">
              {/* Table Head */}
              <thead>
                <tr>
                  <th
                    className="
                      bg-(--bg-lightblue)
                      px-5 py-4
                      text-left
                      text-sm
                      font-semibold
                      text-(--text-primary-dashboard)
                    "
                  >
                    ID
                  </th>

                  <th
                    className="
                      bg-(--bg-lightblue)
                      px-5 py-4
                      text-left
                      text-sm
                      font-semibold
                      text-(--text-primary-dashboard)
                    "
                  >
                    Name
                  </th>

                  <th
                    className="
                      bg-(--bg-lightblue)
                      px-5 py-4
                      text-left
                      text-sm
                      font-semibold
                      text-(--text-primary-dashboard)
                    "
                  >
                    Content
                  </th>

                  <th
                    className="
                      bg-(--bg-lightblue)
                      px-5 py-4
                      text-left
                      text-sm
                      font-semibold
                      text-(--text-primary-dashboard)
                    "
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {heroData.map((item) => (
                  <tr
                    key={item.id}
                    className="
                      border-t
                      border-(--border-primary-dashboard)
                      transition
                      hover:bg-(--secondary-bg-dashboard)
                    "
                  >
                    {/* ID */}
                    <td className="px-5 py-4 text-sm text-(--text-primary-dashboard)">
                      {item.id}
                    </td>

                    {/* Name */}
                    <td className="px-5 py-4 text-sm font-medium text-(--text-primary-dashboard)">
                      {item.name}
                    </td>

                    {/* Content */}
                    <td className="px-5 py-4 text-sm text-(--text-primary-dashboard)">
                      {item.content}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {/* Edit Button */}
                        <button
                          type="button"
                          className="
                            flex
                            items-center
                            gap-1.5
                            rounded-lg
                            bg-(--surface)
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-(--text-primary-dashboard)
                            transition
                            hover:opacity-80
                          "
                        >
                          <Pencil size={15} />
                          Edit
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          className="
                            flex
                            items-center
                            gap-1.5
                            rounded-lg
                            bg-(--secondary-dark-bg-color)
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-(--bg-primary-dashboard)
                            transition
                            hover:opacity-80
                          "
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;