"use client";

import {
  Flame,
  Flag,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Award,
  MoreHorizontal,
  Circle,
  Rocket,
  ArrowRight,
} from "lucide-react";
import AdminNavbar from "./common/AdminNavbar";
import Topbar from "./TopBar";
import { useSidebarStore } from "@/store/sidebarStore";

export default function Dashboard() {
  const { mobileSidebar, toggleMobileSidebar } = useSidebarStore();
  const { collapsed, toggleCollapsed } = useSidebarStore();
  return (
    <div className="flex min-h-screen bg-(--bg-primary-dashboard)">
      <AdminNavbar />
      <main
        className={`min-h-screen min-w-0 flex-1 ${!collapsed ? "lg:ml-64" : "lg:ml-20"} `}
      >
        <Topbar />

        {/* main */}
        <div className="w-full p-3 gap-3 md:flex md:items-start md:flex-row md:p-5 md:gap-5">
          {/* left side */}
          <div className="space-y-3 md:flex-2 md:space-y-5">
            {/* HERO */}
            <div
              className="hidden md:relative md:flex md:items-end md:p-8 md:rounded-lg md:overflow-hidden text-(--bg-primary-dashboard)"
              style={{ background: "var(--bg-dashboard-hero)" }}
            >
              {/* welcome part */}
              <div>
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full opacity-20 blur-2xl"
                  style={{ background: "var(--color-shape)" }}
                />
                <span
                  className="inline-block rounded-full px-4 py-1 text-xs font-medium text-(--bg-primary-dashboard))/90"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  Learning Journey
                </span>

                <h1 className="mt-5 text-4xl font-bold leading-tight text-(--bg-primary-dashboard)) sm:text-5xl">
                  Welcome
                  <br />
                  back,
                  <br />
                  <span style={{ color: "var(--bg-lightblue)" }}>Roban!</span>
                </h1>

                <p className="mt-4 max-w-sm text-sm text-(--bg-primary-dashboard))/70">
                  Keep learning. Keep building. Keep growing. Your tech journey
                  awaits.
                </p>
              </div>

              {/* buttons part */}
              <div className="mt-6 flex gap-3">
                <button
                  className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                  style={{
                    background: "var(--bg-lightblue)",
                    color: "var(--bg-dashboard-hero)",
                  }}
                >
                  Continue Learning <ArrowRight size={16} />
                </button>
                <button className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-(--bg-primary-dashboard))">
                  Browse Courses
                </button>
              </div>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:col-span-1">
              <StatCard
                icon={<BookOpen size={16} />}
                label="Courses Enrolled"
                value="06"
                progress={30}
              />
              <StatCard
                icon={<CheckCircle2 size={16} />}
                label="Courses Completed"
                value="03"
                progress={50}
              />
              <StatCard
                icon={<TrendingUp size={16} />}
                label="Learning Progress"
                value="72%"
                progress={72}
              />
              <StatCard
                icon={<Award size={16} />}
                label="Certificates"
                value="02"
                tags={["JS", "UI"]}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
              {/* CONTINUE LEARNING */}
              <div className="rounded-lg bg-(--primary-dashboard) p-6 shadow-sm lg:col-span-1">
                <div className="mb-4 flex items-center justify-between">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary-dashboard)" }}
                  >
                    Continue Learning
                  </p>
                  <MoreHorizontal
                    size={18}
                    style={{ color: "var(--tertiary-text-dashboard)" }}
                  />
                </div>

                <div
                  className="mb-4 flex h-36 items-center justify-center rounded-2xl"
                  style={{ background: "var(--bg-dashboard-hero)" }}
                >
                  <span className="text-2xl font-extrabold tracking-wide text-(--bg-primary-dashboard))">
                    FULL{" "}
                    <span style={{ color: "var(--bg-lightblue)" }}>STACK</span>
                  </span>
                </div>

                <p
                  className="text-base font-semibold"
                  style={{ color: "var(--text-primary-dashboard)" }}
                >
                  Full Stack Web Development
                </p>
                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--tertiary-text-dashboard)" }}
                >
                  Module 4: React Context API
                </p>

                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs">
                    <span style={{ color: "var(--tertiary-text-dashboard)" }}>
                      Progress
                    </span>
                    <span
                      className="font-semibold"
                      style={{ color: "var(--text-primary-dashboard)" }}
                    >
                      18/25 Lessons (72%)
                    </span>
                  </div>
                  <ProgressBar percent={72} />
                </div>
              </div>

              {/* MIDDLE COLUMN: Weekly Activity + Upcoming Class */}
              <div className="flex flex-col gap-5">
                <div className="rounded-lg bg-(--primary-dashboard) p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary-dashboard)" }}
                    >
                      Weekly Activity
                    </p>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        background: "var(--secondary-bg-dashboard)",
                        color: "var(--secondary-text-dashboard)",
                      }}
                    >
                      Hours
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span
                        key={i}
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          d === "W" ? "font-bold" : ""
                        }`}
                        style={{
                          color:
                            i === 2
                              ? "var(--text-primary-dashboard)"
                              : "var(--tertiary-text-dashboard)",
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg  p-6 shadow-sm">
                  <p
                    className="mb-4 text-sm font-semibold"
                    style={{ color: "var(--text-primary-dashboard)" }}
                  >
                    Upcoming Class
                  </p>
                  <div className="flex items-center justify-between text-(--bg-primary-dashboard)">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex flex-col items-center justify-center rounded-xl px-3 py-2 text-center"
                        style={{ background: "var(--secondary-bg-dashboard)" }}
                      >
                        <span
                          className="text-[10px] font-semibold"
                          style={{ color: "var(--secondary-text-dashboard)" }}
                        >
                          TODAY
                        </span>
                        <span
                          className="text-sm font-bold"
                          style={{ color: "var(--text-primary-dashboard)" }}
                        >
                          4:00
                        </span>
                      </div>
                      <div>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "var(--text-primary-dashboard)" }}
                        >
                          Advanced
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--tertiary-text-dashboard)" }}
                        >
                          Live Session
                        </p>
                      </div>
                    </div>
                    <button
                      className="rounded-lg px-4 py-2 text-xs font-semibold text-(--bg-primary-dashboard)"
                      style={{ background: "var(--bg-dashboard-hero)" }}
                    >
                      Join Class
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="hidden md:block md:flex-1 md:space-y-5">
            {/* STREAK */}
            <div className="flex flex-col items-center justify-center rounded-lg bg-(--primary-dashboard) p-8 text-center shadow-sm">
              <div
                className="mb-3 flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: "var(--secondary-bg-dashboard)" }}
              >
                <Flame style={{ color: "var(--secondary-text-dashboard)" }} />
              </div>
              <p
                className="text-lg font-bold"
                style={{ color: "var(--text-primary-dashboard)" }}
              >
                12 Day Streak!
              </p>
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--tertiary-text-dashboard)" }}
              >
                You&apos;re on fire, Roban. Keep it up!
              </p>
            </div>

            {/* WEEKLY GOAL */}
            <div className="rounded-lg bg-(--primary-dashboard) p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary-dashboard)" }}
                >
                  Weekly Goal
                </p>
                <Flag
                  size={16}
                  style={{ color: "var(--tertiary-text-dashboard)" }}
                />
              </div>
              <div className="flex flex-col items-center">
                <RadialProgress percent={72} />
                <p
                  className="mt-4 text-xs"
                  style={{ color: "var(--tertiary-text-dashboard)" }}
                >
                  14 of 20 hours completed
                </p>
              </div>
            </div>

            {/* TODAY'S SCHEDULE */}
            <div className="rounded-lg bg-(--primary-dashboard) p-6 shadow-sm">
              <p
                className="mb-5 text-sm font-semibold"
                style={{ color: "var(--text-primary-dashboard)" }}
              >
                Today&apos;s Schedule
              </p>
              <div className="flex flex-col gap-5">
                <ScheduleItem
                  time="10:00 AM"
                  title="UI/UX Basics Review"
                  subtitle="Self-paced learning"
                  active={false}
                />
                <ScheduleItem
                  time="4:00 PM"
                  title="React.js Live Session"
                  subtitle="Instructor: Sarah M."
                  active
                />
                <ScheduleItem
                  time="7:00 PM"
                  title="Submit Assignment"
                  subtitle="Module 3 Project"
                  active={false}
                />
              </div>
            </div>

            {/* CAREER BANNER */}
            <div
              className="relative overflow-hidden rounded-lg p-6"
              style={{ background: "var(--bg-dashboard-hero)" }}
            >
              <Rocket size={20} style={{ color: "var(--bg-lightblue)" }} />
              <p className="mt-3 text-lg font-bold text-(--bg-primary-dashboard)">
                Build Your Career With DarbarTech
              </p>
              <p className="mt-2 text-xs text-(--bg-primary-dashboard)/60">
                Access job boards, portfolio reviews, and mentorship.
              </p>
              <button
                className="mt-4 flex items-center gap-2 text-sm font-semibold"
                style={{ color: "var(--bg-lightblue)" }}
              >
                Explore Careers <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Sub-components ---------- */

function StatCard({
  icon,
  label,
  value,
  progress,
  tags,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  progress?: number;
  tags?: string[];
}) {
  return (
    <div className="rounded-2xl bg-(--primary-dashboard) p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span
          className="text-[11px] font-medium leading-tight"
          style={{ color: "var(--tertiary-text-dashboard)" }}
        >
          {label}
        </span>
        <span style={{ color: "var(--secondary-text-dashboard)" }}>{icon}</span>
      </div>
      <p
        className="text-2xl font-bold"
        style={{ color: "var(--text-primary-dashboard)" }}
      >
        {value}
      </p>
      {progress !== undefined && (
        <div className="mt-3">
          <ProgressBar percent={progress} thin />
        </div>
      )}
      {tags && (
        <div className="mt-3 flex gap-1">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-md px-2 py-0.5 text-[10px] font-semibold"
              style={{
                background: "var(--secondary-bg-dashboard)",
                color: "var(--secondary-text-dashboard)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ProgressBar({
  percent,
  thin = false,
}: {
  percent: number;
  thin?: boolean;
}) {
  return (
    <div
      className={`w-full overflow-hidden rounded-full ${
        thin ? "h-1.5" : "h-2"
      }`}
      style={{ background: "var(--secondary-bg-dashboard)" }}
    >
      <div
        className="h-full rounded-full"
        style={{ width: `${percent}%`, background: "var(--bg-lightblue)" }}
      />
    </div>
  );
}

function RadialProgress({ percent }: { percent: number }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg className="h-32 w-32 -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="var(--secondary-bg-dashboard)"
          strokeWidth="10"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="var(--bg-lightblue)"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className="text-xl font-bold"
          style={{ color: "var(--text-primary-dashboard)" }}
        >
          {percent}%
        </span>
        <span
          className="text-[10px]"
          style={{ color: "var(--tertiary-text-dashboard)" }}
        >
          Achieved
        </span>
      </div>
    </div>
  );
}

function ScheduleItem({
  time,
  title,
  subtitle,
  active,
}: {
  time: string;
  title: string;
  subtitle: string;
  active: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center pt-1">
        {active ? (
          <span
            className="h-3 w-3 rounded-full"
            style={{ background: "var(--bg-lightblue)" }}
          />
        ) : (
          <Circle
            size={12}
            style={{ color: "var(--border-primary-dashboard)" }}
          />
        )}
        <span
          className="mt-1 w-px flex-1"
          style={{ background: "var(--border-primary-dashboard)" }}
        />
      </div>
      <div>
        <p
          className="text-xs font-medium"
          style={{ color: "var(--secondary-text-dashboard)" }}
        >
          {time}
        </p>
        <p
          className="text-sm font-semibold"
          style={{ color: "var(--text-primary-dashboard)" }}
        >
          {title}
        </p>
        <p
          className="text-xs"
          style={{ color: "var(--tertiary-text-dashboard)" }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
