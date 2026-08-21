import React from "react";

const HeroSectionForPages = () => {
  return (
    <section className="space-y-3 px-4 py-12 text-center sm:px-6 sm:py-14 md:space-y-5 md:px-10 md:py-16 lg:px-20 lg:py-20 xl:px-30">
      <h2 className="text-3xl sm:text-4xl md:text-5xl">
        IT Services
      </h2>

      <p className="text-sm font-semibold sm:text-base">
        <span className="text-(--bg-muted)">Home &gt; </span>
        <span className="text-(--secondary-bg-color)">IT Services</span>
      </p>
    </section>
  );
};

export default HeroSectionForPages;