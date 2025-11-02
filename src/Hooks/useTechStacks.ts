import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface TechStack {
  id: number;
  name: string;
  img_url: string;
}

export const useTechStacks = () => {
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechStacks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("techstack")
        .select("*")
        .order("name", { ascending: true });

      if (error) console.error("Error fetching tech stacks:", error.message);
      setTechStacks(data || []);
      setLoading(false);
    };
    fetchTechStacks();
  }, []);

  return { techStacks, loading };
};
