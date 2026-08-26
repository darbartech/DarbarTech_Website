"use client";

import {
  BarChart3,
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
  UserCog,
  Users,
  WandSparkles,
} from "lucide-react";

import { useState } from "react";

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
  {
    label: "Roles",
    icon: WandSparkles,
    href: "/admin/roles",
  },
];

export default function AdminNavbar() {
  const [openMenus, setOpenMenus] = useState<string[]>([
    "CMS",
    "Users",
  ]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children?.length;
            const isOpen = openMenus.includes(item.label);

            return (
              <li key={item.label}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </span>

                      {isOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>

                    {isOpen && (
                      <ul className="ml-5 mt-1 space-y-1 border-l border-gray-200 pl-3">
                        {item.children?.map((child) => {
                          const ChildIcon = child.icon;

                          return (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                              >
                                <ChildIcon className="h-4 w-4" />
                                {child.label}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}