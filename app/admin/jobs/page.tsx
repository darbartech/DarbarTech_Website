"use client";

import React, { useState } from "react";
import AdminNavbar from "../common/AdminNavbar";
import Topbar from "../TopBar";
import { useSidebarStore } from "@/store/sidebarStore";

import {
  Briefcase,
  Bot,
  ChevronDown,
  Code2,
  DollarSign,
  Eye,
  FileText,
  MapPin,
  MoreHorizontal,
  Palette,
  Pencil,
  PenTool,
  Plus,
  Trash2,
  User2,
  X,
} from "lucide-react";

/* ==================================================== */
/* TYPES & DATA                                          */
/* ==================================================== */

type JobIcon = typeof Code2;

interface Applicant {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  cvFile: string;
  appliedDate: string;
  status: string;
}

interface JobListing {
  id: number;
  title: string;
  company: string;
  type: string;
  location: string;
  salary: string;
  description: string;
  icon: JobIcon;
  applicants: Applicant[];
}

const initialJobs: JobListing[] = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechFlow Systems",
    type: "Full-time",
    location: "Kathmandu (Hybrid)",
    salary: "NPR 150k - 200k/mo",
    description:
      "Build and maintain high-performance React applications, mentor junior developers, and collaborate with design and product teams to ship delightful user interfaces.",
    icon: Code2,
    applicants: [
      {
        id: 101,
        name: "Ram Shrestha",
        email: "ram.shrestha@example.com",
        phone: "+977 9800000001",
        address: "Baneshwor, Kathmandu",
        cvFile: "ram_shrestha_cv.pdf",
        appliedDate: "2026-08-20",
        status: "Shortlisted",
      },
      {
        id: 102,
        name: "Sita Sharma",
        email: "sita.sharma@example.com",
        phone: "+977 9800000002",
        address: "Lalitpur, Bagmati",
        cvFile: "sita_sharma_cv.pdf",
        appliedDate: "2026-08-21",
        status: "Under Review",
      },
      {
        id: 103,
        name: "Hari Karki",
        email: "hari.karki@example.com",
        phone: "+977 9800000003",
        address: "Patan, Lalitpur",
        cvFile: "hari_karki_cv.pdf",
        appliedDate: "2026-08-22",
        status: "Interview",
      },
    ],
  },
  {
    id: 2,
    title: "AI Research Intern",
    company: "DarbarTech Labs",
    type: "Internship",
    location: "Remote",
    salary: "NPR 25k/mo Stipend",
    description:
      "Support AI research projects, clean and prepare datasets, run experiments, and assist in documenting model performance and findings.",
    icon: Bot,
    applicants: [
      {
        id: 104,
        name: "Gita Gurung",
        email: "gita.gurung@example.com",
        phone: "+977 9800000004",
        address: "Pokhara, Gandaki",
        cvFile: "gita_gurung_cv.pdf",
        appliedDate: "2026-08-23",
        status: "Under Review",
      },
      {
        id: 105,
        name: "Kiran Thapa",
        email: "kiran.thapa@example.com",
        phone: "+977 9800000005",
        address: "Tinkune, Kathmandu",
        cvFile: "kiran_thapa_cv.pdf",
        appliedDate: "2026-08-24",
        status: "Applied",
      },
    ],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Digital",
    type: "Contract",
    location: "Lalitpur (On-site)",
    salary: "NPR 80k - 120k/mo",
    description:
      "Design intuitive user interfaces, create wireframes and prototypes, conduct user research, and collaborate with developers to deliver pixel-perfect designs.",
    icon: Palette,
    applicants: [
      {
        id: 106,
        name: "Anita Maharjan",
        email: "anita.maharjan@example.com",
        phone: "+977 9800000006",
        address: "Jhamsikhel, Lalitpur",
        cvFile: "anita_maharjan_cv.pdf",
        appliedDate: "2026-08-19",
        status: "Rejected",
      },
      {
        id: 107,
        name: "Bibek Shrestha",
        email: "bibek.shrestha@example.com",
        phone: "+977 9800000007",
        address: "Maitidevi, Kathmandu",
        cvFile: "bibek_shrestha_cv.pdf",
        appliedDate: "2026-08-21",
        status: "Under Review",
      },
      {
        id: 108,
        name: "Sarita Rai",
        email: "sarita.rai@example.com",
        phone: "+977 9800000008",
        address: "Dharan, Koshi",
        cvFile: "sarita_rai_cv.pdf",
        appliedDate: "2026-08-22",
        status: "Shortlisted",
      },
    ],
  },
];

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
];

const iconChoices: {
  label: string;
  icon: JobIcon;
}[] = [
  { label: "Code", icon: Code2 },
  { label: "AI", icon: Bot },
  { label: "Design", icon: Palette },
  { label: "Editing", icon: PenTool },
  { label: "Business", icon: Briefcase },
  { label: "Support", icon: User2 },
];

const statusOptions = [
  "Shortlisted",
  "Under Review",
  "Interview",
  "Rejected",
  "Applied",
];

const Page = () => {
  const { collapsed } = useSidebarStore();

  // ================= JOBS STATE =================

  const [jobs, setJobs] =
    useState<JobListing[]>(initialJobs);

  const [selectedJobId, setSelectedJobId] =
    useState<number>(1);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const selectedJob =
    jobs.find((job) => job.id === selectedJobId) ??
    null;

  // ================= FORM STATE =================

  const [formTitle, setFormTitle] = useState("");
  const [formCompany, setFormCompany] =
    useState("");
  const [formType, setFormType] =
    useState("Full-time");
  const [formLocation, setFormLocation] =
    useState("");
  const [formSalary, setFormSalary] =
    useState("");
  const [formDescription, setFormDescription] =
    useState("");
  const [formIcon, setFormIcon] =
    useState<JobIcon>(Code2);
  const [isTypeOpen, setIsTypeOpen] =
    useState(false);

  // ================= HANDLERS =================

  const handleSelectJob = (jobId: number) => {
    setSelectedJobId(jobId);
  };

  const handleAddJob = () => {
    setFormTitle("");
    setFormCompany("");
    setFormType("Full-time");
    setFormLocation("");
    setFormSalary("");
    setFormDescription("");
    setFormIcon(Code2);
    setIsTypeOpen(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsTypeOpen(false);
  };

  const handleCreateJob = (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!formTitle || !formCompany) {
      alert(
        "Job Title and Company are required.",
      );

      return;
    }

    const nextId =
      jobs.reduce(
        (max, job) => Math.max(max, job.id),
        0,
      ) + 1;

    const newJob: JobListing = {
      id: nextId,
      title: formTitle,
      company: formCompany,
      type: formType,
      location: formLocation,
      salary: formSalary,
      description: formDescription,
      icon: formIcon,
      applicants: [],
    };

    setJobs([newJob, ...jobs]);

    setSelectedJobId(newJob.id);

    setIsModalOpen(false);
    setIsTypeOpen(false);
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Shortlisted":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-600";
      case "Interview":
        return "border-violet-500/30 bg-violet-500/10 text-violet-600";
      case "Under Review":
        return "border-blue-500/30 bg-blue-500/10 text-blue-600";
      case "Rejected":
        return "border-red-500/30 bg-red-500/10 text-red-600";
      default:
        return "border-slate-500/30 bg-slate-500/10 text-slate-600";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "Shortlisted":
        return "bg-emerald-500";
      case "Interview":
        return "bg-violet-500";
      case "Under Review":
        return "bg-blue-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-slate-500";
    }
  };

  // ================= STATUS DROPDOWN =================

  const [openStatusId, setOpenStatusId] =
    useState<number | null>(null);

  const handleStatusChange = (
    applicantId: number,
    status: string,
  ) => {
    setJobs((previousJobs) =>
      previousJobs.map((job) =>
        job.id === selectedJobId
          ? {
              ...job,
              applicants:
                job.applicants.map(
                  (applicant) =>
                    applicant.id ===
                    applicantId
                      ? { ...applicant, status }
                      : applicant,
                ),
            }
          : job,
      ),
    );

    setOpenStatusId(null);
  };

  // ================= APPLICANT ACTIONS =================

  const [openActionsId, setOpenActionsId] =
    useState<number | null>(null);

  const [viewApplicant, setViewApplicant] =
    useState<Applicant | null>(null);

  const [isApplicantModalOpen, setIsApplicantModalOpen] =
    useState(false);

  const [editApplicantId, setEditApplicantId] =
    useState<number | null>(null);

  const [editAppName, setEditAppName] =
    useState("");

  const [editAppEmail, setEditAppEmail] =
    useState("");

  const [editAppPhone, setEditAppPhone] =
    useState("");

  const [editAppAddress, setEditAppAddress] =
    useState("");

  const handleViewApplicant = (
    applicant: Applicant,
  ) => {
    setOpenActionsId(null);

    setViewApplicant(applicant);
  };

  const handleCloseViewModal = () => {
    setViewApplicant(null);
  };

  const handleEditApplicant = (
    applicant: Applicant,
  ) => {
    setOpenActionsId(null);

    setEditApplicantId(applicant.id);
    setEditAppName(applicant.name);
    setEditAppEmail(applicant.email);
    setEditAppPhone(applicant.phone);
    setEditAppAddress(applicant.address);

    setIsApplicantModalOpen(true);
  };

  const handleCloseApplicantModal = () => {
    setIsApplicantModalOpen(false);
  };

  const handleSaveApplicant = (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    setJobs((previousJobs) =>
      previousJobs.map((job) =>
        job.id === selectedJobId
          ? {
              ...job,
              applicants:
                job.applicants.map(
                  (applicant) =>
                    applicant.id ===
                    editApplicantId
                      ? {
                          ...applicant,
                          name: editAppName,
                          email: editAppEmail,
                          phone: editAppPhone,
                          address: editAppAddress,
                        }
                      : applicant,
                ),
            }
          : job,
      ),
    );

    setIsApplicantModalOpen(false);
  };

  const handleDeleteApplicant = (
    applicantId: number,
  ) => {
    setJobs((previousJobs) =>
      previousJobs.map((job) =>
        job.id === selectedJobId
          ? {
              ...job,
              applicants: job.applicants.filter(
                (applicant) =>
                  applicant.id !==
                  applicantId,
              ),
            }
          : job,
      ),
    );

    setOpenActionsId(null);
  };

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

          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
                Job listings
              </h1>

              <p className="mt-2 text-sm text-(--text-primary-dashboard)/70">
                Manage job listings and review applicants.
              </p>
            </div>

            {/* ================= ADD JOB ================= */}

            <button
              type="button"
              onClick={handleAddJob}
              className="
                flex
                shrink-0
                items-center
                gap-1.5
                rounded-lg
                bg-(--bg-lightblue)
                px-4
                py-2.5
                text-sm
                font-semibold
                text-(--text-primary-dashboard)
                transition
                hover:opacity-90
                hover:cursor-pointer
              "
            >
              <Plus size={16} />

              Add Job
            </button>
          </div>

          {/* ================= JOB LISTING TAGS ================= */}

          <div
            className="
              mb-8
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            {jobs.map((job) => {
              const Icon = job.icon;

              const isSelected =
                job.id === selectedJobId;

              return (
                <button
                  key={job.id}
                  type="button"
                  onClick={() =>
                    handleSelectJob(job.id)
                  }
                  className={`
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition
                    hover:cursor-pointer
                    ${
                      isSelected
                        ? "border-(--bg-lightblue) bg-(--bg-lightblue) text-(--text-primary-dashboard)"
                        : "border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) text-(--text-primary-dashboard)/70 hover:bg-(--secondary-bg-dashboard)"
                    }
                  `}
                >
                  <Icon size={16} />

                  {job.title}
                </button>
              );
            })}
          </div>

          {/* ================= SELECTED JOB DETAILS ================= */}

          {selectedJob && (
            <div
              className="
                mb-6
                rounded-2xl
                border
                border-(--border-primary-dashboard)
                bg-(--bg-primary-dashboard)
                p-5
                shadow-sm
              "
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-(--secondary-bg-dashboard) text-(--text-primary-dashboard)">
                    <selectedJob.icon
                      size={24}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold text-(--text-primary-dashboard)">
                      {selectedJob.title}
                    </h2>

                    <p className="mt-1 text-sm text-(--tertiary-text-dashboard)">
                      {selectedJob.company} •{" "}
                      {selectedJob.type}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-(--text-primary-dashboard)/70">
                      {selectedJob.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-(--secondary-bg-dashboard) px-2.5 py-1.5 text-xs text-(--tertiary-text-dashboard)">
                    <MapPin size={13} />
                    {selectedJob.location}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-md bg-(--secondary-bg-dashboard) px-2.5 py-1.5 text-xs text-(--tertiary-text-dashboard)">
                    <DollarSign size={13} />
                    {selectedJob.salary}
                  </span>
                </div>
              </div>

              <p className="mt-4 border-t border-(--border-primary-dashboard) pt-4 text-sm text-(--text-primary-dashboard)/70">
                Reviewing applicants for this listing — click another job tag to
                switch.
              </p>
            </div>
          )}

          {/* ================= APPLICANTS TABLE ================= */}

          {selectedJob && (
            <div className="mt-8">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-(--text-primary-dashboard)">
                    Applicants
                  </h2>

                  <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">
                    Candidates for{" "}
                    <span className="font-medium">
                      {selectedJob.title}
                    </span>
                  </p>
                </div>

                <span className="shrink-0 rounded-md bg-(--secondary-bg-dashboard) px-2.5 py-1 text-xs font-medium text-(--tertiary-text-dashboard)">
                  {selectedJob.applicants.length} total
                </span>
              </div>

              <div className="w-full overflow-x-auto rounded-xl border border-(--border-primary-dashboard)">
                <table className="w-full min-w-175 border-collapse">
                  {/* ================= TABLE HEAD ================= */}

                  <thead>
                    <tr>
                      {[
                        "ID",
                        "Name",
                        "Email",
                        "Phone Number",
                        "Address",
                        "CV File",
                        "Applied Date",
                        "Status",
                        "Actions",
                      ].map((column) => (
                        <th
                          key={column}
                          className="
                            bg-(--bg-table)
                            px-5
                            py-4
                            text-left
                            text-sm
                            font-semibold
                            text-(--text-primary-dashboard)
                          "
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* ================= TABLE BODY ================= */}

                  <tbody>
                    {selectedJob.applicants.length === 0 ? (
                      <tr>
                        <td
                          colSpan={9}
                          className="
                            px-5
                            py-10
                            text-center
                            text-sm
                            text-(--text-primary-dashboard)/70
                          "
                        >
                          No applicants yet for this job listing.
                        </td>
                      </tr>
                    ) : (
                      selectedJob.applicants.map(
                        (applicant) => (
                          <tr
                            key={applicant.id}
                            className="
                              border-t
                              border-(--border-primary-dashboard)
                              transition
                            "
                          >
                            <td className="px-5 py-4 text-sm text-(--text-primary-dashboard)">
                              {applicant.id}
                            </td>

                            <td className="px-5 py-4 text-sm font-medium text-(--text-primary-dashboard)">
                              {applicant.name}
                            </td>

                            <td className="px-5 py-4 text-sm text-(--text-primary-dashboard)">
                              {applicant.email}
                            </td>

                            <td className="px-5 py-4 text-sm text-(--text-primary-dashboard)">
                              {applicant.phone}
                            </td>

                            <td className="px-5 py-4 text-sm text-(--text-primary-dashboard)">
                              {applicant.address}
                            </td>

                            <td className="px-5 py-4 text-sm text-(--text-primary-dashboard)">
                              <span className="inline-flex items-center gap-1.5">
                                <FileText
                                  size={14}
                                  className="shrink-0 text-(--secondary-text-dashboard)"
                                />

                                {applicant.cvFile}
                              </span>
                            </td>

                            <td className="px-5 py-4 text-sm text-(--text-primary-dashboard)">
                              {applicant.appliedDate}
                            </td>

                            <td className="px-5 py-4">
                              <div className="relative inline-block">
                                {/* TRIGGER */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    setOpenStatusId(
                                      openStatusId ===
                                        applicant.id
                                        ? null
                                        : applicant.id,
                                    )
                                  }
                                  className={`
                                    flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-medium
                                    capitalize
                                    transition
                                    hover:cursor-pointer
                                    ${getStatusClasses(
                                      applicant.status,
                                    )}
                                  `}
                                >
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full ${getStatusDot(
                                      applicant.status,
                                    )}`}
                                  />

                                  {applicant.status}

                                  <ChevronDown
                                    size={14}
                                    className={`transition-transform ${
                                      openStatusId ===
                                      applicant.id
                                        ? "rotate-180"
                                        : ""
                                    }`}
                                  />
                                </button>

                                {/* STATUS DROPDOWN */}

                                {openStatusId ===
                                  applicant.id && (
                                  <div className="absolute right-0 top-full z-10 mt-1 w-40 overflow-hidden rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) shadow-lg">
                                    {statusOptions.map(
                                      (statusOption) => (
                                        <button
                                          key={statusOption}
                                          type="button"
                                          onClick={() =>
                                            handleStatusChange(
                                              applicant.id,
                                              statusOption,
                                            )
                                          }
                                          className={`
                                            flex
                                            w-full
                                            items-center
                                            gap-2
                                            px-3
                                            py-2
                                            text-left
                                            text-sm
                                            capitalize
                                            transition
                                            hover:bg-(--secondary-bg-dashboard)
                                            hover:cursor-pointer
                                            ${
                                              applicant.status ===
                                              statusOption
                                                ? "font-medium text-(--bg-lightblue)"
                                                : "text-(--text-primary-dashboard)"
                                            }
                                          `}
                                        >
                                          <span
                                            className={`h-2 w-2 rounded-full ${getStatusDot(
                                              statusOption,
                                            )}`}
                                          />

                                          {statusOption}
                                        </button>
                                      ),
                                    )}
                                  </div>
                                )}
                              </div>
                            </td>

                            {/* ACTIONS */}

                            <td className="px-5 py-4">
                              <div className="relative inline-block text-left">
                                {/* TRIGGER */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    setOpenActionsId(
                                      openActionsId ===
                                        applicant.id
                                        ? null
                                        : applicant.id,
                                    )
                                  }
                                  aria-label="Actions"
                                  className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-lg
                                    text-(--text-primary-dashboard)
                                    transition
                                    hover:bg-(--secondary-bg-dashboard)
                                    hover:cursor-pointer
                                  "
                                >
                                  <MoreHorizontal size={18} />
                                </button>

                                {/* DROPDOWN MENU */}

                                {openActionsId ===
                                  applicant.id && (
                                  <div className="absolute right-0 top-full z-10 mt-1 w-36 overflow-hidden rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) shadow-lg">
                                    {/* VIEW */}

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleViewApplicant(
                                          applicant,
                                        )
                                      }
                                      className="
                                        flex
                                        w-full
                                        items-center
                                        gap-2
                                        px-3
                                        py-2
                                        text-left
                                        text-sm
                                        text-(--text-primary-dashboard)
                                        transition
                                        hover:bg-(--secondary-bg-dashboard)
                                        hover:cursor-pointer
                                      "
                                    >
                                      <Eye size={15} />

                                      View
                                    </button>

                                    {/* EDIT */}

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleEditApplicant(
                                          applicant,
                                        )
                                      }
                                      className="
                                        flex
                                        w-full
                                        items-center
                                        gap-2
                                        px-3
                                        py-2
                                        text-left
                                        text-sm
                                        text-(--text-primary-dashboard)
                                        transition
                                        hover:bg-(--secondary-bg-dashboard)
                                        hover:cursor-pointer
                                      "
                                    >
                                      <Pencil size={15} />

                                      Edit
                                    </button>

                                    {/* DELETE */}

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleDeleteApplicant(
                                          applicant.id,
                                        )
                                      }
                                      className="
                                        flex
                                        w-full
                                        items-center
                                        gap-2
                                        px-3
                                        py-2
                                        text-left
                                        text-sm
                                        text-red-500
                                        transition
                                        hover:bg-red-500/10
                                        hover:cursor-pointer
                                      "
                                    >
                                      <Trash2 size={15} />

                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ),
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= ADD JOB MODAL ================= */}

          {isModalOpen && (
            <div
              className="
                fixed
                inset-0
                z-200
                flex
                items-center
                justify-center
                bg-black/40
                px-4
                backdrop-blur-sm
              "
              onClick={handleCloseModal}
            >
              <div
                className="
                  w-full
                  max-w-lg
                  rounded-2xl
                  border
                  border-(--border-primary-dashboard)
                  bg-(--bg-primary-dashboard)
                  p-6
                  shadow-xl
                "
                onClick={(event) =>
                  event.stopPropagation()
                }
              >
                {/* ================= MODAL HEADER ================= */}

                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-(--text-primary-dashboard)">
                      Create Job Listing
                    </h2>

                    <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">
                      Fill in the details of the new job listing.
                    </p>
                  </div>

                  {/* CLOSE */}

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    aria-label="Close modal"
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      text-(--text-primary-dashboard)
                      transition
                      hover:bg-(--secondary-bg-dashboard)
                      hover:cursor-pointer
                    "
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* ================= FORM ================= */}

                <form
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                  onSubmit={handleCreateJob}
                >
                  {/* JOB TITLE */}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="job-title"
                      className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)"
                    >
                      Job Title
                    </label>

                    <input
                      id="job-title"
                      type="text"
                      value={formTitle}
                      onChange={(event) =>
                        setFormTitle(event.target.value)
                      }
                      required
                      placeholder="e.g. Senior React Developer"
                      className="
                        w-full
                        rounded-lg
                        border
                        border-(--border-primary-dashboard)
                        bg-(--bg-primary-dashboard)
                        px-4
                        py-2.5
                        text-sm
                        text-(--text-primary-dashboard)
                        outline-none
                        transition
                        focus:border-(--bg-lightblue)
                        focus:ring-2
                        focus:ring-(--bg-lightblue)/20
                      "
                    />
                  </div>

                  {/* COMPANY */}

                  <div>
                    <label
                      htmlFor="job-company"
                      className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)"
                    >
                      Company
                    </label>

                    <input
                      id="job-company"
                      type="text"
                      value={formCompany}
                      onChange={(event) =>
                        setFormCompany(event.target.value)
                      }
                      required
                      placeholder="e.g. TechFlow Systems"
                      className="
                        w-full
                        rounded-lg
                        border
                        border-(--border-primary-dashboard)
                        bg-(--bg-primary-dashboard)
                        px-4
                        py-2.5
                        text-sm
                        text-(--text-primary-dashboard)
                        outline-none
                        transition
                        focus:border-(--bg-lightblue)
                        focus:ring-2
                        focus:ring-(--bg-lightblue)/20
                      "
                    />
                  </div>

                  {/* JOB TYPE */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)">
                      Job Type
                    </label>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setIsTypeOpen(!isTypeOpen)
                        }
                        className="
                          flex
                          w-full
                          items-center
                          justify-between
                          gap-2
                          rounded-lg
                          border
                          border-(--border-primary-dashboard)
                          bg-(--bg-primary-dashboard)
                          px-4
                          py-2.5
                          text-sm
                          text-(--text-primary-dashboard)
                          outline-none
                          transition
                          hover:cursor-pointer
                          focus:border-(--bg-lightblue)
                          focus:ring-2
                          focus:ring-(--bg-lightblue)/20
                        "
                      >
                        {formType}

                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            isTypeOpen
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                      {isTypeOpen && (
                        <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) shadow-lg">
                          {jobTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => {
                                setFormType(type);

                                setIsTypeOpen(false);
                              }}
                              className={`
                                flex
                                w-full
                                items-center
                                px-4
                                py-2.5
                                text-left
                                text-sm
                                transition
                                hover:bg-(--secondary-bg-dashboard)
                                hover:cursor-pointer
                                ${
                                  formType ===
                                  type
                                    ? "font-medium text-(--bg-lightblue)"
                                    : "text-(--text-primary-dashboard)"
                                }
                              `}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SALARY */}

                  <div>
                    <label
                      htmlFor="job-salary"
                      className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)"
                    >
                      Salary
                    </label>

                    <input
                      id="job-salary"
                      type="text"
                      value={formSalary}
                      onChange={(event) =>
                        setFormSalary(event.target.value)
                      }
                      placeholder="e.g. NPR 150k - 200k/mo"
                      className="
                        w-full
                        rounded-lg
                        border
                        border-(--border-primary-dashboard)
                        bg-(--bg-primary-dashboard)
                        px-4
                        py-2.5
                        text-sm
                        text-(--text-primary-dashboard)
                        outline-none
                        transition
                        focus:border-(--bg-lightblue)
                        focus:ring-2
                        focus:ring-(--bg-lightblue)/20
                      "
                    />
                  </div>

                  {/* LOCATION */}

                  <div>
                    <label
                      htmlFor="job-location"
                      className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)"
                    >
                      Location
                    </label>

                    <input
                      id="job-location"
                      type="text"
                      value={formLocation}
                      onChange={(event) =>
                        setFormLocation(event.target.value)
                      }
                      placeholder="e.g. Kathmandu (Hybrid)"
                      className="
                        w-full
                        rounded-lg
                        border
                        border-(--border-primary-dashboard)
                        bg-(--bg-primary-dashboard)
                        px-4
                        py-2.5
                        text-sm
                        text-(--text-primary-dashboard)
                        outline-none
                        transition
                        focus:border-(--bg-lightblue)
                        focus:ring-2
                        focus:ring-(--bg-lightblue)/20
                      "
                    />
                  </div>

                  {/* DESCRIPTION */}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="job-description"
                      className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)"
                    >
                      Description
                    </label>

                    <textarea
                      id="job-description"
                      value={formDescription}
                      onChange={(event) =>
                        setFormDescription(
                          event.target.value,
                        )
                      }
                      rows={4}
                      placeholder="Short description with roles and responsibilities"
                      className="
                        w-full
                        resize-none
                        rounded-lg
                        border
                        border-(--border-primary-dashboard)
                        bg-(--bg-primary-dashboard)
                        px-4
                        py-2.5
                        text-sm
                        text-(--text-primary-dashboard)
                        outline-none
                        transition
                        focus:border-(--bg-lightblue)
                        focus:ring-2
                        focus:ring-(--bg-lightblue)/20
                      "
                    />
                  </div>

                  {/* ICON */}

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)">
                      Icon
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {iconChoices.map(
                        (choice) => {
                          const Icon =
                            choice.icon;

                          const isActive =
                            formIcon ===
                            choice.icon;

                          return (
                            <button
                              key={choice.label}
                              type="button"
                              onClick={() =>
                                setFormIcon(
                                  choice.icon,
                                )
                              }
                              className={`
                                flex
                                items-center
                                gap-1.5
                                rounded-lg
                                border
                                px-3
                                py-2
                                text-xs
                                font-medium
                                transition
                                hover:cursor-pointer
                                ${
                                  isActive
                                    ? "border-(--bg-lightblue) bg-(--bg-lightblue)/10 text-(--bg-lightblue)"
                                    : "border-(--border-primary-dashboard) text-(--text-primary-dashboard)/70 hover:bg-(--secondary-bg-dashboard)"
                                }
                              `}
                            >
                              <Icon size={15} />

                              {choice.label}
                            </button>
                          );
                        },
                      )}
                    </div>
                  </div>

                  {/* ================= MODAL ACTIONS ================= */}

                  <div className="flex justify-end gap-3 pt-2 sm:col-span-2">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="
                        rounded-lg
                        border
                        border-(--border-primary-dashboard)
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-(--text-primary-dashboard)
                        transition
                        hover:bg-(--secondary-bg-dashboard)
                        hover:cursor-pointer
                      "
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="
                        rounded-lg
                        bg-(--bg-lightblue)
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-(--text-primary-dashboard)
                        transition
                        hover:opacity-90
                        hover:cursor-pointer
                      "
                    >
                      Create Listing
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ================================================= */}
          {/* VIEW APPLICANT DETAILS MODAL */}
          {/* ================================================= */}

          {viewApplicant && (
            <div
              className="
                fixed
                inset-0
                z-200
                flex
                items-center
                justify-center
                bg-black/40
                px-4
                backdrop-blur-sm
              "
              onClick={handleCloseViewModal}
            >
              <div
                className="
                  w-full
                  max-w-lg
                  rounded-2xl
                  border
                  border-(--border-primary-dashboard)
                  bg-(--bg-primary-dashboard)
                  p-6
                  shadow-xl
                "
                onClick={(event) =>
                  event.stopPropagation()
                }
              >
                {/* ================= MODAL HEADER ================= */}

                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-(--text-primary-dashboard)">
                      Applicant Details
                    </h2>

                    <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">
                      Details of the selected applicant.
                    </p>
                  </div>

                  {/* CLOSE */}

                  <button
                    type="button"
                    onClick={handleCloseViewModal}
                    aria-label="Close modal"
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      text-(--text-primary-dashboard)
                      transition
                      hover:bg-(--secondary-bg-dashboard)
                      hover:cursor-pointer
                    "
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* ================= DETAILS ================= */}

                <dl className="space-y-4">
                  <div className="flex items-start gap-4">
                    <dt className="w-28 shrink-0 text-sm font-medium text-(--text-primary-dashboard)/70">
                      ID
                    </dt>

                    <dd className="text-sm text-(--text-primary-dashboard)">
                      {viewApplicant.id}
                    </dd>
                  </div>

                  <div className="flex items-start gap-4">
                    <dt className="w-28 shrink-0 text-sm font-medium text-(--text-primary-dashboard)/70">
                      Name
                    </dt>

                    <dd className="text-sm text-(--text-primary-dashboard)">
                      {viewApplicant.name}
                    </dd>
                  </div>

                  <div className="flex items-start gap-4">
                    <dt className="w-28 shrink-0 text-sm font-medium text-(--text-primary-dashboard)/70">
                      Email
                    </dt>

                    <dd className="text-sm text-(--text-primary-dashboard)">
                      {viewApplicant.email}
                    </dd>
                  </div>

                  <div className="flex items-start gap-4">
                    <dt className="w-28 shrink-0 text-sm font-medium text-(--text-primary-dashboard)/70">
                      Phone
                    </dt>

                    <dd className="text-sm text-(--text-primary-dashboard)">
                      {viewApplicant.phone}
                    </dd>
                  </div>

                  <div className="flex items-start gap-4">
                    <dt className="w-28 shrink-0 text-sm font-medium text-(--text-primary-dashboard)/70">
                      Address
                    </dt>

                    <dd className="text-sm text-(--text-primary-dashboard)">
                      {viewApplicant.address}
                    </dd>
                  </div>

                  <div className="flex items-start gap-4">
                    <dt className="w-28 shrink-0 text-sm font-medium text-(--text-primary-dashboard)/70">
                      CV File
                    </dt>

                    <dd className="inline-flex items-center gap-1.5 text-sm text-(--text-primary-dashboard)">
                      <FileText size={14} className="shrink-0 text-(--secondary-text-dashboard)" />

                      {viewApplicant.cvFile}
                    </dd>
                  </div>

                  <div className="flex items-start gap-4">
                    <dt className="w-28 shrink-0 text-sm font-medium text-(--text-primary-dashboard)/70">
                      Applied Date
                    </dt>

                    <dd className="text-sm text-(--text-primary-dashboard)">
                      {viewApplicant.appliedDate}
                    </dd>
                  </div>

                  <div className="flex items-start gap-4">
                    <dt className="w-28 shrink-0 text-sm font-medium text-(--text-primary-dashboard)/70">
                      Status
                    </dt>

                    <dd>
                      <span
                        className={`
                          inline-flex
                          items-center
                          rounded-full
                          border
                          px-3
                          py-1
                          text-xs
                          font-medium
                          capitalize
                          ${getStatusClasses(
                            viewApplicant.status,
                          )}
                        `}
                      >
                        <span
                          className={`mr-1.5 h-1.5 w-1.5 rounded-full ${getStatusDot(
                            viewApplicant.status,
                          )}`}
                        />

                        {viewApplicant.status}
                      </span>
                    </dd>
                  </div>
                </dl>

                {/* ================= MODAL FOOTER ================= */}

                <div className="flex justify-end pt-6">
                  <button
                    type="button"
                    onClick={handleCloseViewModal}
                    className="
                      rounded-lg
                      bg-(--bg-lightblue)
                      px-5
                      py-2.5
                      text-sm
                      font-semibold
                      text-(--text-primary-dashboard)
                      transition
                      hover:opacity-90
                      hover:cursor-pointer
                    "
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================================================= */}
          {/* EDIT APPLICANT MODAL */}
          {/* ================================================= */}

          {isApplicantModalOpen && (
            <div
              className="
                fixed
                inset-0
                z-200
                flex
                items-center
                justify-center
                bg-black/40
                px-4
                backdrop-blur-sm
              "
              onClick={handleCloseApplicantModal}
            >
              <div
                className="
                  w-full
                  max-w-lg
                  rounded-2xl
                  border
                  border-(--border-primary-dashboard)
                  bg-(--bg-primary-dashboard)
                  p-6
                  shadow-xl
                "
                onClick={(event) =>
                  event.stopPropagation()
                }
              >
                {/* ================= MODAL HEADER ================= */}

                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-(--text-primary-dashboard)">
                      Edit Applicant
                    </h2>

                    <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">
                      Update the applicant details.
                    </p>
                  </div>

                  {/* CLOSE */}

                  <button
                    type="button"
                    onClick={handleCloseApplicantModal}
                    aria-label="Close modal"
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      text-(--text-primary-dashboard)
                      transition
                      hover:bg-(--secondary-bg-dashboard)
                      hover:cursor-pointer
                    "
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* ================= FORM ================= */}

                <form
                  className="space-y-5"
                  onSubmit={handleSaveApplicant}
                >
                  {/* NAME */}

                  <div>
                    <label
                      htmlFor="applicant-name"
                      className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)"
                    >
                      Name
                    </label>

                    <input
                      id="applicant-name"
                      type="text"
                      value={editAppName}
                      onChange={(event) =>
                        setEditAppName(event.target.value)
                      }
                      required
                      placeholder="Enter applicant name"
                      className="
                        w-full
                        rounded-lg
                        border
                        border-(--border-primary-dashboard)
                        bg-(--bg-primary-dashboard)
                        px-4
                        py-2.5
                        text-sm
                        text-(--text-primary-dashboard)
                        outline-none
                        transition
                        focus:border-(--bg-lightblue)
                        focus:ring-2
                        focus:ring-(--bg-lightblue)/20
                      "
                    />
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label
                      htmlFor="applicant-email"
                      className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)"
                    >
                      Email
                    </label>

                    <input
                      id="applicant-email"
                      type="email"
                      value={editAppEmail}
                      onChange={(event) =>
                        setEditAppEmail(event.target.value)
                      }
                      required
                      placeholder="Enter applicant email"
                      className="
                        w-full
                        rounded-lg
                        border
                        border-(--border-primary-dashboard)
                        bg-(--bg-primary-dashboard)
                        px-4
                        py-2.5
                        text-sm
                        text-(--text-primary-dashboard)
                        outline-none
                        transition
                        focus:border-(--bg-lightblue)
                        focus:ring-2
                        focus:ring-(--bg-lightblue)/20
                      "
                    />
                  </div>

                  {/* PHONE */}

                  <div>
                    <label
                      htmlFor="applicant-phone"
                      className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)"
                    >
                      Phone Number
                    </label>

                    <input
                      id="applicant-phone"
                      type="tel"
                      value={editAppPhone}
                      onChange={(event) =>
                        setEditAppPhone(event.target.value)
                      }
                      required
                      placeholder="Enter phone number"
                      className="
                        w-full
                        rounded-lg
                        border
                        border-(--border-primary-dashboard)
                        bg-(--bg-primary-dashboard)
                        px-4
                        py-2.5
                        text-sm
                        text-(--text-primary-dashboard)
                        outline-none
                        transition
                        focus:border-(--bg-lightblue)
                        focus:ring-2
                        focus:ring-(--bg-lightblue)/20
                      "
                    />
                  </div>

                  {/* ADDRESS */}

                  <div>
                    <label
                      htmlFor="applicant-address"
                      className="mb-2 block text-sm font-medium text-(--text-primary-dashboard)"
                    >
                      Address
                    </label>

                    <input
                      id="applicant-address"
                      type="text"
                      value={editAppAddress}
                      onChange={(event) =>
                        setEditAppAddress(event.target.value)
                      }
                      required
                      placeholder="Enter applicant address"
                      className="
                        w-full
                        rounded-lg
                        border
                        border-(--border-primary-dashboard)
                        bg-(--bg-primary-dashboard)
                        px-4
                        py-2.5
                        text-sm
                        text-(--text-primary-dashboard)
                        outline-none
                        transition
                        focus:border-(--bg-lightblue)
                        focus:ring-2
                        focus:ring-(--bg-lightblue)/20
                      "
                    />
                  </div>

                  {/* ================= MODAL ACTIONS ================= */}

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCloseApplicantModal}
                      className="
                        rounded-lg
                        border
                        border-(--border-primary-dashboard)
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-(--text-primary-dashboard)
                        transition
                        hover:bg-(--secondary-bg-dashboard)
                        hover:cursor-pointer
                      "
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="
                        rounded-lg
                        bg-(--bg-lightblue)
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-(--text-primary-dashboard)
                        transition
                        hover:opacity-90
                        hover:cursor-pointer
                      "
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Page;