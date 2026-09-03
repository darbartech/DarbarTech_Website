import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/common/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--poppins",
});

export const metadata: Metadata = {
  title: "DarbarTech",
  description: "DarbarTech - Group of Technology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className=" min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}