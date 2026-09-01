"use client";

import React, { useState } from "react";

import { useSidebarStore } from "@/store/sidebarStore";

import AdminNavbar from "../common/AdminNavbar";

import Topbar from "../TopBar";

import {
  Pencil,
  Trash2,
  X,
  Plus,
  ChevronDown,
  MoreHorizontal,
  Eye,
} from "lucide-react";

const initialUsersData = [
  {
    id: 1,
    name: "Ram Shrestha",
    email: "ram.shrestha@example.com",
    phone: "+977 9800000001",
    role: "teacher",
    enrolledCourses: 2,
  },
  {
    id: 2,
    name: "Sita Sharma",
    email: "sita.sharma@example.com",
    phone: "+977 9800000002",
    role: "superadmin",
    enrolledCourses: 0,
  },
  {
    id: 3,
    name: "Hari Karki",
    email: "hari.karki@example.com",
    phone: "+977 9800000003",
    role: "student",
    enrolledCourses: 4,
  },
  {
    id: 4,
    name: "Gita Gurung",
    email: "gita.gurung@example.com",
    phone: "+977 9800000004",
    role: "teacher",
    enrolledCourses: 3,
  },
];

type UserItem = (typeof initialUsersData)[number];

type Role = "superadmin" | "teacher" | "student";

const roleOptions: Role[] = [
  "superadmin",
  "teacher",
  "student",
];

const Page = () => {
  const { collapsed } = useSidebarStore();

  // ================= TABLE DATA =================

  const [usersData, setUsersData] =
    useState<UserItem[]>(initialUsersData);

  // ================= MODAL STATE =================

  const [selectedUser, setSelectedUser] =
    useState<UserItem | null>(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [isAddMode, setIsAddMode] =
    useState(false);

  // ================= FORM STATE =================

  const [editName, setEditName] =
    useState("");

  const [editEmail, setEditEmail] =
    useState("");

  const [editPhone, setEditPhone] =
    useState("");

  const [editRole, setEditRole] =
    useState<Role>("student");

  // ================= ROLE DROPDOWN STATE =================

  const [openDropdownId, setOpenDropdownId] =
    useState<number | null>(null);

  const handleRoleChange = (
    id: number,
    role: Role,
  ) => {
    setUsersData((previousData) =>
      previousData.map((user) =>
        user.id === id
          ? { ...user, role }
          : user,
      ),
    );

    setOpenDropdownId(null);
  };

  // ================= ACTIONS DROPDOWN STATE =================

  const [openActionsId, setOpenActionsId] =
    useState<number | null>(null);

  // ================= VIEW MODAL =================

  const [viewUser, setViewUser] =
    useState<UserItem | null>(null);

  const handleView = (user: UserItem) => {
    setOpenActionsId(null);

    setViewUser(user);
  };

  const handleCloseViewModal = () => {
    setViewUser(null);
  };

  // ================= FORM ROLE DROPDOWN STATE =================

  const [isRoleOptionsOpen, setIsRoleOptionsOpen] =
    useState(false);

  // ================= EDIT =================

  const handleEdit = (user: UserItem) => {
    setSelectedUser(user);

    setEditName(user.name);
    setEditEmail(user.email);
    setEditPhone(user.phone);
    setEditRole(user.role as Role);

    setIsAddMode(false);
    setIsModalOpen(true);
  };

  // ================= ADD =================

  const handleAdd = () => {
    setSelectedUser(null);

    setEditName("");
    setEditEmail("");
    setEditPhone("");
    setEditRole("student");

    setIsAddMode(true);
    setIsModalOpen(true);
  };

  // ================= DELETE =================

  const handleDelete = (id: number) => {
    setUsersData((previousData) =>
      previousData.filter(
        (user) => user.id !== id,
      ),
    );
  };

  // ================= CLOSE MODAL =================

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setSelectedUser(null);
    setIsAddMode(false);

    setEditName("");
    setEditEmail("");
    setEditPhone("");
    setEditRole("student");
  };

  // ================= SAVE =================

  const handleSave = (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    // ================= ADD NEW USER =================

    if (isAddMode) {
      const newId =
        usersData.length > 0
          ? Math.max(
              ...usersData.map(
                (user) => user.id,
              ),
            ) + 1
          : 1;

      const newUser: UserItem = {
        id: newId,
        name: editName,
        email: editEmail,
        phone: editPhone,
        role: editRole,
        enrolledCourses: 0,
      };

      setUsersData((previousData) => [
        ...previousData,
        newUser,
      ]);

      handleCloseModal();

      return;
    }

    // ================= UPDATE EXISTING USER =================

    if (!selectedUser) return;

    setUsersData((previousData) =>
      previousData.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              name: editName,
              email: editEmail,
              phone: editPhone,
              role: editRole,
            }
          : user,
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

        {/* ================= CONTENT SECTION ================= */}

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          {/* ================= HEADER ================= */}

          <div className="mb-6 flex items-center justify-between gap-4">
            {/* Header Content */}

            <div>
              <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
                Users
              </h1>

              <p className="mt-2 text-sm text-(--text-primary-dashboard)/70">
                Manage the users of the application.
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

              Add User
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
                    Email
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
                    Phone Number
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
                    Role
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
                    Enrolled Courses
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
                {usersData.map((user) => (
                  <tr
                    key={user.id}
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
                      {user.id}
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
                      {user.name}
                    </td>

                    {/* EMAIL */}

                    <td
                      className="
                        px-5
                        py-4
                        text-sm
                        text-(--text-primary-dashboard)
                      "
                    >
                      {user.email}
                    </td>

                    {/* PHONE NUMBER */}

                    <td
                      className="
                        px-5
                        py-4
                        text-sm
                        text-(--text-primary-dashboard)
                      "
                    >
                      {user.phone}
                    </td>

                    {/* ROLE */}

                    <td className="px-5 py-4">
                      <div className="relative inline-block">
                        {/* TRIGGER */}

                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdownId(
                              openDropdownId ===
                                user.id
                                ? null
                                : user.id,
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
                              user.role ===
                              "superadmin"
                                ? "border-purple-500/30 bg-purple-500/10 text-purple-600"
                                : user.role ===
                                    "teacher"
                                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                                  : "border-blue-500/30 bg-blue-500/10 text-blue-600"
                            }
                          `}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              user.role ===
                              "superadmin"
                                ? "bg-purple-500"
                                : user.role ===
                                    "teacher"
                                  ? "bg-emerald-500"
                                  : "bg-blue-500"
                            }`}
                          />

                          {user.role}

                          <ChevronDown
                            size={14}
                            className={`transition-transform ${
                              openDropdownId ===
                              user.id
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>

                        {/* DROPDOWN MENU */}

                        {openDropdownId ===
                          user.id && (
                          <div className="absolute right-0 top-full z-10 mt-1 w-32 overflow-hidden rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) shadow-lg">
                            {roleOptions.map(
                              (roleOption) => (
                                <button
                                  key={roleOption}
                                  type="button"
                                  onClick={() =>
                                    handleRoleChange(
                                      user.id,
                                      roleOption,
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
                                      user.role ===
                                      roleOption
                                        ? "font-medium text-(--background)"
                                        : "text-(--text-primary-dashboard)"
                                    }
                                  `}
                                >
                                  <span
                                    className={`h-2 w-2 rounded-full ${
                                      roleOption ===
                                      "superadmin"
                                        ? "bg-purple-500"
                                        : roleOption ===
                                            "teacher"
                                          ? "bg-emerald-500"
                                          : "bg-blue-500"
                                    }`}
                                  />

                                  {roleOption}
                                </button>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* ENROLLED COURSES */}

                    <td
                      className="
                        px-5
                        py-4
                        text-sm
                        text-(--text-primary-dashboard)
                      "
                    >
                      <span
                        className="
                          inline-flex
                          items-center
                          rounded-full
                          bg-(--secondary-bg-dashboard)
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-(--text-primary-dashboard)
                        "
                      >
                        {user.enrolledCourses}{" "}
                        course
                        {user.enrolledCourses ===
                        1
                          ? ""
                          : "s"}
                      </span>
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
                                user.id
                                ? null
                                : user.id,
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
                          user.id && (
                          <div className="absolute right-0 top-full z-10 mt-1 w-36 overflow-hidden rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) shadow-lg">
                            {/* VIEW */}

                            <button
                              type="button"
                              onClick={() =>
                                handleView(user)
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

                                handleEdit(user);
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

                                handleDelete(user.id);
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
                                text-red-500
                                transition
                                hover:bg-red-500/10
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
                    ? "Add User"
                    : "Edit User"}
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-(--text-primary-dashboard)/70
                  "
                >
                  {isAddMode
                    ? "Add a new user."
                    : "Update the selected user."}
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
                  htmlFor="user-id"
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
                  id="user-id"
                  type="text"
                  value={
                    isAddMode
                      ? usersData.length > 0
                        ? Math.max(
                            ...usersData.map(
                              (user) => user.id,
                            ),
                          ) + 1
                        : 1
                      : selectedUser?.id ?? ""
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
                  htmlFor="user-name"
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
                  id="user-name"
                  type="text"
                  value={editName}
                  onChange={(event) =>
                    setEditName(event.target.value)
                  }
                  required
                  placeholder="Enter user name"
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

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="user-email"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)
                  "
                >
                  Email
                </label>

                <input
                  id="user-email"
                  type="email"
                  value={editEmail}
                  onChange={(event) =>
                    setEditEmail(event.target.value)
                  }
                  required
                  placeholder="Enter user email"
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

              {/* PHONE NUMBER */}

              <div>
                <label
                  htmlFor="user-phone"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)
                  "
                >
                  Phone Number
                </label>

                <input
                  id="user-phone"
                  type="tel"
                  value={editPhone}
                  onChange={(event) =>
                    setEditPhone(event.target.value)
                  }
                  required
                  placeholder="Enter phone number"
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

              {/* ROLE */}

              <div>
                <label
                  htmlFor="user-role"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)
                  "
                >
                  Role
                </label>

                {/* CUSTOM DROPDOWN */}

                <div className="relative">
                  {/* TRIGGER */}

                  <button
                    type="button"
                    onClick={() =>
                      setIsRoleOptionsOpen(
                        !isRoleOptionsOpen,
                      )
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-2
                      rounded-lg
                      border
                      border-(--border-primary-dashboard)
                      bg-(--bg-primary-dashboard)
                      px-4
                      py-2.5
                      text-sm
                      capitalize
                      text-(--text-primary-dashboard)
                      outline-none
                      transition
                      hover:cursor-pointer
                      focus:border-(--bg-lightblue)
                      focus:ring-2
                      focus:ring-(--bg-lightblue)/20
                    "
                  >
                    {editRole}

                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        isRoleOptionsOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  {/* DROPDOWN MENU */}

                  {isRoleOptionsOpen && (
                    <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) shadow-lg">
                      {roleOptions.map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            setEditRole(role);

                            setIsRoleOptionsOpen(
                              false,
                            );
                          }}
                          className={`
                            flex
                            w-full
                            items-center
                            gap-2
                            px-4
                            py-2.5
                            text-left
                            text-sm
                            capitalize
                            transition
                            hover:bg-(--secondary-bg-dashboard)
                            hover:cursor-pointer
                            ${
                              editRole === role
                                ? "font-medium text-(--bg-lightblue)"
                                : "text-(--text-primary-dashboard)"
                            }
                          `}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
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
                    ? "Add User"
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

      {viewUser && (
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
                  User Details
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-(--text-primary-dashboard)/70
                  "
                >
                  Details of the selected user.
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
                    w-28
                    shrink-0
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)/70
                  "
                >
                  ID
                </dt>

                <dd className="text-sm text-(--text-primary-dashboard)">
                  {viewUser.id}
                </dd>
              </div>

              <div className="flex items-start gap-4">
                <dt
                  className="
                    w-28
                    shrink-0
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)/70
                  "
                >
                  Name
                </dt>

                <dd className="text-sm text-(--text-primary-dashboard)">
                  {viewUser.name}
                </dd>
              </div>

              <div className="flex items-start gap-4">
                <dt
                  className="
                    w-28
                    shrink-0
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)/70
                  "
                >
                  Email
                </dt>

                <dd className="text-sm text-(--text-primary-dashboard)">
                  {viewUser.email}
                </dd>
              </div>

              <div className="flex items-start gap-4">
                <dt
                  className="
                    w-28
                    shrink-0
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)/70
                  "
                >
                  Phone
                </dt>

                <dd className="text-sm text-(--text-primary-dashboard)">
                  {viewUser.phone}
                </dd>
              </div>

              <div className="flex items-start gap-4">
                <dt
                  className="
                    w-28
                    shrink-0
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)/70
                  "
                >
                  Role
                </dt>

                <dd
                  className={`
                    text-sm
                    capitalize
                    ${
                      viewUser.role ===
                      "superadmin"
                        ? "text-purple-600"
                        : viewUser.role ===
                            "teacher"
                          ? "text-emerald-600"
                          : "text-blue-600"
                    }
                  `}
                >
                  {viewUser.role}
                </dd>
              </div>

              <div className="flex items-start gap-4">
                <dt
                  className="
                    w-28
                    shrink-0
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)/70
                  "
                >
                  Enrolled
                  Courses
                </dt>

                <dd className="text-sm text-(--text-primary-dashboard)">
                  {viewUser.enrolledCourses}
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
