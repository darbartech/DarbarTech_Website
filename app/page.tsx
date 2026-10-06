import illustration from "@/public/home/illustrator2.png";
import Navbar from "./(client)/components/common/Navbar";
import Footer from "./(client)/components/common/Footer";
import HeroSection from "./(client)/components/Hero-Section";
import PartnersSection from "./(client)/components/Partners-section";
import FeaturedSolutions from "./(client)/components/FeaturedSolutions";
import KarlsonTemplateSection from "./(client)/components/KarlsonTemplateSection";
import Testimonials from "./(client)/components/Testimonials";
import FaqSection from "./(client)/components/FaqSection";
import LetsGetToWorkSection from "./(client)/components/LetsGetToWorkSection";
import LatestBlogsSection from "./(client)/components/LatestBlogsSection";
import { testimonials, faqItems } from "@/lib/client/data";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="-mt-24 space-y-5 ">
        <HeroSection />
        <PartnersSection />
        <FeaturedSolutions />
        <KarlsonTemplateSection />
        <Testimonials illustration={illustration}/>
        <FaqSection illustration={illustration}/>
        <LetsGetToWorkSection />
        <LatestBlogsSection/>
      </main>
      <Footer />
    </>
  );
}
