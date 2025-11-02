import React from "react";
import { Week, DayContribution } from "@/lib/contribution-utils";

interface ContributionGridProps {
  weeks: Week[];
}

const getSquareColor = (level: DayContribution["level"]) => {
  switch (level) {
    case 0:
      return "bg-zinc-800";
    case 1:
      return "bg-green-800";
    case 2:
      return "bg-green-600";
    case 3:
      return "bg-green-400";
    case 4:
      return "bg-green-300";
    default:
      return "bg-zinc-800";
  }
};

const ContributionGrid: React.FC<ContributionGridProps> = ({ weeks }) => {
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Find the starting week index for each month
  const monthStartIndices = weeks.reduce((acc, week, i) => {
    const firstDay = week.find(
      (day) => day.date && !day.date.startsWith("padding"),
    );
    if (firstDay) {
      const month = new Date(firstDay.date).getMonth();
      if (acc[month] === undefined) {
        acc[month] = i;
      }
    }
    return acc;
  }, new Array(12).fill(undefined) as (number | undefined)[]);

  return (
    <div className="flex gap-2">
      {/* Day Labels */}
      <div className="flex flex-col justify-between pt-7 text-[0.625rem] text-zinc-400">
        <span></span>
        <span>Mon</span>
        <span></span>
        <span>Wed</span>
        <span></span>
        <span>Fri</span>
        <span></span>
      </div>

      {/* This is the key fix: We remove "flex-1" and "overflow-hidden".
        The empty "className" is fine, but you can remove it.
        This allows the div to grow to its full 53-week width.
      */}
      <div className="">
        {/* Month Labels - Using CSS Grid */}
        <div
          className="grid grid-flow-col"
          style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}
        >
          {monthLabels.map((month, i) => {
            const startIndex = monthStartIndices[i];

            let nextMonthIndex = weeks.length;
            for (let j = i + 1; j < 12; j++) {
              if (monthStartIndices[j] !== undefined) {
                nextMonthIndex = monthStartIndices[j]!;
                break;
              }
            }

            if (startIndex === undefined) return null;

            const span = nextMonthIndex - startIndex;
            if (span <= 0) return null;

            return (
              <div
                key={month}
                className={`text-left text-[0.625rem] text-zinc-400`}
                style={{ gridColumn: `span ${span} / span ${span}` }}
              >
                {month}
              </div>
            );
          })}
        </div>

        {/* Contribution Squares (Grid) */}
        <div className="mt-1 grid grid-flow-col gap-[0.125rem] sm:gap-[0.25rem]">
          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="flex flex-col gap-[0.125rem] sm:gap-[0.25rem]"
            >
              {week.map((day) => (
                <div
                  key={day.date}
                  className={`
                    h-[0.625rem] w-[0.625rem] rounded-sm
                    sm:h-[0.75rem] sm:w-[0.75rem]
                    ${getSquareColor(day.level)}
                  `}
                  title={
                    day.count > 0
                      ? `${day.count} contributions on ${day.date}`
                      : `No contributions on ${day.date}`
                  }
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionGrid;
