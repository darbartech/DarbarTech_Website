import React from "react";
import HeroSectionForPages from "../components/HeroSectionForPages";
import EnquirySection from "../components/EnquirySection";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const terms = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using the DarbarTech platform, you agree to be bound by these Terms & Conditions and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.",
  },
  {
    title: "2. Use of the Platform",
    body: "You agree to use the DarbarTech platform only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
  },
  {
    title: "3. Accounts and Registration",
    body: "To access certain features, you may be required to create an account. You must provide accurate, current and complete information during the registration process and keep your information updated.",
  },
  {
    title: "4. Intellectual Property",
    body: "All content, design, graphics, logos and materials available on the DarbarTech platform are the property of DarbarTech and are protected by applicable intellectual property laws. You may not reproduce, distribute or create derivative works without prior written consent.",
  },
  {
    title: "5. Prohibited Activities",
    body: "You agree not to engage in any activity that interferes with or disrupts the platform, violates the rights of others, or is otherwise unlawful, harmful or inappropriate.",
  },
  {
    title: "6. Limitation of Liability",
    body: "DarbarTech shall not be liable for any indirect, incidental, special or consequential damages arising out of or in connection with the use of the platform, to the fullest extent permitted by law.",
  },
  {
    title: "7. Changes to These Terms",
    body: "We reserve the right to modify or replace these Terms & Conditions at any time. Any changes will be effective immediately upon posting. Your continued use of the platform after changes constitutes acceptance of the revised terms.",
  },
  {
    title: "8. Contact Us",
    body: "If you have any questions about these Terms & Conditions, please contact us at info@darbartech.com.",
  },
];

const page = () => {
  return (
    <>
      <Navbar />
      <main className="font-bold">
        <HeroSectionForPages title="Terms & Conditions" />

        <section className="mx-auto max-w-4xl space-y-6 px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          {terms.map((item, index) => (
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
