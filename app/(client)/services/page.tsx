"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ArrowRight, CircleCheck } from "lucide-react";

import serviceImage1 from "@/public/services/image 21.png";
import serviceImage2 from "@/public/services/image 22.png";
import serviceImage3 from "@/public/services/image 23.png";
import serviceImage4 from "@/public/services/image 24.png";
import HeroSectionForPages from "../components/HeroSectionForPages";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import EnquirySection from "../components/EnquirySection";

interface ServiceItem {
  slug: string;
  topic: string;
  description: string;
  lists: string[];
  imageName: StaticImageData;
  altDescription: string;
  btnName: string;
  isImageOnLeft: boolean;
}

const allServices: ServiceItem[] = [
  {
    slug: "digital-marketing",
    topic: "Digital Marketing",
    description:
      "We believe brand interaction is key to communication. Real innovations and positive customer experience are the heart of success. Our digital marketing services help brands get discovered, build trust, and convert visitors into loyal customers.",
    lists: [
      "SEO",
      "Email Marketing",
      "Facebook Marketing",
      "Data Scraping",
      "Social Marketing",
      "YouTube Marketing",
    ],
    imageName: serviceImage1,
    altDescription: "Digital Marketing",
    btnName: "READ MORE",
    isImageOnLeft: false,
  },
  {
    slug: "web-development",
    topic: "Web Development",
    description:
      "We believe brand interaction is key to communication. Real innovations and positive customer experience are the heart of success. Our web development services turn ideas into fast, secure, and beautiful digital experiences.",
    lists: [
      "Responsive Design",
      "E-Commerce",
      "Custom CMS",
      "Web Apps",
      "Website Maintenance",
      "Progressive Web Apps",
    ],
    imageName: serviceImage2,
    altDescription: "Web Development",
    btnName: "READ MORE",
    isImageOnLeft: true,
  },
  {
    slug: "ai-automation",
    topic: "AI Automation",
    description:
      "We believe brand interaction is key to communication. Real innovations and positive customer experience are the heart of success. Our AI automation services streamline your workflows and let your team focus on what matters most.",
    lists: [
      "Workflow Automation",
      "Chatbots",
      "Data Analytics",
      "Predictive Insights",
      "Process Optimisation",
      "AI Integration",
    ],
    imageName: serviceImage3,
    altDescription: "AI Automation",
    btnName: "READ MORE",
    isImageOnLeft: false,
  },
  {
    slug: "branding",
    topic: "Branding & Design",
    description:
      "We believe brand interaction is key to communication. Real innovations and positive customer experience are the heart of success. Our branding services shape an identity that people remember and trust.",
    lists: [
      "Logo Design",
      "Brand Strategy",
      "UI / UX Design",
      "Social Media Kits",
      "Print & Digital",
      "Brand Guidelines",
    ],
    imageName: serviceImage4,
    altDescription: "Branding & Design",
    btnName: "READ MORE",
    isImageOnLeft: true,
  },
];

const defaultServiceSlug = "digital-marketing";

const ServicePageContent = () => {
  const searchParams = useSearchParams();

  const requestedSlug = searchParams.get("service") ?? defaultServiceSlug;
  const selectedService =
    allServices.find((s) => s.slug === requestedSlug) ?? allServices[0];

  const otherServices = allServices.filter(
    (s) => s.slug !== selectedService.slug,
  );

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

    ${selectedService.isImageOnLeft ? "md:flex-row-reverse" : "md:flex-row"}
    md:items-center
    md:gap-5
    lg:px-20

    xl:px-30
  `}
      >
        {/* description side */}
        <div className="w-full space-y-5 lg:w-[50%]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl">
            {selectedService.topic}
          </h2>

          <p className="text-left text-base text-(--bg-muted)">
            {selectedService.description}
          </p>

          {/* customer service grid list */}
          <div className="grid grid-cols-1 gap-2 py-5 font-semibold sm:grid-cols-2">
            {selectedService.lists.map((item, index) => (
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

        {/* illustration image */}
        <div className="w-full md:w-[50%]">
          <Image
            src={selectedService.imageName}
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl">Our Services</h2>

          <p className="text-sm text-(--bg-muted) sm:text-base">
            Explore the rest of what we offer and find the solution that fits
            your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {otherServices.map((item) => (
            <Link
              key={item.slug}
              href={`/services?service=${item.slug}`}
              className="group flex flex-col overflow-hidden rounded-md shadow-md transition-all hover:shadow-lg"
            >
              <Image
                src={item.imageName}
                alt={item.altDescription}
                width={100}
                height={100}
                className="h-40 w-full object-cover sm:h-48"
              />

              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-xl text-(--primary-text-color) sm:text-2xl">
                  {item.topic}
                </h3>

                <p className="flex-1 text-sm text-(--bg-muted)">
                  {item.description}
                </p>

                <span className="inline-flex w-fit items-center gap-1 text-sm text-(--secondary-bg-color)">
                  Read More
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <EnquirySection />
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