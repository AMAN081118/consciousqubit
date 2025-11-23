"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    setStatus("loading");
    setMessage("");

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("success");
      setMessage("Message sent successfully!");
      form.reset();
    } else {
      setStatus("error");
      setMessage(data.error || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,_#101010,_#050505)] flex flex-col items-center justify-center px-4">
      {/* Section Header */}
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-semibold text-white mb-10 tracking-tight"
      >
        Contact Me
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] shadow-[0_0_40px_rgba(0,0,0,0.4)] rounded-2xl p-8 w-full max-w-lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              className="peer w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-purple-500 focus:ring-purple-500 focus:outline-none transition"
              placeholder="Your name"
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-400 peer-valid:top-0 peer-valid:text-xs peer-valid:text-purple-300">
              Your name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              className="peer w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-purple-500 focus:ring-purple-500 focus:outline-none transition"
              placeholder="Your email"
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-400 peer-valid:top-0 peer-valid:text-xs peer-valid:text-purple-300">
              Your email
            </label>
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              name="message"
              required
              rows={4}
              className="peer w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-purple-500 focus:ring-purple-500 focus:outline-none transition"
              placeholder="Your message"
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-400 peer-valid:top-0 peer-valid:text-xs peer-valid:text-purple-300">
              Your message
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full py-3 rounded-xl font-medium text-white text-lg transition-all
              bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500
              shadow-[0_0_15px_rgba(200,0,255,0.4)]
              ${
                status === "loading"
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:scale-[1.02] active:scale-[0.98]"
              }
            `}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Status Message */}
        {message && (
          <p
            className={`text-center mt-5 ${
              status === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </motion.div>
    </div>
  );
}
