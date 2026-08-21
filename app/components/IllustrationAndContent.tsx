import React from "react";
import Image, { StaticImageData } from "next/image";
import { CircleCheck } from "lucide-react";

interface Props {
  topic: string;
  description: string;
  image: StaticImageData;
  altDescription: string;
  buttonName: string;
  lists: string[];
  isImageOnLeft: boolean;
}

const IllustrationAndContent = ({
  topic,
  description,
  image,
  altDescription,
  buttonName,
  lists,
  isImageOnLeft,
}: Props) => {
  return (
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


    ${isImageOnLeft ? "md:flex-row-reverse" : "md:flex-row"}
    md:items-center
    md:gap-5
    lg:px-20

    xl:px-30
  `}
    >
      {/* description side */}
      <div className="w-full space-y-5 md:w-[50%]">
        <h2 className="text-3xl sm:text-4xl md:text-5xl">{topic}</h2>

        <p className="text-left text-base text-(--bg-muted) ">
          {description}
        </p>

        {/* customer service grid list */}
        <div className="grid grid-cols-1 gap-2 py-5 font-semibold sm:grid-cols-2">
          {lists.map((item, index) => (
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

        {/* buttons */}
        <div
          className="
          flex
          flex-col
          gap-3
          text-base
          font-semibold
          
          sm:flex-row
          sm:text-lg
          "
        >
          <button className="rounded-3xl bg-(--secondary-bg-color) px-6 py-2 text-(--primary-bg-color) text-base hover:bg(--secondary-dark-bg-color) hover:cursor-pointer">
            {buttonName}
          </button>
        </div>
      </div>

      {/* illustration image */}
      <div className="w-full md:w-[50%]">
        <Image
          src={image}
          alt={altDescription}
          width={100}
          height={100}
          className="mx-auto h-auto w-full max-w-xl"
        />
      </div>
    </section>
  );
};

export default IllustrationAndContent;
