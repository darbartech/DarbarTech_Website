import React from "react";

const EnquirySection = () => {
  return (
    <section className=""
      
    >
      <div className="
    mx-auto
    my-10
    max-w-5xl
    space-y-5
    px-5
    py-12
    text-center
    font-bold

    bg-[url('/about/illustrator2.png')]

    sm:px-8
    sm:py-15

    md:my-15
    md:px-12
    md:py-20

    lg:px-20
    xl:px-30
  ">
        <span className="block text-sm sm:text-base">GET STARTED INSTANTLY!</span>

      <h2 className="text-3xl sm:text-4xl md:text-5xl">
        Get Only New Update From This Newsletter
      </h2>

      <div
        className="
      mx-auto
      flex
      w-full
      max-w-lg
      flex-col
      gap-2
      rounded-3xl
      p-1
      shadow-md

      sm:flex-row
      sm:gap-0
    "
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="
        min-w-0
        flex-1
        rounded-3xl
        px-4
        py-2
        text-sm
        text-(--bg-muted)
        outline-none
      "
        />

        <button
          className="
        rounded-3xl
        bg-(--secondary-bg-color)
        px-6
        py-2
        text-sm
        text-(--primary-bg-color)

      "
        >
          SUBSCRIBE
        </button>
      </div>
      </div>
    </section>
  );
};

export default EnquirySection;
