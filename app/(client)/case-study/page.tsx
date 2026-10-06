import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import HeroSectionForPages from "../components/common/HeroSectionForPages";
import StatsCounter from "../components/StatsCounter";
import {
  stats,
  processSteps,
  caseStudies,
  featuredCaseStudyImage,
} from "@/lib/client/data";

const page = () => {
  return (
    <>
      <Navbar />
      <main className="font-bold">
        {/* header */}
        <HeroSectionForPages title="Case Study" />

        {/* results / impact stats */}
        <section className="bg-(--bg-footer) px-5 py-12 text-(--primary-bg-color) sm:px-6 sm:py-15 md:px-10 lg:px-20 xl:px-30">
          <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {stats.map((item, index) => (
              <div className="space-y-2" key={index}>
                <p className="text-4xl text-(--secondary-bg-color) sm:text-5xl">
                  <StatsCounter value={item.value} />
                </p>
                <p className="text-sm text-(--bg-muted) sm:text-base">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* featured case study */}
        <section className="px-5 py-10 sm:px-6 md:px-10 lg:px-20 xl:px-30">
          <div className="grid grid-cols-1 overflow-hidden rounded-md shadow-md md:grid-cols-2">
            <Image
              src={featuredCaseStudyImage}
              alt="Featured Case Study"
              className="h-60 w-full object-cover sm:h-80 md:h-full"
            />

            <div className="space-y-5 self-center p-6 lg:p-10">
              <span className="w-fit rounded bg-(--secondary-bg-color) px-3 py-1 text-xs uppercase tracking-wide text-(--primary-bg-color)">
                Featured Case Study
              </span>

              <h3 className="text-2xl sm:text-3xl">
                Scaling Conversion Rates for a Retail Brand
              </h3>

              <p className="text-sm text-(--bg-muted) sm:text-base">
                A complete e-commerce overhaul — from landing pages to checkout —
                that turned casual visitors into repeat buyers within weeks.
              </p>

              <div className="grid grid-cols-3 gap-3 py-2 sm:gap-5">
                {["+48%", "×2.3", "6-Week"].map((item, index) => (
                  <div className="space-y-1" key={index}>
                    <p className="text-xl text-(--secondary-bg-color) sm:text-2xl">
                      {item}
                    </p>
                    <p className="text-xs text-(--bg-muted) sm:text-sm">
                      Conversion Gain
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group flex w-fit items-center gap-1 rounded-3xl btn-primary-hover-state px-6 py-2 text-sm "
              >
                View Full Case Study
                <ArrowRight size={16} className="arrow"/>
              </Link>
            </div>
          </div>
        </section>

        {/* case study grid */}
        <section className="space-y-8 px-5 py-10 sm:px-6 md:px-10 lg:px-20 xl:px-30">
          <div className="mx-auto max-w-2xl space-y-3 text-center sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl">
              Selected Case Studies
            </h2>
            <p className="text-sm text-(--bg-muted) sm:text-base">
              A glimpse of the challenges we took on and the results our clients
              walked away with.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {caseStudies.map((item, index) => (
              <div
                className="group flex flex-col overflow-hidden rounded-md shadow-md hover-state"
                key={index}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover sm:h-56"
                />

                <div className="flex flex-1 flex-col gap-4 p-5 lg:p-6">
                  <span className="w-fit rounded bg-(--accent-color) px-3 py-1 text-xs uppercase tracking-wide text-(--primary-bg-color)">
                    {item.category}
                  </span>

                  <h4 className="text-xl sm:text-2xl">{item.title}</h4>

                  <p className="flex-1 text-sm text-(--bg-muted)">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.metrics.map((metric, mIndex) => (
                      <span
                        className="rounded bg-(--surface) px-3 py-1 text-xs text-(--primary-text-color) sm:text-sm"
                        key={mIndex}
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="flex w-fit items-center gap-1 text-sm text-(--secondary-bg-color)"
                  >
                    Read Case Study
                    <ArrowRight size={16} className="arrow"/>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* how we deliver */}
        <section className="bg-blue-500/5 px-5 py-10 sm:px-6 md:px-10 lg:px-20 xl:px-30">
          <div className="mx-auto max-w-2xl space-y-3 pb-8 text-center sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl">How We Deliver</h2>
            <p className="text-sm text-(--bg-muted) sm:text-base">
              Every case study follows the same proven path to measurable
              results.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {processSteps.map((item, index) => (
              <div
                className="space-y-4 rounded-md bg-(--primary-bg-color) hover-state p-5 text-center shadow-md sm:p-6 lg:p-7"
                key={index}
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-(--surface)">
                  <item.icon
                    className="h-7 w-7 text-(--secondary-bg-color)"
                    strokeWidth={2}
                  />
                </span>

                <h3 className="text-xl text-(--primary-text-color)">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-(--bg-muted)">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* call to action banner */}
        <section className="bg-(--primary-text-color) mt-10">
          <div className="relative bg-[url('/about/illustrator2.png')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

            <div className="relative z-10 space-y-5 px-5 py-12 text-center text-(--primary-bg-color) sm:px-8 sm:py-15 md:px-12 lg:px-20 xl:px-30">
              <h2 className="text-3xl sm:text-4xl md:text-5xl">
                Ready to Write Your Own Case Study?
              </h2>

              <p className="mx-auto max-w-xl text-sm text-(--bg-table) sm:text-base">
                Let us help you turn challenges into the numbers your business
                will be proud of.
              </p>

              <Link
                href="/contact"
                className="group flex w-fit mx-auto items-center gap-1 rounded-3xl px-6 py-2 text-sm btn-secondary-hover-state  sm:text-base"
              >
                Start Your Project
                <ArrowRight size={16} className="arrow"/>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default page;