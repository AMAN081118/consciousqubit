"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  CodeXml,
  MapPin,
  Phone,
  Globe,
  Mail,
  CornerDownRight,
  Eye,
  Crosshair,
  Clock,
} from "lucide-react";

const Hero = () => {
  const PROFILE_PHOTO_URL =
    "https://kduuxbyobjephuqskgxc.supabase.co/storage/v1/object/public/profile/profile.jpg";

  // --- Dynamic Counters State ---
  const [age, setAge] = useState<string>("...");
  const [time, setTime] = useState<string>("...");

  // Update Age dynamically (looks like a running timer)
  useEffect(() => {
    // Change this to your actual birth date and time!
    const BIRTH_DATE = new Date("2004-01-24T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const ageInYears = (now - BIRTH_DATE) / (1000 * 60 * 60 * 24 * 365.25);
      setAge(ageInYears.toFixed(9));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Update Local Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full pt-2 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // Adaptive container: White in Light Mode, Dark gray in Dark Mode
        className="w-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] rounded-xl overflow-hidden shadow-sm dark:shadow-2xl"
      >
        {/* --- Top Section: Profile --- */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 relative">
          {/* Light mode stripes */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] dark:hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #000, #000 1px, transparent 1px, transparent 10px)",
            }}
          ></div>
          {/* Dark mode stripes */}
          <div
            className="absolute inset-0 pointer-events-none hidden dark:block opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 10px)",
            }}
          ></div>

          {/* Avatar */}
          <div className="relative w-28 h-28 rounded-full overflow-hidden border border-gray-200 dark:border-zinc-700 shrink-0 z-10">
            <Image
              src={PROFILE_PHOTO_URL}
              alt="Aman Kumar"
              fill
              sizes="120px"
              className="object-cover"
              priority
            />
          </div>

          {/* Name & Titles */}
          <div className="flex flex-col z-10">
            {/* The developer easter-egg text floating above the name */}
            <span className="text-xs text-gray-400 dark:text-zinc-600 font-mono mb-1 hidden sm:block">
              text-3xl text-zinc-50 font-medium
            </span>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-50 flex items-center gap-2 font-['Poppins'] tracking-tight">
              Aman Kumar
              {/* Authentic Scalloped Verified Badge */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="blue"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-badge-check-icon lucide-badge-check"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </h1>

            <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1">
              Full Stack Developer | AI/ML
            </p>
            <p className="text-gray-400 dark:text-zinc-500 text-sm mt-3">
              been here for{" "}
              <span className="text-gray-900 dark:text-zinc-300 font-medium">
                {age}
              </span>{" "}
              years
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 dark:bg-zinc-800" />

        {/* --- Bottom Section: Grid Info --- */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm font-['IBM_Plex_Mono']">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 group">
              <div className="w-8 h-8 shrink-0 rounded-md bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700/50 flex items-center justify-center text-gray-500 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-zinc-200 transition-colors">
                <CodeXml size={16} />
              </div>
              <span className="text-gray-800 dark:text-zinc-200">
                AI Expert @Deccan AI (Freelance)
              </span>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-8 h-8 shrink-0 rounded-md bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700/50 flex items-center justify-center text-gray-500 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-zinc-200 transition-colors">
                <MapPin size={16} />
              </div>
              <span className="text-gray-800 dark:text-zinc-200">
                Jabalpur, Madhya Pradesh
              </span>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-8 h-8 shrink-0 rounded-md bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700/50 flex items-center justify-center text-gray-500 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-zinc-200 transition-colors">
                <Phone size={16} />
              </div>
              <span className="text-gray-800 dark:text-zinc-200">
                +91 8115067089
              </span>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-8 h-8 shrink-0 rounded-md bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700/50 flex items-center justify-center text-gray-500 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-zinc-200 transition-colors">
                <Globe size={16} />
              </div>
              <a
                href="https://github.com/AMAN081118"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-colors"
              >
                github.com/AMAN081118
              </a>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-8 h-8 shrink-0 rounded-md bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700/50 flex items-center justify-center text-gray-500 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-zinc-200 transition-colors">
                <Mail size={16} />
              </div>
              <a
                href="mailto:aman081118@gmail.com"
                className="text-gray-800 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-colors"
              >
                aman081118@gmail.com
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              {/* Keep this emerald matching the design */}
              <div className="w-8 h-8 shrink-0 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-500">
                <CornerDownRight size={16} />
              </div>
              <span className="text-gray-800 dark:text-zinc-200">
                Building local LLM services
              </span>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-8 h-8 shrink-0 rounded-md bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700/50 flex items-center justify-center text-gray-500 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-zinc-200 transition-colors">
                <Eye size={16} />
              </div>
              <span className="text-gray-500 dark:text-zinc-400">
                Viewed{" "}
                <span className="text-gray-800 dark:text-zinc-200">6,100</span>{" "}
                times
              </span>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-8 h-8 shrink-0 rounded-md bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700/50 flex items-center justify-center text-gray-500 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-zinc-200 transition-colors">
                <Crosshair size={16} />
              </div>
              <span className="text-gray-500 dark:text-zinc-400">
                Last visitor from{" "}
                <span className="text-gray-800 dark:text-zinc-200">
                  Beijing, China
                </span>
              </span>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-8 h-8 shrink-0 rounded-md bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700/50 flex items-center justify-center text-gray-500 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-zinc-200 transition-colors">
                <Clock size={16} />
              </div>
              <span className="text-gray-800 dark:text-zinc-200">
                {time}{" "}
                <span className="text-gray-400 dark:text-zinc-500">
                  // same time
                </span>
              </span>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-8 h-8 shrink-0 rounded-md bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700/50 flex items-center justify-center text-gray-500 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-zinc-200 transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="10" cy="14" r="5"></circle>
                  <line x1="13.5" y1="10.5" x2="21" y2="3"></line>
                  <line x1="16" y1="3" x2="21" y2="3"></line>
                  <line x1="21" y1="3" x2="21" y2="8"></line>
                </svg>
              </div>
              <span className="text-gray-800 dark:text-zinc-200">he/him</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
