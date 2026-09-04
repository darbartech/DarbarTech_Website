import React from "react";
import HeroSectionForPages from "../components/HeroSectionForPages";
import EnquirySection from "../components/EnquirySection";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const policies = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly to us, such as your name, email address and account details when you register or use our services. We also collect certain information automatically, including usage data and device information.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use the information we collect to provide, maintain and improve our platform, to personalize your experience, to communicate with you, and to ensure the security and integrity of our services.",
  },
  {
    title: "3. Cookies and Tracking",
    body: "We use cookies and similar technologies to keep you signed in, remember your preferences, and understand how our platform is used. You can control cookies through your browser settings.",
  },
  {
    title: "4. Data Sharing",
    body: "We do not sell your personal information. We may share information with service providers who assist us in operating the platform, or where required by law, or to protect the rights and safety of our users and the public.",
  },
  {
    title: "5. Data Security",
    body: "We take reasonable measures to protect your personal information from unauthorized access, use or disclosure. However, no method of transmission over the internet or electronic storage is completely secure.",
  },
  {
    title: "6. Your Rights",
    body: "You have the right to access, update or delete your personal information, and to object to or restrict certain processing of your data. To exercise these rights, please contact us.",
  },
  {
    title: "7. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page.",
  },
  {
    title: "8. Contact Us",
    body: "If you have any questions about this Privacy Policy, please contact us at info@darbartech.com.",
  },
];

const page = () => {
  return (
    <>
      <Navbar />
      <main className="font-bold">
        <HeroSectionForPages title="Privacy Policy" />

        <section className="mx-auto max-w-4xl space-y-6 px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          {policies.map((item, index) => (
            <div className="space-y-2" key={index}>
              <h2 className="text-xl sm:text-2xl">{item.title}</h2>
              <p className="text-base font-semibold text-(--bg-muted)">
                {item.body}
              </p>
            </div>
          ))}
        </section>

        <EnquirySection />
      </main>
      <Footer />
    </>
  );
};

export default page;
