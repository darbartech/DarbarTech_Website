
"use client";

import React, { useState } from "react";

import { useSidebarStore } from "@/store/sidebarStore";

import AdminNavbar from "../../common/AdminNavbar";

import Topbar from "../../TopBar";

import {
  Pencil,
  Trash2,
  X,
  Plus,
} from "lucide-react";

const initialHeroData = [
  {
    id: 1,
    name: "heading",
    content: "Create, impact and apply synthetic",
  },
  {
    id: 2,
    name: "Primary paragraph",
    content:
      "Start with a stunning homepage. Stay motivated without hurting your pocket",
  },
  {
    id: 3,
    name: "Primary button",
    content: "Start for free",
  },
  {
    id: 4,
    name: "Secondary paragraph",
    content: "Want to talk or get a live demo?",
  },
  {
    id: 5,
    name: "Secondary button",
    content: "Get in touch",
  },
  {
    id: 6,
    name: "Icon (top-left)",
    content: "Icon name",
  },
  {
    id: 7,
    name: "Icon (top-right)",
    content: "Icon name 2",
  },
  {
    id: 8,
    name: "Icon (middle-left)",
    content: "Icon name 3",
  },
  {
    id: 9,
    name: "Icon (middle-right)",
    content: "Icon name 4",
  },
  {
    id: 10,
    name: "Icon (bottom-left)",
    content: "Icon name 5",
  },
  {
    id: 11,
    name: "Icon (bottom-right)",
    content: "Icon name 6",
  },
];

type HeroItem = (typeof initialHeroData)[number];

const Page = () => {
  const { collapsed } = useSidebarStore();

  // ================= TABLE DATA =================

  const [heroData, setHeroData] =
    useState<HeroItem[]>(initialHeroData);

  // ================= MODAL STATE =================

  const [selectedItem, setSelectedItem] =
    useState<HeroItem | null>(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [isAddMode, setIsAddMode] =
    useState(false);

  // ================= FORM STATE =================

  const [editName, setEditName] =
    useState("");

  const [editContent, setEditContent] =
    useState("");

  // ================= EDIT =================

  const handleEdit = (item: HeroItem) => {
    setSelectedItem(item);

    setEditName(item.name);

    setEditContent(item.content);

    setIsAddMode(false);

    setIsModalOpen(true);
  };

  // ================= ADD =================

  const handleAdd = () => {
    setSelectedItem(null);

    setEditName("");

    setEditContent("");

    setIsAddMode(true);

    setIsModalOpen(true);
  };

  // ================= DELETE =================

  const handleDelete = (id: number) => {
    setHeroData((previousData) =>
      previousData.filter(
        (item) => item.id !== id,
      ),
    );
  };

  // ================= CLOSE MODAL =================

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setSelectedItem(null);

    setIsAddMode(false);

    setEditName("");

    setEditContent("");
  };

  // ================= SAVE =================

  const handleSave = (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    // ================= ADD NEW ITEM =================

    if (isAddMode) {
      const newId =
        heroData.length > 0
          ? Math.max(
              ...heroData.map(
                (item) => item.id,
              ),
            ) + 1
          : 1;

      const newItem: HeroItem = {
        id: newId,
        name: editName,
        content: editContent,
      };

      setHeroData((previousData) => [
        ...previousData,
        newItem,
      ]);

      handleCloseModal();

      return;
    }

    // ================= UPDATE EXISTING ITEM =================

    if (!selectedItem) return;

    setHeroData((previousData) =>
      previousData.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              name: editName,
              content: editContent,
            }
          : item,
      ),
    );

    handleCloseModal();
  };

  return (
    <div className="flex min-h-screen bg-(--bg-primary-dashboard)">
      {/* ================= SIDEBAR ================= */}

      <AdminNavbar />

      {/* ================= MAIN CONTENT ================= */}

      <main
        className={`min-h-screen min-w-0 flex-1 ${
          !collapsed
            ? "lg:ml-64"
            : "lg:ml-20"
        }`}
      >
        {/* ================= TOPBAR ================= */}

        <Topbar />

        {/* ================= TABLE SECTION ================= */}

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          {/* ================= HEADER ================= */}

          <div className="mb-6 flex items-center justify-between gap-4">
            {/* Header Content */}

            <div>
              <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
                Hero Management
              </h1>

              <p className="mt-2 text-sm text-(--text-primary-dashboard)/70">
                Manage the content displayed in the
                hero section.
              </p>
            </div>

            {/* ================= ADD BUTTON ================= */}

            <button
              type="button"
              onClick={handleAdd}
              className="
                flex
                shrink-0
                items-center
                gap-1.5
                rounded-lg
                bg-(--bg-lightblue)
                px-4
                py-2.5
                text-sm
                font-semibold
                text-(--text-primary-dashboard)
                transition
                hover:opacity-90
                hover:cursor-pointer
              "
            >
              <Plus size={17} />

              Add
            </button>
          </div>

          {/* ================= TABLE ================= */}

          <div
            className="
              w-full
              overflow-x-auto
              rounded-xl
              border
              border-(--border-primary-dashboard)
            "
          >
            <table className="w-full min-w-175 border-collapse">
              {/* ================= TABLE HEAD ================= */}

              <thead>
                <tr>
                  <th
                    className="
                      bg-(--bg-lightblue)
                      px-5
                      py-4
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
                      px-5
                      py-4
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
                      px-5
                      py-4
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
                      px-5
                      py-4
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

              {/* ================= TABLE BODY ================= */}

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

                    <td
                      className="
                        px-5
                        py-4
                        text-sm
                        text-(--text-primary-dashboard)
                      "
                    >
                      {item.id}
                    </td>

                    {/* NAME */}

                    <td
                      className="
                        px-5
                        py-4
                        text-sm
                        font-medium
                        text-(--text-primary-dashboard)
                      "
                    >
                      {item.name}
                    </td>

                    {/* CONTENT */}

                    <td
                      className="
                        px-5
                        py-4
                        text-sm
                        text-(--text-primary-dashboard)
                      "
                    >
                      {item.content}
                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(item)
                          }
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
                            hover:cursor-pointer
                          "
                        >
                          <Pencil size={15} />

                          Edit
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(item.id)
                          }
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
                            hover:cursor-pointer
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

      {/* ================================================= */}
      {/* ADD / EDIT MODAL */}
      {/* ================================================= */}

      {isModalOpen && (
        <div
          className="
            fixed
            inset-0
            z-200
            flex
            items-center
            justify-center
            bg-black/40
            px-4
            backdrop-blur-sm
          "
          onClick={handleCloseModal}
        >
          {/* ================= MODAL ================= */}

          <div
            className="
              w-full
              max-w-lg
              rounded-2xl
              border
              border-(--border-primary-dashboard)
              bg-(--bg-primary-dashboard)
              p-6
              shadow-xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* ================= MODAL HEADER ================= */}

            <div
              className="
                mb-6
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <div>
                <h2
                  className="
                    text-xl
                    font-semibold
                    text-(--text-primary-dashboard)
                  "
                >
                  {isAddMode
                    ? "Add Hero Content"
                    : "Edit Hero Content"}
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-(--text-primary-dashboard)/70
                  "
                >
                  {isAddMode
                    ? "Add new content to the hero section."
                    : "Update the selected hero content."}
                </p>
              </div>

              {/* CLOSE */}

              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close modal"
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-(--text-primary-dashboard)
                  transition
                  hover:bg-(--secondary-bg-dashboard)
                  hover:cursor-pointer
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* ================= FORM ================= */}

            <form
              onSubmit={handleSave}
              className="space-y-5"
            >
              {/* ID */}

              <div>
                <label
                  htmlFor="hero-id"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)
                  "
                >
                  ID
                </label>

                <input
                  id="hero-id"
                  type="text"
                  value={
                    isAddMode
                      ? heroData.length > 0
                        ? Math.max(
                            ...heroData.map(
                              (item) => item.id,
                            ),
                          ) + 1
                        : 1
                      : selectedItem?.id ?? ""
                  }
                  readOnly
                  className="
                    w-full
                    cursor-not-allowed
                    rounded-lg
                    border
                    border-(--border-primary-dashboard)
                    bg-(--secondary-bg-dashboard)
                    px-4
                    py-2.5
                    text-sm
                    text-(--text-primary-dashboard)
                    outline-none
                  "
                />
              </div>

              {/* NAME */}

              <div>
                <label
                  htmlFor="hero-name"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)
                  "
                >
                  Name
                </label>

                <input
                  id="hero-name"
                  type="text"
                  value={editName}
                  onChange={(event) =>
                    setEditName(event.target.value)
                  }
                  required
                  placeholder="Enter hero name"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-(--border-primary-dashboard)
                    bg-(--bg-primary-dashboard)
                    px-4
                    py-2.5
                    text-sm
                    text-(--text-primary-dashboard)
                    outline-none
                    transition
                    focus:border-(--bg-lightblue)
                    focus:ring-2
                    focus:ring-(--bg-lightblue)/20
                  "
                />
              </div>

              {/* CONTENT */}

              <div>
                <label
                  htmlFor="hero-content"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)
                  "
                >
                  Content
                </label>

                <textarea
                  id="hero-content"
                  value={editContent}
                  onChange={(event) =>
                    setEditContent(event.target.value)
                  }
                  required
                  rows={5}
                  placeholder="Enter hero content"
                  className="
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-(--border-primary-dashboard)
                    bg-(--bg-primary-dashboard)
                    px-4
                    py-2.5
                    text-sm
                    text-(--text-primary-dashboard)
                    outline-none
                    transition
                    focus:border-(--bg-lightblue)
                    focus:ring-2
                    focus:ring-(--bg-lightblue)/20
                  "
                />
              </div>

              {/* ================= MODAL ACTIONS ================= */}

              <div
                className="
                  flex
                  justify-end
                  gap-3
                  pt-2
                "
              >
                {/* CANCEL */}

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="
                    rounded-lg
                    border
                    border-(--border-primary-dashboard)
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)
                    transition
                    hover:bg-(--secondary-bg-dashboard)
                    hover:cursor-pointer
                  "
                >
                  Cancel
                </button>

                {/* SAVE */}

                <button
                  type="submit"
                  className="
                    rounded-lg
                    bg-(--bg-lightblue)
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-(--text-primary-dashboard)
                    transition
                    hover:opacity-90
                    hover:cursor-pointer
                  "
                >
                  {isAddMode
                    ? "Add Content"
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
