"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import logo from "@/public/logos/dark_logo.png";
import smallLogo from "@/public/logos/small_logo.png";

import {
  BarChart3,
  Bell,
  Bot,
  ChevronDown,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Palette,
  Package,
  Settings,
  Shield,
  Sparkles,
  User,
  User2Icon,
  UserCog,
  Users,
  Menu,
  X,
  CircleArrowOutUpLeft,
} from "lucide-react";

import { useSidebarStore } from "@/store/sidebarStore";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Career",
    icon: CircleArrowOutUpLeft,
    href: "/admin/career",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/admin/analytics",
  },
  {
    label: "CMS",
    icon: FileText,
    children: [
      {
        label: "Hero Management",
        icon: Sparkles,
        href: "/admin/cms/hero",
      },
      {
        label: "Product Management",
        icon: Package,
        href: "/admin/cms/products",
      },
    ],
  },
  {
    label: "Users",
    icon: Users,
    children: [
      {
        label: "SuperAdmin",
        icon: UserCog,
        href: "/admin/users/superadmin",
      },
      {
        label: "Admin",
        icon: UserCog,
        href: "/admin/users/admin",
      },
      {
        label: "User",
        icon: User,
        href: "/admin/users",
      },
    ],
  },
  {
    label: "Notifications",
    icon: Bell,
    href: "/admin/notifications",
  },
  {
    label: "Themes",
    icon: Palette,
    href: "/admin/themes",
  },
  {
    label: "Security",
    icon: Shield,
    href: "/admin/security",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
  {
    label: "AI & CHAT",
    icon: Bot,
    href: "/admin/ai-chat",
  },
];

export default function AdminNavbar() {
  const { mobileOpen, toggleMobileSidebar } = useSidebarStore();
  const { collapsed, toggleCollapsed } = useSidebarStore();

  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState<string[]>([
    "CMS",
    "Users",
  ]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const activeStyles =
    "border-l-2 border-(--bg-lightblue) bg-(--secondary-bg-dashboard) text-(--secondary-text-dashboard)";

  const defaultStyles =
    "text-(--text-primary-dashboard) hover:bg-(--secondary-bg-dashboard) hover:text-(--bg-dashboard-hero)";

  return (
    <div
      className={`
        fixed left-0 top-0 h-screen
        ${mobileOpen ? "z-100" : ""}
      `}
    >
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="
            fixed inset-0 -z-10
            bg-black/40
            hover:cursor-pointer
            lg:hidden
          "
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          flex h-screen flex-col

          border-r border-(--border-primary-dashboard)
          bg-(--bg-primary-dashboard)

          transition-all duration-300

          ${collapsed ? "lg:w-20" : "lg:w-64"}

          ${
            mobileOpen
              ? "fixed inset-y-0 left-0 z-100 w-64"
              : "hidden"
          }

          lg:relative
          lg:flex
          lg:z-auto
        `}
      >
        {/* ================= HEADER ================= */}
        <div
          className={`
            flex h-16 items-center
            justify-between
            px-5

            ${
              collapsed
                ? "lg:flex-col lg:justify-center lg:py-5"
                : "px-6"
            }
          `}
        >
          {/* Logo */}
          <div className="flex items-center">
            {/* Small logo */}
            <Image
              src={smallLogo}
              alt="Darbar Tech"
              className="w-6 lg:w-8"
            />

            {/* Full logo */}
            <Image
              src={logo}
              alt="Darbar Tech"
              className={`
                w-25 lg:w-30
                ${collapsed ? "lg:hidden" : ""}
              `}
            />
          </div>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={toggleMobileSidebar}
            className="
              rounded-lg
              p-2

              text-(--text-primary-dashboard)

              transition

              hover:bg-(--secondary-bg-dashboard)
              hover:text-(--bg-dashboard-hero)
              hover:cursor-pointer

              lg:hidden
            "
            aria-label="Close sidebar"
            title="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Desktop collapse button */}
          <button
            type="button"
            onClick={toggleCollapsed}
            className="
              hidden
              rounded-lg
              p-2

              text-(--text-primary-dashboard)

              transition

              hover:bg-(--secondary-bg-dashboard)
              hover:text-(--bg-dashboard-hero)
              hover:cursor-pointer

              lg:block
            "
            aria-label={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            title={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >
            {collapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav
          className="
            flex-1

            overflow-y-auto
            overflow-x-hidden

            px-3
            py-3

            [&::-webkit-scrollbar]:hidden
            [scrollbar-width:none]
          "
        >
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const hasChildren = Boolean(
                item.children?.length,
              );

              const isOpen = openMenus.includes(
                item.label,
              );

              const isActive =
                item.href === pathname;

              const hasActiveChild =
                item.children?.some(
                  (child) =>
                    pathname === child.href,
                );

              return (
                <li key={item.label}>
                  {hasChildren ? (
                    <>
                      {/* ================= PARENT MENU ================= */}
                      <button
                        type="button"
                        onClick={() =>
                          toggleMenu(item.label)
                        }
                        title={
                          collapsed
                            ? item.label
                            : undefined
                        }
                        className={`
                          flex
                          w-full
                          items-center
                          rounded-lg

                          py-3
                          text-sm
                          font-medium

                          transition

                          hover:cursor-pointer

                          ${
                            collapsed
                              ? `
                                justify-between
                                px-4

                                lg:justify-center
                                lg:px-2
                              `
                              : `
                                justify-between
                                px-4
                              `
                          }

                          ${
                            hasActiveChild
                              ? activeStyles
                              : defaultStyles
                          }
                        `}
                      >
                        {/* Icon + Label */}
                        <span
                          className={`
                            flex
                            items-center

                            ${
                              collapsed
                                ? `
                                  gap-3

                                  lg:justify-center
                                `
                                : "gap-3"
                            }
                          `}
                        >
                          <Icon className="h-5 w-5 shrink-0" />

                          {/* Label */}
                          <span
                            className={`
                              whitespace-nowrap

                              ${
                                collapsed
                                  ? "lg:hidden"
                                  : ""
                              }
                            `}
                          >
                            {item.label}
                          </span>
                        </span>

                        {/* Chevron */}
                        <span
                          className={
                            collapsed
                              ? "lg:hidden"
                              : ""
                          }
                        >
                          {isOpen ? (
                            <ChevronDown className="h-4 w-4 shrink-0" />
                          ) : (
                            <ChevronRight className="h-4 w-4 shrink-0" />
                          )}
                        </span>
                      </button>

                      {/* ================= CHILDREN ================= */}
                      {isOpen && (
                        <ul
                          className={`
                            mt-2
                            space-y-1

                            ${
                              collapsed
                                ? `
                                  lg:ml-0
                                `
                                : `
                                  ml-5
                                  border-l
                                  border-(--border-primary-dashboard)
                                  pl-3
                                `
                            }
                          `}
                        >
                          {item.children?.map(
                            (child) => {
                              const ChildIcon =
                                child.icon;

                              const isChildActive =
                                pathname ===
                                child.href;

                              return (
                                <li
                                  key={
                                    child.label
                                  }
                                >
                                  <Link
                                    href={
                                      child.href
                                    }
                                    title={
                                      collapsed
                                        ? child.label
                                        : undefined
                                    }
                                    onClick={
                                      toggleMobileSidebar
                                    }
                                    className={`
                                      flex
                                      items-center
                                      rounded-lg

                                      py-2.5

                                      text-sm

                                      transition

                                      hover:cursor-pointer

                                      ${
                                        isChildActive
                                          ? activeStyles
                                          : defaultStyles
                                      }

                                      ${
                                        collapsed
                                          ? `
                                            gap-3
                                            px-4

                                            lg:justify-center
                                            lg:px-2
                                          `
                                          : `
                                            gap-3
                                            px-4
                                          `
                                      }
                                    `}
                                  >
                                    <ChildIcon className="h-4 w-4 shrink-0" />

                                    {/* Child label */}
                                    <span
                                      className={`
                                        whitespace-nowrap

                                        ${
                                          collapsed
                                            ? "lg:hidden"
                                            : ""
                                        }
                                      `}
                                    >
                                      {
                                        child.label
                                      }
                                    </span>
                                  </Link>
                                </li>
                              );
                            },
                          )}
                        </ul>
                      )}
                    </>
                  ) : (
                    /* ================= NORMAL MENU ITEM ================= */
                    <Link
                      href={item.href}
                      title={
                        collapsed
                          ? item.label
                          : undefined
                      }
                      onClick={
                        toggleMobileSidebar
                      }
                      className={`
                        flex
                        items-center
                        rounded-lg

                        py-3

                        text-sm
                        font-medium

                        transition

                        hover:cursor-pointer

                        ${
                          isActive
                            ? activeStyles
                            : defaultStyles
                        }

                        ${
                          collapsed
                            ? `
                              gap-3
                              px-4

                              lg:justify-center
                              lg:px-2
                            `
                            : `
                              gap-3
                              px-4
                            `
                        }
                      `}
                    >
                      <Icon className="h-5 w-5 shrink-0" />

                      {/* Label */}
                      <span
                        className={`
                          whitespace-nowrap

                          ${
                            collapsed
                              ? "lg:hidden"
                              : ""
                          }
                        `}
                      >
                        {item.label}
                      </span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ================= PROFILE / LOGOUT ================= */}
        <div
          className="
            space-y-1
            border-t
            border-(--border-primary-dashboard)
            p-3
          "
        >
          {/* Profile */}
          <Link
            href="/admin/profile"
            title={
              collapsed
                ? "Profile"
                : undefined
            }
            onClick={toggleMobileSidebar}
            className={`
              flex
              items-center
              rounded-lg

              py-3

              text-sm
              font-medium

              transition

              hover:cursor-pointer

              ${
                pathname === "/admin/profile"
                  ? activeStyles
                  : defaultStyles
              }

              ${
                collapsed
                  ? `
                    gap-3
                    px-4

                    lg:justify-center
                    lg:px-2
                  `
                  : `
                    gap-3
                    px-4
                  `
              }
            `}
          >
            <User2Icon className="h-5 w-5 shrink-0" />

            {/* Profile label */}
            <span
              className={`
                whitespace-nowrap

                ${
                  collapsed
                    ? "lg:hidden"
                    : ""
                }
              `}
            >
              Profile
            </span>
          </Link>

          {/* Logout */}
          <button
            type="button"
            title={
              collapsed
                ? "Logout"
                : undefined
            }
            className={`
              flex
              w-full
              items-center
              rounded-lg

              py-3

              text-sm
              font-medium

              transition

              hover:cursor-pointer

              ${
                collapsed
                  ? `
                    gap-3
                    px-4

                    lg:justify-center
                    lg:px-2
                  `
                  : `
                    gap-3
                    px-4
                  `
              }

              text-(--text-primary-dashboard)

              hover:bg-(--secondary-bg-dashboard)
              hover:text-(--bg-dashboard-hero)
            `}
          >
            <LogOut className="h-5 w-5 shrink-0" />

            {/* Logout label */}
            <span
              className={`
                whitespace-nowrap

                ${
                  collapsed
                    ? "lg:hidden"
                    : ""
                }
              `}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
}