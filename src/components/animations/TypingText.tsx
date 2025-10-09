"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number; // ms per char
  startDelay?: number; // ms before typing starts
}

export default function TypingText({
  text,
  className = "",
  speed = 30,
  startDelay = 0,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // reset visible text whenever `text` changes
    setDisplayedText("");

    let intervalId: ReturnType<typeof setInterval> | null = null;
    const startTimeout = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        setDisplayedText(() => text.slice(0, i + 1));
        i++;
        if (i >= text.length && intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return (
    <motion.p
      // role/aria-live helps screen readers notice updates
      role="status"
      aria-live="polite"
      className={`whitespace-pre-wrap break-words ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28 }}
    >
      {displayedText}
      <motion.span
        aria-hidden="true"
        className="inline-block ml-2 align-middle"
        style={{ width: 6, height: 18, borderRadius: 2 }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
      />
    </motion.p>
  );
}
