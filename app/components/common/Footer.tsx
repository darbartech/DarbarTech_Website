import React from "react";

import Image from "next/image";

import illustration from "@/public/home/Illustrator.png";

import {
  MessageCircleIcon,
  MessageSquareCodeIcon,
  PhoneCall,
} from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="
        flex
        flex-col
        space-y-5
        bg-(--bg-footer)
        px-5
        pt-8
        pb-5
        text-sm
        font-bold
        text-(--primary-bg-color)

        sm:px-8
        sm:pt-10

        md:px-12

        lg:px-20

        xl:px-30
      "
    >
      {/* Main footer content */}
      <div
        className="
          grid
          grid-cols-1
          gap-8

          sm:grid-cols-2

          lg:grid-cols-3
          lg:gap-5
        "
      >
        {/* Contact info */}
        <div className="space-y-2">
          <h3 className="border-b border-(--bg-muted) py-3">
            Contact Info
          </h3>

          <div className="space-y-5 py-3">
            {/* Phone */}
            <div className="flex items-center justify-start gap-2">
              <span className="shrink-0">
                <PhoneCall className="text-(--secondary-bg-color)" />
              </span>

              <div className="text-xs">
                <span>MON TO FRI:10:00AM - 6:00PM</span>
                <span className="block">+123 54253 534 42</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center justify-start gap-2">
              <span className="shrink-0">
                <MessageSquareCodeIcon className="text-(--secondary-bg-color)" />
              </span>

              <div className="text-xs">
                <span>DO YOU HAVE A QUESTION?</span>
                <span className="block">hello@karison.com</span>
              </div>
            </div>

            {/* Social media */}
            <div className="flex items-center justify-start gap-2">
              <span className="shrink-0">
                <MessageCircleIcon className="text-(--secondary-bg-color)" />
              </span>

              <div className="text-xs">
                <span>SOCIAL NETWORK</span>

                <div className="mt-1 flex items-center gap-2">
                  <span>
                    <MessageCircleIcon size={14} />
                  </span>

                  <span>
                    <MessageCircleIcon size={14} />
                  </span>

                  <span>
                    <MessageCircleIcon size={14} />
                  </span>

                  <span>
                    <MessageCircleIcon size={14} />
                  </span>

                  <span>
                    <MessageCircleIcon size={14} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="space-y-2">
          <h3 className="border-b border-(--bg-muted) py-3">
            Quick Links
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <span>Home</span>
            <span>About</span>
            <span>Blog</span>
            <span>Contact</span>
            <span>Agency</span>
            <span>Digital</span>
            <span>Support</span>
            <span>Shop</span>
            <span>Agency</span>
            <span>Digital</span>
            <span>Support</span>
            <span>Shop</span>
            <span>Digital</span>
            <span>Support</span>
          </div>
        </div>

        {/* Instagram */}
        <div className="space-y-2">
          <h3 className="border-b border-(--bg-muted) py-3">
            Instagram
          </h3>

          <div className="grid grid-cols-3 gap-2">
            <Image
              src={illustration}
              alt="Illustrator"
              className="h-auto w-full"
            />

            <Image
              src={illustration}
              alt="Illustrator"
              className="h-auto w-full"
            />

            <Image
              src={illustration}
              alt="Illustrator"
              className="h-auto w-full"
            />

            <Image
              src={illustration}
              alt="Illustrator"
              className="h-auto w-full"
            />

            <Image
              src={illustration}
              alt="Illustrator"
              className="h-auto w-full"
            />

            <Image
              src={illustration}
              alt="Illustrator"
              className="h-auto w-full"
            />

            <Image
              src={illustration}
              alt="Illustrator"
              className="h-auto w-full"
            />

            <Image
              src={illustration}
              alt="Illustrator"
              className="h-auto w-full"
            />

            <Image
              src={illustration}
              alt="Illustrator"
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* Optional fourth column / future content */}
        <div className="hidden lg:block" />
      </div>

      {/* Terms & conditions */}
      <div
        className="
          flex
          flex-col
          gap-3
          border-t
          border-(--bg-muted)
          pt-5
          font-semibold

          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:gap-5
        "
      >
        <div>
          <p className="text-xs sm:text-sm">
            &copy; Karlson is proudly owned by{" "}
            <span className="text-(--secondary-bg-color)">
              EnvyTheme
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-1 text-xs sm:text-sm">
          <span>Terms & Conditions</span>
          <span>|</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;