"use client";

import { useEffect, useState } from "react";
import type { MetricsResponse } from "@/app/api/metrics/route";

const DEFAULT_METRICS: MetricsResponse = {
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

export function useMetrics() {
  const [metrics, setMetrics] = useState<MetricsResponse>(DEFAULT_METRICS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadMetrics() {
      try {
        const res = await fetch("/api/metrics");
        if (res.ok) {
          const data = (await res.json()) as MetricsResponse;
          if (!cancelled && data) {
            setMetrics(data);
          }
        }
      } catch {
        // Silently use defaults if offline / error
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMetrics();

    return () => {
      cancelled = true;
    };
  }, []);

  return { metrics, loading };
}

