import React from "react";
import { Bell, Search, User2, Menu, X } from "lucide-react";
import { useSidebarStore } from "@/store/sidebarStore";

const Topbar = () => {
  const { mobileSidebar, toggleMobileSidebar } = useSidebarStore();
  const { collapsed, toggleCollapsed } = useSidebarStore();

  const handleInputChange = () => {
    console.log("Changed");
  };

  return (
    <div
      className={`flex w-full bg-(--bg-primary-dashboard) min-h-12 items-center justify-between gap-4 border-b border-(--border-primary-dashboard) pb-3 sm:pb-4 sticky top-0 z-10 p-5`}
    >
      {/* Page Navigation */}
      <div className="flex min-w-0 items-center gap-4 sm:gap-6 ">
        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileSidebar ? "Close sidebar" : "Open sidebar"}
          title={mobileSidebar ? "Close sidebar" : "Open sidebar"}
          className="rounded-lg p-2 text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:text-(--bg-dashboard-hero) lg:hidden"
          onClick={toggleMobileSidebar}
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="hidden shrink-0 text-lg font-semibold text-(--text-primary-dashboard) md:text-xl md:block">
          Dashboard
        </h1>

        <span className=" hidden truncate text-sm text-(--secondary-text-dashboard) md:block">
          Progress
        </span>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <form className="flex items-center gap-2 border border-(--border-primary-dashboard) rounded-3xl px-2 text-xs md:text-base md:py-1 md:px-5">
          <input
            type="text"
            onChange={() => handleInputChange}
            placeholder="Search anything..."
            aria-label="Search"
            className=" text-(--text-primary-dashboard) outline-none "
          />
          <button
            type="button"
            className="rounded-lg p-2 text-(--text-primary-dashboard) hover:cursor-pointer "
            title="Search"
          >
            {" "}
            <Search className="h-5 w-5 hover:cursor-pointer" />
          </button>
        </form>

        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          className="rounded-lg p-2 text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:text-(--bg-dashboard-hero) hover:cursor-pointer"
        >
          <Bell className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Profile"
          title="Profile"
          className="rounded-lg p-2 text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:text-(--bg-dashboard-hero) hover:cursor-pointer"
        >
          <User2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
