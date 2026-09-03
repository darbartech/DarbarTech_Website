"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import logo from "@/public/logos/dark_logo.png";
import smallLogo from "@/public/logos/small_logo.png";

import {
  Award,
  BookOpen,
  Calendar,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Megaphone,
  Menu,
  MessageSquare,
  StickyNote,
  UserCheck,
  Video,
  X,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useSidebarStore } from "@/store/sidebarStore";
import { useAuthStore } from "@/lib/auth/auth-store";

interface ChildItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

interface MenuItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  children?: ChildItem[];
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/student",
  },
  {
    label: "My Courses",
    icon: BookOpen,
    children: [
      {
        label: "Active Courses",
        icon: BookOpen,
        href: "/student/courses?status=Active",
      },
      {
        label: "Upcoming Courses",
        icon: Calendar,
        href: "/student/courses?status=Upcoming",
      },
      {
        label: "Completed Courses",
        icon: Award,
        href: "/student/courses?status=Completed",
      },
    ],
  },
  {
    label: "Class Schedule",
    icon: CalendarDays,
    href: "/student/schedule",
  },
  {
    label: "Online Classes",
    icon: Video,
    href: "/student/online-classes",
  },
  {
    label: "Assignments",
    icon: ClipboardList,
    href: "/student/assignments",
  },
  {
    label: "Notes",
    icon: StickyNote,
    href: "/student/notes",
  },
  {
    label: "Learning Materials",
    icon: FolderOpen,
    href: "/student/materials",
  },
  {
    label: "Attendance",
    icon: UserCheck,
    href: "/student/attendance",
  },
  {
    label: "Assessments & Results",
    icon: GraduationCap,
    href: "/student/results",
  },
  {
    label: "Notices",
    icon: Megaphone,
    href: "/student/notices",
  },
  {
    label: "Chat",
    icon: MessageSquare,
    href: "/student/chat",
  },
  {
    label: "Calendar",
    icon: Calendar,
    href: "/student/calendar",
  },
  {
    label: "Certificates",
    icon: Award,
    href: "/student/certificates",
  },
  {
    label: "Support",
    icon: LifeBuoy,
    href: "/student/support",
  },
  {
    label: "Activity",
    icon: Clock,
    href: "/student/activity",
  },
];

export default function StudentSidebar() {
  const { mobileSidebar, toggleMobileSidebar } = useSidebarStore();
  const { collapsed, toggleCollapsed } = useSidebarStore();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status");

  const logout = useAuthStore((s) => s.logout);

  const [openMenus, setOpenMenus] = useState<string[]>(["My Courses"]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const activeStyles =
    "border-l-2 border-(--bg-lightblue) bg-(--secondary-bg-dashboard) text-(--text-primary-dashboard)";

  const defaultStyles =
    "text-(--text-primary-dashboard) hover:bg-(--secondary-bg-dashboard) hover:text-(--bg-dashboard-hero)";

  return (
    <div
      className={`
        fixed left-0 top-0 h-screen
        ${mobileSidebar ? "z-100" : ""}
      `}
    >
      {mobileSidebar && (
        <div
          className="
            fixed inset-0 -z-10
            bg-(--bg-dashboard-hero)/40
            hover:cursor-pointer
            lg:hidden
          "
          onClick={toggleMobileSidebar}
        />
      )}

      <aside
        className={`
          flex h-screen flex-col

          border-r border-(--border-primary-dashboard)
          bg-(--bg-primary-dashboard)

          transition-all duration-300

          ${collapsed ? "lg:w-20" : "lg:w-64"}

          ${mobileSidebar ? "fixed inset-y-0 left-0 z-100 w-64" : "hidden"}

          lg:relative
          lg:flex
          lg:z-auto
        `}
      >
        <div
          className={`
            flex h-16 items-center
            justify-between
            px-5

            ${collapsed ? "lg:flex-col lg:justify-center lg:py-5" : "px-6"}
          `}
        >
          <div className="flex items-center">
            <Image
              src={smallLogo}
              alt="Darbar Tech"
              className="w-6 lg:w-8"
            />

            <Image
              src={logo}
              loading="lazy"
              alt="Darbar Tech"
              className={`
                w-25 lg:w-30
                ${collapsed ? "lg:hidden" : ""}
              `}
            />
          </div>

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
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </button>
        </div>

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

              const isOpen = openMenus.includes(item.label);

              const isActive = item.href === pathname;

              const hasChildren = Boolean(item.children?.length);

              const hasActiveChild = Boolean(
                item.children?.some(
                  (child) =>
                    pathname === child.href ||
                    (pathname === "/student/courses" &&
                      child.href.startsWith("/student/courses?")),
                ),
              );

              return (
                <li key={item.label}>
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleMenu(item.label)}
                        title={collapsed ? item.label : undefined}
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

                          ${hasActiveChild ? activeStyles : defaultStyles}
                        `}
                      >
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

                          <span
                            className={`
                              whitespace-nowrap

                              ${collapsed ? "lg:hidden" : ""}
                            `}
                          >
                            {item.label}
                          </span>
                        </span>

                        <span className={collapsed ? "lg:hidden" : ""}>
                          {isOpen ? (
                            <ChevronDown className="h-4 w-4 shrink-0" />
                          ) : (
                            <ChevronRight className="h-4 w-4 shrink-0" />
                          )}
                        </span>
                      </button>

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
                          {item.children?.map((child) => {
                            const ChildIcon = child.icon;

const isChildActive =
  pathname === "/student/courses" &&
  activeStatus ===
    new URLSearchParams(child.href.split("?")[1]).get("status");

                            return (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  title={collapsed ? child.label : undefined}
                                  onClick={toggleMobileSidebar}
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

                                  <span
                                    className={`
                                        whitespace-nowrap

                                        ${collapsed ? "lg:hidden" : ""}
                                      `}
                                  >
                                    {child.label}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      title={collapsed ? item.label : undefined}
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

                        ${isActive ? activeStyles : defaultStyles}

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

                      <span
                        className={`
                          whitespace-nowrap

                          ${collapsed ? "lg:hidden" : ""}
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

        <div
          className="
            space-y-1
            border-t
            border-(--border-primary-dashboard)
            p-3
          "
        >
          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/login");
            }}
            title={collapsed ? "Logout" : undefined}
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

            <span
              className={`
                whitespace-nowrap

                ${collapsed ? "lg:hidden" : ""}
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