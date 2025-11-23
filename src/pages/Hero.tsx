"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingGrid from "@/components/hero/LoadingGrid";
import NeuralNetwork from "@/components/hero/NeuralNetwork";
import ResumeActions from "@/components/hero/ResumeActions";
import TypingText from "@/components/animations/TypingText";
import Image from "next/image";

const Hero = () => {
  const [showRealPhoto, setShowRealPhoto] = useState(false);

  const PROFILE_PHOTO_URL =
    "https://kduuxbyobjephuqskgxc.supabase.co/storage/v1/object/public/profile/profile.jpg";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRealPhoto(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
        <div className="flex-1 hidden md:flex items-center justify-center w-full md:w-1/2">
          <div className="flex flex-col w-full items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full flex items-center justify-center"
            >
              <NeuralNetwork />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-full mt-16 flex flex-col items-center"
            >
              <div className="w-full max-w-3xl bg-black backdrop-blur-xl p-4 shadow-xl flex flex-col font-['Poppins']">
                <h2 className="text-2xl font-semibold font-['Orbitron'] text-white tracking-wide mb-2">
                  Sources
                </h2>

                <div className="flex flex-wrap gap-2 justify-center mb-5 font-['Poppins']">
                  <span className="px-3 py-1 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-700/30 text-xs">
                    GitHub Contributions
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-green-600/20 text-green-300 border border-green-700/30 text-xs">
                    Public Repositories
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-700/30 text-xs">
                    Coding Profiles
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-pink-600/20 text-pink-300 border border-pink-700/30 text-xs">
                    Portfolio Metadata
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 items-center justify-center mt-2">
                  <a
                    href="https://github.com/AMAN081118"
                    target="_blank"
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition border border-white/10 text-white"
                  >
                    <Image
                      src="/icons/github.svg"
                      width={24}
                      height={24}
                      alt="GitHub"
                      className="opacity-80"
                    />
                    GitHub
                  </a>

                  <a
                    href="https://leetcode.com/aman081118"
                    target="_blank"
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition border border-white/10 text-white"
                  >
                    <Image
                      src="/icons/leetcode.svg"
                      width={24}
                      height={24}
                      alt="LeetCode"
                      className="opacity-80"
                    />
                    LeetCode
                  </a>

                  <a
                    href="https://codeforces.com/profile/aman081118"
                    target="_blank"
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition border border-white/10 text-white"
                  >
                    <Image
                      src="/icons/codeforces.svg"
                      width={24}
                      height={24}
                      alt="Codeforces"
                      className="opacity-80"
                    />
                    Codeforces
                  </a>

                  <a
                    href="mailto:aman081118@gmail.com"
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition border border-white/10 text-white"
                  >
                    <Image
                      src="/icons/mail.svg"
                      width={24}
                      height={24}
                      alt="Email"
                      className="opacity-80"
                    />
                    Email
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex-1 w-full md:w-1/2 flex flex-col items-start gap-4">
          <motion.div
            className="rounded-3xl overflow-hidden bg-neutral-100 flex items-center justify-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-60 lg:h-60">
              <AnimatePresence mode="wait">
                {!showRealPhoto ? (
                  <motion.div
                    key="loader"
                    className="absolute inset-0 w-full h-full"
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                  >
                    <LoadingGrid />
                  </motion.div>
                ) : (
                  <motion.div
                    key="photo"
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={PROFILE_PHOTO_URL}
                      alt="Aman Kumar"
                      fill
                      sizes="(max-width: 768px) 200px, 300px"
                      className="object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.55 }}
          >
            <TypingText
              text="AMAN KUMAR"
              speed={45}
              startDelay={1700}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-black tracking-tight text-white font-['Orbitron']"
            />
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7, duration: 0.55 }}
          >
            <TypingText
              text="Full Stack Developer"
              speed={36}
              startDelay={2700}
              className="text-sm sm:text-base md:text-lg text-white font-normal font-['Poppins']"
            />
          </motion.div>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-white max-w-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.6, duration: 0.8 }}
          >
            I design and build scalable systems that blend AI reasoning with
            practical automation. My focus is on clarity in UI, strong backend
            architecture, and solutions that work reliably in real environments
          </motion.p>

          <motion.div
            className="w-full flex flex-wrap gap-4 mt-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.4, duration: 0.5 }}
          >
            <ResumeActions />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
