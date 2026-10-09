"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { solutionStarAscii } from "./ascii-art";
import { siteAsset } from "./content";

const SHIMMER_INTERVAL_MS = 100;
const DENSITY_LADDER = [" ", "\u2591", "\u2592", "\u2593", "\u25A0"];

function shimmerFrame(base: string): string {
  const chars = [...base];
  // Precompute candidate indexes (cells with shading characters)
  const candidates: number[] = [];
  for (let i = 0; i < chars.length; i++) {
    const d = DENSITY_LADDER.indexOf(chars[i]);
    if (d > 0) candidates.push(i);
  }
  // Randomly nudge ~9% of shaded cells one density step up or down
  const swaps = Math.floor(candidates.length * 0.09);
  for (let s = 0; s < swaps; s++) {
    const idx = candidates[(Math.random() * candidates.length) | 0];
    const d = DENSITY_LADDER.indexOf(chars[idx]);
    const step = Math.random() < 0.5 ? -1 : 1;
    const next = d + step;
    if (next > 0 && next < DENSITY_LADDER.length) {
      chars[idx] = DENSITY_LADDER[next];
    }
  }
  return chars.join("");
}

function AsciiStar({ blurred }: { blurred?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion || blurred) return;
    const iv = window.setInterval(() => {
      el.textContent = shimmerFrame(solutionStarAscii);
    }, SHIMMER_INTERVAL_MS);
    return () => window.clearInterval(iv);
  }, [blurred]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 whitespace-pre text-center text-[10px] leading-[1em] text-[rgb(176,176,176)]"
      style={{
        fontFamily: "var(--site-mono)",
        transform: "translate(-50%, -50%) scale(0.4351, 0.595623)",
        transformOrigin: "center",
        userSelect: "none",
        ...(blurred ? { filter: "blur(11px)" } : {}),
      }}
    >
      {solutionStarAscii}
    </div>
  );
}

export function SolutionSection() {
  return (
    <section className="mx-auto flex w-full max-w-[1180px] flex-col items-center overflow-visible py-[100px]">
      <div className="flex flex-col items-center gap-[5px] px-7">
        <h3
          className="text-center text-[44px] leading-[52.8px] font-normal text-black"
          style={{ fontFamily: "var(--site-sans)" }}
        >
          Exact Layer Streaming
        </h3>
        <p
          className="max-w-[480px] text-center text-[14px] leading-[22.4px] tracking-[0.14px] text-[rgb(84,84,84)]"
          style={{ fontFamily: "var(--site-sans)" }}
        >
          Never load the frozen base at all. Soup keeps it in CPU RAM or on NVMe and streams one decoder layer at a time onto the GPU, bounding peak VRAM to a single layer instead of the whole model.
        </p>
      </div>
      <div className="mt-0 flex w-full flex-row items-center justify-center gap-2.5 max-[810px]:flex-col">
        <div className="flex flex-[1.15] flex-col overflow-clip pb-[100px] max-[810px]:pb-[50px]">
          <div className="relative h-[275px] w-full overflow-hidden max-[810px]:h-[133px]">
            <AsciiStar blurred />
            <AsciiStar />
            {/* <div className="absolute left-[42%] top-[76%] z-10 flex -translate-x-1/2 flex-col items-center gap-0">
              <div className="h-3 w-3 rounded-[2px] bg-black" />
              <div className="h-[50px] w-px bg-black" />
              <p
                className="whitespace-pre text-[14px] leading-[22.4px] tracking-[0.14px] text-[rgb(84,84,84)]"
                style={{ fontFamily: "var(--site-sans)" }}
              >
                The AI
              </p>
            </div> */}
          </div>
        </div>
        <div className="flex flex-1 flex-col overflow-clip pt-[170px] max-[810px]:pt-[100px]">
          <Image
            src={`${siteAsset}/images/hand-right.png`}
            alt="Hand interacting with the AI agent"
            width={544}
            height={306}
            className="aspect-[1.77683] w-full object-cover"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
