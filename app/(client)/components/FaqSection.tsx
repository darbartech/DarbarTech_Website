
"use client";

import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Plus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqContent {
  info: string;
  title: string;
  lists: FaqItem[];
  isImageOnLeft: boolean;
}

interface FaqSectionProps {
  illustration: StaticImageData;
}

const FaqSection = ({ illustration }: FaqSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [allFaqs, setAllFaqs] = useState<FaqContent[]>([]);

  useEffect(() => {
    const getAllFaqs = async () => {
      try {
        const response = await fetch("/api/client/home/faq");

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);

          throw new Error(
            errorData?.error ||
              `Request failed with status ${response.status}`
          );
        }

        const data: FaqContent[] = await response.json();

        setAllFaqs(data);
      } catch (error) {
        console.error("Error fetching FAQs data:", error);
      }
    };

    getAllFaqs();
  }, []);

  const contents = allFaqs[0];

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
      <div className="mx-auto max-w-3xl space-y-5 text-center font-bold">
        <h3 className="text-xl text-(--secondary-bg-color)">
          {contents?.info}
        </h3>

        <h2 className="text-3xl sm:text-4xl md:text-5xl">
          {contents?.title}
        </h2>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:gap-15">
        <Image
          src={illustration}
          alt="FAQ Illustration"
          className="mx-auto h-auto w-full max-w-xl lg:w-[45%]"
        />

        <div className="w-full space-y-3 lg:w-[55%]">
          {contents?.lists?.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                className="overflow-hidden rounded shadow-md"
                key={`${item.question}-${index}`}
              >
                <div className="flex items-center">
                  {/* Plus Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="
                      flex
                      shrink-0
                      cursor-pointer
                      items-center
                      justify-center
                      bg-(--secondary-bg-color)
                      px-2
                      py-3
                      text-(--primary-bg-color)
                    "
                    aria-expanded={isOpen}
                    aria-label={
                      isOpen
                        ? "Close question"
                        : "Open question"
                    }
                  >
                    <Plus
                      className={`transition-transform duration-300 ease-in-out ${
                        isOpen
                          ? "rotate-45"
                          : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* Question */}
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="
                      flex
                      w-full
                      cursor-pointer
                      px-2
                      py-3
                      text-left
                      text-sm
                      text-(--primary-text-color)
                      sm:px-6
                      sm:text-base
                      lg:px-10
                    "
                    aria-expanded={isOpen}
                  >
                    {item.question}
                  </button>
                </div>

                {/* Answer */}
                <div
                  className={`
                    grid
                    transition-[grid-template-rows]
                    duration-300
                    ease-in-out
                    ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <p
                      className="
                        px-4
                        pb-3
                        text-sm
                        text-(--bg-muted)
                        sm:px-6
                        sm:text-base
                        lg:px-10
                        lg:pl-20
                      "
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
