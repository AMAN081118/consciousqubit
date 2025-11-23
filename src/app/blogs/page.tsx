import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";

// Placeholder for blogs without cover_image
const BlogImagePlaceholder: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 rounded-t-3xl">
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

export default async function Blogs() {
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, slug, title, excerpt, cover_image, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <div className="p-10 text-red-500">Error loading blogs</div>;
  }

  const MAX_EXCERPT_LINES = 3;

  return (
    <div className="flex flex-col gap-8 justify-center pl-2">
      <div className="text-center">
        <h2 className="text-5xl font-normal font-['Orbitron'] leading-loose">
          Blogs
        </h2>
      </div>

      {/* Blog Card Container */}
      <div className="flex justify-start gap-6 flex-wrap">
        {blogs?.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="group block w-80 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 rounded-3xl overflow-hidden"
          >
            {/* Image Section */}
            <div className="w-80 h-60 relative rounded-t-3xl overflow-hidden">
              {blog.cover_image ? (
                <Image
                  src={blog.cover_image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="320px"
                />
              ) : (
                <BlogImagePlaceholder />
              )}
            </div>

            {/* Content Section */}
            <div className="w-80 h-40 px-4 py-3 bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300 rounded-b-3xl flex flex-col gap-2">
              <h3 className="text-xl font-bold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
                {blog.title}
              </h3>

              <p
                className="text-gray-500 text-sm overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: MAX_EXCERPT_LINES,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {blog.excerpt}
              </p>

              <div className="mt-auto flex justify-end text-sm font-semibold font-['Poppins'] text-purple-600 group-hover:text-red-700 transition">
                Read Post →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
