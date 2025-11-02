import { NextResponse } from "next/server";

const GITHUB_GRAPHQL_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
              contributionLevel  # <-- We must ask for this field!
            }
          }
        }
      }
    }
  }
`;

export async function GET(request: Request) {
  // --- Check for API Key ---
  if (!process.env.GITHUB_PAT) {
    return NextResponse.json(
      { error: "GITHUB_PAT is not configured in .env.local" },
      { status: 500 },
    );
  }
  // -------------------------

  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const year = searchParams.get("year");

  if (!username || !year) {
    return NextResponse.json(
      { error: "Missing username or year" },
      { status: 400 },
    );
  }

  const fromDate = `${year}-01-01T00:00:00Z`;
  const toDate = `${year}-12-31T23:59:59Z`;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${process.env.GITHUB_PAT}`,
      },
      body: JSON.stringify({
        query: GITHUB_GRAPHQL_QUERY,
        variables: {
          username: username,
          from: fromDate,
          to: toDate,
        },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    const data = await res.json();

    if (res.status !== 200 || data.errors) {
      console.error("GitHub API Error:", data.errors);
      return NextResponse.json(
        { error: "Error fetching from GitHub", details: data.errors },
        { status: 500 },
      );
    }

    const contributionData =
      data.data.user.contributionsCollection.contributionCalendar;

    return NextResponse.json(contributionData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
