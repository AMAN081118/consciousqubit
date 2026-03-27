"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "@/Hooks/useProjects";
import { Box, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";

const Projects: React.FC = () => {
  const { projects, loading } = useProjects();
  const [expandedProjects, setExpandedProjects] = useState<
    Record<string, boolean>
  >({});

  const toggleProject = (id: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "2024 - Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section
        id="projects"
        className="w-full pt-10 scroll-mt-24 text-gray-500 font-['Poppins']"
      >
        Loading projects...
      </section>
    );
  }

  return (
    <section id="projects" className="w-full pt-10 scroll-mt-24">
      {/* Header with Project Count */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-baseline gap-3 mb-6"
      >
        <h2 className="text-2xl font-bold font-['Orbitron'] text-gray-900 dark:text-white">
          Projects
        </h2>
        {projects.length > 0 && (
          <span className="text-gray-400 font-medium font-['Poppins']">
            ({projects.length})
          </span>
        )}
      </motion.div>

      {projects.length === 0 ? (
        <div className="text-gray-500 font-['Poppins']">No projects found.</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col border-t border-gray-200 dark:border-gray-800"
        >
          {projects.map((project: any, index: number) => {
            const projectId = project.id || String(index);
            const isExpanded = expandedProjects[projectId];

            return (
              <div
                key={projectId}
                className="border-b border-gray-200 dark:border-gray-800"
              >
                {/* Clickable Header Row */}
                <div
                  className="flex items-center justify-between py-5 cursor-pointer group"
                  onClick={() => toggleProject(projectId)}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="mt-0.5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                      <Box size={22} />
                    </div>

                    {/* Title & Date */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        {project.live_url ? (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 font-['Poppins']"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {project.title}
                            <ArrowUpRight
                              size={16}
                              className="text-gray-400 group-hover:text-blue-500 transition-colors"
                            />
                          </a>
                        ) : (
                          <span className="text-base font-semibold text-gray-900 dark:text-gray-100 font-['Poppins']">
                            {project.title}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 font-['Poppins']">
                        {formatDate(project.created_at)}
                      </span>
                    </div>
                  </div>

                  {/* Expand/Collapse Chevron */}
                  <div className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {isExpanded ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                </div>

                {/* Expandable Description & Tech Stack */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pl-[52px] pr-4 pb-6">
                        {/* Description */}
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-['IBM_Plex_Mono'] leading-relaxed mb-5">
                          {project.description}
                        </p>

                        {/* Tech Stack Images */}
                        {project.tech_stack &&
                          project.tech_stack.length > 0 && (
                            <div className="flex flex-wrap items-center gap-3">
                              {project.tech_stack.map(
                                (tech: string, i: number) => {
                                  // Check if the string is a URL
                                  const isImage =
                                    tech.startsWith("http") ||
                                    tech.startsWith("/");

                                  return isImage ? (
                                    <div
                                      key={i}
                                      className="relative w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden"
                                    >
                                      <Image
                                        src={tech}
                                        alt={`tech-${i}`}
                                        fill
                                        className="object-contain p-1.5"
                                        sizes="32px"
                                      />
                                    </div>
                                  ) : (
                                    <span
                                      key={i}
                                      className="px-3 py-1 bg-gray-100 dark:bg-neutral-800/80 border border-gray-200 dark:border-neutral-700/50 rounded-full text-xs text-gray-600 dark:text-gray-300 font-mono"
                                    >
                                      {tech}
                                    </span>
                                  );
                                },
                              )}
                            </div>
                          )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
