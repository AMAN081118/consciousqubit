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
    const form = e.currentTarget; //save reference early

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
      setMessage(`${data.error || "Something went wrong"}`);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-gray-900 p-8 rounded-2xl shadow-xl"
      >
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          Contact Me
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <textarea
            name="message"
            placeholder="Your message"
            required
            rows={4}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              status === "loading"
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-4 ${
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
