"use client";

interface Props {
  title: string;
}

const HeroSectionForPages = ({ title }: Props) => {

  return (
    <section className={`space-y-3 px-4 pb-5 text-center sm:px-6 sm:py-14 md:space-y-5 md:px-10 md:py-16 lg:px-20 lg:py-20 xl:px-30`}>
      <h2
        className="
    relative
    pb-2
    text-3xl
    after:absolute
    after:bottom-0
    after:left-1/2
    after:h-1
    after:w-15
    after:-translate-x-1/2
    after:bg-(--secondary-bg-color)
    after:content-['']
    sm:text-4xl
    md:text-5xl
  "
      >
        {title}
      </h2>
      
    </section>
  );
};

export default HeroSectionForPages;
