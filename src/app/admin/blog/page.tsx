import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default async function BlogDashboard() {
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, slug, title, created_at")
    .order("created_at", { ascending: false });

  if (error) return <div>Error loading blogs</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-cyan-400">Manage Blogs</h1>
      <Link href="/admin/blog/new" className="text-cyan-400 underline">
        Add New Blog
      </Link>
      <ul className="space-y-2">
        {blogs?.map((blog) => (
          <li
            key={blog.id}
            className="flex justify-between border-b border-gray-700 pb-2"
          >
            <span>{blog.title}</span>
            <div className="space-x-3">
              <Link
                href={`/admin/blog/edit/${blog.slug}`}
                className="text-blue-400"
              >
                Edit
              </Link>
              <Link href={`/blogs/${blog.slug}`} className="text-green-400">
                View
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
