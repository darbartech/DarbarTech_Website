import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/window.svg";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-10 py-7 font-semibold ">
      <div className="flex items-center gap-10">
        {/* logo */}
        <div>
          <Link href="/">
            <Image src={logo} alt="Logo" />
          </Link>
        </div>

        {/* hyperlinks */}
        <div className="flex items-center gap-5">
          <Link href="/products" className="h-full flex items-center">
            <span>Product</span>
            <span>
              <ChevronDown className="h-5" />
            </span>
          </Link>
          <Link href="/shop">Shop</Link>
          <Link href="/pages">Pages</Link>
          <Link href="/integrations">Integrations</Link>
          <Link href="/developers">Developers</Link>
        </div>
      </div>

      {/* buttons */}
      <div className="flex items-center gap-3">
        <button className="px-5 py-2">Login</button>
        <button className="bg-(--secondary-bg-color) px-5 py-2 rounded-4xl text-(--primary-bg-color)">
          Start for free
        </button>
      </div>
    </div>
  );
};

export default Navbar;
