"use client";

import { useState } from "react";
import AdminNavbar from "../common/AdminNavbar";
import Topbar from "../TopBar";
import { useSidebarStore } from "@/store/sidebarStore";
import courseImage from "@/public/services/image 21.png";
import Image from "next/image";

import { Heart, UserRound } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Mastering React & Next.js",
    image: courseImage,
    status: "In Progress",
    instructor: "Dr. Sarah Jenkins",
    category: "Web Development",
  },
  {
    id: 2,
    title: "Advanced TypeScript Development",
    image: courseImage,
    status: "In Progress",
    instructor: "Dr. Sarah Jenkins",
    category: "Web Development",
  },
  {
    id: 3,
    title: "Modern UI/UX Design",
    image: courseImage,
    status: "Completed",
    instructor: "Dr. Sarah Jenkins",
    category: "UI/UX Design",
  },
  {
    id: 4,
    title: "Full Stack Web Development",
    image: courseImage,
    status: "Completed",
    instructor: "Dr. Sarah Jenkins",
    category: "Web Development",
  },
];

const categoryOptions = [
  { key: "all", label: "All Courses" },
  ...Array.from(
    new Set(courses.map((course) => course.category)),
  ).map((category) => ({ key: category, label: category })),
];

const Page = () => {
  const { collapsed } = useSidebarStore();

  // ================= CATEGORY FILTER STATE =================

  const [activeCategory, setActiveCategory] =
    useState<string>("all");

  // ================= FAVOURITES STATE =================

  const [favouriteIds, setFavouriteIds] = useState<number[]>([]);

  // ================= HANDLERS =================

  const handleToggleFavourite = (id: number) => {
    setFavouriteIds((previousIds) =>
      previousIds.includes(id)
        ? previousIds.filter((itemId) => itemId !== id)
        : [...previousIds, id],
    );
  };

  const filteredCourses = courses.filter(
    (course) =>
      activeCategory === "all" ||
      course.category === activeCategory,
  );

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

        {/* Courses Section */}
        <section className="px-4 py-6 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-(--text-primary-dashboard) sm:text-3xl">
              Our Courses
            </h1>

            <p className="mt-2 text-sm text-(--tertiary-text-dashboard) sm:text-base">
              Browse the full catalog of courses offered by DarbarTech.
            </p>
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
                    "
                  >
                    {/* Image Container */}
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      />

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
                        onClick={() =>
                          handleToggleFavourite(course.id)
                        }
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
                              ? "text-red-500"
                              : "text-(--text-primary-dashboard) hover:text-red-500"
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
        </section>
      </main>
    </div>
  );
};

export default Page;