"use client";

import Image from "next/image";
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
  DoorClosed,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSidebarStore } from "@/store/sidebarStore";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
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
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);

  const [openMenus, setOpenMenus] = useState<string[]>(["CMS", "Users"]);

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
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden hover:cursor-pointer"
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
          ${mobileOpen ? "fixed inset-y-0 left-0 z-40 w-64" : "hidden"}
          lg:relative
          lg:flex
          lg:z-auto
        `}
      >
        {/* Header */}
        <div
          className={`
    flex h-16 items-center
    border-b border-(--border-primary-dashboard)
    ${collapsed ? "lg:flex-col lg:justify-center lg:py-10" : "justify-between px-6"}
  `}
        >
          {/* Logo / Title */}
          <div
            className="
    flex items-center
  "
          >
            <Image src={smallLogo} alt="Darbar Tech" className="w-6 lg:w-8" />

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
            className="rounded-lg p-2 text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:text-(--bg-dashboard-hero) hover:cursor-pointer lg:hidden"
            aria-label="Close sidebar"
            title="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Desktop collapse button */}
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className="hidden rounded-lg p-2 text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:text-(--bg-dashboard-hero) hover:cursor-pointer lg:block"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const hasChildren = Boolean(item.children?.length);

              const isOpen = openMenus.includes(item.label);

              const isActive = item.href === pathname;

              const hasActiveChild = item.children?.some(
                (child) => pathname === child.href,
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
                          flex w-full items-center rounded-lg
                          py-2.5 text-sm font-medium transition
                          hover:cursor-pointer
                          ${
                            collapsed
                              ? "justify-center px-2"
                              : "justify-between px-3"
                          }
                          ${
                            !collapsed && hasActiveChild
                              ? activeStyles
                              : defaultStyles
                          }
                        `}
                      >
                        <span
                          className={`
                            flex items-center
                            ${collapsed ? "justify-center" : "gap-3"}
                          `}
                        >
                          <Icon className="h-5 w-5 shrink-0" />

                          {!collapsed && (
                            <span className="whitespace-nowrap">
                              {item.label}
                            </span>
                          )}
                        </span>

                        {!collapsed &&
                          (isOpen ? (
                            <ChevronDown className="h-4 w-4 shrink-0" />
                          ) : (
                            <ChevronRight className="h-4 w-4 shrink-0" />
                          ))}
                      </button>

                      {/* Children */}
                      {isOpen && (
                        <ul
                          className={`
                            mt-1 space-y-1
                            ${
                              collapsed
                                ? ""
                                : "ml-5 border-l border-(--border-primary-dashboard) pl-3"
                            }
                          `}
                        >
                          {item.children?.map((child) => {
                            const ChildIcon = child.icon;

                            const isChildActive = pathname === child.href;

                            return (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  title={collapsed ? child.label : undefined}
                                  onClick={toggleMobileSidebar}
                                  className={`
                                    flex items-center rounded-lg
                                    py-2 text-sm transition
                                    hover:cursor-pointer
                                    ${
                                      isChildActive && !collapsed
                                        ? activeStyles
                                        : defaultStyles
                                    }
                                    ${
                                      collapsed
                                        ? "justify-center px-2"
                                        : "gap-3 px-3"
                                    }
                                  `}
                                >
                                  <ChildIcon className="h-4 w-4 shrink-0" />

                                  {!collapsed && (
                                    <span className="whitespace-nowrap">
                                      {child.label}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      onClick={() => toggleMobileSidebar}
                      className={`
                        flex items-center rounded-lg
                        py-2.5 text-sm font-medium transition
                        hover:cursor-pointer
                        ${isActive && !collapsed ? activeStyles : defaultStyles}
                        ${collapsed ? "justify-center px-2" : "gap-3 px-3"}
                      `}
                    >
                      <Icon className="h-5 w-5 shrink-0" />

                      {!collapsed && (
                        <span className="whitespace-nowrap">{item.label}</span>
                      )}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Profile / Logout */}
        <div className="border-t border-(--border-primary-dashboard) p-3">
          <Link
            href="/admin/profile"
            title={collapsed ? "Profile" : undefined}
            onClick={() => toggleMobileSidebar}
            className={`
              flex items-center rounded-lg
              py-2.5 text-sm font-medium transition
              hover:cursor-pointer
              ${
                pathname === "/admin/profile" && !collapsed
                  ? activeStyles
                  : defaultStyles
              }
              ${collapsed ? "justify-center px-2" : "gap-3 px-3"}
            `}
          >
            <User2Icon className="h-5 w-5 shrink-0" />

            {!collapsed && <span className="whitespace-nowrap">Profile</span>}
          </Link>

          <button
            type="button"
            title={collapsed ? "Logout" : undefined}
            className={`
              mt-1 flex w-full items-center rounded-lg
              py-2.5 text-sm font-medium transition
              hover:cursor-pointer
              ${collapsed ? "justify-center px-2" : "gap-3 px-3"}
              text-(--text-primary-dashboard)
              hover:bg-(--secondary-bg-dashboard)
              hover:text-(--bg-dashboard-hero)
            `}
          >
            <LogOut className="h-5 w-5 shrink-0" />

            {!collapsed && <span className="whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
