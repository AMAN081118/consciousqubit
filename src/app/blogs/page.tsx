import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default async function BlogPage() {
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, slug, title, excerpt, cover_image, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <div className="p-10 text-red-500">Error loading blogs</div>;
  }
  // const blogs = [
  //   {
  //     id: 1,
  //     excerpt: "aman",
  //     title: "aman",
  //     slug: "kumar",
  //   },
  //];
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400">Blog</h1>
      <div className="space-y-6">
        {blogs?.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="block border border-gray-700 rounded-lg p-4 hover:border-cyan-400 transition"
          >
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-400">{blog.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
