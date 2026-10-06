"use client";

import React, { Suspense, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import Link from "next/link";

import Image from "next/image";

import { ArrowRight, CircleCheck } from "lucide-react";

import HeroSectionForPages from "../components/common/HeroSectionForPages";

import Navbar from "../components/common/Navbar";

import Footer from "../components/common/Footer";

interface Category {
  slug: string;
  title: string;
  description: string;
  lists: string[];
}

interface Service {
  id: number;
  title: string;
  description: string;
  category: Category[];
  image: string;
  altDescription: string;
  btnName: string;
  isImageOnLeft: boolean;
}

const ServicePageContent = () => {
  const searchParams = useSearchParams();

  const requestedSlug = searchParams.get("service");

  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const response = await fetch("/api/client/services");

        if (!response.ok) {
          throw new Error(
            `Request failed with status ${response.status}`,
          );
        }

        const data = await response.json();

        setAllServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllServices();
  }, []);

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const defaultServiceSlug = allServices[0]
    ? createSlug(allServices[0].title)
    : "";

  const selectedService =
    allServices.find(
      (service) => createSlug(service.title) === requestedSlug,
    ) ?? allServices[0];

  const otherServices = allServices.filter(
    (service) => service.id !== selectedService?.id,
  );

  if (loading) {
    return null;
  }

  if (!selectedService) {
    return null;
  }

  return (
    <main className="font-bold">
      {/* IT services section */}
      <HeroSectionForPages title="IT Services" />

      {/* Detailed content of the active service */}
      <section
        className={`
    flex
    flex-col-reverse
    gap-8
    px-5
    py-10
    font-bold
    sm:px-8
    sm:py-12
    md:px-12
    md:py-15
    ${
      selectedService.isImageOnLeft
        ? "md:flex-row-reverse"
        : "md:flex-row"
    }
    md:items-center
    md:gap-5
    lg:px-20
    xl:px-30
  `}
      >
        {/* description side */}
        <div className="w-full space-y-5 lg:w-[50%]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl">
            {selectedService.title}
          </h2>

          <p className="text-left text-base text-(--bg-muted)">
            {selectedService.description}
          </p>

          {/* customer service grid list */}
          <div className="space-y-5 py-5">
            {selectedService.category.map((category) => (
              <div key={category.slug}>
                <h3 className="mb-2 text-xl">
                  {category.title}
                </h3>

                <p className="mb-3 text-sm text-(--bg-muted)">
                  {category.description}
                </p>

                <div className="grid grid-cols-1 gap-2 font-semibold sm:grid-cols-2">
                  {category.lists.map((item, index) => (
                    <p
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
                      key={index}
                    >
                      <span>
                        <CircleCheck
                          className="text-(--secondary-bg-color)"
                          size={18}
                        />
                      </span>

                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* illustration image */}
        <div className="w-full md:w-[50%]">
          <Image
            src={`/services/${selectedService.image}`}
            alt={selectedService.altDescription}
            width={100}
            height={100}
            className="mx-auto h-auto w-full max-w-xl"
          />
        </div>
      </section>

      {/* Other services below */}
      <section className="bg-(--primary-bg-color) px-5 pb-10 pt-5 sm:px-6 md:px-10 lg:px-20 xl:px-30">
        <div className="mx-auto max-w-2xl space-y-4 py-5 text-center sm:space-y-5 sm:py-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl">
            Our Services
          </h2>

          <p className="text-sm text-(--bg-muted) sm:text-base">
            Explore the rest of what we offer and find the solution that fits
            your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {otherServices.map((item) => {
            const slug = createSlug(item.title);

            return (
              <Link
                key={item.id}
                href={`/services?service=${slug}`}
                className="group flex flex-col overflow-hidden rounded-md shadow-md hover-state"
              >
                <Image
                  src={`/services/${item.image}`}
                  alt={item.altDescription}
                  width={100}
                  height={100}
                  className="h-40 w-full object-cover sm:h-48"
                />

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="text-xl text-(--primary-text-color) sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="flex-1 text-sm text-(--bg-muted)">
                    {item.description}
                  </p>

                  <span className="group flex w-fit items-center gap-1 text-sm text-(--secondary-bg-color)">
                    Read More

                    <ArrowRight
                      size={16}
                      className="arrow"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
};

const page = () => {
  return (
    <>
      <Navbar />

      <Suspense fallback={null}>
        <ServicePageContent />
      </Suspense>

      <Footer />
    </>
  );
};

export default page;