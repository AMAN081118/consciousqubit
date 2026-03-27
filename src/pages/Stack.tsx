"use client";

import { motion } from "framer-motion";

const stackCategories = [
  {
    title: "Languages",
    skills: ["C++", "Python", "SQL", "JavaScript", "TypeScript"],
  },
  {
    title: "Frameworks",
    skills: ["React", "Next.js", "Node.js", "Express.js"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Supabase", "Redis"],
  },
  {
    title: "Tools",
    skills: ["Git", "Docker", "GitHub", "Postman", "VS Code"],
  },
];

const Stack = () => {
  return (
    <section id="stack" className="w-full pt-10 scroll-mt-24">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold font-['Orbitron'] text-gray-900 dark:text-white mb-6"
      >
        Stack
      </motion.h2>

      <div className="flex flex-col gap-6">
        {stackCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 font-['Poppins']"
          >
            {/* Category Label */}
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 w-28 shrink-0">
              {category.title}
            </h3>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 font-['IBM_Plex_Mono'] text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stack;
