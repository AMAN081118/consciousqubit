import ContributionsDisplay from "@/components/contributions/ContributionsDisplay";
import About from "@/pages/About";
import BlogSection from "@/pages/BlogSection";
import ContactSection from "@/pages/ContactSection";
import Experiance from "@/pages/Experience";
import Hero from "@/pages/Hero";
import Projects from "@/pages/Projects";
import Social from "@/pages/Social";
import Stack from "@/pages/Stack";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col gap-8">
      <Hero />
      <Social />
      <About />
      <ContributionsDisplay />
      <Stack />
      <BlogSection />
      <Experiance />
      <Projects />
      <ContactSection />
    </div>
  );
}
