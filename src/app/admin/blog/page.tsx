import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default async function BlogDashboard() {
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, slug, title, created_at")
    .order("created_at", { ascending: false });

  if (error) return <div className="text-red-500">Error loading blogs</div>;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0d0d0d,_#050505)] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-semibold text-white tracking-tight">
            Manage Blogs
          </h1>

          <Link
            href="/admin/blog/new"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 
            text-white font-medium shadow-lg hover:opacity-90 transition"
          >
            + New Blog
          </Link>
        </div>

        {/* Blog List Container */}
        <div className="backdrop-blur-xl rounded-2xl bg-white/[0.05] border border-white/[0.08] p-6 shadow-2xl">
          {blogs?.length === 0 && (
            <p className="text-gray-400 text-center py-10">
              No blogs added yet.
            </p>
          )}

          <ul className="space-y-4">
            {blogs?.map((blog) => (
              <li
                key={blog.id}
                className="flex items-center justify-between bg-white/[0.03] 
                hover:bg-white/[0.06] border border-white/[0.08] rounded-xl 
                px-5 py-4 transition-all duration-200"
              >
                <div>
                  <h3 className="text-white font-medium text-lg">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/admin/blog/edit/${blog.slug}`}
                    className="px-3 py-1 rounded-lg text-sm font-medium 
                    bg-blue-600/20 text-blue-400 border border-blue-600/20 
                    hover:bg-blue-600/30 transition"
                  >
                    Edit
                  </Link>

                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="px-3 py-1 rounded-lg text-sm font-medium 
                      bg-green-600/20 text-green-400 border border-green-600/20 
                      hover:bg-green-600/30 transition"
                  >
                    View
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
