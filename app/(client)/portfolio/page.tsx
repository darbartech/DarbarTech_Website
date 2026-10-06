import React from "react";
import Image from "next/image";

import { portfolioImages } from "@/lib/client/data";

const topRowImages = portfolioImages.slice(0, 2);
const bottomRowImages = portfolioImages.slice(2);

const page = () => {
  return (
    <main className="font-bold space-y-5">
      {/* hero section */}
      <section className="space-y-5">
        <div className="text-center space-y-1">
          <h2 className=" text-md text-(--secondary-bg-color)">Portfolio</h2>
          <h3 className="text-3xl ">Our Work</h3>
        </div>

        <div className="font-normal flex items-center w-fit mx-auto border rounded-sm">
          {["ALL", "LIFE", "MOMENTS", "NATURE", "STORIES", "TRAVEL"].map(
            (item, index) => (
              <button
                key={index}
                className="px-5 py-2 border border-(--bg-muted) text-(--bg-muted) text-xs"
              >
                <span>{item}</span>
              </button>
            ),
          )}
        </div>
      </section>

      <section className="px-30 pb-10 space-y-5">
        <div className="flex items-center gap-5 overflow-hidden">
          {topRowImages.map((item, index) => (
            <Image
              src={item.image}
              alt={item.altText}
              key={index}
              className="rounded-lg h-100"
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-5 overflow-hidden">
          {bottomRowImages.map((item, index) => (
            <Image
              src={item.image}
              alt={item.altText}
              key={index}
              className="rounded-lg h-100 w-full"
            />
          ))}
        </div>

        <button className="rounded px-7 py-2 bg-(--secondary-bg-color) text-(--primary-bg-color) block mx-auto ">
          GET IN TOUCH
        </button>
      </section>
          
    </main>
  );
};

export default page;
