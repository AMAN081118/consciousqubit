// components/Projects.tsx
"use client"; // Important for Next.js App Router as Framer Motion requires client components

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// --- Configuration ---
const PROJECTS = [
  {
    id: 1,
    title: "Project Alpha",
    color: "bg-red-600",
    description: "Details for Project Alpha.",
  },
  {
    id: 2,
    title: "Project Beta",
    color: "bg-blue-600",
    description: "Details for Project Beta.",
  },
  {
    id: 3,
    title: "Project Gamma",
    color: "bg-green-600",
    description: "Details for Project Gamma.",
  },
];

// --- Custom Components ---

// 1. Project Slide Content (To show two halves)
interface ProjectSlideProps {
  project: (typeof PROJECTS)[number];
}

const ProjectSlide: React.FC<ProjectSlideProps> = ({ project }) => (
  <div className="flex w-[1036px] h-[555px] shadow-2xl rounded-3xl overflow-hidden">
    {/* Left Side: Image/Visual (using color for placeholder) */}
    <div
      className={`w-1/2 h-full ${project.color} rounded-tl-3xl rounded-bl-3xl flex items-center justify-center`}
    >
      <span className="text-white text-4xl font-bold">{project.title}</span>
    </div>

    {/* Right Side: Details */}
    <div className="w-1/2 h-full bg-zinc-100 rounded-tr-3xl rounded-br-3xl p-10 flex flex-col justify-center">
      <h3 className="text-4xl font-['Orbitron'] text-gray-800 mb-4">
        {project.title}
      </h3>
      <p className="text-gray-600 text-lg">{project.description}</p>
      <button className="mt-8 self-start px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition">
        View Case Study
      </button>
    </div>
  </div>
);

// 2. Main Projects Component
const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  // useInView hook for "pop up on scroll down" effect
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  // Carousel container animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Slide animation variants for AnimatePresence (efficient, only one slide rendered)
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    }),
  };

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-8 justify-center items-center py-20 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"} // Pop up on scroll
    >
      {/* Title */}
      <div className="text-white text-center w-svw">
        <h1 className="text-5xl font-normal font-['Orbitron'] leading-loose">
          Projects
        </h1>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden w-[1036px] h-[555px]">
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex} // Passes the custom prop to variants
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute top-0 left-0 w-full h-full"
          >
            <ProjectSlide project={PROJECTS[currentIndex]} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons (Optional, for full control) */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4 text-white bg-black/50 hover:bg-black/75 rounded-full px-4 py-2 z-20 transition"
          aria-label="Previous Slide"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4 text-white bg-black/50 hover:bg-black/75 rounded-full px-4 py-2 z-20 transition"
          aria-label="Next Slide"
        >
          &gt;
        </button>
      </div>

      {/* Slide Indicators (Bubbles) */}
      <div className="flex gap-4 mt-4">
        {PROJECTS.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
              index === currentIndex
                ? "bg-gradient-to-r from-zinc-300 to-green-500 rounded-full" // Highlighted indicator
                : "bg-zinc-300" // Normal indicator
            }`}
            onClick={() => setCurrentIndex(index)}
            // Efficient hover animation for subtle effect
            whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
            // Simple animation for the active state change
            animate={{ scale: index === currentIndex ? 1.4 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
