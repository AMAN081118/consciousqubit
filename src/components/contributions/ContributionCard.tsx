"use client";

import React, { useMemo } from "react";
import useSWR from "swr";
import ContributionGrid from "./ContributionGrid";
import { normalizeGitHubContributions } from "@/lib/contribution-utils";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ContributionCardProps {
  username: string;
  year: string | number;
}

const ContributionCard: React.FC<ContributionCardProps> = ({
  username,
  year,
}) => {
  const apiUrl = `/api/github-contributions?username=${username}&year=${year}`;
  const { data: rawData, error, isLoading } = useSWR(apiUrl, fetcher);

  const { weeks, totalContributions } = useMemo(() => {
    if (!rawData || rawData.error) return { weeks: [], totalContributions: 0 };
    return normalizeGitHubContributions(rawData);
  }, [rawData]);

  const renderGrid = () => {
    if (isLoading) {
      return (
        <div className="flex h-32 w-full items-center justify-center text-gray-400 font-['Poppins'] text-sm">
          Loading contributions...
        </div>
      );
    }

    if (error || rawData?.error) {
      return (
        <div className="flex h-32 w-full items-center justify-center text-red-500 font-['Poppins'] text-sm">
          Failed to load data. Ensure /api/github-contributions is running.
        </div>
      );
    }

    if (weeks.length === 0) {
      return (
        <div className="flex h-32 w-full items-center justify-center text-gray-400 font-['Poppins'] text-sm">
          No contribution data found for {year}.
        </div>
      );
    }

    return <ContributionGrid weeks={weeks} />;
  };

  return (
    <div className="w-full flex flex-col font-['Poppins']">
      {/* Grid Content */}
      <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
        <div className="min-w-[750px]">{renderGrid()}</div>
      </div>

      {/* Footer / Legend */}
      <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">
            {isLoading ? "..." : totalContributions.toLocaleString()}
          </span>
          {` contributions in ${year} on `}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-white hover:underline decoration-gray-400 underline-offset-4 transition-all"
          >
            GitHub
          </a>
          .
        </p>

        {/* Grayscale Legend */}
        <div className="flex items-center gap-1.5 text-xs">
          <span>Less</span>
          <div className="h-3 w-3 rounded-sm bg-gray-100 dark:bg-neutral-900"></div>
          <div className="h-3 w-3 rounded-sm bg-gray-300 dark:bg-neutral-700"></div>
          <div className="h-3 w-3 rounded-sm bg-gray-400 dark:bg-neutral-600"></div>
          <div className="h-3 w-3 rounded-sm bg-gray-500 dark:bg-neutral-500"></div>
          <div className="h-3 w-3 rounded-sm bg-gray-700 dark:bg-neutral-400"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionCard;
