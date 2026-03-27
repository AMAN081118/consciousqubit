"use client";

import React, { useState } from "react";
import ContributionCard from "./ContributionCard";

interface YearTabsProps {
  activeYear: number;
  onYearChange: (year: number) => void;
}

const YearTabs: React.FC<YearTabsProps> = ({ activeYear, onYearChange }) => {
  const currentYear = new Date().getFullYear();
  const startYear = 2024;
  const years: number[] = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {years.map((year) => (
        <button
          key={year}
          onClick={() => onYearChange(year)}
          className={`
            rounded-full px-4 py-1 text-sm font-medium font-['Poppins']
            transition-colors border
            ${
              activeYear === year
                ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white"
                : "bg-transparent text-gray-500 border-gray-200 hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600 dark:text-gray-400"
            }
          `}
        >
          {year}
        </button>
      ))}
    </div>
  );
};

const ContributionsDisplay = () => {
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());

  return (
    <section id="contributions" className="w-full pt-10 scroll-mt-24">
      <h2 className="text-2xl font-bold font-['Orbitron'] text-gray-900 dark:text-white mb-4">
        GitHub Contributions
      </h2>

      <YearTabs activeYear={activeYear} onYearChange={setActiveYear} />

      <ContributionCard username="AMAN081118" year={activeYear} />
    </section>
  );
};

export default ContributionsDisplay;
