"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const LatestBlogsSection = () => {

  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  
    useEffect(() => {
      const getAllBlogs = async () => {
        try {
          const response = await fetch(
            "/api/client/home/blogs"
          );
  
          if (!response.ok) {
            throw new Error(
              `Request failed with status ${response.status}`
            );
          }
  
          const data = await response.json();

  
          setAllBlogs(data);
        } catch (error) {
          console.error(
            "Error fetching blogs data:",
            error
          );
        }
      };
  
      getAllBlogs();
    }, []);

    const contents = allBlogs[0];

  return (
    <section
      className="
    space-y-8
    px-5
    py-10
    font-bold

    sm:px-8
    sm:py-12

    md:px-12
    md:py-15

    lg:px-20

    xl:px-30
  "
    >
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl">
        {contents?.title}
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {contents?.lists?.slice(0,3).map((item, index) => (
          <Link
            href={`/blogs/${item.slug}`}
            className="overflow-hidden rounded-lg text-(--bg-muted) shadow-lg group hover-state "
            key={item.slug}
          >
            <Image
              src={`/blogs/${item.imageName}`}
              alt={item.title}
              className="h-80 w-full object-cover"
              width={100}
              height={30}
            />

            <div className="space-y-4 px-4 py-4 sm:space-y-5">
              <span className="block text-sm sm:text-base">
                By:{" "}
                <span className="text-(--secondary-bg-color)">
                  {item.author}
                </span>{" "}
                / {item.date}
              </span>

              <h3 className="text-xl text-(--primary-text-color) sm:text-2xl">
                {item.title}
              </h3>

              <p className="text-sm sm:text-base">{item.description}</p>

              <button
                className="flex w-fit items-center gap-1 text-sm text-(--secondary-bg-color) sm:text-base"
              >
                {item.btnName}
                <ArrowRight size={16} className="arrow" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestBlogsSection;
