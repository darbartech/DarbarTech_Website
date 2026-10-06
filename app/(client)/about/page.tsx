
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeroSectionForPages from "../components/common/HeroSectionForPages";
import IllustrationAndContent from "../components/IllustrationAndContent";
import { CircleCheck, PlayIcon } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

interface AboutUsContent {
  id: number;
  info: string;
  title: string;
  description: string;
  lists:
    | string[]
    | {
        [key: string]: string;
      };
  imageName: string;
  isImageOnLeft: boolean;
}

interface AboutUsPillar {
  id: number;
  title: string;
  description: string;
  items: string[];
}

const page = () => {
  const [heroAndWhyChooseUs, setHeroAndWhyChooseUs] = useState<
    AboutUsContent[]
  >([]);

  const [pillars, setPillars] = useState<AboutUsPillar[]>([]);

  useEffect(() => {
    const getAboutUsData = async () => {
      try {
        const [contentsResponse, pillarsResponse] = await Promise.all([
          fetch("/api/client/about/contents"),
          fetch("/api/client/about/pillars"),
        ]);

        if (!contentsResponse.ok || !pillarsResponse.ok) {
          throw new Error("Failed to fetch About Us data");
        }

        const [contents, pillars] = await Promise.all([
          contentsResponse.json(),
          pillarsResponse.json(),
        ]);

        setHeroAndWhyChooseUs(contents);
        setPillars(pillars);
      } catch (error) {
        console.error("Error fetching about us data:", error);
      }
    };

    getAboutUsData();
  }, []);

  return (
    <>
      <Navbar />

      <main className="font-bold">
        <HeroSectionForPages title="About Us" />

        {heroAndWhyChooseUs.map((item) => {
          const lists = Array.isArray(item.lists)
            ? item.lists
            : Object.entries(item.lists).map(
                ([title, description]) => ({
                  slug: title.toLowerCase().replace(/\s+/g, "-"),
                  title,
                  description,
                  lists: [],
                }),
              );

          return (
            <IllustrationAndContent
              info={item.info}
              topic={item.title}
              description={item.description}
              lists={lists}
              image={item.imageName}
              isImageOnLeft={item.isImageOnLeft}
              key={item.id}
            />
          );
        })}

        {/* history, mission and who are we section */}
        <section className="px-5 py-10 sm:px-15 lg:px-30 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-sm">
          {pillars.map((item) => (
            <div className="space-y-5" key={item.id}>
              <h3 className="border-b border-(--bg-muted) pb-2 text-2xl">
                {item.title}
              </h3>

              <p className="text-(--bg-muted) font-semibold">
                {item.description}
              </p>

              <ul className="space-y-2 font-semibold">
                {item.items.map((item, index) => (
                  <li className="flex items-center gap-1" key={index}>
                    <span>
                      <CircleCheck size={18} />
                    </span>

                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* video section */}
        <section className="text-(--primary-bg-color) bg-[url('/about/illustrator2.png')] bg-cover bg-center">
          <div
            className=" py-10 px-5 lg:px-30 lg:py-20 space-y-5 flex items-stretch justify-between gap-5 relative after:absolute
    after:inset-0
    after:bg-(--primary-text-color)/70 sm:px-15"
          >
            <div className="flex-1 space-y-5 z-10">
              <p className="text-(--secondary-bg-color) text-sm">
                WATCH OUR VIDEO
              </p>

              <h3 className="text-2xl lg:text-5xl">
                Get Better Solution For Your Business
              </h3>

              <p className="text-sm text-(--bg-muted)">
                No fake products and services. The customer is king. Their lives
                and needs are the inspiration.
              </p>

              <Link
                href="/services"
                className="btn-primary-hover-state px-5 py-2 rounded text-sm"
              >
                VIEW OUR SERVICES
              </Link>
            </div>

            {/* play button */}
            <div className="flex-1 flex items-center justify-center z-10">
              <span className="flex h-32 w-32 items-center justify-center rounded-full border border-(--primary-bg-color)">
                <span className="flex h-24 w-24 items-center justify-center rounded-full border border-(--primary-bg-color)">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-(--secondary-bg-color)">
                    <PlayIcon size={36} />
                  </span>
                </span>
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default page;
