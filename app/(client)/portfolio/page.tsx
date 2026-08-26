import React from "react";
import image1 from "@/public/portfolio/image1.jpg";
import image2 from "@/public/portfolio/image2.jpg";
import image3 from "@/public/portfolio/image3.jpg";
import image4 from "@/public/portfolio/image4.jpg";
import image5 from "@/public/portfolio/image5.jpg";
import Image from "next/image";
import EnquirySection from "../components/EnquirySection";

const images = [
  {
    label: "Image 1",
    image: image1,
    altText: "Image 1",
  },
  {
    label: "Image 2",
    image: image2,
    altText: "Image 2",
  },
  {
    label: "Image 3",
    image: image3,
    altText: "Image 3",
  },
  {
    label: "Image 4",
    image: image4,
    altText: "Image 4",
  },
  {
    label: "Image 5",
    image: image5,
    altText: "Image 5",
  },
];

const topRowImages = images.slice(0, 2);
const bottomRowImages = images.slice(2);

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

      <EnquirySection />
    </main>
  );
};

export default page;
