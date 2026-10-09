import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export interface MetricsResponse {
  stars: string;
  starsCount: number;
  downloads: string;
  downloadsCount: number;
  version: string;
  releaseDate: string;
  repoUrl: string;
  pypiUrl: string;
  source: "live" | "fallback";
}

const FALLBACK_METRICS: MetricsResponse = {
  stars: "8,413",
  starsCount: 8413,
  downloads: "106,000+",
  downloadsCount: 106000,
  version: "v0.75.2",
  releaseDate: "1 October 2026",
  repoUrl: "https://github.com/MakazhanAlpamys/Soup",
  pypiUrl: "https://pypi.org/project/soup-cli/",
  source: "fallback",
};

export async function GET() {
  const metrics: MetricsResponse = { ...FALLBACK_METRICS };
  let isLive = false;

  // 1. Fetch GitHub Stars
  try {
    const ghRes = await fetch("https://api.github.com/repos/MakazhanAlpamys/Soup", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Soup-Website-Metrics/1.0",
      },
      next: { revalidate: 3600 },
    });

    if (ghRes.ok) {
      const ghData = (await ghRes.json()) as { stargazers_count?: number };
      if (typeof ghData.stargazers_count === "number" && ghData.stargazers_count > 0) {
        metrics.starsCount = ghData.stargazers_count;
        metrics.stars = ghData.stargazers_count.toLocaleString("en-US");
        isLive = true;
      }
    }
  } catch {
    // Keep fallback if request fails or rate-limited
  }

  // 2. Fetch PyPI Package Version
  try {
    const pypiRes = await fetch("https://pypi.org/pypi/soup-cli/json", {
      headers: {
        "User-Agent": "Soup-Website-Metrics/1.0",
      },
      next: { revalidate: 3600 },
    });

    if (pypiRes.ok) {
      const pypiData = (await pypiRes.json()) as { info?: { version?: string } };
      if (pypiData?.info?.version) {
        metrics.version = `v${pypiData.info.version}`;
        isLive = true;
      }
    }
  } catch {
    // Keep fallback if request fails
  }

  // 3. Fetch PyPI Recent Downloads
  try {
    const statsRes = await fetch("https://pypistats.org/api/packages/soup-cli/recent", {
      headers: {
        "User-Agent": "Soup-Website-Metrics/1.0",
      },
      next: { revalidate: 3600 },
    });

    if (statsRes.ok) {
      const statsData = (await statsRes.json()) as {
        data?: { last_month?: number };
      };
      const recent = statsData?.data?.last_month;
      if (typeof recent === "number" && recent > 0) {
        // If live recent monthly downloads exist, estimate or display
        metrics.downloadsCount = Math.max(recent, FALLBACK_METRICS.downloadsCount);
        metrics.downloads = `${metrics.downloadsCount.toLocaleString("en-US")}+`;
        isLive = true;
      }
    }
  } catch {
    // Keep fallback
  }

  metrics.source = isLive ? "live" : "fallback";

  return NextResponse.json(metrics, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

