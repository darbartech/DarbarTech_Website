import Image from "next/image";
import {
  ArrowRight,
  RotateCcw,
  CircleCheck,
  Plus,
  CircleDashed,
  ChessKnight,
} from "lucide-react";
import logo from "@/public/file.svg";
import illustration from "@/public/home/illustrator2.png";
import illustration2 from "@/public/home/illustrator2.png";
import heroSectionLine from "@/public/home/hero-section-line.png";

export default function Home() {
  return (
    <main className="-mt-24 space-y-5 ">
      {/* hero-section */}
      <section
        className="
    relative
    flex
    h-screen
    flex-col
    justify-center
    gap-5
    overflow-y-hidden
    px-5
    pb-10
    text-center
    text-sm
    font-bold

    sm:px-8
    md:px-12
    lg:px-20
    xl:px-30
    xl:pb-15
  "
      >
        <h1
          className="
      text-4xl
      leading-tight

      sm:text-5xl
      md:text-6xl
      lg:text-7xl
    "
        >
          Create, inspect, and apply synthetic surveillance broadly.
        </h1>

        <div className="space-y-4 font-semibold sm:space-y-5">
          <p
            className="
        text-base
        text-(--bg-muted)

        sm:text-lg
        md:text-xl
      "
          >
            Start with a stunning homepage. Stay motivated without hurting your
            pocket.
          </p>

          <button
            className="
        mx-auto
        rounded-4xl
        bg-(--secondary-bg-color)
        px-6
        py-3
        text-base
        text-(--primary-bg-color)

        sm:px-7
        sm:py-3.5
        sm:text-lg

        md:px-8
        md:py-4
        md:text-xl
      "
          >
            Start for free
          </button>

          <p
            className="
        flex
        flex-col
        items-center
        justify-center
        gap-1
        text-sm
        text-(--bg-muted)

        sm:flex-row
        sm:gap-2
        sm:text-base

        md:text-lg
      "
          >
            <span>Want to talk or get a live demo?</span>

            <span className="flex items-center gap-1 text-(--gray-color)">
              Get in touch
              <ArrowRight size={18} />
            </span>
          </p>
        </div>

        {/* Absolute hero-section-line image */}
        <Image
          src={heroSectionLine}
          alt="Hero Section Line Image"
          loading="eager"
          className="
      absolute
      bottom-5
      left-1/2
      w-[120%]
      -translate-x-1/2

      sm:bottom-6
      sm:w-[110%]

      md:bottom-8
      md:w-full

      lg:bottom-10
    "
        />

        {/* top left */}
        <div
          className="
      absolute
      bottom-24
      left-20
      w-fit
      rounded-lg
      bg-pink-600
      p-1.5

      sm:bottom-40
      sm:left-30
       

      md:bottom-40
      md:left-30

      lg:p-2
      lg:bottom-50
      lg:left-50

      xl:p-3
      xl:bottom-65
      xl:left-60

      2xl:bottom-80
      2xl:left-65
    "
        >
          <CircleDashed
            className="h-5 w-5 text-(--primary-bg-color) sm:h-6 sm:w-6 md:h-7 md:w-7"
            strokeWidth={3}
          />
        </div>

        {/* top right */}
        <div
          className="
      absolute
      right-5
      bottom-28
      w-fit
      rounded-lg
      bg-(--bg-random)
      p-1.5

      sm:right-15
      sm:bottom-40
       

      
      md:right-16
      md:bottom-45

      lg:p-2
      lg:right-20
      lg:bottom-70

      xl:p-3
      xl:right-30
      xl:bottom-75

      2xl:bottom-90
    "
        >
          <CircleDashed
            className="h-5 w-5 text-blue-400 sm:h-6 sm:w-6 md:h-7 md:w-7"
            strokeWidth={3}
          />
        </div>

        {/* middle left */}
        <div
          className="
      absolute
      bottom-12
      left-30
      w-fit
      rounded-lg
      bg-(--accent-color)
      p-1.5

      sm:bottom-18
      sm:left-50
       

      md:bottom-20
      md:left-55

      lg:p-2
      lg:bottom-29
      lg:left-80

      xl:p-3
      xl:bottom-32
      xl:left-100

      2xl:bottom-37
      2xl:left-115
    "
        >
          <CircleDashed
            className="h-5 w-5 text-(--primary-bg-color) sm:h-6 sm:w-6 md:h-7 md:w-7"
            strokeWidth={3}
          />
        </div>

        {/* middle right */}
        <div
          className="
      absolute
      right-20
      bottom-15
      w-fit
      rounded-lg
      bg-(--bg-random)
      p-1.5

      sm:right-35
      sm:bottom-25
       

      md:right-35
      md:bottom-30

      lg:p-2
      lg:right-50
      lg:bottom-45

      xl:p-3
      xl:right-65
      xl:bottom-50

      2xl:right-70
      2xl:bottom-55
    "
        >
          <CircleDashed
            className="h-5 w-5 text-(--primary-text-color) sm:h-6 sm:w-6 md:h-7 md:w-7"
            strokeWidth={3}
          />
        </div>

        {/* bottom left */}
        <div
          className="
      absolute
      bottom-0
      left-10
      w-fit
      rounded-lg
      bg-(--bg-footer)
      p-1.5

      sm:left-20
       
      md:left-24
      md:bottom-2

      lg:p-2
      lg:left-36

      xl:p-3
      xl:left-50
      xl:bottom-5

      2xl:bottom-0
    "
        >
          <ChessKnight
            className="h-5 w-5 text-orange-400 sm:h-6 sm:w-6 md:h-7 md:w-7"
            strokeWidth={3}
          />
        </div>

        {/* bottom right */}
        <div
          className="
      absolute
      right-25
      bottom-5
      w-fit
      rounded-lg
      bg-(--bg-footer)
      p-1.5

      sm:right-45
      sm:bottom-10
       

      md:right-50
      md:bottom-10

      lg:p-2
      lg:right-70
      lg:bottom-15

      xl:p-3
      xl:right-90
      xl:bottom-20

      2xl:right-95
      2xl:bottom-15
    "
        >
          <CircleDashed
            className="h-5 w-5 text-emerald-400 sm:h-6 sm:w-6 md:h-7 md:w-7"
            strokeWidth={3}
          />
        </div>
      </section>

      {/* partner's logo section */}
      <section
        className="
    flex
    flex-wrap
    items-center
    justify-center
    gap-8
    px-5
    py-10

    sm:gap-10
    sm:px-8
    sm:py-12

    md:justify-between
    md:gap-6
    md:px-12
    md:py-15

    lg:px-20

    xl:px-30
  "
      >
        <Image src={logo} alt="Logo 1" height={30} width={30} />
        <Image src={logo} alt="Logo 2" height={30} width={30} />
        <Image src={logo} alt="Logo 3" height={30} width={30} />
        <Image src={logo} alt="Logo 4" height={30} width={30} />
        <Image src={logo} alt="Logo 5" height={30} width={30} />
        <Image src={logo} alt="Logo 6" height={30} width={30} />
      </section>

      {/* featured solutions section */}
      <section className="py-10 sm:py-12 md:py-15 font-bold">
        {/* info div */}
        <div className="mx-auto max-w-5xl space-y-6 px-5 py-5 text-center sm:px-8 sm:space-y-8 md:px-12 lg:px-20 xl:px-30">
          <div>
            <p className="text-xl text-(--secondary-bg-color) sm:text-2xl">
              What we offer
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl">
              Our Featured Solutions
            </h2>
          </div>

          <p className="text-base text-(--bg-muted) sm:text-lg md:text-xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
            distinctio reiciendis temporibus ratione cupiditate vel et ipsam
            voluptates!
          </p>
        </div>

        {/* cards div */}
        <div
          className="
      grid
      grid-cols-1
      gap-5
      px-5
      py-5

      sm:px-8
      md:grid-cols-2
      md:px-12

      lg:grid-cols-4
      lg:px-20

      xl:px-30
    "
        >
          {[1, 2, 3, 4].map((item, index) => (
            <div
              className="
          space-y-2
          rounded-lg
          px-4
          py-7
          shadow-[5px_5px_15px_rgba(0,0,0,0.15)]

          sm:px-5
          sm:py-8
        "
              key={index}
            >
              <span>
                <RotateCcw className="text-(--secondary-bg-color)" size={40} />
              </span>

              <h3 className="text-xl font-bold sm:text-2xl">
                Robotic Automation
              </h3>

              <p className="text-base text-(--bg-muted) sm:text-lg">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Corporis, repudiandae?
              </p>

              <button className="text-sm text-(--accent-color) sm:text-md">
                Discover more
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* illustrator and description */}
      <section
        className="
    flex
    flex-col
    gap-8
    bg-(--bg-random)
    px-5
    py-10
    font-bold

    sm:px-8
    sm:py-12

    md:px-12
    md:py-15

    md:flex-row
    md:items-center
    md:gap-5
    lg:px-20

    xl:px-30
  "
      >  
        {/* illustration image */}
        <div className="w-full md:w-[45%]">
          <Image
            src={illustration}
            alt="Illustration"
            className="mx-auto h-auto w-full max-w-xl"
          />
        </div>

        {/* description side */}
        <div className="w-full space-y-5 md:w-[55%]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl">
            Why We Do Karlson Template
          </h2>

          <p className="text-left text-base text-(--bg-muted) sm:text-lg md:text-center">
            We believe brand interaction is key to communication.{" "}
            <br className="hidden md:block" /> Real innovations and positive
            customer experience are teh heart of succecss.
          </p>

          {/* customer service grid list */}
          <div className="grid grid-cols-1 gap-2 py-5 font-semibold sm:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
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
                Customer services
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
            <button className="rounded-3xl border border-(--secondary-bg-color) px-7 py-2 text-(--accent-color)">
              Contact Us
            </button>

            <button className="rounded-3xl bg-(--secondary-bg-color) px-7 py-2 text-(--primary-bg-color)">
              Read More
            </button>
          </div>
        </div>
      </section>

      {/* why choose us section */}
      <section
        className="
    flex
    flex-col
    gap-8
    px-5
    py-10
    font-bold

    sm:px-8
    sm:py-12

    md:px-12
    md:py-15

    lg:flex-row
    lg:items-center
    lg:justify-between
    lg:gap-5
    lg:px-20

    xl:px-30
  "
      >
        <div className="w-full space-y-4 lg:w-[55%]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl">Why Choose Us</h1>

          <p className="text-base text-(--bg-muted) sm:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            consequatur quo, quam at voluptas illum enim vitae magni illo,
            architecto, quos
          </p>

          {[1, 2, 3].map((item, index) => (
            <div className="flex gap-3" key={index}>
              <span className="mt-1 shrink-0">
                <CircleCheck size={22} />
              </span>

              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl">Experienced Developer</h3>

                <p className="text-sm text-(--bg-muted) sm:text-md">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Perspiciatis, illum?
                </p>
              </div>
            </div>
          ))}

          <button className="rounded bg-(--secondary-bg-color) px-6 py-3 text-sm text-(--primary-bg-color) sm:px-8 sm:text-md">
            DISCOVER MORE
          </button>
        </div>

        <div className="w-full lg:w-[45%]">
          <Image
            src={illustration2}
            alt="Illustrator 2"
            className="mx-auto h-auto w-full max-w-xl"
          />
        </div>
      </section>

      {/* testimonials section */}
      <section
        className="
    space-y-10
    px-5
    py-10
    text-center
    font-bold

    sm:px-8
    sm:py-12

    md:px-12
    md:py-15

    lg:px-20

    xl:px-30
  "
      >
        <div className="space-y-3">
          <h3 className="text-xl text-(--secondary-bg-color) sm:text-2xl">
            TESTIMONIALS
          </h3>

          <h2 className="text-3xl sm:text-4xl md:text-5xl">
            Our Featured Solutions
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item, index) => (
            <div
              className="
          space-y-5
          rounded-lg
          border-2
          border-(--surface)
          p-4
          text-smx
          shadow-xs
        "
              key={index}
            >
              <p className="text-justify text-base text-(--bg-muted) sm:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                vero eius distinctio incidunt. Assumenda, ut. alsk alskdfjosdf
                ksd flkasdf slsdklj sdkjf lsd klsdj f
              </p>

              <div className="flex items-center justify-start gap-2 text-start font-bold">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={illustration}
                    alt="Profile Image"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="-mb-1 text-lg sm:text-xl">Ram Bahadur</h3>

                  <p className="text-sm text-(--secondary-bg-color)">
                    Developer
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-1">
          <button className="h-3 w-3 rounded-full bg-(--secondary-bg-color)" />
          <button className="h-3 w-3 rounded-full bg-(--surface)" />
          <button className="h-3 w-3 rounded-full bg-(--surface)" />
        </div>
      </section>

      {/* FAQ section */}
      <section
        className="
    space-y-10
    px-5
    py-10

    sm:px-8
    sm:py-12

    md:px-12
    md:py-15

    lg:px-20

    xl:px-30
  "
      >
        <div className="mx-auto max-w-2xl space-y-5 text-center font-bold">
          <span className="text-(--secondary-bg-color)">FAQ</span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="text-base text-(--bg-muted) sm:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            natus, similique cumque sapiente veniam odio commodi eveniet ratione
            totam rerum.
          </p>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-15">
          <Image
            src={illustration}
            alt="Illustrator"
            className="mx-auto h-auto w-full max-w-xl lg:w-[45%]"
          />

          <div className="w-full space-y-3 lg:w-[55%]">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div className="flex items-center rounded shadow-md" key={index}>
                <span className="shrink-0 bg-(--secondary-bg-color) px-2 py-3">
                  <Plus />
                </span>

                <p className="px-4 py-3 text-sm sm:px-6 sm:text-base lg:px-10">
                  Which material types can you work with?
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* lets get to work section */}
      <section
        className="
    flex
    flex-col
    gap-6
    px-5
    py-12
    font-bold

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
        <div>
          <span className="text-base sm:text-lg">READY TO DO THIS</span>

          <h3 className="text-3xl sm:text-4xl md:text-5xl">
            Let's Get To Work!
          </h3>
        </div>

        <div className="flex items-center">
          <button className="rounded bg-(--secondary-bg-color) px-6 py-3 text-base text-(--primary-bg-color) sm:px-8 sm:text-lg">
            CONTACT US
          </button>
        </div>
      </section>

      {/* latest news section */}
      <section
        className="
    space-y-8
    px-5
    py-10
    font-bold

    sm:px-8
    sm:py-12

    md:px-12
    md:py-15

    lg:px-20

    xl:px-30
  "
      >
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl">
          Latest News
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item, index) => (
            <div
              className="overflow-hidden rounded-lg text-(--bg-muted) shadow-lg"
              key={index}
            >
              <Image
                src={illustration}
                alt="Illustrator"
                className="h-auto w-full"
              />

              <div className="space-y-4 px-4 py-4 sm:space-y-5">
                <span className="block text-sm sm:text-base">
                  By:{" "}
                  <span className="text-(--secondary-bg-color)">
                    James Anderson
                  </span>{" "}
                  / June 26, 2025
                </span>

                <h3 className="text-xl text-(--primary-text-color) sm:text-2xl">
                  How To Boost Your Digital Marketing Agency
                </h3>

                <p className="text-sm sm:text-base">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Iure, cumque!
                </p>

                <button className="flex items-center gap-1 text-sm text-(--secondary-bg-color) sm:text-base">
                  Read More
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* enquiry section */}
      <section
        className="
    mx-auto
    my-10
    max-w-5xl
    space-y-5
    px-5
    py-12
    text-center
    font-bold

    sm:px-8
    sm:py-15

    md:my-15
    md:px-12
    md:py-20

    lg:px-20
    xl:px-30
  "
      >
        <span className="block text-sm sm:text-base">
          GET STARTED INSTANTLY!
        </span>

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
      </section>
    </main>
  );
}
