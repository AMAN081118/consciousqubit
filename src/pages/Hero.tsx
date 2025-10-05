"use client";
import { motion } from "framer-motion";
import LoadingGrid from "@/components/hero/LoadingGrid";
import NeuralNetwork from "@/components/hero/NeuralNetwork";
import ResumeActions from "@/components/hero/ResumeActions";
import TypingText from "@/components/animations/TypingText";

const Hero = () => {
  return (
    <div className="flex w-full justify-center items-center mt-16">
      {/* Left: Neural network */}
      <div className="flex w-1/2 justify-center items-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <NeuralNetwork />
        </motion.div>
      </div>

      {/* Right: Info section */}
      <div className="w-1/2 px-2 flex flex-col gap-4">
        {/* Step 1: Loading Grid (photo placeholder) */}
        <motion.div
          className="w-56 h-56 bg-stone-50 rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        >
          <LoadingGrid />
        </motion.div>

        {/* Step 2: Name */}
        <motion.div
          className="justify-start text-white text-5xl font-black font-['Orbitron'] leading-10 tracking-[7.20px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          <TypingText text="AMAN KUMAR" speed={50} startDelay={2200} />
        </motion.div>

        {/* Step 3: Role */}
        <motion.div
          className="justify-start text-white text-xl font-normal font-['Poppins'] leading-7"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.6 }}
        >
          <TypingText
            text="Full Stack Developer · AI/ML · Industry 4.0"
            speed={40}
            startDelay={3500}
          />
        </motion.div>

        {/* Step 4: Description */}
        <motion.p
          className="text-wrap w-[32rem] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
        >
          I build intelligent, scalable web systems that merge AI reasoning with
          real-world automation — turning concepts into human-like experiences.
        </motion.p>

        {/* Step 5: Action Icons */}
        <motion.div
          className="rounded-xl cursor-pointer flex gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 6, duration: 0.8 }}
        >
          <ResumeActions />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
