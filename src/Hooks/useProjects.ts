import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// This is your FINAL data shape (which is correct)
export interface Project {
  id: string;
  title: string;
  description: string | null;
  github_url: string | null;
  live_url: string | null;
  image: string | null;
  created_at: string;
  tech_stack: string[]; // This will be an array of strings (names or URLs)
}

// --- NEW TYPES ---
// We create types that match the RAW data from the Supabase query

// This type matches: project_techstack ( techstack ( name, img_url ) )
interface RawTechStackEntry {
  techstack: {
    name: string;
    img_url: string | null;
  } | null; // techstack itself could be null if the join fails
}

// This type matches the top-level project from your select query
interface RawProject {
  id: string;
  title: string;
  description: string | null;
  github_url: string | null;
  live_url: string | null;
  image: string | null;
  created_at: string;
  project_techstack: RawTechStackEntry[] | null; // The array of joins
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      // Tell Supabase what to expect.
      // We are querying the 'projects' table and expecting an array of 'RawProject'
      const { data, error } = await supabase
        .from("projects")
        .select(
          `
          id, title, description, github_url, live_url, image, created_at,
          project_techstack (
            techstack (
              name, img_url
            )
          )
        `,
        )
        .order("created_at", { ascending: false })
        .returns<RawProject[]>(); // <-- Type assertion for the returned data

      if (error) {
        console.error("Error fetching projects:", error.message);
        setLoading(false);
        return;
      }

      // If data is null (which can happen), set to empty array
      if (!data) {
        setProjects([]);
        setLoading(false);
        return;
      }

      // --- NO MORE 'any' ---
      // 'p' is now correctly typed as 'RawProject'
      const formatted = data.map((p: RawProject) => ({
        ...p,
        tech_stack:
          (p.project_techstack
            ?.map((t: RawTechStackEntry) => {
              // This logic correctly prefers img_url, then name
              return t.techstack?.img_url || t.techstack?.name;
            })
            // Add .filter(Boolean) to remove any potential null/undefined
            // This safely makes the type string[]
            .filter(Boolean) as string[]) || [], // Default to empty array if project_techstack was null
      }));

      setProjects(formatted);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return { projects, loading };
};
