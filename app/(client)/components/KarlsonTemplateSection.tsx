
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";

interface KarlsonListItem {
  name: string;
}

interface KarlsonTemplate {
  imageName: string;
  title: string;
  description: string;
  lists: KarlsonListItem[];
  btn1: string;
  btn2: string;
}

const KarlsonTemplateSection = () => {
  const [karlsonTemplate, setKarlsonTemplate] = useState<
    KarlsonTemplate[]
  >([]);

  useEffect(() => {
    const getAllKarlsonTemplateContents = async () => {
      try {
        const response = await fetch(
          "/api/client/home/karlson-template"
        );

        const data = await response.json();

        console.log("Karlson Template:", data);

        if (!response.ok) {
          throw new Error(
            data?.error ||
              `Request failed with status ${response.status}`
          );
        }

        setKarlsonTemplate(data);
      } catch (error) {
        console.error(
          "Error fetching karlson template data:",
          error
        );
      }
    };

    getAllKarlsonTemplateContents();
  }, []);

  const contents = karlsonTemplate[0];

  return (
    <section
      className="
        flex
        flex-col
        gap-8
        bg-(--bg-random)
        px-5
        py-10
        font-bold
        sm:px-8
        sm:py-12
        md:flex-row
        md:items-center
        md:gap-5
        md:px-12
        md:py-15
        lg:px-20
        xl:px-30
      "
    >
      {/* Illustration */}
      <div className="w-full md:w-[45%]">
        {contents?.imageName && (
          <Image
            src={`/home/${contents.imageName}`}
            alt="Illustration"
            width={1200}
            height={800}
            className="mx-auto h-auto w-full max-w-xl"
          />
        )}
      </div>

      {/* Title and description */}
      <div className="w-full space-y-5 md:w-[55%]">
        <h2 className="text-3xl sm:text-4xl md:text-5xl">
          {contents?.title}
        </h2>

        <p className="text-left text-base text-(--bg-muted) sm:text-lg md:text-center">
          {contents?.description}
        </p>

        {/* Customer service list */}
        <div className="grid grid-cols-1 gap-2 py-5 font-semibold sm:grid-cols-2">
          {contents?.lists?.map((item, index) => (
            <p
              key={`${item.name}-${index}`}
              className="
                flex
                items-center
                gap-2
                rounded
                bg-(--surface)
                px-3
                py-2
                text-sm
                text-(--bg-muted)
                sm:text-base
              "
            >
              <span>
                <CircleCheck
                  className="text-(--secondary-bg-color)"
                  size={18}
                />
              </span>

              {item.name}
            </p>
          ))}
        </div>

        {/* Buttons */}
        <div
          className="
            flex
            flex-col
            gap-3
            text-base
            font-semibold
            sm:flex-row
            sm:text-lg
          "
        >
          <Link
            href="/contact"
            className="group flex items-center rounded-3xl px-7 py-2 btn-secondary-hover-state"
          >
            {contents?.btn1}

            <ArrowRight
              size={18}
              className="arrow"
            />
          </Link>

          <Link
            href="/about"
            className="flex items-center rounded-3xl px-7 py-2 btn-primary-hover-state"
          >
            {contents?.btn2}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KarlsonTemplateSection;
