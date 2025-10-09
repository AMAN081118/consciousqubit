// ./src/app/blogs/[slug]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Blog {
  id: number;
  created_at: string;
  title: string;
  content: string;
  slug: string;
  cover_image?: string;
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single<Blog>();

  if (!blog || error) return notFound();

  return (
    <article className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-cyan-400">{blog.title}</h1>
      <p className="text-gray-400 mt-2">
        {new Date(blog.created_at).toISOString().split("T")[0]}
      </p>

      {blog.cover_image && (
        <Image
          src={blog.cover_image} // e.g., https://your-supabase-bucket-url/...
          alt={blog.title}
          width={800}
          height={400}
          className="my-6 rounded-lg border border-gray-700"
          priority
        />
      )}

      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}
