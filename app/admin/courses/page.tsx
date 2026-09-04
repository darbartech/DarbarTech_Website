"use client";

import { useState } from "react";
import courseImage from "@/public/services/image 21.png";
import Image from "next/image";
import { Heart, UserRound, X, Plus } from "lucide-react";

import Can from "@/components/common/Can";

interface Course {
  id: number;
  title: string;
  image: string | typeof courseImage;
  status: string;
  instructor: string;
  category: string;
  shortDescription: string;
}

const initialCourses: Course[] = [
  {
    id: 1,
    title: "Mastering React & Next.js",
    image: courseImage,
    status: "In Progress",
    instructor: "Dr. Sarah Jenkins",
    category: "Web Development",
    shortDescription:
      "Learn modern React and Next.js from basics to advanced concepts with hands-on projects.",
  },
  {
    id: 2,
    title: "Advanced TypeScript Development",
    image: courseImage,
    status: "In Progress",
    instructor: "Dr. Sarah Jenkins",
    category: "Web Development",
    shortDescription:
      "Deep dive into TypeScript's type system, generics and advanced patterns used in large applications.",
  },
  {
    id: 3,
    title: "Modern UI/UX Design",
    image: courseImage,
    status: "Completed",
    instructor: "Dr. Sarah Jenkins",
    category: "UI/UX Design",
    shortDescription:
      "Master the principles of modern UI/UX design including wireframing, prototyping and usability.",
  },
  {
    id: 4,
    title: "Full Stack Web Development",
    image: courseImage,
    status: "Completed",
    instructor: "Dr. Sarah Jenkins",
    category: "Web Development",
    shortDescription:
      "Build complete full-stack applications with a comprehensive overview of frontend and backend.",
  },
];

const categoryOptions = [
  { key: "all", label: "All Courses" },
  ...Array.from(
    new Set(initialCourses.map((course) => course.category)),
  ).map((category) => ({ key: category, label: category })),
];

const emptyForm = {
  title: "",
  shortDescription: "",
  instructor: "",
  image: "",
};

const Page = () => {
  // ================= COURSE DATA STATE =================

  const [courses, setCourses] = useState<Course[]>(initialCourses);

  // ================= CATEGORY FILTER STATE =================

  const [activeCategory, setActiveCategory] =
    useState<string>("all");

  // ================= FAVOURITES STATE =================

  const [favouriteIds, setFavouriteIds] = useState<number[]>([]);

  // ================= ADD COURSE MODAL STATE =================

  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  // ================= DETAIL MODAL STATE =================

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // ================= HANDLERS =================

  const handleToggleFavourite = (id: number) => {
    setFavouriteIds((previousIds) =>
      previousIds.includes(id)
        ? previousIds.filter((itemId) => itemId !== id)
        : [...previousIds, id],
    );
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      id: Date.now(),
      title: form.title,
      image: form.image || String(courseImage.src),
      status: "In Progress",
      instructor: form.instructor,
      category: "Web Development",
      shortDescription: form.shortDescription,
    };
    setCourses((prev) => [newCourse, ...prev]);
    setShowAddModal(false);
    setForm(emptyForm);
  };

  const filteredCourses = courses.filter(
    (course) =>
      activeCategory === "all" ||
      course.category === activeCategory,
  );

  // ================= FALLBACK IMAGE RENDER =================

  const renderCourseImage = (course: Course) => {
    if (typeof course.image === "string" && course.image.startsWith("data:")) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover"
        />
      );
    }
    return (
      <Image
        src={course.image}
        alt={course.title}
        width={100}
        height={100}
        className="h-full w-full object-cover"
      />
    );
  };

  return (
    <section className="px-4 py-2">
      {/* Section Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-(--text-primary-dashboard) sm:text-3xl">
            Our Courses
          </h1>

          <p className="mt-2 text-sm text-(--tertiary-text-dashboard) sm:text-base">
            Browse the full catalog of courses offered by DarbarTech.
          </p>
        </div>

        {/* Add Course Button */}
        <Can
          role="superadmin"
          fallback={
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-lg bg-(--secondary-bg-dashboard) px-4 py-2 text-sm font-medium text-(--tertiary-text-dashboard) opacity-60"
            >
              <Plus size={17} className="inline" /> Add
            </button>
          }
        >
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-(--bg-lightblue) px-4 py-2 text-sm font-semibold text-(--text-primary-dashboard) transition hover:cursor-pointer hover:opacity-90"
          >
            <Plus size={17} /> Add
          </button>
        </Can>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex gap-2 overflow-x-auto border-b border-(--border-primary-dashboard) pb-3">
        {categoryOptions.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => setActiveCategory(option.key)}
            className={`
              shrink-0 rounded-full
              px-5 py-2
              text-sm font-medium
              transition
              hover:cursor-pointer
              ${
                activeCategory === option.key
                  ? "bg-(--bg-lightblue) text-(--text-primary-dashboard)"
                  : "text-(--tertiary-text-dashboard) hover:bg-(--secondary-bg-dashboard)"
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => {
            const isFavourite = favouriteIds.includes(course.id);

            return (
              <article
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className="
                  overflow-hidden
                  rounded-2xl
                  border border-(--border-primary-dashboard)
                  bg-(--primary-bg-dashboard)
                  shadow-sm
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-md
                  hover:cursor-pointer
                "
              >
                {/* Image Container */}
                <div className="relative aspect-video w-full overflow-hidden">
                  {renderCourseImage(course)}

                  {/* Status Tag */}
                  <span
                    className="
                      absolute left-3 bottom-3
                      rounded-full
                      bg-(--bg-lightblue)
                      px-3 py-1
                      text-xs font-semibold
                      text-(--text-primary-dashboard)
                    "
                  >
                    {course.status}
                  </span>

                  {/* Favourite Button */}
                  <button
                    type="button"
                    aria-label="Add to favourites"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavourite(course.id);
                    }}
                    className={`
                      absolute right-3 top-3
                      flex h-9 w-9
                      items-center justify-center
                      rounded-full
                      bg-(--primary-bg-dashboard)/90
                      shadow-sm
                      backdrop-blur-sm
                      transition
                      hover:cursor-pointer
                      ${
                        isFavourite
                          ? "text-(--danger-dashboard)"
                          : "text-(--text-primary-dashboard) hover:text-(--danger-dashboard)"
                      }
                    `}
                  >
                    <Heart
                      size={18}
                      strokeWidth={2}
                      fill={isFavourite ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  {/* Course Heading */}
                  <h2
                    className="
                      line-clamp-2
                      min-h-12
                      text-base
                      font-semibold
                      leading-6
                      text-(--text-primary-dashboard)
                    "
                  >
                    {course.title}
                  </h2>

                  {/* Instructor */}
                  <div className="mt-3 flex items-center gap-2">
                    <div
                      className="
                        flex h-7 w-7
                        items-center justify-center
                        rounded-full
                        bg-(--secondary-bg-dashboard)
                      "
                    >
                      <UserRound
                        size={15}
                        className="text-(--secondary-text-dashboard)"
                      />
                    </div>

                    <span className="text-sm text-(--tertiary-text-dashboard)">
                      {course.instructor}
                    </span>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <p className="col-span-full rounded-2xl border border-(--border-primary-dashboard) bg-(--primary-bg-dashboard) px-6 py-10 text-center text-sm text-(--tertiary-text-dashboard)">
            No courses match this filter.
          </p>
        )}
      </div>

      {/* ================= ADD COURSE MODAL ================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-(--bg-dashboard-hero)/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-(--text-primary-dashboard)">
                Add New Course
              </h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                aria-label="Close"
                className="rounded-lg p-2 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCourse} className="space-y-4">
              {/* Course Image */}
              <div>
                <label
                  htmlFor="course-image"
                  className="mb-1 block text-sm font-medium text-(--text-primary-dashboard)"
                >
                  Course Image
                </label>
                <input
                  id="course-image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      setForm((prev) => ({
                        ...prev,
                        image: String(reader.result),
                      }));
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="w-full rounded-lg border border-(--border-primary-dashboard) bg-(--primary-dashboard) px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--bg-lightblue)"
                />
              </div>

              {/* Course Title */}
              <div>
                <label
                  htmlFor="course-title"
                  className="mb-1 block text-sm font-medium text-(--text-primary-dashboard)"
                >
                  Course Title
                </label>
                <input
                  id="course-title"
                  name="title"
                  type="text"
                  required
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="Enter course title"
                  className="w-full rounded-lg border border-(--border-primary-dashboard) bg-(--primary-dashboard) px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--bg-lightblue)"
                />
              </div>

              {/* Short Description */}
              <div>
                <label
                  htmlFor="course-description"
                  className="mb-1 block text-sm font-medium text-(--text-primary-dashboard)"
                >
                  Short Description
                </label>
                <textarea
                  id="course-description"
                  name="shortDescription"
                  required
                  rows={3}
                  value={form.shortDescription}
                  onChange={handleFormChange}
                  placeholder="Enter a short description"
                  className="w-full resize-none rounded-lg border border-(--border-primary-dashboard) bg-(--primary-dashboard) px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--bg-lightblue)"
                />
              </div>

              {/* Instructor Name */}
              <div>
                <label
                  htmlFor="course-instructor"
                  className="mb-1 block text-sm font-medium text-(--text-primary-dashboard)"
                >
                  Instructor Name
                </label>
                <input
                  id="course-instructor"
                  name="instructor"
                  type="text"
                  required
                  value={form.instructor}
                  onChange={handleFormChange}
                  placeholder="Enter instructor name"
                  className="w-full rounded-lg border border-(--border-primary-dashboard) bg-(--primary-dashboard) px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--bg-lightblue)"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-(--border-primary-dashboard) px-4 py-2 text-sm font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-(--bg-lightblue) px-5 py-2 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= COURSE DETAIL MODAL ================= */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-(--bg-dashboard-hero)/60 p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) shadow-xl">
            <div className="relative aspect-video w-full">
              {selectedCourse.image && renderCourseImage(selectedCourse)}
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                aria-label="Close"
                className="absolute right-3 top-3 rounded-lg bg-(--primary-bg-dashboard)/90 p-2 text-(--text-primary-dashboard) shadow-sm backdrop-blur-sm transition hover:cursor-pointer hover:opacity-90"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-2 flex items-center gap-3">
                <span className="rounded-full bg-(--bg-lightblue) px-3 py-1 text-xs font-semibold text-(--text-primary-dashboard)">
                  {selectedCourse.status}
                </span>
                <span className="rounded-full border border-(--border-primary-dashboard) px-3 py-1 text-xs font-medium text-(--tertiary-text-dashboard)">
                  {selectedCourse.category}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-(--text-primary-dashboard)">
                {selectedCourse.title}
              </h2>

              <div className="mt-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--secondary-bg-dashboard)">
                  <UserRound
                    size={16}
                    className="text-(--secondary-text-dashboard)"
                  />
                </div>
                <span className="text-sm text-(--tertiary-text-dashboard)">
                  {selectedCourse.instructor}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-(--text-primary-dashboard)/80">
                {selectedCourse.shortDescription}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;
