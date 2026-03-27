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
    <section id="contact" className="w-full pt-10 pb-24 scroll-mt-24">
      {/* Section Header */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold font-['Orbitron'] text-gray-900 dark:text-white mb-4"
      >
        Contact
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-base text-gray-700 dark:text-gray-300 font-['IBM_Plex_Mono'] mb-8"
      >
        Feel free to reach out for collaborations, opportunities, or just to say
        hello.
      </motion.p>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-lg font-['Poppins']"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            className="w-full px-4 py-3 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:border-gray-400 dark:focus:border-gray-500 focus:outline-none transition-colors"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="w-full px-4 py-3 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:border-gray-400 dark:focus:border-gray-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Message */}
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Message"
          className="w-full px-4 py-3 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:border-gray-400 dark:focus:border-gray-500 focus:outline-none transition-colors resize-y"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-max px-6 py-2.5 mt-2 rounded-lg font-medium text-sm transition-all
            bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900
            ${
              status === "loading"
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-gray-800 dark:hover:bg-white active:scale-95"
            }
          `}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </motion.form>

      {/* Status Message */}
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-4 text-sm font-['IBM_Plex_Mono'] ${
            status === "success"
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {message}
        </motion.p>
      )}
    </section>
  );
}
