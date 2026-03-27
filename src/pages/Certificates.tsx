"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

// Replace these with your actual certificates
const certificatesData = [
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford Online / Coursera",
    date: "15.05.2024",
    link: "#",
  },
  {
    title: "Mastering System Design: From Basics to Cracking Interviews",
    issuer: "Udemy",
    date: "09.07.2025",
    link: "#",
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="w-full pt-10 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-baseline gap-3 mb-6"
      >
        <h2 className="text-2xl font-bold font-['Orbitron'] text-gray-900 dark:text-white">
          Certs
        </h2>
        <span className="text-gray-400 font-medium font-['Poppins']">
          ({certificatesData.length})
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col gap-4"
      >
        {certificatesData.map((cert, index) => (
          <div
            key={index}
            className="flex items-start gap-3 group font-['Poppins']"
          >
            <div className="mt-1 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              <Award size={18} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 w-full">
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-gray-900 dark:text-gray-100 hover:underline decoration-gray-400 underline-offset-4 transition-all"
              >
                {cert.title}
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="hidden sm:inline">•</span>
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 rounded-md text-xs font-mono">
                  @{cert.issuer}
                </span>
                <span className="font-mono">{cert.date}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
