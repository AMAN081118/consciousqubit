// --- Data Types ---
export interface DayContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export type Week = DayContribution[];

// --- NEW: Types for Raw GitHub Data ---

// This is the level from the GitHub GraphQL API
type GitHubContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

// This types the "day" object from the API response
interface RawGitHubDay {
  date: string;
  contributionCount: number;
  contributionLevel: GitHubContributionLevel;
  weekday: number; // Your query selects this, so we include it
}

// This types the "week" object from the API response
interface RawGitHubWeek {
  contributionDays: RawGitHubDay[];
}

// This types the top-level "data" object we're passing in
// (This is the shape of `contributionCalendar`)
export interface GitHubContributionCalendar {
  weeks: RawGitHubWeek[];
  totalContributions: number;
}

// ----------------------------------------

// Helper to map API level to our 0-4 level
function mapContributionLevel(
  level: GitHubContributionLevel,
): DayContribution["level"] {
  switch (level) {
    case "NONE":
      return 0;
    case "FIRST_QUARTILE":
      return 1;
    case "SECOND_QUARTILE":
      return 2;
    case "THIRD_QUARTILE":
      return 3;
    case "FOURTH_QUARTILE":
      return 4;
    default:
      return 0;
  }
}

/**
 * Normalizes raw GitHub contribution data.
 */
export function normalizeGitHubContributions(
  // FIX 1: We replace 'any' with our new type.
  // We add 'null | undefined' to safely handle loading states.
  data: GitHubContributionCalendar | null | undefined,
): {
  weeks: Week[];
  totalContributions: number;
} {
  // This check now safely handles null/undefined
  if (!data?.weeks) {
    return { weeks: [], totalContributions: 0 };
  }

  // FIX 2: 'week' is now correctly typed as 'RawGitHubWeek'
  const weeks: Week[] = data.weeks.map((week: RawGitHubWeek) =>
    // FIX 3: 'day' is now correctly typed as 'RawGitHubDay'
    week.contributionDays.map((day: RawGitHubDay) => ({
      date: day.date,
      count: day.contributionCount,
      level: mapContributionLevel(day.contributionLevel),
    })),
  );

  return {
    weeks,
    totalContributions: data.totalContributions,
  };
}
