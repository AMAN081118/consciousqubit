"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="w-full">
      {/* Constrained width to match the rest of the page */}
      <nav className="max-w-3xl mx-auto flex justify-between items-center px-6 py-8">
        {/* Logo - Kept Orbitron as requested in your layout, but made it slightly smaller to fit the minimal vibe */}
        <Link
          href="/"
          className="text-xl font-bold font-['Orbitron'] tracking-wide"
          onClick={closeMobileMenu}
        >
          CQ. {/* Shortened for a minimal look, or use "Conscious Qubit" */}
        </Link>

        {/* Right Side: Links & Toggles */}
        <div className="flex items-center gap-6">
          {/* Desktop Links - Smaller font, grayed out slightly until hover */}
          <div className="md:flex hidden justify-start items-center gap-6 text-sm font-medium text-gray-500 font-['IBM_Plex_Mono']">
            <Link
              href="#about"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="#stack"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Stack
            </Link>
            <Link
              href="#experience"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Experience
            </Link>
            <Link
              href="#projects"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Projects
            </Link>
          </div>

          {/* Dark Mode Toggle - Minimalist text-based toggle */}
          {/* Dark Mode Toggle - Icon-based toggle */}
          {mounted && (
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white transition-all"
              aria-label="Toggle dark mode"
            >
              {resolvedTheme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>
          )}

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden w-full bg-background border-b border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="flex flex-col items-center gap-4 py-6 text-sm font-medium text-gray-600 dark:text-gray-400 font-['Poppins']">
              <Link href="#about" onClick={closeMobileMenu}>
                About
              </Link>
              <Link href="#stack" onClick={closeMobileMenu}>
                Stack
              </Link>
              <Link href="#experience" onClick={closeMobileMenu}>
                Experience
              </Link>
              <Link href="#projects" onClick={closeMobileMenu}>
                Projects
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
