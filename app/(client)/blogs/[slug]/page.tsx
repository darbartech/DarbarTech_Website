import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import pool from "@/lib/db";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import HeroSectionForPages from "../../components/common/HeroSectionForPages";

export const dynamic = "force-dynamic";

interface BlogListItem {
  slug: string;
  title: string;
  author: string;
  btnName: string;
  imageName: string;
  description: string;
  date_created: string;
}

// Blog content lives in the `blogs` table as a single row holding a
// `lists` jsonb array, which is also what LatestBlogsSection renders.
const getBlogListItems = async (): Promise<BlogListItem[]> => {
  const result = await pool.query(
    `SELECT lists FROM blogs ORDER BY id LIMIT 1`
  );

  const lists = result.rows[0]?.lists;

  return Array.isArray(lists) ? (lists as BlogListItem[]) : [];
};

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const blogList = await getBlogListItems();
  const blog = blogList.find((item) => item.slug === slug);

  if (!blog) {
    notFound();
  }

  const otherBlogs = blogList.filter((item) => item.slug !== blog.slug);

  return (
    <>
      <Navbar />

      <main className="font-bold">
        <HeroSectionForPages title={blog.title} />

        <section className="space-y-8 px-5 pb-10 pt-5 sm:px-8 sm:pb-12 md:px-12 md:pb-15 lg:px-20 xl:px-30">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start">
            {/* blogs */}
            <div className="mx-auto w-full max-w-4xl space-y-6 lg:mx-0 lg:flex-1">
              <Image
                src={`/blogs/${blog.imageName}`}
                alt={blog.title}
                width={830}
                height={750}
                className="h-auto w-full rounded-md shadow-md"
              />

              <span className="block text-sm text-(--bg-muted) sm:text-base">
                By:{" "}
                <span className="text-(--secondary-bg-color)">
                  {blog.author}
                </span>{" "}
                / {blog.date_created}
              </span>

              <h2 className="text-2xl text-(--primary-text-color) sm:text-3xl md:text-4xl">
                {blog.title}
              </h2>

              <div className="space-y-4 font-sans sm:space-y-5">
                <p className="text-sm text-(--primary-text-color) sm:text-base">
                  {blog.description}
                </p>
              </div>
            </div>

            {/* latest news sidebar */}
            <aside className="w-full shrink-0 space-y-5 rounded-md bg-(--primary-bg-color) p-5 shadow-lg lg:w-80">
              <h3 className="border-b-2 border-(--secondary-bg-color) pb-2 text-xl text-(--primary-text-color) sm:text-2xl">
                Latest News
              </h3>

              <div className="flex flex-col gap-5">
                {otherBlogs.map((item) => (
                  <div
                    key={item.slug}
                    className="group hover-state space-y-2 border-b border-(--bg-muted)/40 pb-4 last:border-none last:pb-0"
                  >
                    <h4 className="text-base text-(--primary-text-color) sm:text-lg">
                      {item.title}
                    </h4>

                    <span className="block text-xs text-(--secondary-bg-color) sm:text-sm">
                      By: {item.author}
                    </span>

                    <p className="text-xs text-(--bg-muted) sm:text-sm">
                      {item.description}
                    </p>

                    <Link
                      href={`/blogs/${item.slug}`}
                      className="flex w-fit items-center gap-1 text-xs text-(--secondary-bg-color) sm:text-sm"
                    >
                      {item.btnName}
                      <ArrowRight
                        size={14}
                        className="arrow"
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* other news/blogs section */}
        <section className="space-y-8 bg-(--primary-bg-color) px-5 pb-10 pt-5 sm:px-8 sm:pb-12 md:px-12 md:pb-15 lg:px-20 xl:px-30">
          <h3 className="text-center text-3xl sm:text-4xl md:text-5xl">
            Other News
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {otherBlogs.map((item) => (
              <Link
                key={item.slug}
                href={`/blogs/${item.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg text-(--bg-muted) shadow-lg hover-state"
              >
                <Image
                  src={`/blogs/${item.imageName}`}
                  alt={item.title}
                  width={830}
                  height={750}
                  className="h-80 w-full object-cover"
                />

                <div className="flex flex-1 flex-col space-y-4 px-4 py-4 sm:space-y-5">
                  <span className="block text-sm sm:text-base">
                    By:{" "}
                    <span className="text-(--secondary-bg-color)">
                      {item.author}
                    </span>{" "}
                    / {item.date_created}
                  </span>

                  <h4 className="text-xl text-(--primary-text-color) sm:text-2xl">
                    {item.title}
                  </h4>

                  <p className="flex-1 text-sm sm:text-base">
                    {item.description}
                  </p>

                  <span className="flex w-fit items-center gap-1 text-sm text-(--secondary-bg-color) sm:text-base">
                    {item.btnName}
                    <ArrowRight
                      size={16}
                      className="arrow"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogDetailPage;