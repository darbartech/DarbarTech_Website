import React from "react";
import Image from "next/image";
import illustration from "@/public/Illustrator.png";
import {
  MessageCircleIcon,
  MessageSquareCodeIcon,
  PhoneCall,
} from "lucide-react";

const Footer = () => {
  return (
    <div className="px-30 py-10 font-bold bg-(--bg-footer) text-(--primary-bg-color) flex gap-5">
      {/* contact info div */}
      <div className="flex-1 space-y-2">
        <h3 className="border-b border-(--bg-muted) py-3">Contact Info</h3>
        <div className="py-3 space-y-5">
          {/* phone call div */}
          <div className="flex items-center justify-start gap-2">
            <span>
              <PhoneCall />
            </span>
            <div className="text-xs">
              <span>MON TO FRI:10:00AM - 6:00PM</span>
              <span className="block">+123 54253 534 42</span>
            </div>
          </div>

          {/* email div */}
          <div className="flex items-center justify-start gap-2">
            <span>
              <MessageSquareCodeIcon />
            </span>
            <div className="text-xs">
              <span>DO YOU HAVE A QUESTION?</span>
              <span className="block">hello@karison.com</span>
            </div>
          </div>

          {/* social medias div */}
          <div className="flex items-center justify-start gap-2">
            <span>
              <MessageCircleIcon />
            </span>
            <div className="text-xs">
              <span>SOCIAL NETWORK</span>
              <div className="flex items-center gap-2">
                <span>
                  <MessageCircleIcon size={14}/>
                </span>
                <span>
                  <MessageCircleIcon size={14}/>
                </span>
                <span>
                  <MessageCircleIcon size={14}/>
                </span>
                <span>
                  <MessageCircleIcon size={14}/>
                </span>
                <span>
                  <MessageCircleIcon size={14}/>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* quick links div */}
      <div className="flex-1 space-y-2">
        <h3 className="border-b border-(--bg-muted) py-3">Quick Links</h3>
        <div className="grid grid-cols-2">
          <span>Home</span>
          <span>About</span>
          <span>Blog</span>
          <span>Contact</span>
          <span>Agency</span>
          <span>Digital</span>
          <span>Support</span>
          <span>Shop</span>
          <span>Agency</span>
          <span>Digital</span>
          <span>Support</span>
          <span>Shop</span>
          <span>Digital</span>
          <span>Support</span>
        </div>
      </div>

      {/* Instagram */}
      <div className="flex-1 space-y-2">
        <h3 className="border-b border-(--bg-muted) py-3">Instagram</h3>
        <div className="grid grid-cols-3 gap-2">
          <Image src={illustration} alt="Illustrator" />
          <Image src={illustration} alt="Illustrator" />
          <Image src={illustration} alt="Illustrator" />
          <Image src={illustration} alt="Illustrator" />
          <Image src={illustration} alt="Illustrator" />
          <Image src={illustration} alt="Illustrator" />
          <Image src={illustration} alt="Illustrator" />
          <Image src={illustration} alt="Illustrator" />
          <Image src={illustration} alt="Illustrator" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
