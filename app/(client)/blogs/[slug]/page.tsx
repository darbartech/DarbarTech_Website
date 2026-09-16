import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { blogs, getBlogBySlug } from "@/lib/blogs";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import HeroSectionForPages from "../../components/HeroSectionForPages";
import EnquirySection from "../../components/EnquirySection";

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const blog = getBlogBySlug(slug) ?? blogs[0];

  const otherBlogs = blogs.filter((item) => item.slug !== blog.slug);

  const shortDescription = (item: (typeof blogs)[number]) =>
    item.content
      .join(" ")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 30)
      .join(" ") + "...";

  return (
    <>
      <Navbar />

      <main className="font-bold">
        <HeroSectionForPages title="Blogs" breadcrumbLabel="blogs" />

        <section className="space-y-8 px-5 pb-10 pt-5 sm:px-8 sm:pb-12 md:px-12 md:pb-15 lg:px-20 xl:px-30">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start">
            {/* blogs */}
            <div className="mx-auto w-full max-w-4xl space-y-6 lg:mx-0 lg:flex-1">
<Image
                src={blog.image}
                alt={blog.imageAlt}
                width={800}
                height={450}
                className="h-auto w-full rounded-md shadow-md"
              />

              <span className="block text-sm text-(--bg-muted) sm:text-base">
                By:{" "}
                <span className="text-(--secondary-bg-color)">{blog.author}</span>{" "}
                / {blog.date}
              </span>

              <h2 className="text-2xl text-(--primary-text-color) sm:text-3xl md:text-4xl">
                {blog.title}
              </h2>

              <div className="space-y-4 font-sans sm:space-y-5">
                {blog.content.map((paragraph, index) => (
                  <p key={index} className="text-sm text-(--bg-muted) sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* latest news sidebar */}
            <aside className="w-full shrink-0 space-y-5 rounded-md bg-(--primary-bg-color) p-5 shadow-lg lg:w-80">
              <h3 className="border-b-2 border-(--secondary-bg-color) pb-2 text-xl text-(--primary-text-color) sm:text-2xl">
                Latest News
              </h3>

              {otherBlogs.map((item) => (
                <div
                  key={item.slug}
                  className="space-y-2 border-b border-(--bg-muted)/40 pb-4 last:border-none last:pb-0"
                >
                  <h4 className="text-base text-(--primary-text-color) sm:text-lg">
                    {item.title}
                  </h4>

                  <span className="block text-xs text-(--secondary-bg-color) sm:text-sm">
                    By: {item.author}
                  </span>

                  <p className="text-xs text-(--bg-muted) sm:text-sm">
                    {shortDescription(item)}
                  </p>

                  <Link
                    href={`/blogs/${item.slug}`}
                    className="flex w-fit items-center gap-1 text-xs text-(--secondary-bg-color) sm:text-sm"
                  >
                    Read More
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="space-y-8 bg-(--primary-bg-color) px-5 pb-10 pt-5 sm:px-8 sm:pb-12 md:px-12 md:pb-15 lg:px-20 xl:px-30">
          <h3 className="text-center text-3xl sm:text-4xl md:text-5xl">
            Other News
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {otherBlogs.map((item) => (
              <Link
                key={item.slug}
                href={`/blogs/${item.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg text-(--bg-muted) shadow-lg transition-all hover:shadow-xl"
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={600}
                  height={375}
                  className="h-52 w-full object-cover"
                />

                <div className="flex flex-1 flex-col space-y-4 px-4 py-4 sm:space-y-5">
                  <span className="block text-sm sm:text-base">
                    By:{" "}
                    <span className="text-(--secondary-bg-color)">
                      {item.author}
                    </span>{" "}
                    / {item.date}
                  </span>

                  <h4 className="text-xl text-(--primary-text-color) sm:text-2xl">
                    {item.title}
                  </h4>

                  <p className="flex-1 text-sm sm:text-base">{item.excerpt}</p>

                  <span className="flex w-fit items-center gap-1 text-sm text-(--secondary-bg-color) sm:text-base">
                    Read More
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <EnquirySection />
      </main>

      <Footer />
    </>
  );
};

export default BlogDetailPage;