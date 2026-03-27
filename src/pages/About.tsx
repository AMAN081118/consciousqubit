"use client";

import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="w-full pt-10 scroll-mt-24">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold font-['Orbitron'] mb-6"
      >
        About
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4 text-base font-['IBM_Plex_Mono'] leading-relaxed"
      >
        <p>
          I am an analytical engineer with a strong foundation in evaluating and
          interacting with Large Language Models (LLMs) for complex
          problem-solving, coding, and research tasks. Currently pursuing my
          Bachelor of Technology in Smart Manufacturing at the Indian Institute
          of Information Technology, Jabalpur, I blend a rigorous mathematical
          background with practical software engineering.
        </p>
        <p>
          My experience ranges from optimizing backend architectures—such as
          reducing API response latencies by 40% ensuring the factual accuracy
          and logical consistency of AI outputs. With over 500 algorithmic
          problems solved across platforms like LeetCode and Codeforces, I
          thrive on structured reasoning and identifying efficient solutions to
          intricate challenges.
        </p>
        <p>
          Beyond building and optimizing systems, I am deeply passionate about
          knowledge sharing. As an Web Development Mentor at my
          university&apos;s Programming Club, I actively guide students in
          modern development practices. My ultimate goal is to continue
          designing robust, scalable, and intelligent systems that bridge the
          gap between AI capabilities and reliable platform behavior.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
