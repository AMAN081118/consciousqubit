"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

interface Project {
  id: string;
  title: string;
  description: string | null;
  github_url: string | null;
  live_url: string | null;
  image: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .returns<Project[]>()
        .order("created_at", { ascending: false });

      if (!error && data) setProjects(data);
      setLoading(false);
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Loading projects...
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        No projects found.
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-16 justify-center items-center py-20 min-h-screen w-full">
      <h1 className="text-5xl font-normal font-['Orbitron'] text-white text-center">
        Projects
      </h1>

      <div className="flex flex-wrap justify-center gap-8 w-full px-4 max-w-6xl">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-80 rounded-3xl bg-white/[0.05] border border-white/10 shadow-xl 
                      backdrop-blur-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 
                      transition-all duration-300"
          >
            <div className="relative w-full h-48">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            <div className="p-5 flex flex-col gap-2">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>

              <p className="text-gray-400 text-sm line-clamp-2">
                {project.description || "No description provided."}
              </p>

              <Link
                href={`/projects/${project.id}`}
                className="mt-4 w-full text-center px-4 py-2 rounded-xl 
                           bg-purple-600/80 hover:bg-purple-700 transition text-white font-semibold"
              >
                Explore More →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
