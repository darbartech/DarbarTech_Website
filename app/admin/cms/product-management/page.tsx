"use client";

import React, {
  useReducer,
  useState,
  useEffect,
} from "react";

import {
  Pencil,
  Trash2,
  X,
  Plus,
  MoreHorizontal,
  Eye,
} from "lucide-react";

type ServiceCategory = {
  slug: string;
  title: string;
  description: string;
  lists: string[];
};

type ProductItem = {
  id: number;
  name: string;
  content: string;
  image?: string;
  imageName?: string;
  category: ServiceCategory[];
  altDescription: string;
  btnName: string;
  isImageOnLeft: boolean;
  createdAt: string;
  updatedAt: string;
};

type ServiceRow = {
  id: number;
  title: string;
  description: string | null;
  category: ServiceCategory[] | null;
  image: string | null;
  altDescription: string | null;
  btnName: string | null;
  isImageOnLeft: boolean | null;
  createdAt: string;
  updatedAt: string;
};

// The API exposes the `services` schema (title/description/image/...); the
// form and table use name/content, and the remaining columns are surfaced in
// the details modal.
const toProductItem = (row: ServiceRow): ProductItem => ({
  id: row.id,
  name: row.title,
  content: row.description ?? "",
  image: row.image ? `/services/${row.image}` : "",
  imageName: row.image ?? "",
  category: row.category ?? [],
  altDescription: row.altDescription ?? "",
  btnName: row.btnName ?? "",
  isImageOnLeft: row.isImageOnLeft ?? false,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});

const formatDate = (value?: string) =>
  value ? new Date(value).toLocaleString() : "-";

type CategoryDraft = {
  slug: string;
  title: string;
  description: string;
  lists: string;
};

const emptyDraft = (): CategoryDraft => ({
  slug: "",
  title: "",
  description: "",
  lists: "",
});

const toDraft = (
  category: ServiceCategory,
): CategoryDraft => ({
  slug: category.slug,
  title: category.title,
  description: category.description,
  lists: category.lists.join(", "),
});

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildCategories = (
  drafts: CategoryDraft[],
): ServiceCategory[] => {
  const used = new Set<string>();

  return drafts.map((draft, index) => {
    const base =
      slugify(draft.slug) ||
      slugify(draft.title) ||
      `category-${index}`;

    const slug = used.has(base)
      ? `${base}-${index}`
      : base;

    used.add(slug);

    return {
      slug,
      title: draft.title.trim(),
      description: draft.description.trim(),
      lists: draft.lists
        .split(",")
        .map((list) => list.trim())
        .filter(Boolean),
    };
  });
};

// ================= FORM STATE / REDUCER =================

type FormState = {
  selectedItem: ProductItem | null;
  isModalOpen: boolean;
  isAddMode: boolean;
  editName: string;
  editContent: string;
  editImage: string;
  editImageName: string;
  editCategory: CategoryDraft[];
  editAltDescription: string;
  editBtnName: string;
  editIsImageOnLeft: boolean;
  editCreatedAt: string;
  editUpdatedAt: string;
};

type FormAction =
  | { type: "OPEN_EDIT"; item: ProductItem }
  | { type: "OPEN_ADD" }
  | { type: "CLOSE" }
  | { type: "UPDATE_NAME"; value: string }
  | { type: "UPDATE_CONTENT"; value: string }
  | { type: "UPDATE_IMAGE"; value: string }
  | { type: "UPDATE_IMAGE_NAME"; value: string }
  | { type: "ADD_CATEGORY" }
  | { type: "REMOVE_CATEGORY"; index: number }
  | {
      type: "UPDATE_CATEGORY";
      index: number;
      category: CategoryDraft;
    }
  | { type: "UPDATE_ALT_DESCRIPTION"; value: string }
  | { type: "UPDATE_BTN_NAME"; value: string }
  | { type: "UPDATE_IS_IMAGE_ON_LEFT"; value: boolean };

const initialFormState: FormState = {
  selectedItem: null,
  isModalOpen: false,
  isAddMode: false,
  editName: "",
  editContent: "",
  editImage: "",
  editImageName: "",
  editCategory: [],
  editAltDescription: "",
  editBtnName: "",
  editIsImageOnLeft: false,
  editCreatedAt: "",
  editUpdatedAt: "",
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
        editImage: action.item.image ?? "",
        editImageName: action.item.imageName ?? "",
        editCategory: action.item.category.map(toDraft),
        editAltDescription: action.item.altDescription,
        editBtnName: action.item.btnName,
        editIsImageOnLeft: action.item.isImageOnLeft,
        editCreatedAt: action.item.createdAt,
        editUpdatedAt: action.item.updatedAt,
      };

    case "OPEN_ADD":
      return {
        ...state,
        selectedItem: null,
        isModalOpen: true,
        isAddMode: true,
        editName: "",
        editContent: "",
        editImage: "",
        editImageName: "",
        editCategory: [],
        editAltDescription: "",
        editBtnName: "",
        editIsImageOnLeft: false,
        editCreatedAt: "",
        editUpdatedAt: "",
      };

    case "CLOSE":
      return initialFormState;

    case "UPDATE_NAME":
      return { ...state, editName: action.value };

    case "UPDATE_CONTENT":
      return { ...state, editContent: action.value };

    case "UPDATE_IMAGE":
      return { ...state, editImage: action.value };

    case "UPDATE_IMAGE_NAME":
      return { ...state, editImageName: action.value };

    case "ADD_CATEGORY":
      return {
        ...state,
        editCategory: [
          ...state.editCategory,
          emptyDraft(),
        ],
      };

    case "REMOVE_CATEGORY":
      return {
        ...state,
        editCategory: state.editCategory.filter(
          (_, index) => index !== action.index,
        ),
      };

    case "UPDATE_CATEGORY":
      return {
        ...state,
        editCategory: state.editCategory.map(
          (category, index) =>
            index === action.index
              ? action.category
              : category,
        ),
      };

    case "UPDATE_ALT_DESCRIPTION":
      return { ...state, editAltDescription: action.value };

    case "UPDATE_BTN_NAME":
      return { ...state, editBtnName: action.value };

    case "UPDATE_IS_IMAGE_ON_LEFT":
      return { ...state, editIsImageOnLeft: action.value };

    default:
      return state;
  }
};

const Page = () => {
  // ================= TABLE DATA =================

  const [productData, setProductData] =
    useState<ProductItem[]>([]);

  // ================= LOAD FROM API =================

  const fetchServiceData = async (): Promise<
    ProductItem[] | null
  > => {
    const response = await fetch("/api/client/services");

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}`,
      );
    }

    const data = await response.json();

    return Array.isArray(data)
      ? data.map((row: ServiceRow) => toProductItem(row))
      : null;
  };

  const refreshServiceData = async () => {
    try {
      const data = await fetchServiceData();

      if (data) {
        setProductData(data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    fetchServiceData()
      .then((data) => {
        if (isMounted && data) {
          setProductData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
    editImage,
    editImageName,
    editCategory,
    editAltDescription,
    editBtnName,
    editIsImageOnLeft,
    editCreatedAt,
    editUpdatedAt,
  } = formState;

  // ================= ACTIONS DROPDOWN STATE =================

  const [openActionsId, setOpenActionsId] =
    useState<number | null>(null);

  // ================= VIEW MODAL =================

  const [viewItem, setViewItem] =
    useState<ProductItem | null>(null);

  const handleView = (item: ProductItem) => {
    setOpenActionsId(null);

    setViewItem(item);
  };

  const handleCloseViewModal = () => {
    setViewItem(null);
  };

  // ================= EDIT =================

  const handleEdit = (item: ProductItem) => {
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

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `/api/client/services?id=${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error ||
            `Request failed with status ${response.status}`,
        );
      }

      await refreshServiceData();
    } catch (error) {
      console.error(
        "Error deleting service:",
        error,
      );
    }
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

  const handleSave = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    try {
      const title = editName.trim();

      if (!title) return;

      if (!isAddMode && !selectedItem) {
        throw new Error("No service selected");
      }

      if (
        editCategory.some(
          (draft) => !draft.title.trim(),
        )
      ) {
        alert("Every category needs a title.");
        return;
      }

      const category = buildCategories(editCategory);

      const payload = {
        title,
        description: editContent,
        image: editImageName || null,
        category,
        altDescription: editAltDescription || null,
        btnName: editBtnName || null,
        isImageOnLeft: editIsImageOnLeft,
      };

      const response = await fetch(
        "/api/client/services",
        {
          method: isAddMode ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isAddMode
              ? payload
              : { id: selectedItem?.id, ...payload },
          ),
        },
      );

      const data = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error ||
            `Request failed with status ${response.status}`,
        );
      }

      await refreshServiceData();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  return (
    <>
      <section className="px-4 py-2">

          {/* ================= HEADER ================= */}

          <div className="mb-6 flex items-center justify-between gap-4">

            {/* Header Content */}

            <div>
              <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
                Service Management
              </h1>

              <p className="mt-2 text-sm text-(--text-primary-dashboard)/70">
                Manage the content displayed in the
                service section.
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
                    Actions
                  </th>

                </tr>
              </thead>

              {/* ================= TABLE BODY ================= */}

              <tbody>
                {productData.map((item) => (
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
              max-h-[calc(100dvh-2rem)]
              w-full
              max-w-lg
              overflow-y-auto
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
                    ? "Add Product"
                    : "Edit Product"}
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-(--text-primary-dashboard)/70
                  "
                >
                  {isAddMode
                    ? "Add new product"
                    : "Update product"}
                </p>

              </div>

              {/* ================= CLOSE ================= */}

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

              {/* ================= ID ================= */}

              <div>

                <label
                  htmlFor="product-id"
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
                  id="product-id"
                  type="text"
                  value={
                    isAddMode
                      ? productData.length > 0
                        ? Math.max(
                            ...productData.map(
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

              {/* ================= NAME ================= */}

              <div>

                <label
                  htmlFor="product-name"
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
                  id="product-name"
                  type="text"
                  value={editName}
                  onChange={(event) =>
                    dispatch({
                      type: "UPDATE_NAME",
                      value: event.target.value,
                    })
                  }
                  required
                  placeholder="Enter product name"
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

              {/* ================= CONTENT ================= */}

              <div className="sm:col-span-2">

                <label
                  htmlFor="product-content"
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
                  id="product-content"
                  value={editContent}
                  onChange={(event) =>
                    dispatch({
                      type: "UPDATE_CONTENT",
                      value: event.target.value,
                    })
                  }
                  required
                  rows={5}
                  placeholder="Enter product content"
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

              {/* ================= IMAGE UPLOAD ================= */}

              <div>

                <label
                  htmlFor="product-image"
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
                  <div
                    className="
                      mb-3
                      overflow-hidden
                      rounded-lg
                      border
                      border-(--border-primary-dashboard)
                    "
                  >
                    <img
                      src={editImage}
                      alt="Preview"
                      className="h-32 w-full object-cover"
                    />
                  </div>
                )}

                <input
                  id="product-image"
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

              {/* ================= ALT DESCRIPTION ================= */}

              <div>

                <label
                  htmlFor="product-alt-description"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)
                  "
                >
                  Alt Description
                </label>

                <input
                  id="product-alt-description"
                  type="text"
                  value={editAltDescription}
                  onChange={(event) =>
                    dispatch({
                      type: "UPDATE_ALT_DESCRIPTION",
                      value: event.target.value,
                    })
                  }
                  placeholder="Enter alt description"
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

              {/* ================= BUTTON NAME ================= */}

              <div>

                <label
                  htmlFor="product-btn-name"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)
                  "
                >
                  Button Name
                </label>

                <input
                  id="product-btn-name"
                  type="text"
                  value={editBtnName}
                  onChange={(event) =>
                    dispatch({
                      type: "UPDATE_BTN_NAME",
                      value: event.target.value,
                    })
                  }
                  placeholder="Enter button name"
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

              {/* ================= IMAGE ON LEFT ================= */}

              <div>

                <span
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)
                  "
                >
                  Image on Left
                </span>

                <label
                  className="
                    flex
                    w-fit
                    items-center
                    gap-2
                    text-sm
                    text-(--text-primary-dashboard)
                    hover:cursor-pointer
                  "
                >
                  <input
                    type="checkbox"
                    checked={editIsImageOnLeft}
                    onChange={(event) =>
                      dispatch({
                        type: "UPDATE_IS_IMAGE_ON_LEFT",
                        value: event.target.checked,
                      })
                    }
                    className="
                      h-4
                      w-4
                      cursor-pointer
                    "
                  />

                  {editIsImageOnLeft ? "Yes" : "No"}
                </label>

              </div>

              {/* ================= CATEGORY ================= */}

              <div className="sm:col-span-2">

                <span
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)
                  "
                >
                  Category
                </span>

                <div
                  className="
                    w-full
                    overflow-x-auto
                    rounded-xl
                    border
                    border-(--border-primary-dashboard)
                  "
                >
                  <table
                    className="
                      w-full
                      border-collapse
                      text-left
                    "
                  >
                    <thead>
                      <tr>
                        <th
                          className="
                            bg-(--bg-table)
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-(--text-primary-dashboard)
                          "
                        >
                          Slug
                        </th>

                        <th
                          className="
                            bg-(--bg-table)
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-(--text-primary-dashboard)
                          "
                        >
                          Title
                        </th>

                        <th
                          className="
                            bg-(--bg-table)
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-(--text-primary-dashboard)
                          "
                        >
                          Description
                        </th>

                        <th
                          className="
                            bg-(--bg-table)
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-(--text-primary-dashboard)
                          "
                        >
                          Lists
                        </th>

                        <th
                          className="
                            bg-(--bg-table)
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-(--text-primary-dashboard)
                          "
                        >
                          <span className="sr-only">
                            Actions
                          </span>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {editCategory.map(
                        (category, index) => (
                          <tr
                            key={index}
                            className="border-t border-(--border-primary-dashboard)"
                          >
                            <td className="p-0 align-top">
                              <input
                                value={category.slug}
                                onChange={(event) =>
                                  dispatch({
                                    type: "UPDATE_CATEGORY",
                                    index,
                                    category: {
                                      ...category,
                                      slug: event.target
                                        .value,
                                    },
                                  })
                                }
                                placeholder="auto"
                                className="
                                  w-full
                                  min-w-32
                                  bg-transparent
                                  px-3
                                  py-2
                                  text-sm
                                  text-(--text-primary-dashboard)
                                  outline-none
                                  transition
                                  focus:bg-(--bg-table)
                                "
                              />
                            </td>

                            <td className="p-0 align-top">
                              <input
                                value={category.title}
                                onChange={(event) =>
                                  dispatch({
                                    type: "UPDATE_CATEGORY",
                                    index,
                                    category: {
                                      ...category,
                                      title: event.target
                                        .value,
                                    },
                                  })
                                }
                                placeholder="Title"
                                className="
                                  w-full
                                  min-w-40
                                  bg-transparent
                                  px-3
                                  py-2
                                  text-sm
                                  font-medium
                                  text-(--text-primary-dashboard)
                                  outline-none
                                  transition
                                  focus:bg-(--bg-table)
                                "
                              />
                            </td>

                            <td className="p-0 align-top">
                              <input
                                value={
                                  category.description
                                }
                                onChange={(event) =>
                                  dispatch({
                                    type: "UPDATE_CATEGORY",
                                    index,
                                    category: {
                                      ...category,
                                      description:
                                        event.target.value,
                                    },
                                  })
                                }
                                placeholder="Description"
                                className="
                                  w-full
                                  min-w-48
                                  bg-transparent
                                  px-3
                                  py-2
                                  text-sm
                                  text-(--text-primary-dashboard)/70
                                  outline-none
                                  transition
                                  focus:bg-(--bg-table)
                                "
                              />
                            </td>

                            <td className="p-0 align-top">
                              <input
                                value={category.lists}
                                onChange={(event) =>
                                  dispatch({
                                    type: "UPDATE_CATEGORY",
                                    index,
                                    category: {
                                      ...category,
                                      lists: event.target
                                        .value,
                                    },
                                  })
                                }
                                placeholder="item one, item two"
                                className="
                                  w-full
                                  min-w-56
                                  bg-transparent
                                  px-3
                                  py-2
                                  text-sm
                                  text-(--text-primary-dashboard)
                                  outline-none
                                  transition
                                  focus:bg-(--bg-table)
                                "
                              />
                            </td>

                            <td className="px-2 py-2 align-top">
                              <button
                                type="button"
                                aria-label="Remove category"
                                onClick={() =>
                                  dispatch({
                                    type: "REMOVE_CATEGORY",
                                    index,
                                  })
                                }
                                className="
                                  rounded-md
                                  p-1.5
                                  text-(--text-primary-dashboard)/60
                                  transition
                                  hover:bg-(--bg-table)
                                  hover:text-red-500
                                "
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ),
                      )}

                      {editCategory.length === 0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="
                              px-3
                              py-4
                              text-center
                              text-sm
                              text-(--text-primary-dashboard)/70
                            "
                          >
                            No categories yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: "ADD_CATEGORY" })
                  }
                  className="
                    mt-3
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-(--border-primary-dashboard)
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)
                    transition
                    hover:border-(--bg-lightblue)
                    hover:text-(--bg-lightblue)
                  "
                >
                  <Plus size={15} />
                  Add Category
                </button>

              </div>

              {/* ================= CREATED AT ================= */}

              <div>

                <label
                  htmlFor="product-created-at"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)
                  "
                >
                  Created At
                </label>

                <input
                  id="product-created-at"
                  type="text"
                  value={formatDate(editCreatedAt)}
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

              {/* ================= UPDATED AT ================= */}

              <div>

                <label
                  htmlFor="product-updated-at"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-(--text-primary-dashboard)
                  "
                >
                  Updated At
                </label>

                <input
                  id="product-updated-at"
                  type="text"
                  value={formatDate(editUpdatedAt)}
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

                {/* ================= CANCEL ================= */}

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

                {/* ================= SAVE ================= */}

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
              max-h-[calc(100dvh-2rem)]
              w-full
              max-w-lg
              overflow-y-auto
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
                  Product Details
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-(--text-primary-dashboard)/70
                  "
                >
                  Details of the selected product.
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

                <dd className="min-w-0 text-sm text-(--text-primary-dashboard)">
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

                <dd className="min-w-0 break-words text-sm text-(--text-primary-dashboard)">
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
                  Image
                </dt>

                <dd className="break-all text-sm text-(--text-primary-dashboard)">
                  {viewItem.imageName || "-"}
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
                  Category
                </dt>

                <dd className="min-w-0 flex-1 text-sm text-(--text-primary-dashboard)">
                  {viewItem.category.length === 0 ? (
                    "-"
                  ) : (
                    <div className="w-full overflow-x-auto rounded-xl border border-(--border-primary-dashboard)">
                      <table className="w-full border-collapse text-left">
                        <thead>
                          <tr>
                            <th
                              className="
                                bg-(--bg-table)
                                px-3
                                py-2
                                text-xs
                                font-semibold
                                text-(--text-primary-dashboard)
                              "
                            >
                              Title
                            </th>

                            <th
                              className="
                                bg-(--bg-table)
                                px-3
                                py-2
                                text-xs
                                font-semibold
                                text-(--text-primary-dashboard)
                              "
                            >
                              Description
                            </th>

                            <th
                              className="
                                bg-(--bg-table)
                                px-3
                                py-2
                                text-xs
                                font-semibold
                                text-(--text-primary-dashboard)
                              "
                            >
                              Lists
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {viewItem.category.map(
                            (category) => (
                              <tr
                                key={category.slug}
                                className="border-t border-(--border-primary-dashboard)"
                              >
                                <td className="px-3 py-2 align-top font-medium">
                                  {category.title}
                                </td>

                                <td className="px-3 py-2 align-top text-(--text-primary-dashboard)/70">
                                  {category.description}
                                </td>

                                <td className="px-3 py-2 align-top">
                                  {category.lists.join(
                                    ", ",
                                  )}
                                </td>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
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
                  Alt Description
                </dt>

                <dd className="text-sm text-(--text-primary-dashboard)">
                  {viewItem.altDescription || "-"}
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
                  Button Name
                </dt>

                <dd className="text-sm text-(--text-primary-dashboard)">
                  {viewItem.btnName || "-"}
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
                  Image on Left
                </dt>

                <dd className="text-sm text-(--text-primary-dashboard)">
                  {viewItem.isImageOnLeft ? "Yes" : "No"}
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
                  Created At
                </dt>

                <dd className="text-sm text-(--text-primary-dashboard)">
                  {formatDate(viewItem.createdAt)}
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
                  Updated At
                </dt>

                <dd className="text-sm text-(--text-primary-dashboard)">
                  {formatDate(viewItem.updatedAt)}
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
    </>
  );
};

export default Page;
