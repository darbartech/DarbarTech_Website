import { ClipboardList, Rocket, Search } from "lucide-react";

import caseImage1 from "@/public/portfolio/image1.jpg";
import caseImage2 from "@/public/portfolio/image2.jpg";
import caseImage3 from "@/public/portfolio/image3.jpg";
import caseImage4 from "@/public/portfolio/image4.jpg";
import caseImage5 from "@/public/portfolio/image5.jpg";
import portfolioImage1 from "@/public/portfolio/image1.jpg";
import portfolioImage2 from "@/public/portfolio/image2.jpg";
import portfolioImage3 from "@/public/portfolio/image3.jpg";
import portfolioImage4 from "@/public/portfolio/image4.jpg";
import portfolioImage5 from "@/public/portfolio/image5.jpg";

import {
  CaseStudy,
  PortfolioImage,
  ProcessStep,
  Stat,
} from "./types";



/* ---------- Case Study ---------- */

export const stats: Stat[] = [
  { value: "120+", label: "Projects Delivered" },
  { value: "85+", label: "Happy Clients" },
  { value: "12", label: "Industries Served" },
  { value: "98%", label: "Client Satisfaction" },
];

export const processSteps: ProcessStep[] = [
  {
    icon: Search,
    title: "Discover",
    description:
      "We dig deep into your business, audience, and goals to find the exact problem worth solving.",
  },
  {
    icon: ClipboardList,
    title: "Strategize",
    description:
      "A clear roadmap is built around measurable outcomes so every step moves the needle.",
  },
  {
    icon: Rocket,
    title: "Deliver",
    description:
      "We ship fast, measure results, and fine-tune until the numbers speak for themselves.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    image: caseImage2,
    category: "Digital Marketing",
    title: "Growing Organic Traffic for a SaaS Platform",
    description:
      "A full-funnel content strategy that turned the brand into a search authority in under a year.",
    metrics: ["+210% Traffic", "3x Leads", "9 Months"],
  },
  {
    image: caseImage3,
    category: "Branding",
    title: "Rebranding a Local Business for Bigger Reach",
    description:
      "Fresh identity and messaging that doubled offline-to-online conversions within the first quarter.",
    metrics: ["+95% Reach", "×2 Sales", "12 Weeks"],
  },
  {
    image: caseImage4,
    category: "Development",
    title: "Modernizing an Aging Web Platform",
    description:
      "A performance-first rebuild that cut load times and lifted user retention across devices.",
    metrics: ["-68% Load Time", "+40% Retention", "5 Months"],
  },
  {
    image: caseImage5,
    category: "Social Media",
    title: "Turning Social Presence Into Revenue",
    description:
      "Consistent content engines and paid campaigns that filled the pipeline every single month.",
    metrics: ["+150% Followers", "+55% Revenue", "8 Months"],
  },
];

export const featuredCaseStudyImage = caseImage1;

/* ---------- Portfolio ---------- */

export const portfolioImages: PortfolioImage[] = [
  { label: "Image 1", image: portfolioImage1, altText: "Image 1" },
  { label: "Image 2", image: portfolioImage2, altText: "Image 2" },
  { label: "Image 3", image: portfolioImage3, altText: "Image 3" },
  { label: "Image 4", image: portfolioImage4, altText: "Image 4" },
  { label: "Image 5", image: portfolioImage5, altText: "Image 5" },
];

