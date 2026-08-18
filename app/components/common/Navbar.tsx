import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/window.svg";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-10 py-7 font-semibold sticky top-0 bg-(--primary-bg-color)">
      <div className="flex items-center gap-10">
        {/* logo */}
        <Link href="/" className="hover:cursor-pointer">
          <Image src={logo} alt="Logo" />
        </Link>

        {/* hyperlinks */}
        <div className="flex items-center">
          <Link href="/products" className="h-full flex items-center px-5 py-2 rounded-3xl transition-all hover:cursor-pointer hover:shadow-md hover:text-(--accent-color)">
            <span>Product</span>
            <span>
              <ChevronDown className="h-5" />
            </span>
          </Link>
          <Link href="/shop" className="px-5 py-2 rounded-3xl transition-all hover:cursor-pointer hover:shadow-md hover:text-(--accent-color)">Shop</Link>
          <Link href="/pages" className="px-5 py-2 rounded-3xl transition-all hover:cursor-pointer hover:shadow-md hover:text-(--accent-color)">Pages</Link>
          <Link href="/integrations" className="px-5 py-2 rounded-3xl transition-all hover:cursor-pointer hover:shadow-md hover:text-(--accent-color)">Integrations</Link>
          <Link href="/developers" className="px-5 py-2 rounded-3xl transition-all hover:cursor-pointer hover:shadow-md hover:text-(--accent-color)">Developers</Link>
        </div>
      </div>

      {/* buttons */}
      <div className="flex items-center gap-3">
        <button className="px-5 py-2 rounded-3xl transition-all hover:cursor-pointer hover:shadow-md hover:text-(--accent-color)">Login</button>
        <button className="bg-(--secondary-bg-color) px-5 py-2 rounded-4xl text-(--primary-bg-color) hover:cursor-pointer hover:bg-(--primary-bg-color) hover:outline-2 hover:outline-(--secondary-bg-color) hover:text-(--secondary-bg-color) transition-all">
          Start for free
        </button>
      </div>
    </div>
  );
};

export default Navbar;
