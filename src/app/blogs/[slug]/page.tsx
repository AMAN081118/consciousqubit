import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Await params
  const { slug } = await params;

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blog || error) return notFound();

  return (
    <article className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-cyan-400">{blog.title}</h1>
      <p className="text-gray-400 mt-2">
        {new Date(blog.created_at).toISOString().split("T")[0]}
      </p>

      {blog.cover_image && (
        <img
          src={blog.cover_image}
          alt={blog.title}
          className="my-6 rounded-lg border border-gray-700"
        />
      )}

      {/* Render stored HTML */}
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}
