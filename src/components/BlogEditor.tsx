"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write your blog here...</p>",
  });

  async function handleSave() {
    if (!editor) return;

    const { data, error } = await supabase.from("blogs").insert([
      {
        title,
        slug,
        excerpt,
        tags: tags.split(",").map((t) => t.trim()),
        content: editor.getHTML(), // store as HTML
      },
    ]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Blog saved ");
      console.log(data);
      setTitle("");
      setSlug("");
      setExcerpt("");
      setTags("");
      editor.commands.setContent("<p>Write your blog here...</p>");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-cyan-400">New Blog Post</h1>

      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded bg-black border-gray-700"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Slug (e.g. quantum-teleportation)"
        className="w-full p-2 border rounded bg-black border-gray-700"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <textarea
        placeholder="Excerpt (short preview)"
        className="w-full p-2 border rounded bg-black border-gray-700"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full p-2 border rounded bg-black border-gray-700"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      {/* Tiptap Editor */}
      <div className="border border-gray-700 rounded p-3 bg-black text-white">
        <EditorContent editor={editor} />
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-cyan-500 text-black rounded hover:bg-cyan-400"
      >
        Save Blog
      </button>
    </div>
  );
}
