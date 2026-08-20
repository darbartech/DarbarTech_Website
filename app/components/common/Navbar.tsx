"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";

import logo from "@/public/window.svg";

const navLinks = [
  {
    label: "Product",
    href: "",
    hasDropdown: true,
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Pages",
    href: "/pages",
  },
  {
    label: "Integrations",
    href: "/integrations",
  },
  {
    label: "Developers",
    href: "/developers",
  },
];

const productLinks = [
  {
    label: "Product One",
    href: "/products/product-one",
  },
  {
    label: "Product Two",
    href: "/products/product-two",
  },
  {
    label: "Product Three",
    href: "/products/product-three",
  },
];

const linkClasses =
  "flex items-center gap-1 rounded-3xl px-3 py-2 transition-all hover:text-(--accent-color) hover:shadow-md sm:px-4 lg:px-5";

const desktopProductButtonClasses = `
  w-full
  rounded-lg
  px-3
  py-2
  text-left
  text-sm
  transition-all
  hover:cursor-pointer
  hover:bg-(--secondary-bg-color)
  hover:text-(--primary-bg-color)
  hover:shadow-md
  sm:px-4
`;

const mobileLinkClasses = `
  flex
  w-full
  items-center
  justify-between
  rounded-xl
  px-4
  py-3
  text-sm
  transition-all
  hover:cursor-pointer
  hover:rounded-2xl
  hover:text-(--accent-color)
  hover:shadow-md
  sm:text-base
`;

const mobileProductLinkClasses = `
  block
  rounded-lg
  px-4
  py-2
  text-sm
  transition-all
  hover:text-(--accent-color)
  hover:shadow-md
  sm:text-base
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProductOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleProduct = () => {
    setIsProductOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-(--primary-bg-color) font-semibold">
      {/* Main navbar */}
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 md:px-10 md:py-5 lg:py-7">
        {/* Logo + Desktop navigation */}
        <div className="flex min-w-0 items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {/* Logo */}
          <Link href="/" aria-label="Home" onClick={closeMenu}>
            <Image
              src={logo}
              alt="Logo"
              priority
              className="h-auto w-6 sm:w-7"
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:block"
          >
            <ul className="flex items-center">
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  className={link.hasDropdown ? "group relative" : ""}
                >
                  <Link href={link.href} className={linkClasses}>
                    <span>{link.label}</span>

                    {link.hasDropdown && (
                      <span className="relative h-4.5 w-4.5">
                        <ChevronDown
                          size={18}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="
                            absolute
                            inset-0
                            opacity-100
                            transition-opacity
                            duration-200
                            group-hover:opacity-0
                          "
                        />

                        <ChevronUp
                          size={18}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="
                            absolute
                            inset-0
                            opacity-0
                            transition-opacity
                            duration-200
                            group-hover:opacity-100
                          "
                        />
                      </span>
                    )}
                  </Link>

                  {/* Product dropdown */}
                  {link.hasDropdown && (
                    <div
                      className="
                        invisible
                        flex flex-col
                        absolute
                        left-6/7
                        top-full
                        z-50
                        mt-2
                        w-48
                        -translate-x-1/2
                        translate-y-2
                        rounded-xl
                        bg-(--primary-bg-color)
                        p-2
                        opacity-0
                        shadow-2xl
                        transition-all
                        duration-200
                        group-hover:visible
                        group-hover:translate-y-0
                        group-hover:opacity-100
                        sm:w-52
                      "
                    >
                      {productLinks.map((product) => (
                        <Link
                          key={product.href}
                          href={product.href}
                          className={desktopProductButtonClasses}
                        >
                          {product.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Desktop actions */}
        <div className="ml-auto hidden items-center gap-2 lg:flex xl:gap-3">
          <button
            type="button"
            className="
              rounded-3xl
              px-4
              py-2
              text-sm
              transition-all
              hover:text-(--accent-color)
              hover:shadow-md
              hover:cursor-pointer
              xl:px-5
              xl:text-base
            "
          >
            Login
          </button>

          <button
            type="button"
            className="
              rounded-4xl
              bg-(--secondary-bg-color)
              px-4
              py-2
              text-sm
              text-(--primary-bg-color)
              transition-all
              hover:bg-(--primary-bg-color)
              hover:text-(--secondary-bg-color)
              hover:outline-2
              hover:outline-(--secondary-bg-color)
              hover:cursor-pointer
              xl:px-5
              xl:text-base
            "
          >
            Start for free
          </button>
        </div>

        {/* Mobile menu toggle button */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="
            ml-auto
            rounded-lg
            p-2
            transition-all
            hover:cursor-pointer
            hover:text-(--accent-color)
            hover:shadow-md
            lg:hidden
          "
        >
          {isMenuOpen ? (
            <X size={26} aria-hidden="true" />
          ) : (
            <Menu size={26} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          absolute
          right-4
          top-full
          z-50
          w-[calc(100vw-2rem)]
          max-w-72
          overflow-hidden
          rounded-2xl
          border
          border-(--border)
          bg-(--primary-bg-color)
          shadow-xl
          transition-all
          duration-300
          sm:right-6
          md:right-10
          lg:hidden

          ${
            isMenuOpen
              ? "pointer-events-auto max-h-125 translate-y-2 opacity-100"
              : "pointer-events-none max-h-0 translate-y-0 opacity-0"
          }
        `}
      >
        <nav aria-label="Mobile navigation" className="p-3">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.hasDropdown ? (
                  <>
                    {/* Product button */}
                    <button
                      type="button"
                      onClick={toggleProduct}
                      aria-expanded={isProductOpen}
                      className={mobileLinkClasses}
                    >
                      <span>{link.label}</span>

                      <ChevronDown
                        size={18}
                        strokeWidth={2}
                        aria-hidden="true"
                        className={`
                          transition-transform
                          duration-200
                          ${
                            isProductOpen
                              ? "rotate-180"
                              : "rotate-0"
                          }
                        `}
                      />
                    </button>

                    {/* Mobile Product dropdown */}
                    <div
                      className={`
                        overflow-hidden
                        transition-all
                        duration-300
                        ${
                          isProductOpen
                            ? "max-h-40 opacity-100"
                            : "max-h-0 opacity-0"
                        }
                      `}
                    >
                      <div className="ml-3 mt-1 space-y-1 border-l border-(--border) pl-3">
                        {productLinks.map((product) => (
                          <Link
                            key={product.href}
                            href={product.href}
                            onClick={closeMenu}
                            className={mobileProductLinkClasses}
                          >
                            {product.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={mobileLinkClasses}
                  >
                    <span>{link.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile actions */}
          <div className="mt-3 flex flex-col gap-2 border-t border-(--border) pt-3">
            <button
              type="button"
              className="
                w-full
                rounded-xl
                px-4
                py-3
                text-left
                text-sm
                transition-all
                hover:cursor-pointer
                hover:text-(--accent-color)
                hover:shadow-md
                sm:text-base
              "
            >
              Login
            </button>

            <button
              type="button"
              className="
                w-full
                rounded-xl
                bg-(--secondary-bg-color)
                px-4
                py-3
                text-sm
                text-(--primary-bg-color)
                transition-all
                hover:cursor-pointer
                hover:bg-(--primary-bg-color)
                hover:text-(--secondary-bg-color)
                hover:outline-2
                hover:outline-(--secondary-bg-color)
                sm:text-base
              "
            >
              Start for free
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;