import { computeAchievementScore } from "./achievement";
import type { Achievement, Student } from "./types";

export interface CourseOption {
  id: string;
  name: string;
}

export const COURSES: CourseOption[] = [
  { id: "c-1", name: "Full Stack Web Development" },
  { id: "c-2", name: "UI/UX Design" },
  { id: "c-3", name: "Database Design" },
  { id: "c-4", name: "PHP & Laravel" },
  { id: "c-5", name: "JavaScript Certification" },
];

interface RawStudent {
  id: string;
  name: string;
  email: string;
  courseId: string;
  courseName: string;
  enrollmentDate: string;
  completionDate?: string;
  lastActiveAt?: string;
  achievements: Achievement[];
}

const rawStudents: RawStudent[] = [
  {
    id: "s-001",
    name: "Anisha Karki",
    email: "anisha.karki@darbartech.com",
    courseId: "c-1",
    courseName: "Full Stack Web Development",
    enrollmentDate: "2024-07-15",
    lastActiveAt: "2026-09-03",
    achievements: [
      { id: "a1", title: "React Developer", type: "certificate", level: "advanced", earnedAt: "2025-06-10", points: 50 },
      { id: "a2", title: "Top Performer", type: "award", level: "advanced", earnedAt: "2025-12-01", points: 40 },
      { id: "a3", title: "100 Days Streak", type: "badge", level: "intermediate", earnedAt: "2025-03-05", points: 20 },
    ],
  },
  {
    id: "s-002",
    name: "Binod Thapa",
    email: "binod.thapa@darbartech.com",
    courseId: "c-3",
    courseName: "Database Design",
    enrollmentDate: "2023-11-01",
    completionDate: "2024-04-30",
    lastActiveAt: "2026-08-20",
    achievements: [
      { id: "a4", title: "SQL Mastery", type: "certificate", level: "advanced", earnedAt: "2024-04-15", points: 60 },
      { id: "a5", title: "Query Optimization", type: "milestone", level: "intermediate", earnedAt: "2024-02-02", points: 15 },
    ],
  },
  {
    id: "s-003",
    name: "Chandra Rai",
    email: "chandra.rai@darbartech.com",
    courseId: "c-2",
    courseName: "UI/UX Design",
    enrollmentDate: "2024-07-15",
    lastActiveAt: "2026-09-04",
    achievements: [
      { id: "a6", title: "Design Sprint", type: "badge", level: "beginner", earnedAt: "2025-01-20", points: 10 },
    ],
  },
  {
    id: "s-004",
    name: "Deepa Shrestha",
    email: "deepa.shrestha@darbartech.com",
    courseId: "c-5",
    courseName: "JavaScript Certification",
    enrollmentDate: "2024-01-10",
    lastActiveAt: "2026-06-30",
    achievements: [
      { id: "a7", title: "ES6 Master", type: "certificate", level: "advanced", earnedAt: "2025-08-01", points: 45 },
      { id: "a8", title: "Consistency", type: "award", level: "beginner", earnedAt: "2025-05-22", points: 25 },
      { id: "a9", title: "Ten Quizzes", type: "milestone", level: "intermediate", earnedAt: "2025-02-11", points: 12 },
    ],
  },
  {
    id: "s-005",
    name: "Erika Limbu",
    email: "erika.limbu@darbartech.com",
    courseId: "c-4",
    courseName: "PHP & Laravel",
    enrollmentDate: "2025-09-01",
    lastActiveAt: "2026-09-02",
    achievements: [],
  },
  {
    id: "s-006",
    name: "Gopal Adhikari",
    email: "gopal.adhikari@darbartech.com",
    courseId: "c-1",
    courseName: "Full Stack Web Development",
    enrollmentDate: "2024-07-15",
    lastActiveAt: "2026-09-01",
    achievements: [
      { id: "a10", title: "Node Backend", type: "certificate", level: "intermediate", earnedAt: "2025-07-12", points: 35 },
    ],
  },
  {
    id: "s-007",
    name: "Hina Gurung",
    email: "hina.gurung@darbartech.com",
    courseId: "c-2",
    courseName: "UI/UX Design",
    enrollmentDate: "2025-02-01",
    lastActiveAt: "2026-07-19",
    achievements: [
      { id: "a11", title: "Prototype Award", type: "award", level: "intermediate", earnedAt: "2025-11-05", points: 30 },
      { id: "a12", title: "Wireframe", type: "milestone", level: "beginner", earnedAt: "2025-06-09", points: 8 },
    ],
  },
  {
    id: "s-008",
    name: "Ishwor Maharjan",
    email: "ishwor.maharjan@darbartech.com",
    courseId: "c-3",
    courseName: "Database Design",
    enrollmentDate: "2023-11-01",
    completionDate: "2024-04-30",
    achievements: [
      { id: "a13", title: "Normalization", type: "badge", level: "intermediate", earnedAt: "2024-03-18", points: 18 },
    ],
  },
  {
    id: "s-009",
    name: "Jenisha Tamang",
    email: "jenisha.tamang@darbartech.com",
    courseId: "c-5",
    courseName: "JavaScript Certification",
    enrollmentDate: "2024-01-10",
    lastActiveAt: "2026-09-04",
    achievements: [],
  },
  {
    id: "s-010",
    name: "Kamal Bhandari",
    email: "kamal.bhandari@darbartech.com",
    courseId: "c-4",
    courseName: "PHP & Laravel",
    enrollmentDate: "2025-09-01",
    lastActiveAt: "2026-08-28",
    achievements: [
      { id: "a14", title: "CRUD Expert", type: "badge", level: "intermediate", earnedAt: "2026-02-14", points: 22 },
      { id: "a15", title: "Eloquent ORM", type: "milestone", level: "advanced", earnedAt: "2026-04-03", points: 28 },
    ],
  },
  {
    id: "s-011",
    name: "Laxmi KC",
    email: "laxmi.kc@darbartech.com",
    courseId: "c-1",
    courseName: "Full Stack Web Development",
    enrollmentDate: "2024-07-15",
    lastActiveAt: "2026-08-15",
    achievements: [
      { id: "a16", title: "React Hooks", type: "certificate", level: "advanced", earnedAt: "2025-09-20", points: 42 },
      { id: "a17", title: "Team Lead", type: "award", level: "advanced", earnedAt: "2026-01-30", points: 38 },
    ],
  },
  {
    id: "s-012",
    name: "Manoj Shrestha",
    email: "manoj.shrestha@darbartech.com",
    courseId: "c-2",
    courseName: "UI/UX Design",
    enrollmentDate: "2024-07-15",
    lastActiveAt: "2026-06-01",
    achievements: [
      { id: "a18", title: "Accessibility", type: "milestone", level: "intermediate", earnedAt: "2025-04-11", points: 16 },
    ],
  },
  {
    id: "s-013",
    name: "Nisha Poudel",
    email: "nisha.poudel@darbartech.com",
    courseId: "c-3",
    courseName: "Database Design",
    enrollmentDate: "2023-11-01",
    completionDate: "2024-04-30",
    achievements: [
      { id: "a19", title: "Indexing Expert", type: "certificate", level: "advanced", earnedAt: "2024-05-01", points: 55 },
    ],
  },
  {
    id: "s-014",
    name: "Om Bahadur Gurung",
    email: "om.gurung@darbartech.com",
    courseId: "c-1",
    courseName: "Full Stack Web Development",
    enrollmentDate: "2025-03-01",
    lastActiveAt: "2026-09-04",
    achievements: [
      { id: "a20", title: "First Project", type: "milestone", level: "beginner", earnedAt: "2025-08-01", points: 10 },
    ],
  },
  {
    id: "s-015",
    name: "Pratik Shrestha",
    email: "pratik.shrestha@darbartech.com",
    courseId: "c-5",
    courseName: "JavaScript Certification",
    enrollmentDate: "2024-01-10",
    lastActiveAt: "2026-07-11",
    achievements: [
      { id: "a21", title: "Async Mastery", type: "award", level: "advanced", earnedAt: "2025-10-05", points: 36 },
      { id: "a22", title: "DOM Guru", type: "badge", level: "intermediate", earnedAt: "2025-05-19", points: 20 },
    ],
  },
  {
    id: "s-016",
    name: "Ramesh Lama",
    email: "ramesh.lama@darbartech.com",
    courseId: "c-4",
    courseName: "PHP & Laravel",
    enrollmentDate: "2024-06-01",
    achievements: [],
  },
  {
    id: "s-017",
    name: "Sabina Karki",
    email: "sabina.karki@darbartech.com",
    courseId: "c-2",
    courseName: "UI/UX Design",
    enrollmentDate: "2025-02-01",
    lastActiveAt: "2026-08-30",
    achievements: [
      { id: "a23", title: "Usability", type: "milestone", level: "advanced", earnedAt: "2026-01-18", points: 30 },
      { id: "a24", title: "Figma Power", type: "badge", level: "beginner", earnedAt: "2025-09-07", points: 12 },
      { id: "a25", title: "Best Portfolio", type: "award", level: "intermediate", earnedAt: "2026-03-22", points: 34 },
    ],
  },
  {
    id: "s-018",
    name: "Tenzin Sherpa",
    email: "tenzin.sherpa@darbartech.com",
    courseId: "c-3",
    courseName: "Database Design",
    enrollmentDate: "2024-09-01",
    lastActiveAt: "2026-09-03",
    achievements: [
      { id: "a26", title: "Transactions", type: "badge", level: "advanced", earnedAt: "2025-12-11", points: 26 },
    ],
  },
  {
    id: "s-019",
    name: "Usha Rana",
    email: "usha.rana@darbartech.com",
    courseId: "c-1",
    courseName: "Full Stack Web Development",
    enrollmentDate: "2025-03-01",
    lastActiveAt: "2026-07-25",
    achievements: [
      { id: "a27", title: "REST API", type: "milestone", level: "intermediate", earnedAt: "2026-02-05", points: 20 },
    ],
  },
  {
    id: "s-020",
    name: "Vikash Sharma",
    email: "vikash.sharma@darbartech.com",
    courseId: "c-5",
    courseName: "JavaScript Certification",
    enrollmentDate: "2024-01-10",
    lastActiveAt: "2026-08-18",
    achievements: [
      { id: "a28", title: "Promises", type: "certificate", level: "advanced", earnedAt: "2025-06-30", points: 48 },
      { id: "a29", title: "Closures", type: "badge", level: "intermediate", earnedAt: "2025-03-14", points: 22 },
      { id: "a30", title: "100% Quiz", type: "milestone", level: "advanced", earnedAt: "2025-11-20", points: 25 },
    ],
  },
  {
    id: "s-021",
    name: "Yashika Mahato",
    email: "yashika.mahato@darbartech.com",
    courseId: "c-4",
    courseName: "PHP & Laravel",
    enrollmentDate: "2025-09-01",
    achievements: [
      { id: "a31", title: "Blade Basics", type: "milestone", level: "beginner", earnedAt: "2026-05-10", points: 12 },
    ],
  },
  {
    id: "s-022",
    name: "Suman Neupane",
    email: "suman.neupane@darbartech.com",
    courseId: "c-2",
    courseName: "UI/UX Design",
    enrollmentDate: "2024-07-15",
    lastActiveAt: "2026-09-04",
    achievements: [
      { id: "a32", title: "Research", type: "certificate", level: "advanced", earnedAt: "2026-04-02", points: 40 },
    ],
  },
  {
    id: "s-023",
    name: "Bina Moktan",
    email: "bina.moktan@darbartech.com",
    courseId: "c-3",
    courseName: "Database Design",
    enrollmentDate: "2024-09-01",
    completionDate: "2025-05-15",
    lastActiveAt: "2026-05-01",
    achievements: [
      { id: "a33", title: "ER Master", type: "badge", level: "advanced", earnedAt: "2025-03-28", points: 32 },
    ],
  },
  {
    id: "s-024",
    name: "Kiran Bista",
    email: "kiran.bista@darbartech.com",
    courseId: "c-1",
    courseName: "Full Stack Web Development",
    enrollmentDate: "2025-03-01",
    lastActiveAt: "2026-09-02",
    achievements: [],
  },
  {
    id: "s-025",
    name: "Mina Shrestha",
    email: "mina.shrestha@darbartech.com",
    courseId: "c-5",
    courseName: "JavaScript Certification",
    enrollmentDate: "2024-01-10",
    lastActiveAt: "2026-06-12",
    achievements: [
      { id: "a34", title: "Event Loop", type: "milestone", level: "advanced", earnedAt: "2025-09-01", points: 28 },
    ],
  },
  {
    id: "s-026",
    name: "Rajan Khadka",
    email: "rajan.khadka@darbartech.com",
    courseId: "c-4",
    courseName: "PHP & Laravel",
    enrollmentDate: "2025-09-01",
    lastActiveAt: "2026-08-22",
    achievements: [
      { id: "a35", title: "Middleware", type: "badge", level: "intermediate", earnedAt: "2026-06-20", points: 24 },
      { id: "a36", title: "Auth System", type: "award", level: "advanced", earnedAt: "2026-07-30", points: 30 },
    ],
  },
  {
    id: "s-027",
    name: "Sirisha Pradhan",
    email: "sirisha.pradhan@darbartech.com",
    courseId: "c-1",
    courseName: "Full Stack Web Development",
    enrollmentDate: "2024-07-15",
    completionDate: "2025-07-01",
    lastActiveAt: "2026-03-15",
    achievements: [
      { id: "a37", title: "Capstone", type: "certificate", level: "advanced", earnedAt: "2025-06-25", points: 50 },
    ],
  },
  {
    id: "s-028",
    name: "Dipesh Shrestha",
    email: "dipesh.shrestha@darbartech.com",
    courseId: "c-2",
    courseName: "UI/UX Design",
    enrollmentDate: "2025-02-01",
    lastActiveAt: "2026-07-01",
    achievements: [],
  },
  {
    id: "s-029",
    name: "Anjali Rijal",
    email: "anjali.rijal@darbartech.com",
    courseId: "c-3",
    courseName: "Database Design",
    enrollmentDate: "2024-09-01",
    lastActiveAt: "2026-09-04",
    achievements: [
      { id: "a38", title: "B+ Trees", type: "milestone", level: "advanced", earnedAt: "2026-04-18", points: 30 },
      { id: "a39", title: "Slow Queries", type: "badge", level: "intermediate", earnedAt: "2026-01-09", points: 18 },
    ],
  },
  {
    id: "s-030",
    name: "Rohit Magar",
    email: "rohit.magar@darbartech.com",
    courseId: "c-5",
    courseName: "JavaScript Certification",
    enrollmentDate: "2024-01-10",
    lastActiveAt: "2026-08-05",
    achievements: [
      { id: "a40", title: "Modules", type: "badge", level: "advanced", earnedAt: "2025-04-22", points: 28 },
    ],
  },
];

const STUDENTS: Student[] = rawStudents.map((raw) => ({
  ...raw,
  achievements: raw.achievements.map((a) => ({ ...a })),
  achievementScore: computeAchievementScore(raw.achievements),
}));

/**
 * Data service boundary. Kept separate from the sorting/filtering utilities so
 * a real backend can later be swapped in (server-side sorting/filtering/
 * pagination) without changing the frontend contract.
 */
export function getStudents(): Student[] {
  return STUDENTS.map((student) => ({
    ...student,
    achievements: student.achievements.map((a) => ({ ...a })),
  }));
}

export function getCourseOptions(): CourseOption[] {
  return COURSES.map((course) => ({ ...course }));
}
