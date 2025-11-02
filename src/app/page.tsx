import ContributionsDisplay from "@/components/contributions/ContributionsDisplay";
import BlogSection from "@/pages/BlogSection";
import ContactSection from "@/pages/ContactSection";
import Hero from "@/pages/Hero";
import Projects from "@/pages/Projects";

export default function Home() {
  return (
    // <main className="flex flex-col items-center justify-center px-6 py-12 space-y-16">
    //   {/* Hero Section */}
    //   <section className="text-center max-w-2xl">
    //     <h1 className="text-4xl md:text-6xl font-bold text-cyan-400">
    //       Hi, I’m Aman
    //     </h1>
    //     <p className="mt-4 text-lg text-gray-400">
    //       Engineering Student • Full-Stack Developer • Quantum Enthusiast
    //     </p>
    //   </section>

    //   {/* About Preview */}
    //   <section className="text-center max-w-xl">
    //     <h2 className="text-2xl font-semibold text-purple-400">About Me</h2>
    //     <p className="mt-2 text-gray-400">
    //       Passionate about AI, Quantum Computing, and building futuristic tech.
    //       Always learning, always exploring.
    //     </p>
    //   </section>

    //   {/* Projects Preview */}
    //   <section className="text-center max-w-xl">
    //     <h2 className="text-2xl font-semibold text-purple-400">Projects</h2>
    //     <p className="mt-2 text-gray-400">
    //       Some cool things I’ve built with code (coming soon).
    //     </p>
    //   </section>

    //   {/* Blog Preview */}
    //   <section className="text-center max-w-xl">
    //     <h2 className="text-2xl font-semibold text-purple-400">Blog</h2>
    //     <p className="mt-2 text-gray-400">
    //       Thoughts, experiments, and learning logs (will fetch from Supabase).
    //     </p>
    //   </section>

    //   {/* Contact Preview */}
    //   <section className="text-center max-w-xl">
    //     <h2 className="text-2xl font-semibold text-purple-400">Contact</h2>
    //     <p className="mt-2 text-gray-400">
    //       Let’s connect — reach me at{" "}
    //       <span className="text-cyan-400">aman@example.com</span>
    //     </p>
    //   </section>
    // </main>
    <div className="w-[100%] relative bg-neutral-950 overflow-hidden ">
      <div className="bg-grid-pattern-pure">
        <Hero />
      </div>
      <Projects />
      <BlogSection />
      <ContributionsDisplay />
      <ContactSection />
    </div>
  );
}
