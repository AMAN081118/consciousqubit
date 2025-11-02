"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/Hooks/useProjects";

interface Props {
  project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <motion.div
      whileHover={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row w-full max-w-[80rem] h-auto md:h-[35rem] shadow-2xl rounded-2xl overflow-hidden bg-white"
    >
      {/* Image Section */}
      <div className="relative w-full md:w-1/2 h-[16rem] md:h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <div className="relative w-full h-auto min-h-full">
          <Image
            src={
              project.image ||
              `https://placehold.co/600x400/27272a/white?text=${project.title}`
            }
            alt={project.title}
            width={800}
            height={1200}
            className="object-top object-contain w-full h-auto p-2 rounded-xl"
            priority
          />
        </div>
      </div>

      {/* Details Section */}
      <div className="w-full md:w-1/2 p-[2rem] md:p-[2.5rem] flex flex-col justify-center">
        <h3 className="text-[2rem] md:text-[2.4rem] font-['Orbitron'] text-gray-800 mb-[1rem]">
          {project.title}
        </h3>
        <p className="text-gray-600 text-[1rem] md:text-[1.1rem] mb-[1rem] leading-relaxed line-clamp-4">
          {project.description}
        </p>

        {project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-[0.8rem] mb-[1.5rem]">
            {project.tech_stack.map((img, i) => (
              <div
                key={i}
                className="relative w-[2.2rem] h-[2.2rem] md:w-[2.5rem] md:h-[2.5rem] bg-gray-200 rounded-full overflow-hidden flex items-center justify-center"
              >
                <Image
                  src={img}
                  alt={`tech-${i}`}
                  fill
                  className="object-contain p-[0.3rem]"
                  sizes="(max-width: 768px) 2.2rem, 2.5rem"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-[1rem] mt-[0.5rem]">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-[1.5rem] py-[0.6rem] bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              GitHub
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-[1.5rem] py-[0.6rem] bg-red-500 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
