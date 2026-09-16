import { StaticImageData } from "next/image";

import illustration from "@/public/home/illustrator2.png";
import illustration2 from "@/public/about/illustrator2.png";
import serviceImage from "@/public/services/image 21.png";
import portfolioImage from "@/public/portfolio/image3.jpg";

export interface Blog {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  image: StaticImageData;
  imageAlt: string;
  content: string[];
}

export const blogs: Blog[] = [
  {
    slug: "boost-digital-marketing-agency",
    title: "How To Boost Your Digital Marketing Agency",
    author: "James Anderson",
    date: "June 26, 2025",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, cumque!",
    image: illustration,
    imageAlt: "Digital Marketing Agency",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      "Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      "Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.",
    ],
  },
  {
    slug: "responsive-web-design-trends",
    title: "Why Responsive Web Design Still Rules",
    author: "Sarah Mitchell",
    date: "July 12, 2025",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, cumque!",
    image: illustration2,
    imageAlt: "Responsive Web Design",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      "Dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
  },
  {
    slug: "automation-scales-your-business",
    title: "How Automation Scales Your Business",
    author: "Rohan Gurung",
    date: "August 03, 2025",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, cumque!",
    image: serviceImage,
    imageAlt: "Business Automation",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      "Dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    ],
  },
  {
    slug: "branding-more-than-logo",
    title: "Branding Is More Than A Logo",
    author: "Priya Shrestha",
    date: "August 21, 2025",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, cumque!",
    image: portfolioImage,
    imageAlt: "Branding Work",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      "Dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
  },
];

export const getBlogBySlug = (slug: string): Blog | undefined =>
  blogs.find((blog) => blog.slug === slug);