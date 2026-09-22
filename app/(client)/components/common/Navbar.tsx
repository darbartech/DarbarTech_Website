"use client";

import { useSyncExternalStore, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Home,
  Info,
  Layers,
  User,
} from "lucide-react";

import logo from "@/public/logos/dark_logo.png";
import { useAuthStore } from "@/lib/auth/auth-store";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Service",
    hasDropdown: true
  },
  {
    label: "Case Study",
    href: "/case-study",
  },
];

const servicesLinks = [
  {
    label: "Digital Marketing",
    href: "/services?service=digital-marketing",
  },
  {
    label: "Web Development",
    href: "/services?service=web-development",
  },
  {
    label: "AI Automation",
    href: "/services?service=ai-automation",
  },
];

const linkClasses =
  "flex items-center py-2 hover:cursor-pointer relative w-full overflow-hidden transition-all duration-200 ease-in-out after:content-[''] after:w-full after:h-1 after:absolute after:-left-full after:bottom-0 after:bg-(--secondary-bg-color) hover:after:left-0 after:transition-all after:duration-300 after:ease-in-out";

const desktopserviceButtonClasses = `
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

const popoverServiceLinkClasses = `
  block
  rounded-lg
  px-4
  py-2.5
  text-sm
  transition-all
  hover:cursor-pointer
  hover:text-(--secondary-bg-color)
  hover:shadow-md
`;

const Navbar = () => {
  const pathname = usePathname();

  const [isserviceOpen, setIsserviceOpen] = useState(false);

  // Active service selected on the services page (read from query param)
  const activeService = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("service") ?? "",
    () => "",
  );

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const toggleservice = () => {
    setIsserviceOpen((prev) => !prev);
  };

  const closeService = () => {
    setIsserviceOpen(false);
  };

  // Check whether a normal navigation link is active
  const isActive = (href?: string) => {
    if (!href) {
      return false;
    }

    // Home should only be active on "/"
    if (href === "/") {
      return pathname === "/";
    }

    // Other routes are active for their child routes too
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // service dropdown is active for any /services/... route
  const isserviceActive = pathname.startsWith("/services");

  // Profile → the user's portal profile when signed in, otherwise the login page
  const profileHref = isAuthenticated && user
    ? user.role === "teacher"
      ? "/teacher/profile"
      : user.role === "student"
        ? "/student/profile"
        : "/admin/profile"
    : "/login";

  const profileActive = pathname === profileHref;

  return (
    <>
      <header className="sticky top-0 z-50 font-semibold bg-(--primary-bg-color) text-(--primary-text-color)">
        {/* Main navbar */}
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 md:px-10 md:py-5 lg:py-7">
          {/* Logo + Desktop navigation */}
          <div className="flex items-center sm:gap-4 lg:gap-10">
            {/* Logo */}
            <Link href="/" aria-label="Home">
              <Image
                src={logo}
                alt="Logo"
                priority
                className="w-40"
              />
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Main navigation" className="hidden lg:block ">
              <ul className="flex items-center gap-6">
                {navLinks.map((link) => {
                  const active = link.hasDropdown
                    ? isserviceActive
                    : isActive(link.href);

                  return (
                    <li
                      key={link.label}
                      className={link.hasDropdown ? "group relative" : ""}
                    >
                      {link.hasDropdown ? (
                        <button
                          type="button"
                          aria-expanded={isserviceOpen}
                          onClick={toggleservice}
                          className={`
                            ${linkClasses}
                            ${active ? "text-(--secondary-bg-color)" : ""}
                          `}
                        >
                          <span>{link.label}</span>

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
                        </button>
                      ) : (
                        <Link
                          href={link.href!}
                          aria-current={active ? "page" : undefined}
                          className={`
                            ${linkClasses}
                            ${active ? "text-(--secondary-bg-color)" : ""}
                          `}
                        >
                          <span>{link.label}</span>
                        </Link>
                      )}

                      {/* service dropdown */}
                      {link.hasDropdown && (
                        <div
                          className="
                            invisible
                            absolute
                            left-6/7
                            top-full
                            z-50
                            mt-2
                            flex
                            w-48
                            -translate-x-1/2
                            translate-y-2
                            flex-col
                            gap-2
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
                          {servicesLinks.map((service) => {
                            const serviceParam = new URLSearchParams(
                              service.href.split("?")[1] ?? "",
                            ).get("service");

                            return (
                              <Link
                                key={service.href}
                                href={service.href}
                                className={`
                                ${desktopserviceButtonClasses}
                                ${
                                  activeService === serviceParam
                                    ? "bg-(--secondary-bg-color) text-(--primary-bg-color)"
                                    : ""
                                }
                              `}
                              >
                                {service.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Desktop actions */}
          <div className="ml-auto hidden items-center gap-2 lg:flex xl:gap-3">
            <Link href="/login"
              className="
                rounded-3xl
                px-4
                py-2
                text-sm
                btn-secondary-hover-state
                xl:px-5
                xl:text-base
              "
            >
              Login
            </Link>

            <Link
              href="/register"
              className="
                rounded-4xl
                px-4
                py-2
                text-sm

                btn-primary-hover-state
                
                xl:px-5
                xl:text-base
              "
            >
              Start for free
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile bottom navigation — visible only on smaller screens */}
      <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
        <nav
          aria-label="Mobile bottom navigation"
          className="
            relative
            border-t
            border-(--surface)
            bg-(--primary-bg-color)
            shadow-[0_-4px_16px_rgba(0,0,0,0.08)]
            backdrop-blur
          "
        >
          {/* Service popover */}
          <div
            className={`
              absolute
              bottom-full
              left-3
              right-3
              z-50
              mb-3
              flex
              flex-col
              gap-1
              rounded-2xl
              border
              border-(--surface)
              bg-(--primary-bg-color)
              p-2
              shadow-xl
              transition-all
              duration-200
              ${
                isserviceOpen
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-2 opacity-0"
              }
            `}
          >
            <p className="px-4 pb-1 pt-2 text-xs text-(--tertiary-text-color)">
              Our Services
            </p>
            {servicesLinks.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                onClick={closeService}
                className={`
                  ${popoverServiceLinkClasses}
                  ${
                    pathname === service.href
                      ? "bg-(--secondary-bg-color)/10 text-(--secondary-bg-color)"
                      : ""
                  }
                `}
              >
                {service.label}
              </Link>
            ))}
          </div>

          <ul className="grid grid-cols-5 pb-[env(safe-area-inset-bottom)]">
            {/* Service */}
            <li>
              <button
                type="button"
                onClick={toggleservice}
                aria-expanded={isserviceOpen}
                aria-haspopup="true"
                className={`
                  flex
                  w-full
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  py-2.5
                  transition-colors
                  hover:cursor-pointer
                  ${
                    isserviceActive
                      ? "text-(--secondary-bg-color)"
                      : "text-(--bg-muted)"
                  }
                `}
              >
                <Layers size={22} strokeWidth={2} aria-hidden="true" />
                <span className="text-[10px]">Service</span>
              </button>
            </li>

            {/* About */}
            <li>
              <Link
                href="/about"
                aria-current={isActive("/about") ? "page" : undefined}
                className={`
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  py-2.5
                  transition-colors
                  ${
                    isActive("/about")
                      ? "text-(--secondary-bg-color)"
                      : "text-(--bg-muted)"
                  }
                `}
              >
                <Info size={22} strokeWidth={2} aria-hidden="true" />
                <span className="text-[10px]">About</span>
              </Link>
            </li>

            {/* Home (center) */}
            <li>
              <Link
                href="/"
                aria-current={isActive("/") ? "page" : undefined}
                className={`
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  pt-1.5
                  transition-colors
                  ${
                    isActive("/")
                      ? "text-(--secondary-bg-color)"
                      : "text-(--bg-muted)"
                  }
                `}
              >
                <span
                  className={`
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    transition-colors
                    ${
                      isActive("/")
                        ? "bg-(--secondary-bg-color)"
                        : "bg-(--surface)"
                    }
                  `}
                >
                  <Home
                    size={22}
                    strokeWidth={2}
                    aria-hidden="true"
                    className={
                      isActive("/")
                        ? "text-(--primary-bg-color)"
                        : "text-(--bg-muted)"
                    }
                  />
                </span>
                <span className="text-[10px]">Home</span>
              </Link>
            </li>

            {/* Case Study */}
            <li>
              <Link
                href="/case-study"
                aria-current={isActive("/case-study") ? "page" : undefined}
                className={`
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  py-2.5
                  transition-colors
                  ${
                    isActive("/case-study")
                      ? "text-(--secondary-bg-color)"
                      : "text-(--bg-muted)"
                  }
                `}
              >
                <FileText size={22} strokeWidth={2} aria-hidden="true" />
                <span className="text-[10px]">Case Study</span>
              </Link>
            </li>

            {/* Profile */}
            <li>
              <Link
                href={profileHref}
                aria-current={profileActive ? "page" : undefined}
                className={`
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  py-2.5
                  transition-colors
                  ${
                    profileActive
                      ? "text-(--secondary-bg-color)"
                      : "text-(--bg-muted)"
                  }
                `}
              >
                <User size={22} strokeWidth={2} aria-hidden="true" />
                <span className="text-[10px]">Profile</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;