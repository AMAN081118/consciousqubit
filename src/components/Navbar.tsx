"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- SVG Icon Components ---

/**
 * Renders a hamburger menu icon.
 */
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

/**
 * Renders an 'X' (close) icon.
 */
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// --- Main Navbar Component ---

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    // Header container ensures the mobile menu is positioned correctly
    // relative to the sticky navbar.
    <header className="sticky top-0 z-50">
      <nav className="flex justify-between items-center px-6 py-4 bg-neutral-950 backdrop-blur-md">
        {/* Logo */}
        <Link
          href="/"
          className="justify-start text-purple-500 text-2xl md:text-3xl font-bold font-['Orbitron']"
          onClick={closeMobileMenu}
        >
          Conscious Qubit
        </Link>

        {/* Right Side: Links, Toggle, and Hamburger */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Desktop Links (Hidden on mobile) */}
          <div className="md:flex hidden justify-start items-center gap-10 text-white text-lg font-normal font-['Poppins']">
            <Link href="/about">About</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* Dark Mode Toggle (Visible on all sizes) */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="px-3 py-1 rounded-md border-2 border-white text-cyan-400 hover:text-black transition"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          )}

          {/* Hamburger Button (Visible on mobile only) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Animated Dropdown) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            // This div holds the animated links, positioned right below the nav
            className="md:hidden w-full bg-neutral-950 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8 text-white text-xl font-normal font-['Poppins']">
              <Link href="/about" onClick={closeMobileMenu}>
                About
              </Link>
              <Link href="/blogs" onClick={closeMobileMenu}>
                Blogs
              </Link>
              <Link href="/projects" onClick={closeMobileMenu}>
                Projects
              </Link>
              <Link href="/contact" onClick={closeMobileMenu}>
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
