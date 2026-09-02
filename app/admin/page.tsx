"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminNavbar from "./common/AdminNavbar";
import Topbar from "./TopBar";
import { useSidebarStore } from "@/store/sidebarStore";

import {
  Wallet,
  Users,
  GraduationCap,
  BookOpen,
  MoreHorizontal,
} from "lucide-react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
} from "chart.js";

import type {
  ChartData,
  ChartOptions,
} from "chart.js";

import { Pie, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
);

const Page = () => {
  const { collapsed } = useSidebarStore();

  // ================= REVENUE FILTER =================

  type RevenuePeriod =
    | "yearly"
    | "semiyearly"
    | "quarterly"
    | "monthly";

  const [revenuePeriod, setRevenuePeriod] =
    useState<RevenuePeriod>("yearly");

  const revenueByPeriod: Record<
    RevenuePeriod,
    { labels: string[]; data: number[] }
  > = {
    yearly: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      data: [
        32000, 28000, 41000, 38000,
        45000, 52000, 48000, 56000,
        61000, 58000, 67000, 72000,
      ],
    },
    semiyearly: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
      ],
      data: [
        32000, 28000, 41000, 38000,
        45000, 52000,
      ],
    },
    quarterly: {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      data: [101000, 135000, 165000, 197000],
    },
    monthly: {
      labels: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
      ],
      data: [9000, 12000, 14500, 11000],
    },
  };

  const periods: {
    key: RevenuePeriod;
    label: string;
  }[] = [
    { key: "yearly", label: "Yearly" },
    {
      key: "semiyearly",
      label: "Semiyearly",
    },
    { key: "quarterly", label: "Quarterly" },
    { key: "monthly", label: "Monthly" },
  ];

  const revenue = revenueByPeriod[revenuePeriod];

  // ================= CHART DATA =================

  const pieData: ChartData<"pie"> = {
    labels: ["Teachers", "Students", "Superadmins"],
    datasets: [
      {
        data: [18, 96, 3],
        backgroundColor: [
          "#10b981",
          "#3b82f6",
          "#a855f7",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const barData: ChartData<"bar"> = {
    labels: [
      "Web Design & Development",
      "UI/UX",
      "Video Editing",
    ],
    datasets: [
      {
        label: "Courses",
        data: [25, 18, 12],
        backgroundColor: [
          "#3b82f6",
          "#8b5cf6",
          "#f59e0b",
        ],
        borderRadius: 8,
        maxBarThickness: 48,
      },
    ],
  };

  const lineData: ChartData<"line"> = {
    labels: revenue.labels,
    datasets: [
      {
        label: "Revenue",
        data: revenue.data,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.12)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#ffffff",
        pointRadius: 4,
      },
    ],
  };

  // ================= CHART OPTIONS =================

  const pieOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#94a3b8",
          usePointStyle: true,
          boxWidth: 8,
          padding: 16,
        },
      },
    },
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#94a3b8",
          font: { size: 11 },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(148, 163, 184, 0.15)",
        },
        ticks: {
          color: "#94a3b8",
          font: { size: 11 },
        },
      },
    },
  };

  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#94a3b8",
          font: { size: 11 },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(148, 163, 184, 0.15)",
        },
        ticks: {
          color: "#94a3b8",
          font: { size: 11 },
        },
      },
    },
  };

  // ================= STAT CARDS =================

  const stats: {
    title: string;
    value: string;
    icon: React.ReactNode;
    href?: string;
  }[] = [
    {
      title: "Revenue",
      value: "$1,250,000",
      icon: <Wallet size={18} />,
    },
    {
      title: "Staffs",
      value: "12",
      icon: <Users size={18} />,
      href: "/admin/users",
    },
    {
      title: "Students",
      value: "248",
      icon: <GraduationCap size={18} />,
      href: "/admin/users",
    },
    {
      title: "Courses",
      value: "6",
      icon: <BookOpen size={18} />,
      href: "/admin/courses",
    },
  ];

  return (
    <div className="flex min-h-screen bg-(--bg-primary-dashboard)">
      {/* Sidebar */}
      <AdminNavbar />

      {/* Main Content */}
      <main
        className={`min-h-screen min-w-0 flex-1 ${
          !collapsed ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        {/* ================= TOPBAR ================= */}

        <Topbar />

        {/* ================= CONTENT SECTION ================= */}

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          {/* ================= HEADER ================= */}

          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
              Analytics
            </h1>

            <p className="mt-2 text-sm text-(--text-primary-dashboard)/70">
              Overview of revenue, users, and course analytics.
            </p>
          </div>

          {/* ================= STAT CARDS ================= */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                href={stat.href}
              />
            ))}
          </div>

          {/* ================= CHARTS GRID ================= */}

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* ================= PIE CHART ================= */}

            <div className="rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                  Users by Role
                </p>

                <MoreHorizontal
                  size={18}
                  className="text-(--tertiary-text-dashboard)"
                />
              </div>

              <div className="h-72">
                <Pie data={pieData} options={pieOptions} />
              </div>
            </div>

            {/* ================= BAR CHART ================= */}

            <div className="rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                  Courses by Category
                </p>

                <MoreHorizontal
                  size={18}
                  className="text-(--tertiary-text-dashboard)"
                />
              </div>

              <div className="h-72">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </div>

          {/* ================= LINE CHART (REVENUE) ================= */}

          <div className="mt-6 rounded-2xl bg-(--primary-dashboard) p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                Revenue
              </p>

              {/* ================= PERIOD FILTERS ================= */}

              <div className="flex flex-wrap items-center gap-2">
                {periods.map((period) => (
                  <button
                    key={period.key}
                    type="button"
                    onClick={() =>
                      setRevenuePeriod(period.key)
                    }
                    className={`
                      rounded-lg
                      px-4
                      py-2
                      text-sm
                      font-medium
                      transition
                      hover:cursor-pointer
                      ${
                        revenuePeriod ===
                        period.key
                          ? "bg-(--bg-lightblue) text-(--text-primary-dashboard)"
                          : "text-(--text-primary-dashboard)/70 hover:bg-(--secondary-bg-dashboard)"
                      }
                    `}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-80">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

/* ---------- Sub-components ---------- */

function StatCard({
  title,
  value,
  icon,
  href,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  href?: string;
}) {
  const cardClasses = `
    block
    rounded-2xl
    bg-(--primary-dashboard)
    p-4
    shadow-sm
    transition
    ${href ? "hover:shadow-md hover:cursor-pointer" : ""}
  `;

  const content = (
    <>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] font-medium leading-tight text-(--tertiary-text-dashboard)">
          {title}
        </span>

        <span className="text-(--secondary-text-dashboard)">
          {icon}
        </span>
      </div>

      <p className="text-2xl font-bold text-(--text-primary-dashboard)">
        {value}
      </p>
    </>
  );

  return href ? (
    <Link href={href} className={cardClasses}>
      {content}
    </Link>
  ) : (
    <div className={cardClasses}>{content}</div>
  );
}

export default Page;