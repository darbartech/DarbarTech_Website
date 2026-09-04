import React from "react";

import Image from "next/image";

import illustration from "@/public/home/Illustrator.png";
import Link from "next/link";
import facebookImage from "@/public/social-medias/facebook.png"
import instagramImage from "@/public/social-medias/instagram.png"
import linkedinImage from "@/public/social-medias/linkedin.png"

import {
  CircleFadingPlus,
  MessageSquareCodeIcon,
  PhoneCall,
} from "lucide-react";

const linkClasses =
  "hover:cursor-pointer hover:text-(--secondary-bg-color) transition-all duration-150";

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
                <span className="block">info@darbartech.com</span>
              </div>
            </div>

            {/* Social media */}
            <div className="flex items-center justify-start gap-2">
              <span className="shrink-0">
                <CircleFadingPlus className="text-(--secondary-bg-color)" />
              </span>

              <div className="text-xs">
                <span>SOCIAL NETWORK</span>

                <div className="mt-1 flex items-center gap-2">
                  <span>
                    <Image src={facebookImage} alt="Facebook Image" className="h-5 w-5 hover:cursor-pointer"/>
                  </span>

                  <span>
                    <Image src={instagramImage} alt="Instagram Image" className="h-5 w-5 hover:cursor-pointer"/>
                  </span>

                  <span>
                    <Image src={linkedinImage} alt="LinkedIn Image" className="h-5 w-5 hover:cursor-pointer"/>
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

          <div className="grid grid-cols-2 gap-2 font-semibold">
            <Link className={linkClasses} href="/">Home</Link>
            <Link className={linkClasses} href="/about">About</Link>
            <Link className={linkClasses} href="/contact">Contact</Link>
            <Link className={linkClasses} href="/services">Services</Link>
            <Link className={linkClasses} href="">Digital</Link>
            <Link className={linkClasses} href="">Support</Link>
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
          <Link className={linkClasses} href="/terms-conditions">Terms & Conditions</Link>
          <span>|</span>
          <Link className={linkClasses} href="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;