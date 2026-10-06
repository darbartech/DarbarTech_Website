import { StaticImageData } from "next/image";
import { LucideIcon } from "lucide-react";

/* ---------- Case Study ---------- */

export interface Stat {
  value: string;
  label: string;
}

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface CaseStudy {
  image: StaticImageData;
  category: string;
  title: string;
  description: string;
  metrics: string[];
}

/* ---------- Portfolio ---------- */

export interface PortfolioImage {
  label: string;
  image: StaticImageData;
  altText: string;
}

/* ---------- About (illustration + content blocks) ---------- */

export interface IllustrationContent {
  topic: string;
  description: string;
  lists: string[];
  imageName: StaticImageData;
  altDescription: string;
  btnName: string;
  isImageOnLeft: boolean;
  href?: string;
}
