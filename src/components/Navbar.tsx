"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-neutral-950 backdrop-blur-md sticky top-0 z-50">
      {/* Logo */}
      <Link
        href="/"
        className="justify-start text-purple-500 text-3xl font-bold font-['Orbitron']"
      >
        Conscious Qubit
      </Link>

      {/* Links */}
      <div className="inline-flex justify-start items-center gap-14 text-white text-xl font-normal font-['Poppins']">
        <Link href="/about">About</Link>
        <Link href="/blogs">Blogs</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </div>

      {/* Dark Mode Toggle */}
      {mounted && (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-3 py-1 rounded-md border-2 border-white text-cyan-400 hover:text-black transition"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      )}
    </nav>
  );
};

export default Navbar;
