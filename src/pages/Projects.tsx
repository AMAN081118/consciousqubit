"use client";

import React, { useRef } from "react";
import { motion, useInView, easeOut } from "framer-motion";
import { useProjects } from "@/Hooks/useProjects";
import ProjectList from "@/components/projects/ProjectList";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  return matches;
};

const Projects: React.FC = () => {
  const { projects, loading } = useProjects();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const isMobile = useMediaQuery("(max-width: 767px)");

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut, staggerChildren: 0.2 },
    },
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Loading projects...
      </div>
    );

  if (projects.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        No projects found.
      </div>
    );

  return (
    <motion.section
      ref={ref}
      className="flex flex-col gap-12 justify-center items-center py-20 min-h-screen w-full"
      variants={containerVariants}
      initial="hidden"
      animate={isInView || projects.length > 0 ? "visible" : "hidden"}
    >
      <h1 className="text-5xl font-normal font-['Orbitron'] text-white text-center">
        Projects
      </h1>

      <ProjectList projects={projects} isMobile={isMobile} />
    </motion.section>
  );
};

export default Projects;
