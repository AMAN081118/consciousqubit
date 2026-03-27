import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default async function BlogSection() {
  // We only need the title, slug, and date for this minimal layout
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, slug, title, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return (
      <div className="py-10 text-red-500 font-['Poppins']">
        Error loading blogs
      </div>
    );
  }

  // Helper function to format the date exactly like the image: DD.MM.YYYY
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <section id="blogs" className="w-full pt-10 scroll-mt-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-['Orbitron'] text-gray-900 dark:text-white">
          Blog
        </h2>
      </div>

      {/* Grid Container with Top Border */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-200 dark:border-gray-800">
        {blogs?.map((blog, index) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className={`group flex flex-col justify-start py-6 px-2 sm:px-6 border-b border-gray-200 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900/50 ${
              index % 2 !== 0 ? "md:border-l" : "" // Adds the vertical divider line to the right column on desktop
            }`}
          >
            {/* Title - Includes the hover underline effect from your reference */}
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 font-['Poppins'] group-hover:underline decoration-blue-500 underline-offset-4 mb-2 leading-snug">
              {blog.title}
            </h3>

            {/* Date */}
            <span className="text-sm text-gray-500 dark:text-gray-400 font-['Poppins'] mt-auto">
              {formatDate(blog.created_at)}
            </span>
          </Link>
        ))}

        {(!blogs || blogs.length === 0) && (
          <div className="py-6 px-2 text-gray-500 font-['Poppins']">
            No posts found.
          </div>
        )}
      </div>
    </section>
  );
}
