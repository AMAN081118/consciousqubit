"use client"; // This must be a client component to use hooks

import React, { useMemo } from "react";
import useSWR from "swr";
import ContributionGrid from "./ContributionGrid";
import { normalizeGitHubContributions } from "@/lib/contribution-utils";

// SWR fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ContributionCardProps {
  username: string;
  year: string | number;
  icon: React.ReactNode;
}

const ContributionCard: React.FC<ContributionCardProps> = ({
  username,
  year,
  icon,
}) => {
  // API URL is now hardcoded for GitHub
  const apiUrl = `/api/github-contributions?username=${username}&year=${year}`;

  // Fetch data with SWR
  const { data: rawData, error, isLoading } = useSWR(apiUrl, fetcher);

  // Normalize the data using our simplified GitHub-specific function
  const { weeks, totalContributions } = useMemo(() => {
    if (!rawData) return { weeks: [], totalContributions: 0 };
    if (rawData.error) return { weeks: [], totalContributions: 0 };

    return normalizeGitHubContributions(rawData);
  }, [rawData]);

  // This function renders the correct state (loading, error, or data)
  const renderGrid = () => {
    if (isLoading) {
      return (
        <div className="flex h-32 w-full items-center justify-center text-zinc-400">
          Loading contributions...
        </div>
      );
    }

    if (error || rawData?.error) {
      return (
        <div className="flex h-32 w-full items-center justify-center rounded-md bg-red-950 text-red-300">
          Error loading data: {rawData?.error || "Failed to fetch"}
        </div>
      );
    }

    if (weeks.length === 0) {
      return (
        <div className="flex h-32 w-full items-center justify-center text-zinc-500">
          No contribution data found for {year}.
        </div>
      );
    }

    // On success, render the grid with clean data
    return <ContributionGrid weeks={weeks} />;
  };

  return (
    <div
      className="
      w-full max-w-4xl rounded-xl border border-zinc-800 
      bg-zinc-900/50 p-4 shadow-lg backdrop-blur-sm sm:p-6
    "
    >
      {/* Card Header */}
      <div className="flex items-center gap-2">
        <div className="h-[1.125rem] w-[1.125rem] text-zinc-400">{icon}</div>
        <a
          href={`https://github.com/${username}`} // Link is now specific
          className="text-sm font-medium text-zinc-300 hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          @{username}
        </a>
      </div>

      {/* Grid Content - now with loading/error states */}
      {/* This is the key fix: "overflow-x-auto" creates the 
        horizontal scrolling window for small screens.
      */}
      <div className="mt-4 overflow-x-auto pb-2">{renderGrid()}</div>

      {/* Card Footer - now with dynamic count */}
      <div
        className="mt-4 flex flex-col items-center justify-between 
        gap-2 text-xs text-zinc-400 sm:flex-row sm:text-sm"
      >
        <p>
          <span className="font-medium text-white">
            {isLoading ? "..." : totalContributions}
          </span>
          {` GitHub contributions in ${year}`}
        </p>

        {/* Legend */}
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="h-3 w-3 rounded-sm bg-zinc-800"></div>
          <div className="h-3 w-3 rounded-sm bg-green-800"></div>
          <div className="h-3 w-3 rounded-sm bg-green-600"></div>
          <div className="h-3 w-3 rounded-sm bg-green-400"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionCard;
