"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Plus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  illustration: StaticImageData;
  items: FaqItem[];
}

const FaqSection = ({ illustration, items }: FaqSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="
    space-y-10
    px-5
    py-10

    sm:px-8
    sm:py-12

    md:px-12
    md:py-15

    lg:px-20

    xl:px-30
  "
    >
      <div className="mx-auto max-w-2xl space-y-5 text-center font-bold">
        <h3 className="text-xl text-(--secondary-bg-color)">FAQ</h3>

        <h2 className="text-3xl sm:text-4xl md:text-5xl">
          Frequently Asked Questions
        </h2>

        <p className="text-base text-(--bg-muted) sm:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore natus,
          similique cumque sapiente veniam odio commodi eveniet ratione totam
          rerum.
        </p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-15">
        <Image
          src={illustration}
          alt="Illustrator"
          className="mx-auto h-auto w-full max-w-xl lg:w-[45%]"
        />

        <div className="w-full space-y-3 lg:w-[55%]">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                className="rounded shadow-md"
                key={index}
              >
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex shrink-0 items-center justify-center bg-(--secondary-bg-color) px-2 py-3 text-(--primary-bg-color) transition-transform hover:cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <Plus
                      className={`${isOpen ? "rotate-45" : ""} transition-transform duration-200`}
                    />
                  </button>

                  <p className="px-2 py-3 text-sm text-(--primary-text-color) sm:px-6 sm:text-base lg:px-10">
                    {item.question}
                  </p>
                </div>

                {isOpen && (
                  <p className="px-4 pb-3 text-sm text-(--bg-muted) sm:px-6 sm:text-base lg:px-10 lg:pl-20">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;