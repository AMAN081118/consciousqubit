import { supabase } from "@/lib/supabaseClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";

type Project = {
  id: string;
  title: string;
  description: string | null;
  github_url: string | null;
  live_url: string | null;
  image: string | null;
};

async function fetchReadme(githubUrl: string): Promise<string | null> {
  try {
    const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return null;

    const owner = match[1];
    const repo = match[2];

    const url = `https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`;
    const res = await fetch(url, { next: { revalidate: 180 } });

    if (!res.ok) return null;
    return res.text();
  } catch {
    return null;
  }
}

function fixImageUrls(markdown: string, githubUrl: string) {
  const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) return markdown;

  const owner = match[1];
  const repo = match[2];
  const base = `https://raw.githubusercontent.com/${owner}/${repo}/master/assets/`;

  return markdown.replace(
    /!\[(.*?)\]\((?!http)(.*?)\)/g,
    (_full, alt, path) => {
      const clean = path.replace("./", "").replace("assets/", "");
      return `![${alt}](${base}${clean})`;
    },
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // await the params promise (Next.js 15 requirement)
  const { id } = await params;

  const { data: rawProject, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !rawProject) {
    return (
      <div className="p-10 text-red-400 text-xl">Failed to load project.</div>
    );
  }

  const project = rawProject as Project;

  let readme: string | null = null;

  if (project.github_url) {
    readme = await fetchReadme(project.github_url);
    if (readme) readme = fixImageUrls(readme, project.github_url);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-white">
      <h1 className="text-5xl font-bold mb-4 tracking-tight">
        {project.title}
      </h1>

      <p className="text-gray-400 text-lg mb-10 leading-relaxed">
        {project.description}
      </p>

      {project.image && (
        <div className="relative w-full h-72 md:h-96 mb-12 rounded-xl overflow-hidden border border-white/10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      )}

      <h2 className="text-3xl font-semibold mb-6">Documentation</h2>

      {!readme && <p className="text-gray-500">README.md not found.</p>}

      {readme && (
        <article
          className="
            prose prose-invert max-w-none
            prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
            prose-p:text-gray-300 prose-li:text-gray-300
            prose-img:rounded-xl prose-img:border prose-img:border-white/10
            text-[18px] leading-loose
          "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              img: ({ src, alt }) => {
                const safeSrc = typeof src === "string" ? src : "";

                return (
                  <div
                    className="relative w-full my-6 mx-auto rounded-xl border border-white/10"
                    style={{ height: "480px" }}
                  >
                    <Image
                      src={safeSrc}
                      alt={alt || "image"}
                      fill
                      sizes="100vw"
                      unoptimized
                      className="object-contain rounded-xl"
                    />
                  </div>
                );
              },
            }}
          >
            {readme}
          </ReactMarkdown>
        </article>
      )}

      <div className="mt-12 flex gap-4">
        {project.github_url && (
          <Link
            href={project.github_url}
            target="_blank"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition text-white"
          >
            GitHub Repo
          </Link>
        )}

        {project.live_url && (
          <Link
            href={project.live_url}
            target="_blank"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition text-white"
          >
            Live Demo
          </Link>
        )}
      </div>
    </div>
  );
}
