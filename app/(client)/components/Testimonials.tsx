"use client";

import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";

interface TestimonialItem {
  quote: string;
  person: string;
  role: string;
}

interface TestimonialContent {
  info: string;
  title: string;
  lists: TestimonialItem[];
}

interface TestimonialsProps {
  illustration: StaticImageData;
}

const PER_PAGE = 3;

const Testimonials = ({ illustration }: TestimonialsProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const [activePage, setActivePage] = useState(0);
  const [contents, setContents] = useState<TestimonialContent | null>(null);

  useEffect(() => {
    const getAllTestimonials = async () => {
      try {
        const response = await fetch(
          "/api/client/home/testimonials"
        );

        if (!response.ok) {
          throw new Error(
            `Request failed with status ${response.status}`
          );
        }

        const data: TestimonialContent[] = await response.json();

        setContents(data[0] ?? null);
      } catch (error) {
        console.error(
          "Error fetching testimonials data:",
          error
        );
      }
    };

    getAllTestimonials();
  }, []);

  const testimonials = contents?.lists ?? [];

  const totalPages = Math.ceil(testimonials.length / PER_PAGE);

  const scrollToPage = (page: number) => {
    const track = trackRef.current;

    if (!track) return;

    const cards = track.querySelectorAll(
      "[data-testimonial-card]"
    );

    const firstCard = cards[page * PER_PAGE];

    if (!firstCard) return;

    track.scrollTo({
      left:
        (firstCard as HTMLElement).offsetLeft -
        track.offsetLeft,
      behavior: "smooth",
    });

    setActivePage(page);
  };

  const handleScroll = () => {
    const track = trackRef.current;

    if (!track) return;

    const cards = track.querySelectorAll(
      "[data-testimonial-card]"
    );

    if (cards.length === 0) return;

    const center =
      track.scrollLeft + track.offsetWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const element = card as HTMLElement;

      const cardCenter =
        element.offsetLeft + element.offsetWidth / 2;

      const distance = Math.abs(cardCenter - center);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActivePage(
      Math.min(
        Math.floor(closestIndex / PER_PAGE),
        Math.max(totalPages - 1, 0)
      )
    );
  };

  return (
    <section
      className="
        space-y-10
        px-5
        py-10
        text-center
        font-bold
        sm:px-8
        sm:py-12
        md:px-12
        md:py-15
        lg:px-20
        xl:px-30
      "
    >
      <div className="space-y-3">
        <h3 className="text-xl text-(--secondary-bg-color) sm:text-2xl">
          {contents?.info}
        </h3>

        <h2 className="text-3xl sm:text-4xl md:text-5xl">
          {contents?.title}
        </h2>
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="
          flex
          snap-x
          snap-mandatory
          gap-5
          overflow-x-auto
          scroll-smooth
          scrollbar-none
          [&::-webkit-scrollbar]:hidden
        "
      >
        {testimonials.map((item, index) => (
          <div
            key={index}
            data-testimonial-card
            className="
              min-w-80
              flex-1
              snap-start
              space-y-5
              rounded-lg
              border-2
              border-(--surface)
              p-4
              text-sm
              shadow-xs
              lg:min-w-0
              lg:w-[calc(33.333%-14px)]
              lg:flex-none
            "
          >
            <p className="text-justify text-base text-(--bg-muted) sm:text-lg">
              {item.quote}
            </p>

            <div className="flex items-center justify-start gap-2 text-start font-bold">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={illustration}
                  alt="Profile Image"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h3 className="-mb-1 text-lg sm:text-xl">
                  {item.person}
                </h3>

                <p className="text-sm text-(--secondary-bg-color)">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-1">
          {Array.from({ length: totalPages }).map(
            (_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => scrollToPage(index)}
                className={`h-3 rounded-full transition-all duration-200 ${
                  index === activePage
                    ? "w-5 bg-(--secondary-bg-color)"
                    : "w-3 bg-(--surface)"
                }`}
                aria-label={`Go to review page ${
                  index + 1
                }`}
              />
            )
          )}
        </div>
      )}
    </section>
  );
};

export default Testimonials;