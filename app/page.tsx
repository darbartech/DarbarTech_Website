import Image from "next/image";
import {
  ArrowRight,
  RotateCcw,
  CircleCheck,
  CircleDashed,
  ChessKnight,
} from "lucide-react";
import Link from "next/link";
import logo from "@/public/file.svg";
import illustration from "@/public/home/illustrator2.png";
import illustration2 from "@/public/home/illustrator2.png";
import heroSectionLine from "@/public/home/hero-section-line.png";
import Navbar from "./(client)/components/common/Navbar";
import Footer from "./(client)/components/common/Footer";
import FaqSection from "./(client)/components/FaqSection";
import Testimonials from "./(client)/components/Testimonials";
import { blogs } from "@/lib/blogs";

const testimonials = [
  {
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vero eius distinctio incidunt. Assumenda, ut. alsk alskdfjosdf ksd flkasdf slsdklj sdkjf lsd klsdj f",
    person: "Ram Bahadur",
    role: "Developer",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vero eius distinctio incidunt. Assumenda, ut. alsk alskdfjosdf ksd flkasdf slsdklj sdkjf lsd klsdj f",
    person: "Sita Sharma",
    role: "Designer",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vero eius distinctio incidunt. Assumenda, ut. alsk alskdfjosdf ksd flkasdf slsdklj sdkjf lsd klsdj f",
    person: "John Doe",
    role: "Manager",
  },

  {
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vero eius distinctio incidunt. Assumenda, ut. alsk alskdfjosdf ksd flkasdf slsdklj sdkjf lsd klsdj f",
    person: "Sita Sharma",
    role: "Designer",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vero eius distinctio incidunt. Assumenda, ut. alsk alskdfjosdf ksd flkasdf slsdklj sdkjf lsd klsdj f",
    person: "John Doe",
    role: "Manager",
  },

  {
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vero eius distinctio incidunt. Assumenda, ut. alsk alskdfjosdf ksd flkasdf slsdklj sdkjf lsd klsdj f",
    person: "Sita Sharma",
    role: "Designer",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vero eius distinctio incidunt. Assumenda, ut. alsk alskdfjosdf ksd flkasdf slsdklj sdkjf lsd klsdj f",
    person: "John Doe",
    role: "Manager",
  },

  {
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vero eius distinctio incidunt. Assumenda, ut. alsk alskdfjosdf ksd flkasdf slsdklj sdkjf lsd klsdj f",
    person: "Sita Sharma",
    role: "Designer",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vero eius distinctio incidunt. Assumenda, ut. alsk alskdfjosdf ksd flkasdf slsdklj sdkjf lsd klsdj f",
    person: "John Doe",
    role: "Manager",
  },
];

const faqItems = [
  {
    question: "Which material types can you work with?",
    answer:
      "We work with a wide range of material types including papers, fabrics, plastic, wood, and foams. Tell us about your product and we will recommend the best option for your project.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on the scope and complexity of the work. A standard project is usually completed within a few weeks, and we keep you updated at every stage of the process.",
  },
  {
    question: "Can we request a sample before ordering?",
    answer:
      "Yes. We encourage sampling before a full order so you can review the quality, finish, and materials before committing to a larger production run.",
  },
  {
    question: "What is your minimum order quantity?",
    answer:
      "There is no fixed minimum for most products. If you have a smaller project in mind, get in touch and we will let you know the most cost-effective way to produce it.",
  },
  {
    question: "Do you provide design support?",
    answer:
      "Absolutely. Our in-house team can help refine your designs, prepare print-ready files, and suggest improvements to make your product stand out.",
  },
  {
    question: "How are shipping and delivery handled?",
    answer:
      "We handle packaging and shipping for you once the order is ready. Delivery times depend on your location, and we provide tracking details for every shipment.",
  },
  {
    question: "How are shipping and delivery handled?",
    answer:
      "We handle packaging and shipping for you once the order is ready. Delivery times depend on your location, and we provide tracking details for every shipment.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
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

          {/* Absolute hero-section-line image */}
          <Image
            src={heroSectionLine}
            alt="Hero Section Line Image"
            loading="eager"
            className="
      absolute
      bottom-95
      left-1/2
      w-[120%]
      -translate-x-1/2
      pointer-events-none

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
      bottom-110
      left-15
      w-fit
      rounded-lg
      bg-pink-600
      p-1.5

      sm:bottom-35
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
              className="h-4 w-4 text-(--primary-bg-color) sm:h-5 sm:w-5 md:h-7 md:w-7"
              strokeWidth={3}
            />
          </div>

          {/* top right */}
          <div
            className="
      absolute
      right-10
      bottom-112
      w-fit
      rounded-lg
      bg-(--bg-table)
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
              className="h-4 w-4 text-blue-400 sm:h-5 sm:w-5 md:h-7 md:w-7"
              strokeWidth={3}
            />
          </div>

          {/* middle left */}
          <div
            className="
      absolute
      bottom-100
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
              className="h-4 w-4 text-(--primary-bg-color) sm:h-5 sm:w-5 md:h-7 md:w-7"
              strokeWidth={3}
            />
          </div>

          {/* middle right */}
          <div
            className="
      absolute
      right-17
      bottom-102
      w-fit
      rounded-lg
      bg-(--bg-table)
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
              className="h-4 w-4 text-(--primary-text-color) sm:h-5 sm:w-5 md:h-7 md:w-7"
              strokeWidth={3}
            />
          </div>

          {/* bottom left */}
          <div
            className="
      absolute
      bottom-90
      left-10
      w-fit
      rounded-lg
      bg-(--bg-footer)
      p-1.5

      sm:left-20
      sm:bottom-2

      md:left-24

      lg:p-2
      lg:left-36

      xl:p-3
      xl:left-50
      xl:bottom-5

      2xl:bottom-0
    "
          >
            <ChessKnight
              className="h-4 w-4 text-orange-400 sm:h-5 sm:w-5 md:h-7 md:w-7"
              strokeWidth={3}
            />
          </div>

          {/* bottom right */}
          <div
            className="
      absolute
      right-25
      bottom-95
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
              className="h-4 w-4 text-emerald-400 sm:h-5 sm:w-5 md:h-7 md:w-7"
              strokeWidth={3}
            />
          </div>

          {/* paragraphs and buttons */}
          <div className="space-y-4 font-semibold sm:space-y-5 mt-40 sm:mt-0">
            <p
              className="
        text-base
        text-(--bg-muted)

        sm:text-lg
        md:text-xl
      "
            >
              Start with a stunning homepage. Stay motivated without hurting
              your pocket.
            </p>

            <Link
              href="/register"
              className="
              
        mx-auto
        inline-block
        rounded-4xl
        px-6
        py-3
        text-base
        border-2

        btn-primary-hover-state

        sm:px-7
        sm:py-3.5
        sm:text-lg

        md:px-8
        md:py-4
        md:text-xl
      "
            >
              Start for free
            </Link>

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

              <Link
                href="/contact"
                className="group flex items-center gap-1 text-(--gray-color)"
              >
                <span>Get in touch</span>

                <ArrowRight
                  size={18}
                  className="
      arrow
    "
                />
              </Link>
            </p>
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
              <Link
                href="/about"
                className="
          space-y-2
          rounded-lg
          px-4
          py-7
          group
          shadow-[5px_5px_15px_rgba(0,0,0,0.15)]
          hover-state

          sm:px-5
          sm:py-8
        "
                key={index}
              >
                <span>
                  <RotateCcw
                    className="text-(--secondary-bg-color)"
                    size={40}
                  />
                </span>

                <h3 className="text-xl font-bold sm:text-2xl">
                  Robotic Automation
                </h3>

                <p className="text-base text-(--bg-muted) sm:text-lg">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corporis, repudiandae?
                </p>
                <span className="inline-flex w-fit items-center gap-1 text-sm text-(--secondary-bg-color)">
                  Discover More
                  <ArrowRight
                  size={18}
                  className="
      arrow
    "
                />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* illustrator and description karlson template */}
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
              <Link
                href="/contact"
                className="group flex items-center rounded-3xl px-7 py-2 btn-secondary-hover-state"
              >
                Contact Us
                <ArrowRight
                  size={18}
                  className="
      arrow
    "
                />
              </Link>

              <Link
                href="/about"
                className="rounded-3xl flex items-center px-7 py-2 btn-primary-hover-state"
              >
                Read More
              </Link>
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

            <Link
              href="/about"
              className="rounded px-6 py-3 text-sm btn-primary-hover-state sm:px-8 sm:text-md"
            >
              DISCOVER MORE
            </Link>
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
        <Testimonials illustration={illustration} testimonials={testimonials} />

        {/* FAQ section */}
        <FaqSection illustration={illustration} items={faqItems} />

        {/* lets get to work section */}
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
            {blogs.map((item) => (
              <div
                className="overflow-hidden rounded-lg text-(--bg-muted) shadow-lg hover-state group"
                key={item.slug}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  className="h-80 w-full object-cover"
                />

                <div className="space-y-4 px-4 py-4 sm:space-y-5">
                  <span className="block text-sm sm:text-base">
                    By:{" "}
                    <span className="text-(--secondary-bg-color)">
                      {item.author}
                    </span>{" "}
                    / {item.date}
                  </span>

                  <h3 className="text-xl text-(--primary-text-color) sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base">{item.excerpt}</p>

                  <Link
                    href={`/blogs/${item.slug}`}
                    className="flex w-fit items-center gap-1 text-sm text-(--secondary-bg-color) sm:text-base"
                  >
                    Read More
                    <ArrowRight
                      size={16}
                      className="arrow"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
