
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import heroSectionLine from "@/public/home/hero-section/hero-section-line.png";

interface HeroSectionContent {
  id: number;
  name: string;
  content: string;
  link: string;
  status: string;
  imageName: string;
}

const HeroSection = () => {
  const [heroSectionContents, setHeroSectionContents] = useState<
    HeroSectionContent[]
  >([]);

  useEffect(() => {
    const getHeroSectionContents = async () => {
      try {
        const response = await fetch("/api/client/home/hero-section", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        // Make sure the API response is an array.
        // This prevents the component from breaking if the API
        // returns an unexpected response structure.
        if (!Array.isArray(data)) {
          console.error("Invalid hero section response:", data);
          setHeroSectionContents([]);
          return;
        }

        const normalizedData: HeroSectionContent[] = data.map(
          (item: Partial<HeroSectionContent>) => ({
            id: Number(item.id),
            name: item.name ?? "",
            content: item.content ?? "",
            link: item.link ?? "",
            status: item.status ?? "",
            imageName: item.imageName ?? "",
          })
        );

        setHeroSectionContents(normalizedData);
      } catch (error) {
        console.error("Error fetching hero section data:", error);
        setHeroSectionContents([]);
      }
    };

    getHeroSectionContents();
  }, []);

  const getHeroContent = (name: string) => {
    const target = name.trim().toLowerCase();

    return heroSectionContents.find((item) => {
      if (item.status !== "active") return false;

      const current = item.name.trim().toLowerCase();

      if (current === target) return true;

      if (!current.startsWith(target)) return false;

      return /[\s\-_(\d]/.test(current.charAt(target.length));
    });
  };

  const heading = getHeroContent("heading");

  const primaryParagraph = getHeroContent("Primary paragraph");
  const primaryButton = getHeroContent("Primary button");

  const secondaryParagraph = getHeroContent("Secondary paragraph");
  const secondaryButton = getHeroContent("Secondary button");

  const topLeftIcon = getHeroContent("Icon (top-left)");
  const topRightIcon = getHeroContent("Icon (top-right)");

  const middleLeftIcon = getHeroContent("Icon (middle-left)");
  const middleRightIcon = getHeroContent("Icon (middle-right)");

  const bottomLeftIcon = getHeroContent("Icon (bottom-left)");
  const bottomRightIcon = getHeroContent("Icon (bottom-right)");

  return (
    <section
      className="
    relative
    flex
    h-screen
    flex-col
    justify-center
    gap-5
    overflow-y-hidden
    px-5
    text-center
    text-sm
    font-bold
    sm:px-8
    md:px-12
    lg:px-20
    xl:px-30
    xl:pb-15
  "
    >
      <h1
        className="
      text-4xl
      leading-tight
      sm:text-5xl
      md:text-6xl
      lg:text-7xl
    "
      >
        {heading?.content}
      </h1>

      {/* Absolute hero-section-line image */}
      <Image
        src={heroSectionLine}
        alt="Hero Section Line Image"
        loading="eager"
        className="
      absolute
      bottom-95
      left-1/2
      w-[120%]
      -translate-x-1/2
      pointer-events-none
      sm:bottom-6
      sm:w-[110%]
      md:bottom-8
      md:w-full
      lg:bottom-10
    "
      />

      {/* top left */}
      <div
        className="
      absolute
      bottom-110
      left-15
      w-fit
      rounded-lg
      bg-pink-600
      p-1.5
      sm:bottom-35
      sm:left-30
      md:bottom-40
      md:left-30
      lg:p-2
      lg:bottom-50
      lg:left-50
      xl:p-3
      xl:bottom-65
      xl:left-60
      2xl:bottom-80
      2xl:left-65
    "
      >
        {topLeftIcon?.imageName && (
          <Image
            src={`/home/hero-section/${topLeftIcon.imageName}`}
            alt={topLeftIcon.content || "Top left icon"}
            width={28}
            height={28}
          />
        )}
      </div>

      {/* top right */}
      <div
        className="
      absolute
      right-10
      bottom-112
      w-fit
      rounded-lg
      bg-(--bg-table)
      p-1.5
      sm:right-15
      sm:bottom-40
      md:right-16
      md:bottom-45
      lg:p-2
      lg:right-20
      lg:bottom-70
      xl:p-3
      xl:right-30
      xl:bottom-75
      2xl:bottom-90
    "
      >
        {topRightIcon?.imageName && (
          <Image
            src={`/home/hero-section/${topRightIcon.imageName}`}
            alt={topRightIcon.content || "Top right icon"}
            width={28}
            height={28}
          />
        )}
      </div>

      {/* middle left */}
      <div
        className="
      absolute
      bottom-100
      left-30
      w-fit
      rounded-lg
      bg-(--accent-color)
      p-1.5
      sm:bottom-18
      sm:left-50
      md:bottom-20
      md:left-55
      lg:p-2
      lg:bottom-29
      lg:left-80
      xl:p-3
      xl:bottom-32
      xl:left-100
      2xl:bottom-37
      2xl:left-115
    "
      >
        {middleLeftIcon?.imageName && (
          <Image
            src={`/home/hero-section/${middleLeftIcon.imageName}`}
            alt={middleLeftIcon.content || "Middle left icon"}
            width={28}
            height={28}
          />
        )}
      </div>

      {/* middle right */}
      <div
        className="
      absolute
      right-17
      bottom-102
      w-fit
      rounded-lg
      bg-(--bg-table)
      p-1.5
      sm:right-35
      sm:bottom-25
      md:right-35
      md:bottom-30
      lg:p-2
      lg:right-50
      lg:bottom-45
      xl:p-3
      xl:right-65
      xl:bottom-50
      2xl:right-70
      2xl:bottom-55
    "
      >
        {middleRightIcon?.imageName && (
          <Image
            src={`/home/hero-section/${middleRightIcon.imageName}`}
            alt={middleRightIcon.content || "Middle right icon"}
            width={28}
            height={28}
          />
        )}
      </div>

      {/* bottom left */}
      <div
        className="
      absolute
      bottom-90
      left-10
      w-fit
      rounded-lg
      bg-(--bg-footer)
      p-1.5
      sm:left-20
      sm:bottom-2
      md:left-24
      lg:p-2
      lg:left-36
      xl:p-3
      xl:left-50
      xl:bottom-5
      2xl:bottom-0
    "
      >
        {bottomLeftIcon?.imageName && (
          <Image
            src={`/home/hero-section/${bottomLeftIcon.imageName}`}
            alt={bottomLeftIcon.content || "Bottom left icon"}
            width={28}
            height={28}
          />
        )}
      </div>

      {/* bottom right */}
      <div
        className="
      absolute
      right-25
      bottom-95
      w-fit
      rounded-lg
      bg-(--bg-footer)
      p-1.5
      sm:right-45
      sm:bottom-10
      md:right-50
      md:bottom-10
      lg:p-2
      lg:right-70
      lg:bottom-15
      xl:p-3
      xl:right-90
      xl:bottom-20
      2xl:right-95
      2xl:bottom-15
    "
      >
        {bottomRightIcon?.imageName && (
          <Image
            src={`/home/hero-section/${bottomRightIcon.imageName}`}
            alt={bottomRightIcon.content || "Bottom right icon"}
            width={28}
            height={28}
          />
        )}
      </div>

      {/* paragraphs and buttons */}
      <div className="space-y-4 font-semibold sm:space-y-5 mt-40 sm:mt-0">
        <p
          className="
        text-base
        text-(--bg-muted)
        sm:text-lg
        md:text-xl
      "
        >
          {primaryParagraph?.content}
        </p>

        <Link
          href={primaryButton?.link || "#"}
          className="
        mx-auto
        inline-block
        rounded-4xl
        px-6
        py-3
        text-base
        border-2
        btn-primary-hover-state
        sm:px-7
        sm:py-3.5
        sm:text-lg
        md:px-8
        md:py-4
        md:text-xl
      "
        >
          {primaryButton?.content}
        </Link>

        <p
          className="
        flex
        flex-col
        items-center
        justify-center
        gap-1
        text-sm
        text-(--bg-muted)
        sm:flex-row
        sm:gap-2
        sm:text-base
        md:text-lg
      "
        >
          <span>{secondaryParagraph?.content}</span>

          <Link
            href={secondaryButton?.link || "#"}
            className="group flex items-center gap-1 text-(--gray-color)"
          >
            <span>{secondaryButton?.content}</span>

            <ArrowRight
              size={18}
              className="
          arrow
        "
            />
          </Link>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
