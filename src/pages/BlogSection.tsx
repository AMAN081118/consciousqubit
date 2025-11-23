import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";

// Clean fallback image for blogs without a cover image
const FALLBACK_IMAGE =
  "https://placehold.co/600x400/262626/FFFFFF?text=No+Image";

export default async function BlogSection() {
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
            className="group block w-80 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 rounded-3xl overflow-hidden"
          >
            {/* Render actual cover image */}
            <div className="w-80 h-60 relative">
              <Image
                src={blog.cover_image || FALLBACK_IMAGE}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="320px"
                priority={false}
              />
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
