import Link from "next/link";

const LetsGetToWorkSection = () => {
  return (
    <section
      className="
    relative
    flex
    flex-col
    gap-6
    px-5
    py-12
    font-bold

    bg-[url('/home/illustrator.png')]

    sm:px-8
    sm:py-15

    md:px-12
    md:py-20

    md:flex-row
    md:items-center
    md:justify-between
    lg:px-20

    xl:px-30
  "
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <div className="relative z-10">
        <span className="text-base text-(--bg-table) sm:text-lg">
          READY TO DO THIS
        </span>

        <h3 className="text-3xl text-(--bg-table) sm:text-4xl md:text-5xl">
          Let&apos;s Get To Work!
        </h3>
      </div>

      <div className="relative z-10 flex items-center">
        <Link
          href="/contact"
          className="rounded px-6 py-3 text-base btn-primary-hover-state sm:px-8 sm:text-lg"
        >
          CONTACT US
        </Link>
      </div>
    </section>
  );
};

export default LetsGetToWorkSection;
