
"use client";

import Link from "next/link";

import { ArrowRight, RotateCcw } from "lucide-react";

import { useEffect, useState } from "react";

const FeaturedSolutions = () => {
  const [featuredSolutions, setFeaturedSolutions] = useState<any[]>([]);

  useEffect(() => {
    const getAllFeaturedSolutions = async () => {
      try {
        const response = await fetch(
          "/api/client/home/featured-solutions"
        );

        if (!response.ok) {
          throw new Error(
            `Request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        setFeaturedSolutions(data);
      } catch (error) {
        console.error(
          "Error fetching featured solutions data:",
          error
        );
      }
    };

    getAllFeaturedSolutions();
  }, []);

  // Since the API returns an array of featured solution sections
  // and each section contains a "lists" array
  const solution = featuredSolutions[0];

  return (
    <section className="py-10 font-bold sm:py-12 md:py-15">
      {/* Info div */}
      <div className="mx-auto max-w-5xl space-y-6 px-5 py-5 text-center sm:space-y-8 sm:px-8 md:px-12 lg:px-20 xl:px-30">
        <div>
          <p className="text-xl text-(--secondary-bg-color) sm:text-2xl">
            {solution?.info || "What we offer"}
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl">
            {solution?.title || "Our Featured Solutions"}
          </h2>
        </div>

        <p className="text-base text-(--bg-muted) sm:text-lg md:text-xl">
          {solution?.description ||
            "Discover our professional solutions designed to help your business grow."}
        </p>
      </div>

      {/* Cards div */}
      <div
        className="
          grid
          grid-cols-1
          gap-5
          px-5
          py-5
          sm:px-8
          md:grid-cols-2
          md:px-12
          lg:grid-cols-4
          lg:px-20
          xl:px-30
        "
      >
        {solution?.lists?.map((item: any, index: number) => (
          <Link
            href="/about"
            className="
              group
              space-y-2
              rounded-lg
              px-4
              py-7
              shadow-[5px_5px_15px_rgba(0,0,0,0.15)]
              hover-state
              sm:px-5
              sm:py-8
            "
            key={index}
          >
            {/* Icon */}
            <span>
              <RotateCcw
                className="text-(--secondary-bg-color)"
                size={40}
              />
            </span>

            {/* Card title */}
            <h3 className="text-xl font-bold sm:text-2xl">
              {item.title}
            </h3>

            {/* Card description */}
            <p className="text-base text-(--bg-muted) sm:text-lg">
              {item.description}
            </p>

            {/* Button */}
            <span className="inline-flex w-fit items-center gap-1 text-sm text-(--secondary-bg-color)">
              {item.btnName || "Discover More"}

              <ArrowRight
                size={18}
                className="arrow"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSolutions;
