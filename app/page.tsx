import Image from "next/image";
import { ArrowRight, RotateCcw, CircleCheck, Plus } from "lucide-react";
import logo from "@/public/file.svg";
import illustration from "@/public/Illustrator.png";

export default function Home() {
  return (
    <div>
      <main className="py-5">
        {/* hero-section */}
        <section className="px-30 py-15 text-center flex flex-col justify-center gap-5 text-sm font-bold">
          <h1 className="text-7xl font-bold">
            Create, inspect, and apply synthetic surveillance broadly.
          </h1>
          <p className="text-(--bg-muted) text-xl">
            Start with a stunning homepage. Stay motivated without hurting your
            pocket.
          </p>
          <button className="bg-(--secondary-bg-color) px-8 py-4 rounded-4xl text-(--primary-bg-color) text-xl mx-auto">
            Start for free
          </button>
          <p className="text-(--bg-muted) text-lg flex justify-center gap-2">
            Want to talk or get a live demo?
            <span className="text-(--gray-color) flex items-center gap-1">
              Get in touch{" "}
              <span>
                <ArrowRight size={18} />
              </span>
            </span>
          </p>
        </section>

        {/* partner's logo section */}
        <section className="flex items-center justify-between px-30 py-15">
          <Image src={logo} alt="Logo 1" />
          <Image src={logo} alt="Logo 2" />
          <Image src={logo} alt="Logo 3" />
          <Image src={logo} alt="Logo 4" />
          <Image src={logo} alt="Logo 5" />
          <Image src={logo} alt="Logo 6" />
        </section>

        {/* featured solutions section */}
        <section className="font-bold">
          {/* info div */}
          <div className="px-30 text-center py-5 space-y-8 max-w-5xl mx-auto">
            <div>
              <p className="text-2xl text-(--secondary-bg-color)">
                What we offer
              </p>
              <h2 className="text-5xl">Our Featured Solutions</h2>
            </div>
            <p className="text-(--bg-muted) text-xl">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
              distinctio reiciendis temporibus ratione cupiditate vel et ipsam
              voluptates!
            </p>
          </div>

          {/* cards div */}
          <div className="px-30 flex gap-3 py-5">
            {[1, 2, 3, 4].map((item, index) => (
              <div
                className="py-8 px-4 shadow-[5px_5px_15px_rgba(0,0,0,0.15)] rounded-lg space-y-2"
                key={index}
              >
                <span>
                  <RotateCcw
                    className="text-(--secondary-bg-color)"
                    size={48}
                  />
                </span>
                <h3 className="text-2xl font-bold">Robotic Automation</h3>
                <p className="text-(--bg-muted) text-lg">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corporis, repudiandae?
                </p>
                <button className="text-(--accent-color) text-md">
                  Discover more
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* illustrator and description */}
        <section className="px-30 py-15 flex items-center gap-5 font-bold">
          {/* illustration image */}
          <div className="w-[45%]">
            <Image src={illustration} alt="Illustration" />
          </div>

          {/* description side */}
          <div className="w-[55%] space-y-5">
            <h2 className="text-5xl">Why We Do Karlson Template</h2>
            <p className="text-lg text-center text-(--bg-muted)">
              We believe brand interaction is key to communication. <br /> Real
              innovations and positive customer experience are teh heart of
              succecss.
            </p>

            {/* customer service grid list*/}
            <div className="grid grid-cols-2 gap-x-5 gap-y-2 py-5">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <p
                  className="flex items-center gap-2 bg-(--surface) rounded px-3 py-2 text-lg text-(--gray-color)"
                  key={index}
                >
                  <span>
                    <CircleCheck
                      className="text-(--secondary-bg-color)"
                      size={24}
                    />
                  </span>
                  Customer services
                </p>
              ))}
            </div>

            {/* buttons */}
            <div className="text-lg space-x-2 flex">
              <button className="px-7 py-2 border border-(--secondary-bg-color) text-(--accent-color) rounded-3xl ">
                Contact Us
              </button>
              <button className="px-7 py-2 bg-(--secondary-bg-color) rounded-3xl text-(--primary-bg-color) ">
                Read More
              </button>
            </div>
          </div>
        </section>

        {/* why choose us section */}
        <section className="px-30 py-15 flex items-center justify-between gap-5 font-bold">
          <div className=" space-y-4 w-[55%]">
            <h1 className="text-5xl">Why Choose Us</h1>
            <p className="text-lg text-(--bg-muted)">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              consequatur quo, quam at voluptas illum enim vitae magni illo,
              architecto, quos{" "}
            </p>

            {[1, 2, 3].map((item, index) => (
              <div className="flex gap-3" key={index}>
                <span className="mt-1">
                  <CircleCheck size={24} />
                </span>
                <div className="space-y-1">
                  <h3 className="text-xl">Experienced Developer</h3>
                  <p className="text-md text-(--bg-muted)">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Perspiciatis, illum?
                  </p>
                </div>
              </div>
            ))}

            <button className="rounded px-8 py-3 text-md text-(--primary-bg-color) bg-(--secondary-bg-color)">
              DISCOVER MORE
            </button>
          </div>

          <div className="w-[45%]">
            <Image src={illustration} alt="Illustrator" />
          </div>
        </section>

        {/* testimonials section */}
        <section className="px-30 py-15 text-center space-y-15 font-bold">
          <div className="space-y-3">
            <h3 className="text-(--secondary-bg-color) text-2xl">
              TESTIMONIALS
            </h3>
            <h2 className="text-5xl">Our Featured Solutions</h2>
          </div>

          <div className="flex items-center gap-5">
            {[1, 2, 3].map((item, index) => (
              <div
                className="p-4 text-sm border-2 border-(--surface) rounded-lg shadow-xs space-y-5"
                key={index}
              >
                <p className="text-lg text-(--bg-muted) text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                  vero eius distinctio incidunt. Assumenda, ut. alsk alskdfjosdf
                  ksd flkasdf slsdklj sdkjf lsd klsdj f
                </p>

                <div className="flex items-center justify-start gap-2 text-start font-bold">
                  <Image
                    src={illustration}
                    alt="Profile Image"
                    className="h-10 w-10 rounded-[50%] "
                  />
                  <div className="">
                    <h3 className="text-xl -mb-1">Ram Bahadur</h3>
                    <p className="text-normal text-(--secondary-bg-color)">
                      Developer
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ section */}
        <section className="px-30 py-15 space-y-15">
          <div className="max-w-2xl mx-auto text-center font-bold space-y-5 bg-(--bg-random)">
            <span className="text-(--secondary-bg-color)">FAQ</span>
            <h2 className="text-5xl">Frequently Asked Questions</h2>
            <p className="text-(--bg-muted)">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
              natus, similique cumque sapiente veniam odio commodi eveniet
              ratione totam rerum.
            </p>
          </div>

          <div className="flex items-center gap-15">
            <Image src={illustration} alt="Illustrator" className="w-[45%]" />
            <div className="space-y-3 w-[55%]">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <div className="shadow-md flex items-center" key={index}>
                  <span className="bg-(--secondary-bg-color) py-3 px-2">
                    <Plus />
                  </span>
                  <p className="px-10">
                    Which material types can you work with?
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* lets get to work section */}
        <section className="px-30 py-20 flex items-center justify-between font-bold ">
          <div className="">
            <span className="text-lg">READY TO DO THIS</span>
            <h3 className="text-5xl">Let's Get To Work!</h3>
          </div>
          <div className="flex items-center justify-cente">
            <button className="text-(--primary-bg-color) text-lg bg-(--secondary-bg-color) px-8 py-3 rounded">
              CONTACT US
            </button>
          </div>
        </section>

        {/* latest news section */}
        <section className="px-30 py-15 font-bold space-y-10">
          <h2 className="text-5xl text-center">Latest News</h2>
          <div className="flex items-center justify-between gap-5">
            {[1, 2, 3].map((item, index) => (
              <div className="shadow-lg text-(--bg-muted)" key={index}>
                <Image src={illustration} alt="Illustrator" />

                <div className="px-4 py-2 space-y-5">
                  <span className="block">
                    By: <span className="text-(--secondary-bg-color)">James Anderson</span> / June 26, 2025
                  </span>

                  <h3 className="text-2xl text-(--primary-text-color)">How To Boost Your Digital Marketing Agency</h3>

                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Iure, cumque!
                  </p>

                  <button className="flex items-center gap-1 text-(--secondary-bg-color)">
                    Read More{" "}
                    <span>
                      <ArrowRight size={16} />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* enquiry section */}
        <section className="px-30 py-20 max-w-5xl mx-auto space-y-5 font-bold text-center">
          <span className="block">GET STARTED INSTANTLY!</span>
            <h2 className="text-5xl">Get Only New Update From This Newsletter</h2>
            <div className="p-1 shadow-md w-fit mx-auto rounded-3xl">
              <input type="email" placeholder="Enter your email" className="px-4 text-(--bg-muted) outline-none"/>
              <button className="py-2 px-4 bg-(--secondary-bg-color) text-(--primary-bg-color) rounded-4xl">SUBSCRIBE</button>
            </div>
        </section>
      </main>
    </div>
  );
}
