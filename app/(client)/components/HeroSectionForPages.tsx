"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  title: string;
}

const HeroSectionForPages = ({ title }: Props) => {
  const pathname = usePathname();

  const page = pathname.split("/").filter(Boolean).pop();

  return (
    <section className={`space-y-3 px-4 pb-5 text-center sm:px-6 sm:py-14 md:space-y-5 md:px-10 md:py-16 lg:px-20 lg:py-20 xl:px-30`}>
      <h2
        className="
    relative
    pb-2
    text-3xl
    after:absolute
    after:bottom-0
    after:left-1/2
    after:h-1
    after:w-15
    after:-translate-x-1/2
    after:bg-(--secondary-bg-color)
    after:content-['']
    sm:text-4xl
    md:text-5xl
  "
      >
        {title}
      </h2>
      {page === "login" || page === "register" ? (
        ""
      ) : (
        <p className="text-sm font-semibold sm:text-base">
          <Link href="/" className="text-(--bg-muted)">
            Home &gt;{" "}
          </Link>
          <span className="capitalize text-(--secondary-bg-color)">{page}</span>
        </p>
      )}
    </section>
  );
};

export default HeroSectionForPages;
