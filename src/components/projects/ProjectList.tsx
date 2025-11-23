"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Project } from "@/Hooks/useProjects";

interface Props {
  projects: Project[];
  isMobile: boolean;
}

const ProjectList: React.FC<Props> = ({ projects, isMobile }) => {
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
    <div className="flex flex-col gap-16 items-center w-full">
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
          className="relative overflow-hidden w-[1036px] h-[555px] flex justify-center"
        >
          <ProjectCard project={p} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectList;
