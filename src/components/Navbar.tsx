"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-cyan-400">
        Conscious Qubit
      </Link>

      {/* Links */}
      <div className="flex gap-6 text-gray-300">
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/blogs">Blogs</Link>
        <Link href="/contact">Contact</Link>
      </div>

      {/* Dark Mode Toggle */}
      {mounted && (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-3 py-1 rounded-lg border border-cyan-400 text-cyan-400 hover:text-black transition"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      )}
    </nav>
  );
};

export default Navbar;
