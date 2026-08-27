"use client";

import AdminNavbar from "../common/AdminNavbar";
import { useSidebarStore } from "@/store/sidebarStore";
import {
  ArrowRight,
  Bell,
  Bookmark,
  Bot,
  CircleUserRound,
  Clock3,
  Code2,
  DollarSign,
  MapPin,
  Palette,
  Search,
  User2,
  UsersRound,
  XCircle,
  Menu,
  X,
} from "lucide-react";
import Topbar from "../TopBar";

const recommendedRoles = [
  {
    title: "Senior React Developer",
    company: "TechFlow Systems",
    type: "Full-time",
    location: "Kathmandu (Hybrid)",
    salary: "NPR 150k - 200k/mo",
    match: "High Match (92%)",
    icon: Code2,
  },
  {
    title: "AI Research Intern",
    company: "DarbarTech Labs",
    type: "Internship",
    location: "Remote",
    salary: "NPR 25k/mo Stipend",
    match: "Medium Match (75%)",
    icon: Bot,
  },
  {
    title: "UI/UX Designer",
    company: "Creative Digital",
    type: "Contract",
    location: "Lalitpur (On-site)",
    salary: "NPR 80k - 120k/mo",
    match: "Good Match (88%)",
    icon: Palette,
  },
];

const applications = [
  {
    title: "Frontend Dev at CloudSync",
    status: "APPLIED",
    date: "Applied: 2 days ago",
    icon: Clock3,
  },
  {
    title: "React Native Dev",
    status: "INTERVIEW",
    date: "Next step: Tech Round",
    icon: UsersRound,
  },
  {
    title: "Full Stack Engineer",
    status: "REJECTED",
    date: "Closed: 1 week ago",
    icon: XCircle,
  },
];

export default function CareerPage() {
  const { mobileOpen, toggleMobileSidebar } = useSidebarStore();
  const { collapsed, toggleCollapsed } = useSidebarStore();

  return (
    <div className="flex min-h-screen bg-(--bg-primary-dashboard)">
      {/* Sidebar */}
      <AdminNavbar />

      {/* Main Content */}
      <main
        className={`min-h-screen min-w-0 flex-1 ${!collapsed ? "lg:ml-64" : "lg:ml-20"} `}
      >
        {/* Navigation */}

        <Topbar />

        {/* ==================== HERO SECTION ==================== */}
 
        <section className="relative overflow-hidden rounded-xl bg-(--bg-dashboard-hero) m-5">
          <div className="relative flex min-h-64 items-center px-5 py-8 sm:min-h-72 sm:px-8 sm:py-10 lg:min-h-80 lg:px-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold leading-tight text-(--bg-primary-dashboard) sm:text-3xl lg:text-4xl">
                Build Your Career With Confidence
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-(--secondary-bg-dashboard) sm:text-base">
                Discover opportunities that match your skills, track your
                progress, and take the next step toward your dream career.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="rounded-lg bg-(--bg-lightblue) px-5 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90"
                >
                  Upload CV
                </button>

                <button
                  type="button"
                  className="rounded-lg border border-(--border-primary-dashboard) px-5 py-2.5 text-sm font-medium text-(--bg-primary-dashboard) transition hover:border-(--bg-lightblue) hover:bg-(--bg-lightblue) hover:text-(--text-primary-dashboard)"
                >
                  Explore Internships
                </button>
              </div>
            </div>
          </div>

          {/* Hero Shapes */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[35px] border-(--color-shape)/10 sm:h-80 sm:w-80 lg:-right-24 lg:-top-28 lg:h-[420px] lg:w-[420px]" />

          <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-(--color-shape)/5 sm:right-16 sm:h-52 sm:w-52 lg:right-28 lg:top-16 lg:h-64 lg:w-64" />

          <div className="absolute right-20 top-20 hidden h-24 w-24 rounded-full bg-(--color-shape)/10 sm:block lg:right-48 lg:top-28 lg:h-36 lg:w-36" />

          <div className="absolute bottom-5 right-12 h-5 w-5 rounded-full bg-(--color-shape)/50 sm:right-32" />

          <div className="absolute right-6 top-12 h-3 w-3 rounded-full bg-(--color-shape) sm:right-12" />

          <div className="absolute bottom-8 right-1/3 h-3 w-3 rounded-full bg-(--color-shape)/60" />
        </section>

        {/* ==================== DASHBOARD CONTENT ==================== */}

        <section className="m-5">
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
            {/* Recommended Roles */}
            <div className="min-w-0">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold tracking-tight text-(--text-primary-dashboard) sm:text-2xl">
                    Recommended Roles
                  </h2>

                  <p className="mt-1 text-xs text-(--secondary-text-dashboard) sm:text-sm">
                    Based on your skills and course progress.
                  </p>
                </div>

                <button
                  type="button"
                  className="hidden shrink-0 text-sm font-medium text-(--secondary-text-dashboard) transition hover:underline sm:block"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {recommendedRoles.map((role) => {
                  const Icon = role.icon;

                  return (
                    <div
                      key={role.title}
                      className="rounded-xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-4 shadow-sm transition hover:shadow-md sm:p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-(--secondary-bg-dashboard) text-(--text-primary-dashboard) sm:h-11 sm:w-11">
                            <Icon size={20} strokeWidth={2} />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-semibold text-(--text-primary-dashboard) sm:text-base">
                              {role.title}
                            </h3>

                            <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
                              {role.company} • {role.type}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          aria-label={`Save ${role.title}`}
                          className="shrink-0 rounded-md p-1 text-(--secondary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:text-(--bg-dashboard-hero)"
                        >
                          <Bookmark size={19} />
                        </button>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-(--secondary-bg-dashboard) px-2 py-1 text-[11px] text-(--tertiary-text-dashboard) sm:text-xs">
                          <MapPin size={12} />
                          {role.location}
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-md bg-(--secondary-bg-dashboard) px-2 py-1 text-[11px] text-(--tertiary-text-dashboard) sm:text-xs">
                          <DollarSign size={12} />
                          {role.salary}
                        </span>
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <span className="text-[11px] font-medium text-(--secondary-text-dashboard) sm:text-xs">
                          {role.match}
                        </span>

                        <button
                          type="button"
                          className="shrink-0 rounded-md bg-(--bg-dashboard-hero) px-4 py-2 text-xs font-medium text-(--bg-primary-dashboard) transition hover:opacity-90 sm:px-5 sm:py-2.5 sm:text-sm"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) py-2.5 text-sm font-medium text-(--secondary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) sm:hidden"
              >
                View All Roles
              </button>
            </div>

            {/* Right Sidebar */}
            <aside className="space-y-5">
              {/* Application Status */}
              <div className="rounded-xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) p-4 shadow-sm sm:p-5">
                <h2 className="text-lg font-semibold text-(--text-primary-dashboard)">
                  Application Status
                </h2>

                <div className="mt-3">
                  {applications.map((application, index) => {
                    const Icon = application.icon;

                    return (
                      <div key={application.title}>
                        <div className="flex gap-3 py-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--secondary-bg-dashboard) text-(--secondary-text-dashboard)">
                            <Icon size={17} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="min-w-0 text-xs font-medium leading-5 text-(--text-primary-dashboard) sm:text-sm">
                                {application.title}
                              </h3>

                              <span className="shrink-0 rounded bg-(--secondary-bg-dashboard) px-1.5 py-1 text-[8px] font-semibold text-(--secondary-text-dashboard) sm:text-[9px]">
                                {application.status}
                              </span>
                            </div>

                            <p className="mt-0.5 text-[10px] leading-4 text-(--secondary-text-dashboard) sm:text-xs">
                              {application.date}
                            </p>
                          </div>
                        </div>

                        {index !== applications.length - 1 && (
                          <div className="h-px bg-(--border-primary-dashboard)" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="mt-2 flex w-full items-center justify-center rounded-md border border-(--border-primary-dashboard) py-2 text-xs font-medium text-(--text-primary-dashboard) transition hover:bg-(--secondary-bg-dashboard) sm:text-sm"
                >
                  View All Applications
                </button>
              </div>

              {/* Career Programs */}
              <div className="relative overflow-hidden rounded-xl bg-(--bg-dashboard-hero) p-5 text-(--bg-primary-dashboard)">
                <div className="relative z-10">
                  <h2 className="text-lg font-semibold">Career Programs</h2>

                  <p className="mt-1.5 max-w-[220px] text-xs leading-4 text-(--secondary-bg-dashboard)">
                    Accelerate your growth with structured pathways.
                  </p>

                  <button
                    type="button"
                    className="mt-5 flex w-full items-center justify-between rounded-md border border-(--border-primary-dashboard) bg-(--text-primary-dashboard) px-3 py-2.5 text-left transition hover:border-(--bg-lightblue) hover:bg-(--bg-dashboard-hero)"
                  >
                    <span className="flex min-w-0 items-center gap-3 text-xs sm:text-sm">
                      <UsersRound
                        size={19}
                        className="shrink-0 text-(--bg-lightblue)"
                      />

                      <span className="truncate">Mentorship Network</span>
                    </span>

                    <ArrowRight
                      size={16}
                      className="shrink-0 text-(--secondary-text-dashboard)"
                    />
                  </button>

                  <button
                    type="button"
                    className="mt-2 flex w-full items-center justify-between rounded-md border border-(--border-primary-dashboard) bg-(--text-primary-dashboard) px-3 py-2.5 text-left transition hover:border-(--bg-lightblue) hover:bg-(--bg-dashboard-hero)"
                  >
                    <span className="flex min-w-0 items-center gap-3 text-xs sm:text-sm">
                      <CircleUserRound
                        size={19}
                        className="shrink-0 text-(--bg-lightblue)"
                      />

                      <span className="truncate">Job Guarantee Track</span>
                    </span>

                    <ArrowRight
                      size={16}
                      className="shrink-0 text-(--secondary-text-dashboard)"
                    />
                  </button>
                </div>

                <div className="absolute -bottom-12 -right-8 h-24 w-24 rotate-45 rounded-xl border-8 border-(--border-primary-dashboard)/60" />

                <div className="absolute -right-12 bottom-4 h-20 w-20 rounded-full bg-(--color-shape)/5" />
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
