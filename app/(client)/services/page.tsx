"use client"

import serviceImage1 from "@/public/services/image 21.png";
import serviceImage2 from "@/public/services/image 22.png";
import serviceImage3 from "@/public/services/image 23.png";
import serviceImage4 from "@/public/services/image 24.png";

import IllustrationAndContent from "../components/IllustrationAndContent";
import { ServicesBox } from "../components/ServiceBox";
import HeroSectionForPages from "../components/HeroSectionForPages";


const contents = [
  {
    topic: "Digital Marketing",
    description:
      "We believe brand interaction is key to communication. Real innovations and positive customer experience are the heart of success.",
    lists: [
      "SEO",
      "Email Marketing",
      "Facebook Marketing",
      "Data scraping",
      "Social Marketing",
      "Digital Youtube Marketing",
    ],
    imageName: serviceImage1,
    altDescription: "Service Image 1",
    btnName: "READ MORE",
    isImageOnLeft: false,
  },
  {
    topic: "Digital Marketing",
    description:
      "We believe brand interaction is key to communication. Real innovations and positive customer experience are the heart of success.",
    lists: [
      "SEO",
      "Digital Marketing",
      "SEO",
      "Digital Marketing",
      "SEO",
      "Digital Marketing",
    ],
    imageName: serviceImage2,
    altDescription: "Service Image 2",
    btnName: "READ MORE",
    isImageOnLeft: true,
  },
  {
    topic: "Digital Marketing",
    description:
      "We believe brand interaction is key to communication. Real innovations and positive customer experience are the heart of success.",
    lists: [
      "SEO",
      "Digital Marketing",
      "SEO",
      "Digital Marketing",
      "SEO",
      "Digital Marketing",
    ],
    imageName: serviceImage3,
    altDescription: "Service Image 3",
    btnName: "READ MORE",
    isImageOnLeft: false,
  },
  {
    topic: "Digital Marketing",
    description:
      "We believe brand interaction is key to communication. Real innovations and positive customer experience are the heart of success.",
    lists: [
      "SEO",
      "Digital Marketing",
      "SEO",
      "Digital Marketing",
      "SEO",
      "Digital Marketing",
    ],
    imageName: serviceImage4,
    altDescription: "Service Image 4",
    btnName: "READ MORE",
    isImageOnLeft: true,
  },
];

const servicesBoxContents = [
  {
    title: "IT Consultancy",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur temporibus culpa sint ipsum fugiat! Sequi?",
  },
  {
    title: "IT Consultancy",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur temporibus culpa sint ipsum fugiat! Sequi?",
  },
  {
    title: "IT Consultancy",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur temporibus culpa sint ipsum fugiat! Sequi?",
  },
  {
    title: "IT Consultancy",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur temporibus culpa sint ipsum fugiat! Sequi?",
  },
  {
    title: "IT Consultancy",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur temporibus culpa sint ipsum fugiat! Sequi?",
  },
  {
    title: "IT Consultancy",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur temporibus culpa sint ipsum fugiat! Sequi?",
  },
];

const page = () => {
  return (
    <main className="font-bold">
      {/* IT services section */}
      <HeroSectionForPages title="IT Services" />

      {contents.map((item, index) => (
        <IllustrationAndContent
          topic={item.topic}
          description={item.description}
          image={item.imageName}
          altDescription={item.altDescription}
          buttonName={item.btnName}
          lists={item.lists}
          isImageOnLeft={item.isImageOnLeft}
          key={index}
        />
      ))}

      <section className="space-y-10 bg-blue-500/5 px-4 py-10 sm:px-6 md:px-10 lg:px-20 xl:px-30">
        <div className="mx-auto max-w-2xl space-y-4 text-center sm:space-y-5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl">Our Services</h2>

          <p className="text-sm text-(--bg-muted) sm:text-base">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem,
            quaerat.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicesBoxContents.map((item, index) => (
            <ServicesBox item={item} key={index} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default page;
