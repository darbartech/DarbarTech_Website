import React from "react";
import HeroSectionForPages from "../components/HeroSectionForPages";
import IllustrationAndContent from "../components/IllustrationAndContent";
import aboutImage from "@/public/about/illustrator2.png";
import aboutImage2 from "@/public/about/illustrator2.png";
import { CircleCheck, PlayIcon } from "lucide-react";
import EnquirySection from "../components/EnquirySection";

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
    imageName: aboutImage,
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
    imageName: aboutImage2,
    altDescription: "Service Image 2",
    btnName: "READ MORE",
    isImageOnLeft: true,
  },
];

const page = () => {
  return (
    <main className="font-bold">
      <HeroSectionForPages title="About Us" />

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

      {/* history, mission  and who are we section */}
      <section className="px-5 py-10 sm:px-15 lg:px-30 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5  text-sm">
        {[1, 2, 3].map((item, index) => (
          <div className="space-y-5" key={index}>
            <h3 className="border-b border-(--bg-muted) pb-2 text-2xl">
              Our Mission
            </h3>
            <p className="text-(--bg-muted) font-semibold">
              Real innovations and a positive customer experienceare the heart
              of successful communication.
            </p>
            <ul className="space-y-2 font-semibold">
              {[1, 2, 3, 4].map((item, index) => (
                <li className="flex items-center gap-1" key={index}>
                  <span>
                    <CircleCheck size={18} />
                  </span>
                  List 1
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
            <p className="text-(--secondary-bg-color) text-sm">WATCH OUR VIDEO</p>
            <h3 className="text-2xl lg:text-5xl">Get Better Solution For Your Business</h3>
            <p className="text-sm text-(--bg-muted)">
              No fake products and services. The customer is king. Their lives
              and needs are the inspiration.
            </p>
            <button className="bg-(--secondary-bg-color) text-(--primary-bg-color) px-5 py-2 rounded text-sm">
              CONTACT US
            </button>
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

      <EnquirySection />
    </main>
  );
};

export default page;
