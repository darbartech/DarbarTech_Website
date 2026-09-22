"use client";

import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";

interface Testimonial {
  quote: string;
  person: string;
  role: string;
}

interface TestimonialsProps {
  illustration: StaticImageData;
  testimonials: Testimonial[];
}

const PER_PAGE = 3;

const Testimonials = ({ illustration, testimonials }: TestimonialsProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

  const pages: Testimonial[][] = [];
  for (let i = 0; i < testimonials.length; i += PER_PAGE) {
    pages.push(testimonials.slice(i, i + PER_PAGE));
  }

  const scrollToPage = (page: number) => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard =
      track.querySelectorAll("[data-testimonial-card]")[page * PER_PAGE];
    if (!firstCard) return;

    track.scrollTo({
      left: (firstCard as HTMLElement).offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
    setActivePage(page);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll("[data-testimonial-card]");
    if (cards.length === 0) return;

    const center = track.scrollLeft + track.offsetWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter =
        (card as HTMLElement).offsetLeft +
        (card as HTMLElement).offsetWidth / 2;
      const distance = Math.abs(cardCenter - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActivePage(Math.min(Math.floor(closestIndex / PER_PAGE), pages.length - 1));
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
          Testimonials
        </h3>

        <h2 className="text-3xl sm:text-4xl md:text-5xl">Our Clients Reviews</h2>
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      >
        {testimonials.map((item, index) => (
          <div
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
          lg:w-[calc(30%-14px)]
          lg:flex-none
        "
            key={index}
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
                <h3 className="-mb-1 text-lg sm:text-xl">{item.person}</h3>

                <p className="text-sm text-(--secondary-bg-color)">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-1">
        {pages.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => scrollToPage(index)}
            className={`h-3 w-3 rounded-full transition-all duration-200 ${
              index === activePage
                ? "bg-(--secondary-bg-color) w-5"
                : "bg-(--surface)"
            }`}
            aria-label={`Go to review page ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;