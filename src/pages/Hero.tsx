"use client";
import { motion } from "framer-motion";
import LoadingGrid from "@/components/hero/LoadingGrid";
import NeuralNetwork from "@/components/hero/NeuralNetwork";
import ResumeActions from "@/components/hero/ResumeActions";
import TypingText from "@/components/animations/TypingText";

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-12 ">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        {/* Left: Neural network (stays on top on mobile) */}
        <div className="flex-1 hidden md:flex items-center justify-center w-full md:w-1/2  md:visible">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full flex items-center justify-center"
          >
            <NeuralNetwork />
          </motion.div>
        </div>

        {/* Right: Info section */}
        <div className="flex-1 w-full md:w-1/2 flex flex-col items-start gap-4">
          {/* Photo / Loading grid */}
          <motion.div
            className="rounded-3xl overflow-hidden bg-neutral-100 flex items-center justify-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
            // responsive sizes
          >
            <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-60 lg:h-60">
              <LoadingGrid />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.55 }}
          >
            <TypingText
              text="AMAN KUMAR"
              speed={45}
              startDelay={1700} // ms, matches the motion delay
              className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-black tracking-tight text-white font-['Orbitron']"
            />
          </motion.div>

          {/* Role */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7, duration: 0.55 }}
          >
            <TypingText
              text="Full Stack Developer · AI/ML · Industry 4.0"
              speed={36}
              startDelay={2700}
              className="text-sm sm:text-base md:text-lg text-white font-normal font-['Poppins']"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-white max-w-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.6, duration: 0.8 }}
          >
            I build intelligent, scalable web systems that merge AI reasoning
            with real-world automation — turning concepts into human-like
            experiences. I focus on clean interfaces, reliable infra, and
            production-ready AI integrations.
          </motion.p>

          {/* Action icons */}
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
