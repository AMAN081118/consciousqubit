import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

// Define a placeholder component for the blog image
const BlogImagePlaceholder: React.FC = () => (
  // Placeholder using a gradient and simple icon for visual appeal
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 rounded-t-3xl">
    {/* Placeholder Icon (e.g., an SVG for "document" or "blog") */}
    <svg
      className="w-16 h-16 text-white text-opacity-30"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10m-3-11l-3 3-3-3"
      />
    </svg>
  </div>
);

export default async function BlogSection() {
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, slug, title, excerpt, cover_image, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <div className="p-10 text-red-500">Error loading blogs</div>;
  }

  // Define max lines for excerpt for truncation
  const MAX_EXCERPT_LINES = 3;

  return (
    <div className="flex flex-col gap-8 justify-center items-center py-10">
      <div className="text-white text-center">
        <h2 className="text-5xl font-normal font-['Orbitron'] leading-loose">
          Blogs
        </h2>
      </div>

      {/* Blog Card Container */}
      <div className="flex justify-center gap-6 flex-wrap">
        {blogs?.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            // 💡 Apply hover and transition effects to the card container
            className="group block w-80 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 rounded-3xl overflow-hidden"
          >
            {/* Image Section: w-80 h-60 (using placeholder for now) */}
            <div className="w-80 h-60">
              {/* If you had a real image URL: 
              <img 
                src={blog.cover_image || '/default-blog.jpg'} 
                alt={blog.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              */}
              <BlogImagePlaceholder />
            </div>

            {/* Content Section */}
            <div className="w-80 h-40 px-4 py-3 bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300 rounded-b-3xl flex flex-col gap-2">
              {/* Title: Truncate if title is too long (single line) */}
              <h3 className="text-xl font-bold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
                {blog.title}
              </h3>

              {/* Excerpt: Truncate with ellipsis after a set number of lines */}
              <p
                className={`text-gray-500 text-sm overflow-hidden`}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: MAX_EXCERPT_LINES, // Set the max number of lines
                  WebkitBoxOrient: "vertical",
                }}
              >
                {blog.excerpt}
              </p>

              {/* Read More Link (optional) */}
              <div className="mt-auto flex justify-end text-sm font-semibold font-['Poppins'] text-purple-600 group-hover:text-red-700 transition">
                Read Post &rarr;
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
