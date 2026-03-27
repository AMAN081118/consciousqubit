import React from "react";
import { Week, DayContribution } from "@/lib/contribution-utils";

interface ContributionGridProps {
  weeks: Week[];
}

// Map levels to Grayscale colors matching your reference image
const getSquareColor = (level: DayContribution["level"]) => {
  switch (level) {
    case 0:
      return "bg-gray-100 dark:bg-neutral-900";
    case 1:
      return "bg-gray-300 dark:bg-neutral-700";
    case 2:
      return "bg-gray-400 dark:bg-neutral-600";
    case 3:
      return "bg-gray-500 dark:bg-neutral-500";
    case 4:
      return "bg-gray-700 dark:bg-neutral-400";
    default:
      return "bg-gray-100 dark:bg-neutral-900";
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

  const monthStartIndices = weeks.reduce(
    (acc, week, i) => {
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
    },
    new Array(12).fill(undefined) as (number | undefined)[],
  );

  return (
    <div className="flex gap-2 w-full">
      {/* Day Labels */}
      <div className="flex flex-col justify-between pt-7 pb-1 text-[0.65rem] text-gray-400 dark:text-gray-500">
        <span></span>
        <span>Mon</span>
        <span></span>
        <span>Wed</span>
        <span></span>
        <span>Fri</span>
        <span></span>
      </div>

      <div className="flex-1">
        {/* Month Labels */}
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
                className="text-left text-[0.75rem] text-gray-800 dark:text-gray-300 mb-2"
                style={{ gridColumn: `span ${span} / span ${span}` }}
              >
                {month}
              </div>
            );
          })}
        </div>

        {/* Contribution Squares */}
        <div className="grid grid-flow-col gap-[3px]">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((day, dayIndex) => (
                <div
                  key={day.date || `pad-${weekIndex}-${dayIndex}`}
                  className={`
                    h-[10px] w-[10px] rounded-[2px] transition-colors hover:ring-1 hover:ring-gray-400 dark:hover:ring-gray-500
                    ${day.date?.startsWith("padding") ? "bg-transparent" : getSquareColor(day.level)}
                  `}
                  title={
                    !day.date?.startsWith("padding")
                      ? day.count > 0
                        ? `${day.count} contributions on ${day.date}`
                        : `No contributions on ${day.date}`
                      : ""
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
