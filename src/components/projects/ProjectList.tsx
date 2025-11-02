"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Project } from "@/Hooks/useProjects";

interface Props {
  projects: Project[];
  isMobile: boolean;
}

const ProjectList: React.FC<Props> = ({ projects, isMobile }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const desktopSlideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: easeOut },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: { duration: 0.5, ease: easeIn },
    }),
  };

  if (isMobile) {
    return (
      <div className="flex flex-col gap-12 items-center w-full px-4">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: easeOut },
              },
            }}
            initial="hidden"
            animate="visible"
            className="w-full flex justify-center"
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden w-[1036px] h-[555px]">
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            variants={desktopSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute top-0 left-0 w-full h-full"
          >
            <ProjectCard project={projects[currentIndex]} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <button
          onClick={handlePrev}
          className="absolute left-[-2rem] top-1/2 transform -translate-y-1/2 p-3 text-white bg-black/40 hover:bg-black/60 rounded-full z-20"
        >
          &#10094;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-[-2rem] top-1/2 transform -translate-y-1/2 p-3 text-white bg-black/40 hover:bg-black/60 rounded-full z-20"
        >
          &#10095;
        </button>
      </div>

      <div className="flex gap-4 mt-4">
        {projects.map((_, i) => (
          <motion.div
            key={i}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
              i === currentIndex
                ? "bg-gradient-to-r from-zinc-300 to-green-500"
                : "bg-zinc-400"
            }`}
            onClick={() => setCurrentIndex(i)}
            whileHover={{ scale: 1.2 }}
            animate={{ scale: i === currentIndex ? 1.4 : 1 }}
          />
        ))}
      </div>
    </>
  );
};

export default ProjectList;
