"use client"; // Must be a client component to manage state

import React, { useState } from "react";
import ContributionCard from "./ContributionCard";
import { IconGitHub, IconChart } from "./icons";

// --- YearTabs Sub-Component (Updated) ---
interface YearTabsProps {
  activeYear: number;
  onYearChange: (year: number) => void;
}

const YearTabs: React.FC<YearTabsProps> = ({ activeYear, onYearChange }) => {
  // --- Logic for "2024 Onwards" ---
  const currentYear = new Date().getFullYear();
  const startYear = 2024;
  const years: number[] = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  // This will result in an array like [2024, 2025]
  // ----------------------------------

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {years.map((year) => (
        <button
          key={year}
          onClick={() => onYearChange(year)}
          className={`
            rounded-md px-3 py-1 text-sm font-medium
            transition-all duration-150
            ${
              activeYear === year
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }
          `}
        >
          {year}
        </button>
      ))}
    </div>
  );
};

// --- Main Display Component ---
const ContributionsDisplay = () => {
  // We re-introduce state, defaulting to the current year
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());

  return (
    <section className="flex w-full flex-col items-center gap-6 px-4 py-16">
      {/* === GitHub Section === */}
      <div className="flex w-full flex-col items-center gap-4">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
          GitHub Contributions
          <IconChart className="h-6 w-6 text-zinc-600" />
        </h2>

        {/* We pass the state to our new YearTabs component */}
        <YearTabs activeYear={activeYear} onYearChange={setActiveYear} />

        <ContributionCard
          username="AMAN081118"
          year={activeYear} // This is now dynamic
          icon={<IconGitHub className="h-full w-full" />}
        />
      </div>
    </section>
  );
};

export default ContributionsDisplay;
