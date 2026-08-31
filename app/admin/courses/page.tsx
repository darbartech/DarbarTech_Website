"use client";

import React from "react";
import AdminNavbar from "../common/AdminNavbar";
import Topbar from "../TopBar";
import { useSidebarStore } from "@/store/sidebarStore";
import courseImage from "@/public/services/image 21.png";
import Image from "next/image";

import { Heart, UserRound, ArrowRight, Plus } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Mastering React & Next.js",
    image: courseImage,
    status: "In Progress",
    instructor: "Dr. Sarah Jenkins",
    progress: 65,
  },
  {
    id: 2,
    title: "Advanced TypeScript Development",
    image: courseImage,
    status: "In Progress",
    instructor: "Dr. Sarah Jenkins",
    progress: 45,
  },
  {
    id: 3,
    title: "Modern UI/UX Design",
    image: courseImage,
    status: "Completed",
    instructor: "Dr. Sarah Jenkins",
    progress: 100,
  },
  {
    id: 4,
    title: "Full Stack Web Development",
    image: courseImage,
    status: "Completed",
    instructor: "Dr. Sarah Jenkins",
    progress: 100,
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

        {/* Courses Section */}
        <section className="px-4 py-6 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-(--text-primary-dashboard) sm:text-3xl">
              My Courses
            </h1>

            <p className="mt-2 text-sm text-(--tertiary-text-dashboard) sm:text-base">
              Continue your learning journey and keep building your skills.
            </p>
          </div>

          {/* Course Tags */}
          <div className="mb-8 flex gap-2 overflow-x-auto border-b border-(--border-primary-dashboard) pb-3">
            <button
              className="
                shrink-0 rounded-full
                bg-(--bg-lightblue)
                px-5 py-2
                text-sm font-medium
                text-(--text-primary-dashboard)
              "
            >
              All Courses
            </button>

            <button
              className="
                shrink-0 rounded-full
                px-5 py-2
                text-sm font-medium
                text-(--tertiary-text-dashboard)
                transition
                hover:bg-(--secondary-bg-dashboard)
              "
            >
              In Progress
            </button>

            <button
              className="
                shrink-0 rounded-full
                px-5 py-2
                text-sm font-medium
                text-(--tertiary-text-dashboard)
                transition
                hover:bg-(--secondary-bg-dashboard)
              "
            >
              Completed
            </button>

            <button
              className="
                shrink-0 rounded-full
                px-5 py-2
                text-sm font-medium
                text-(--tertiary-text-dashboard)
                transition
                hover:bg-(--secondary-bg-dashboard)
              "
            >
              Favourites
            </button>
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {courses.map((course) => (
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
                    className="
                      absolute right-3 top-3
                      flex h-9 w-9
                      items-center justify-center
                      rounded-full
                      bg-(--primary-bg-dashboard)/90
                      text-(--text-primary-dashboard)
                      shadow-sm
                      backdrop-blur-sm
                      transition
                      hover:bg-(--primary-bg-dashboard)
                      hover:text-red-500
                    "
                  >
                    <Heart size={18} strokeWidth={2} />
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

                  {/* Progress */}
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-(--tertiary-text-dashboard)">
                        Progress
                      </span>

                      <span className="text-xs font-semibold text-(--text-primary-dashboard)">
                        {course.progress}%
                      </span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-(--secondary-bg-dashboard)">
                      <div
                        className="h-full rounded-full bg-(--bg-lightblue)"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button
                    type="button"
                    className="
                      mt-5
                      flex w-full
                      items-center justify-center
                      gap-2
                      rounded-xl
                      bg-(--bg-lightblue)
                      px-4 py-2.5
                      text-sm font-semibold
                      text-(--text-primary-dashboard)
                      transition
                      hover:opacity-90
                    "
                  >
                    Continue Learning
                    <ArrowRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Recommedation section */}
        {/* Recommendation Section */}
        <section className="px-4 pb-8 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-(--text-primary-dashboard)">
              Recommended For You
            </h2>

            <p className="mt-2 text-sm text-(--tertiary-text-dashboard)">
              Courses selected to help you grow your skills and achieve your
              goals.
            </p>
          </div>

          {/* Recommendation Cards */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {/* Recommendation Card 1 */}
            <article
              className="
        flex
        overflow-hidden
        rounded-2xl
        border border-(--border-primary-dashboard)
        bg-(--bg-primary-dashboard)
        p-3
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-md
      "
            >
              {/* Image */}
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-36">
                <Image
                  src={courseImage}
                  alt="Advanced React Development"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex min-w-0 flex-1 flex-col justify-between pl-4 py-1">
                <div>
                  <h3 className="line-clamp-2 text-base font-semibold text-(--text-primary-dashboard)">
                    Advanced React Development
                  </h3>

                  <span className="mt-2 inline-block text-xs font-medium text-(--text-primary-dashboard)">
                    Web Development
                  </span>
                </div>

                {/* Price + Button */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-base font-bold text-(--text-primary-dashboard)">
                    NPR 18,500
                  </span>

                  <button
                    type="button"
                    aria-label="Add course"
                    className="
              flex h-9 w-9
              shrink-0
              items-center justify-center
              rounded-full
              border border-(--border-primary-dashboard)
              text-(--secondary-text-dashboard)
              transition
              hover:bg-(--secondary-bg-dashboard)
            "
                  >
                    <Plus size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </article>

            {/* Recommendation Card 2 */}
            <article
              className="
        flex
        overflow-hidden
        rounded-2xl
        border border-(--border-primary-dashboard)
        bg-(--bg-primary-dashboard)
        p-3
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-md
      "
            >
              {/* Image */}
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-36">
                <Image
                  src={courseImage}
                  alt="Full Stack Development"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex min-w-0 flex-1 flex-col justify-between pl-4 py-1">
                <div>
                  <h3 className="line-clamp-2 text-base font-semibold text-(--text-primary-dashboard)">
                    Full Stack Development
                  </h3>

                  <span className="mt-2 inline-block text-xs font-medium text-(--text-primary-dashboard)">
                    Software Development
                  </span>
                </div>

                {/* Price + Button */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-base font-bold text-(--text-primary-dashboard)">
                    NPR 18,500
                  </span>

                  <button
                    type="button"
                    aria-label="Add course"
                    className="
              flex h-9 w-9
              shrink-0
              items-center justify-center
              rounded-full
              border border-(--border-primary-dashboard)
              text-(--secondary-text-dashboard)
              transition
              hover:bg-(--secondary-bg-dashboard)
            "
                  >
                    <Plus size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </article>

            {/* Recommendation Card 3 */}
            <article
              className="
        flex
        overflow-hidden
        rounded-2xl
        border border-(--border-primary-dashboard)
        bg-(--bg-primary-dashboard)
        p-3
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-md
      "
            >
              {/* Image */}
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-36">
                <Image
                  src={courseImage}
                  alt="UI UX Design Masterclass"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex min-w-0 flex-1 flex-col justify-between pl-4 py-1">
                <div>
                  <h3 className="line-clamp-2 text-base font-semibold text-(--text-primary-dashboard)">
                    UI/UX Design Masterclass
                  </h3>

                  <span className="mt-2 inline-block text-xs font-medium text-(--text-primary-dashboard)">
                    Design
                  </span>
                </div>

                {/* Price + Button */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-base font-bold text-(--text-primary-dashboard)">
                    NPR 18,500
                  </span>

                  <button
                    type="button"
                    aria-label="Add course"
                    className="
              flex h-9 w-9
              shrink-0
              items-center justify-center
              rounded-full
              border border-(--border-primary-dashboard)
              text-(--secondary-text-dashboard)
              transition
              hover:bg-(--secondary-bg-dashboard)
            "
                  >
                    <Plus size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
