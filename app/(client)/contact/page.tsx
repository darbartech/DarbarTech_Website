"use client";

import React, { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import HeroSectionForPages from "../components/HeroSectionForPages";
import EnquirySection from "../components/EnquirySection";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useToastStore } from "@/components/common/toast-store";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const addToast = useToastStore((s) => s.addToast);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToast("Your message has been sent. We will get back to you soon.", "success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <main className="font-bold">
        <HeroSectionForPages title="Contact Us" />

        <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact info */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl">Get In Touch</h2>
              <p className="text-base font-semibold text-(--bg-muted)">
                We would love to hear from you. Reach out to us for any
                questions, feedback or business inquiries.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 rounded-lg bg-(--secondary-bg-color) p-2.5 text-(--primary-bg-color)">
                    <Phone size={20} />
                  </span>
                  <div>
                    <p className="text-sm text-(--bg-muted)">PHONE</p>
                    <p>+123 54253 534 42</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="shrink-0 rounded-lg bg-(--secondary-bg-color) p-2.5 text-(--primary-bg-color)">
                    <Mail size={20} />
                  </span>
                  <div>
                    <p className="text-sm text-(--bg-muted)">EMAIL</p>
                    <p>info@darbartech.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="shrink-0 rounded-lg bg-(--secondary-bg-color) p-2.5 text-(--primary-bg-color)">
                    <MapPin size={20} />
                  </span>
                  <div>
                    <p className="text-sm text-(--bg-muted)">ADDRESS</p>
                    <p>Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-(--surface) bg-(--primary-bg-color) p-6 shadow-md"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full rounded-lg border border-(--surface) px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-(--secondary-bg-color)"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email"
                    className="w-full rounded-lg border border-(--surface) px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-(--secondary-bg-color)"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-1 block text-sm">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full rounded-lg border border-(--surface) px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-(--secondary-bg-color)"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-lg border border-(--surface) px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-(--secondary-bg-color)"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-(--secondary-bg-color) px-6 py-3 text-(--primary-bg-color) transition-all hover:cursor-pointer hover:opacity-90"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        <EnquirySection />
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
