// ./src/app/admin/blog/edit/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import TiptapEditor from "@/components/TipTapEditor";

// Define a type for your blog post object for type safety.
interface Blog {
  title: string;
  excerpt: string | null;
  tags: string[] | null;
  content: string;
}

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  // Load blog from Supabase
  useEffect(() => {
    async function fetchBlog() {
      if (!slug) return;
      const { data, error } = await supabase
        .from("blogs")
        .select("title, excerpt, tags, content")
        .eq("slug", slug)
        .single<Blog>();

      if (error) {
        console.error("Failed to fetch blog:", error);
      } else if (data) {
        setTitle(data.title);
        setExcerpt(data.excerpt || "");
        setTags(data.tags?.join(", ") || "");
        setContent(data.content);
      }
      setLoading(false);
    }
    fetchBlog();
  }, [slug]);

  // Auto-save draft to localStorage
  useEffect(() => {
    if (content) {
      localStorage.setItem(`draft-${slug}`, content);
    }
  }, [content, slug]);

  // Restore draft if available
  useEffect(() => {
    const savedDraft = localStorage.getItem(`draft-${slug}`);
    if (savedDraft) {
      setContent(savedDraft);
    }
  }, [slug]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from("blogs")
      .update({
        title,
        excerpt,
        tags: tags.split(",").map((t) => t.trim()),
        content,
      })
      .eq("slug", slug);

    if (error) {
      alert("❌ Update failed: " + error.message);
    } else {
      alert("✅ Blog updated!");
      localStorage.removeItem(`draft-${slug}`);
      router.push("/admin/blog"); // back to dashboard
    }
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-cyan-400">Edit Blog</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded bg-black border-gray-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Excerpt"
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

        <TiptapEditor value={content} onChange={setContent} />

        <button
          type="submit"
          className="px-4 py-2 bg-cyan-500 text-black rounded hover:bg-cyan-400"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
