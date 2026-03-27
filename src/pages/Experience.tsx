"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeXml, ChevronDown, ChevronUp } from "lucide-react";

import Rakumura from "../../public/icons/rakumura.jpg";
import deccan from "../../public/icons/deccan.jpg";
import iiitdmj from "../../public/icons/iitdmj.png";
import tpclogo from "../../public/icons/tpclogo.png";
import Image from "next/image";

// --- Data Sections ---

const experienceData = [
  {
    company: "Rakumura IT Solutions",
    logo: Rakumura,
    isCurrent: false,
    roles: [
      {
        id: "raku-intern",
        title: "Software Development Intern",
        type: "Internship",
        date: "07.2025 - 10.2025",
        bullets: [
          "Analyzed complex system behaviors and optimized backend architecture, reducing API response latency by 40%.",
          "Evaluated multiple implementation approaches and refactored system architecture for maintainability and performance improvements.",
          "Produced clear technical documentation and reasoning for design decisions across database modeling, API layers, and system workflows.",
          "Built internal tooling and structured data flows to simplify entity relationships and improve reliability of platform behavior.",
        ],
      },
    ],
  },
];

const freelanceData = [
  {
    company: "Deccan AI",
    logo: deccan,
    isCurrent: true,
    roles: [
      {
        id: "deccan-ai-expert",
        title: "AI Expert",
        type: "Freelance",
        date: "01.2026 - present",
        bullets: [
          "Evaluated and annotated AI model responses for correctness, reasoning quality, and relevance to user queries, identifying factual inaccuracies and logical inconsistencies.",
          "Compared multiple LLM-generated outputs using structured evaluation guidelines, providing detailed feedback to improve response clarity, completeness, and alignment with expected conversational behavior.",
        ],
      },
    ],
  },
];

const volunteerData = [
  {
    company: "Programming Club, IIITDM Jabalpur",
    isCurrent: true,
    logo: tpclogo,
    roles: [
      {
        id: "ml-mentor-iiit",
        title: "Web-Dev Mentor",
        type: "Volunteer",
        date: "05.2024 - present",
        bullets: [
          "Mentored students in Web Development and modern development practices.",
        ],
      },
    ],
  },
];

const educationData = [
  {
    company: "Indian Institute of Information Technology, Jabalpur",
    isCurrent: true,
    logo: iiitdmj,
    roles: [
      {
        id: "btech-smart-mfg",
        title: "Bachelor of Technology in Smart Manufacturing",
        type: "Degree",
        date: "08.2023 - present",
        bullets: [
          "CPI: 7.9",
          "Relevant Coursework: Artificial Intelligence, Machine Learning, Data Structures and Algorithms, Image Processing, Digital Twin Systems, IoT, Cyber Physical Systems.",
          "Currently designing and building the official website for the Smart Manufacturing department.",
        ],
      },
    ],
  },
];

// --- Main Component ---

const Experiance = () => {
  // Single state to manage all dropdowns across all sections
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>(
    {},
  );

  const toggleRole = (id: string) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderSection = (title: string, data: any[]) => {
    if (!data || data.length === 0) return null;

    return (
      <div className="mb-14 last:mb-0">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold font-['Orbitron'] text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-800 pb-2"
        >
          {title}
        </motion.h2>

        <div className="flex flex-col">
          {data.map((companyData, companyIndex) => (
            <motion.div
              key={companyData.company}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: companyIndex * 0.1 }}
              className="mb-10 last:mb-0"
            >
              {/* Company Header */}
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src={companyData.logo}
                  alt={companyData.company}
                  width={40}
                  height={40}
                  className="object-cover rounded-full shrink-0"
                />

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-['Poppins'] flex items-center gap-2">
                  {companyData.company}
                  {companyData.isCurrent && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-1"></span>
                  )}
                </h3>
              </div>

              {/* Roles Timeline */}
              <div className="ml-5 border-l border-gray-200 dark:border-gray-800 flex flex-col gap-6">
                {companyData.roles.map((role: any) => {
                  const isExpanded = expandedRoles[role.id];

                  return (
                    <div key={role.id} className="relative pl-8">
                      {/* Timeline Node Icon */}
                      <div className="absolute -left-[18px] top-0.5 flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">
                        <CodeXml size={18} />
                      </div>

                      {/* Role Header (Clickable Toggle) */}
                      <div
                        className="flex flex-col cursor-pointer group select-none"
                        onClick={() => toggleRole(role.id)}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 font-['Poppins'] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {role.title}
                          </h4>
                          <div className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors">
                            {isExpanded ? (
                              <ChevronUp size={20} />
                            ) : (
                              <ChevronDown size={20} />
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1 font-['Poppins']">
                          <span>{role.type}</span>
                          <span>|</span>
                          <span>{role.date}</span>
                        </div>
                      </div>

                      {/* Expandable Bullet Points */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <ul className="mt-4 flex flex-col gap-3">
                              {role.bullets.map((bullet: string, i: number) => (
                                <li
                                  key={i}
                                  className="relative pl-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300 font-['IBM_Plex_Mono']"
                                >
                                  <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="experience" className="w-full pt-10 scroll-mt-24">
      {renderSection("Experience", experienceData)}
      {renderSection("Freelance", freelanceData)}
      {renderSection("Volunteer Work", volunteerData)}
      {renderSection("Education", educationData)}
    </section>
  );
};

export default Experiance;
