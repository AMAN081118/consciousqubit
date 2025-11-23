// ./src/app/admin/blog/edit/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import TiptapEditor from "@/components/TipTapEditor";

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

  useEffect(() => {
    async function fetchBlog() {
      if (!slug) return;
      const { data, error } = await supabase
        .from("blogs")
        .select("title, excerpt, tags, content")
        .eq("slug", slug)
        .single<Blog>();

      if (!error && data) {
        setTitle(data.title);
        setExcerpt(data.excerpt || "");
        setTags(data.tags?.join(", ") || "");
        setContent(data.content);
      }
      setLoading(false);
    }

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    if (content) {
      localStorage.setItem(`draft-${slug}`, content);
    }
  }, [content, slug]);

  useEffect(() => {
    const savedDraft = localStorage.getItem(`draft-${slug}`);
    if (savedDraft) setContent(savedDraft);
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
      router.push("/admin/blog");
    }
  }

  if (loading) return <p className="text-gray-400 p-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0d0d0d,_#050505)] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Animated Header */}
        <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-10">
          Edit Blog
        </h1>

        {/* Glass Container */}
        <div className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.08] shadow-2xl rounded-2xl p-8">
          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Title Input */}
            <div className="relative">
              <input
                type="text"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                className="peer w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-purple-500 focus:ring-purple-500 focus:outline-none transition"
                placeholder="Title"
              />
              <label className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-400 peer-valid:top-0 peer-valid:text-xs peer-valid:text-purple-300">
                Title
              </label>
            </div>

            {/* Excerpt */}
            <div className="relative">
              <textarea
                value={excerpt}
                rows={3}
                onChange={(e) => setExcerpt(e.target.value)}
                className="peer w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-purple-500 focus:ring-purple-500 focus:outline-none transition"
                placeholder="Excerpt"
              />
              <label className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-400 peer-valid:top-0 peer-valid:text-xs peer-valid:text-purple-300">
                Short Excerpt
              </label>
            </div>

            {/* Tags */}
            <div className="relative">
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="peer w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-purple-500 focus:ring-purple-500 focus:outline-none transition"
                placeholder="tag1, tag2"
              />
              <label className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-400 peer-valid:top-0 peer-valid:text-xs peer-valid:text-purple-300">
                Tags (comma separated)
              </label>
            </div>

            {/* Editor */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
              <TiptapEditor value={content} onChange={setContent} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 shadow-[0_0_15px_rgba(200,0,255,0.4)] hover:scale-[1.02] active:scale-[0.97] transition-all"
            >
              Update Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
