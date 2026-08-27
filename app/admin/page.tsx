"use client";

import AdminNavbar from "./common/AdminNavbar";
import { useSidebarStore } from "@/store/sidebarStore";
import {
  ArrowRight,
  Bookmark,
  Bot,
  CircleUserRound,
  Clock3,
  Code2,
  DollarSign,
  MapPin,
  Palette,
  UsersRound,
  XCircle,
} from "lucide-react";
import Topbar from "./TopBar";

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

export default function AdminDashboard() {
  const { mobileOpen, toggleMobileSidebar } = useSidebarStore();
  const { collapsed, toggleCollapsed } = useSidebarStore();

  return (
    <div className="flex min-h-screen bg-(--bg-primary-dashboard)">
      {/* Sidebar */}
      <AdminNavbar />

      {/* Main Content */}
      <main
        className={`min-w-0 flex-1 ${!collapsed ? "lg:ml-64" : "lg:ml-20"}`}
      >
        {/* topbar navigation */}
        <Topbar />

        <div>Dashboard</div>
      </main>
    </div>
  );
}
