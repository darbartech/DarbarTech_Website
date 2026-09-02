
"use client";

import React, {
  useReducer,
  useState,
} from "react";

import { useSidebarStore } from "@/store/sidebarStore";

import AdminNavbar from "../../common/AdminNavbar";

import Topbar from "../../TopBar";

import {
  Pencil,
  Trash2,
  X,
  Plus,
  ChevronDown,
  MoreHorizontal,
  Eye,
} from "lucide-react";

const initialHeroData = [
  {
    id: 1,
    name: "heading",
    content: "Create, impact and apply synthetic",
    link: "",
    status: "active",
  },
  {
    id: 2,
    name: "Primary paragraph",
    content:
      "Start with a stunning homepage. Stay motivated without hurting your pocket",
    link: "",
    status: "active",
  },
  {
    id: 3,
    name: "Primary button",
    content: "Start for free",
    link: "#cta",
    status: "active",
  },
  {
    id: 4,
    name: "Secondary paragraph",
    content: "Want to talk or get a live demo?",
    link: "",
    status: "active",
  },
  {
    id: 5,
    name: "Secondary button",
    content: "Get in touch",
    link: "/contact",
    status: "active",
  },
  {
    id: 6,
    name: "Icon (top-left)",
    content: "Icon name",
    link: "",
    status: "active",
  },
  {
    id: 7,
    name: "Icon (top-right)",
    content: "Icon name 2",
    link: "",
    status: "active",
  },
  {
    id: 8,
    name: "Icon (middle-left)",
    content: "Icon name 3",
    link: "",
    status: "active",
  },
  {
    id: 9,
    name: "Icon (middle-right)",
    content: "Icon name 4",
    link: "",
    status: "active",
  },
  {
    id: 10,
    name: "Icon (bottom-left)",
    content: "Icon name 5",
    link: "",
    status: "active",
  },
  {
    id: 11,
    name: "Icon (bottom-right)",
    content: "Icon name 6",
    link: "",
    status: "active",
  },
  {
    id: 12,
    name: "Line Image",
    content: "url",
    link: "",
    status: "active",
  },
];

type HeroItem = (typeof initialHeroData)[number] & {
  image?: string;
  imageName?: string;
};

type Status = "active" | "inactive";

// ================= FORM STATE / REDUCER =================

type FormState = {
  selectedItem: HeroItem | null;
  isModalOpen: boolean;
  isAddMode: boolean;
  editName: string;
  editContent: string;
  editLink: string;
  editImage: string;
  editImageName: string;
};

type FormAction =
  | { type: "OPEN_EDIT"; item: HeroItem }
  | { type: "OPEN_ADD" }
  | { type: "CLOSE" }
  | { type: "UPDATE_NAME"; value: string }
  | { type: "UPDATE_CONTENT"; value: string }
  | { type: "UPDATE_LINK"; value: string }
  | { type: "UPDATE_IMAGE"; value: string }
  | { type: "UPDATE_IMAGE_NAME"; value: string };

const initialFormState: FormState = {
  selectedItem: null,
  isModalOpen: false,
  isAddMode: false,
  editName: "",
  editContent: "",
  editLink: "",
  editImage: "",
  editImageName: "",
};

const formReducer = (
  state: FormState,
  action: FormAction,
): FormState => {
  switch (action.type) {
    case "OPEN_EDIT":
      return {
        ...state,
        selectedItem: action.item,
        isModalOpen: true,
        isAddMode: false,
        editName: action.item.name,
        editContent: action.item.content,
        editLink: action.item.link,
        editImage: action.item.image ?? "",
        editImageName: action.item.imageName ?? "",
      };

    case "OPEN_ADD":
      return {
        ...state,
        selectedItem: null,
        isModalOpen: true,
        isAddMode: true,
        editName: "",
        editContent: "",
        editLink: "",
        editImage: "",
        editImageName: "",
      };

    case "CLOSE":
      return initialFormState;

    case "UPDATE_NAME":
      return { ...state, editName: action.value };

    case "UPDATE_CONTENT":
      return { ...state, editContent: action.value };

    case "UPDATE_LINK":
      return { ...state, editLink: action.value };

    case "UPDATE_IMAGE":
      return { ...state, editImage: action.value };

    case "UPDATE_IMAGE_NAME":
      return { ...state, editImageName: action.value };

    default:
      return state;
  }
};

const Page = () => {
  const { collapsed } = useSidebarStore();

  // ================= TABLE DATA =================

  const [heroData, setHeroData] =
    useState<HeroItem[]>(initialHeroData);

  // ================= FORM / MODAL REDUCER =================

  const [formState, dispatch] = useReducer(
    formReducer,
    initialFormState,
  );

  const {
    selectedItem,
    isModalOpen,
    isAddMode,
    editName,
    editContent,
    editLink,
    editImage,
    editImageName,
  } = formState;

  // ================= STATUS DROPDOWN STATE =================

  const [openDropdownId, setOpenDropdownId] =
    useState<number | null>(null);

  const handleStatusChange = (
    id: number,
    status: Status,
  ) => {
    setHeroData((previousData) =>
      previousData.map((item) =>
        item.id === id
          ? { ...item, status }
          : item,
      ),
    );

    setOpenDropdownId(null);
  };

  // ================= ACTIONS DROPDOWN STATE =================

  const [openActionsId, setOpenActionsId] =
    useState<number | null>(null);

  // ================= VIEW MODAL =================

  const [viewItem, setViewItem] =
    useState<HeroItem | null>(null);

  const handleView = (item: HeroItem) => {
    setOpenActionsId(null);

    setViewItem(item);
  };

  const handleCloseViewModal = () => {
    setViewItem(null);
  };

  // ================= EDIT =================

  const handleEdit = (item: HeroItem) => {
    dispatch({
      type: "OPEN_EDIT",
      item,
    });
  };

  // ================= ADD =================

  const handleAdd = () => {
    dispatch({ type: "OPEN_ADD" });
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
    dispatch({ type: "CLOSE" });
  };

  // ================= IMAGE SELECT =================

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const objectUrl = URL.createObjectURL(file);

    dispatch({
      type: "UPDATE_IMAGE",
      value: objectUrl,
    });

    dispatch({
      type: "UPDATE_IMAGE_NAME",
      value: file.name,
    });
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
        link: editLink,
        status: "active",
        image: editImage,
        imageName: editImageName,
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
              link: editLink,
              image: editImage,
              imageName: editImageName,
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
                      bg-(--bg-table)
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
                      bg-(--bg-table)
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
                      bg-(--bg-table)
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
                      bg-(--bg-table)
                      px-5
                      py-4
                      text-left
                      text-sm
                      font-semibold
                      text-(--text-primary-dashboard)
                    "
                  >
                    Link
                  </th>

                  <th
                    className="
                      bg-(--bg-table)
                      px-5
                      py-4
                      text-left
                      text-sm
                      font-semibold
                      text-(--text-primary-dashboard)
                    "
                  >
                    Status
                  </th>

                  <th
                    className="
                      bg-(--bg-table)
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
                      hover:cursor-pointer
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

                    {/* LINK */}

                    <td
                      className="
                        px-5
                        py-4
                        text-sm
                        text-(--bg-lightblue)
                      "
                    >
                      {item.link || "-"}
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">
                      <div className="relative inline-block">
                        {/* TRIGGER */}

                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdownId(
                              openDropdownId ===
                                item.id
                                ? null
                                : item.id,
                            )
                          }
                          className={`
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            capitalize
                            transition
                            hover:cursor-pointer
                            ${
                              item.status ===
                              "active"
                                ? "border-(--success-dashboard)/30 bg-(--success-dashboard)/10 text-(--success-dashboard)"
                                : "border-(--danger-dashboard)/30 bg-(--danger-dashboard)/10 text-(--danger-dashboard)"
                            }
                          `}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              item.status ===
                              "active"
                                ? "bg-(--success-dashboard)"
                                : "bg-(--danger-dashboard)"
                            }`}
                          />

                          {item.status}

                          <ChevronDown
                            size={14}
                            className={`transition-transform ${
                              openDropdownId ===
                              item.id
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>

                        {/* DROPDOWN MENU */}

                        {openDropdownId ===
                          item.id && (
                          <div className="absolute right-0 top-full z-10 mt-1 w-32 overflow-hidden rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) shadow-lg">
                            {(["active", "inactive"] as Status[]).map(
                              (statusOption) => (
                                <button
                                  key={statusOption}
                                  type="button"
                                  onClick={() =>
                                    handleStatusChange(
                                      item.id,
                                      statusOption,
                                    )
                                  }
                                  className={`
                                    flex
                                    w-full
                                    items-center
                                    gap-2
                                    px-3
                                    py-2
                                    text-left
                                    text-sm
                                    capitalize
                                    transition
                                    hover:bg-(--secondary-bg-dashboard)
                                    hover:cursor-pointer
                                    ${
                                      item.status ===
                                      statusOption
                                        ? "font-medium text-(--background)"
                                        : "text-(--text-primary-dashboard)"
                                    }
                                  `}
                                >
                                  <span
                                    className={`h-2 w-2 rounded-full ${
                                      statusOption ===
                                      "active"
                                        ? "bg-(--success-dashboard)"
                                        : "bg-(--danger-dashboard)"
                                    }`}
                                  />

                                  {statusOption}
                                </button>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4">
                      <div className="relative inline-block text-left">
                        {/* TRIGGER */}

                        <button
                          type="button"
                          onClick={() =>
                            setOpenActionsId(
                              openActionsId ===
                                item.id
                                ? null
                                : item.id,
                            )
                          }
                          aria-label="Actions"
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-(--text-primary-dashboard)
                            transition
                            hover:bg-(--secondary-bg-dashboard)
                            hover:cursor-pointer
                          "
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {/* DROPDOWN MENU */}

                        {openActionsId ===
                          item.id && (
                          <div className="absolute right-0 top-full z-10 mt-1 w-36 overflow-hidden rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) shadow-lg">
                            {/* VIEW */}

                            <button
                              type="button"
                              onClick={() =>
                                handleView(item)
                              }
                              className="
                                flex
                                w-full
                                items-center
                                gap-2
                                px-3
                                py-2
                                text-left
                                text-sm
                                text-(--text-primary-dashboard)
                                transition
                                hover:bg-(--secondary-bg-dashboard)
                                hover:cursor-pointer
                              "
                            >
                              <Eye size={15} />

                              View
                            </button>

                            {/* EDIT */}

                            <button
                              type="button"
                              onClick={() => {
                                setOpenActionsId(
                                  null,
                                );

                                handleEdit(item);
                              }}
                              className="
                                flex
                                w-full
                                items-center
                                gap-2
                                px-3
                                py-2
                                text-left
                                text-sm
                                text-(--text-primary-dashboard)
                                transition
                                hover:bg-(--secondary-bg-dashboard)
                                hover:cursor-pointer
                              "
                            >
                              <Pencil size={15} />

                              Edit
                            </button>

                            {/* DELETE */}

                            <button
                              type="button"
                              onClick={() => {
                                setOpenActionsId(
                                  null,
                                );

                                handleDelete(item.id);
                              }}
                              className="
                                flex
                                w-full
                                items-center
                                gap-2
                                px-3
                                py-2
                                text-left
                                text-sm
                                text-(--danger-dashboard)
                                transition
                                hover:bg-(--danger-dashboard)/10
                                hover:cursor-pointer
                              "
                            >
                              <Trash2 size={15} />

                              Delete
                            </button>
                          </div>
                        )}
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
            bg-(--bg-dashboard-hero)/40
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
              className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              {/* ID */}

              <div className="sm:col-span-2">
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

              <div className="sm:col-span-2">
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
                    dispatch({
                      type: "UPDATE_NAME",
                      value: event.target.value,
                    })
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

              <div className="sm:col-span-2">
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
                    dispatch({
                      type: "UPDATE_CONTENT",
                      value: event.target.value,
                    })
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

              {/* LINK */}

              <div>
                <label
                  htmlFor="hero-link"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)
                  "
                >
                  Link
                </label>

                <input
                  id="hero-link"
                  type="text"
                  value={editLink}
                  onChange={(event) =>
                    dispatch({
                      type: "UPDATE_LINK",
                      value: event.target.value,
                    })
                  }
                  placeholder="Enter hero link"
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

              {/* IMAGE UPLOAD */}

              <div>
                <label
                  htmlFor="hero-image"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)
                  "
                >
                  Image
                </label>

                {editImage && (
                  <div className="mb-3 overflow-hidden rounded-lg border border-(--border-primary-dashboard)">
                    <img
                      src={editImage}
                      alt="Preview"
                      className="h-32 w-full object-cover"
                    />
                  </div>
                )}

                <input
                  id="hero-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="
                    w-full
                    cursor-pointer
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
                    file:mr-3
                    file:rounded-md
                    file:border-0
                    file:bg-(--bg-lightblue)
                    file:px-3
                    file:py-1.5
                    file:text-sm
                    file:font-medium
                    file:text-(--text-primary-dashboard)
                    file:hover:cursor-pointer
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
                  sm:col-span-2
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

      {/* ================================================= */}
      {/* VIEW DETAILS MODAL */}
      {/* ================================================= */}

      {viewItem && (
        <div
          className="
            fixed
            inset-0
            z-200
            flex
            items-center
            justify-center
            bg-(--bg-dashboard-hero)/40
            px-4
            backdrop-blur-sm
          "
          onClick={handleCloseViewModal}
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
                  Hero Content Details
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-(--text-primary-dashboard)/70
                  "
                >
                  Details of the selected hero content.
                </p>
              </div>

              {/* CLOSE */}

              <button
                type="button"
                onClick={handleCloseViewModal}
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

            {/* ================= DETAILS ================= */}

            <dl className="space-y-4">
              <div className="flex items-start gap-4">
                <dt
                  className="
                    w-24
                    shrink-0
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)/70
                  "
                >
                  ID
                </dt>

                <dd className="text-sm text-(--text-primary-dashboard)">
                  {viewItem.id}
                </dd>
              </div>

              <div className="flex items-start gap-4">
                <dt
                  className="
                    w-24
                    shrink-0
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)/70
                  "
                >
                  Name
                </dt>

                <dd className="text-sm text-(--text-primary-dashboard)">
                  {viewItem.name}
                </dd>
              </div>

              <div className="flex items-start gap-4">
                <dt
                  className="
                    w-24
                    shrink-0
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)/70
                  "
                >
                  Content
                </dt>

                <dd className="text-sm text-(--text-primary-dashboard)">
                  {viewItem.content}
                </dd>
              </div>

              <div className="flex items-start gap-4">
                <dt
                  className="
                    w-24
                    shrink-0
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)/70
                  "
                >
                  Link
                </dt>

                <dd className="text-sm text-(--bg-lightblue)">
                  {viewItem.link || "-"}
                </dd>
              </div>

              <div className="flex items-start gap-4">
                <dt
                  className="
                    w-24
                    shrink-0
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)/70
                  "
                >
                  Status
                </dt>

                <dd
                  className={`
                    text-sm
                    capitalize
                    ${
                      viewItem.status ===
                      "active"
                        ? "text-(--success-dashboard)"
                        : "text-(--danger-dashboard)"
                    }
                  `}
                >
                  {viewItem.status}
                </dd>
              </div>
            </dl>

            {/* ================= MODAL FOOTER ================= */}

            <div
              className="
                flex
                justify-end
                pt-6
              "
            >
              <button
                type="button"
                onClick={handleCloseViewModal}
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
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
