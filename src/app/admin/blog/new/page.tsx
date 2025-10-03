"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import TiptapEditor from "@/components/TipTapEditor";

export default function NewBlogPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("blogs").insert([
      {
        title,
        slug,
        excerpt,
        content,
        tags: tags.split(",").map((t) => t.trim()),
      },
    ]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("✅ Blog saved successfully!");
      setTitle("");
      setSlug("");
      setExcerpt("");
      setTags("");
      setContent("");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-cyan-400">Create New Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded bg-black border-gray-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Slug (e.g. quantum-teleportation)"
          className="w-full p-2 border rounded bg-black border-gray-700"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />

        <textarea
          placeholder="Excerpt (short preview)"
          className="w-full p-2 border rounded bg-black border-gray-700"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full p-2 border rounded bg-black border-gray-700"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        {/* Rich text editor */}
        <TiptapEditor value={content} onChange={setContent} />

        <button
          type="submit"
          className="px-4 py-2 bg-cyan-500 text-black rounded hover:bg-cyan-400"
        >
          Save Blog
        </button>
      </form>
    </div>
  );
}
