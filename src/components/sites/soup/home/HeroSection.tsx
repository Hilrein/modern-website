"use client";

import { useEffect, useRef } from "react";
import { siteAsset } from "./content";
import { useMetrics } from "@/hooks/useMetrics";

const COLS = 165;
const ROWS = 63;
const FRAME_INTERVAL_MS = 1000 / 15;
// Box aspect (595x420): the 720x900 video is center-cropped (object-fit: cover)
const BOX_ASPECT = 595 / 420;

function drawAsciiFrame(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  pre: HTMLPreElement
) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (vw && vh) {
    // cover-crop: keep full width, crop height to the box aspect
    const srcH = vw / BOX_ASPECT;
    const srcY = (vh - srcH) / 2;
    ctx.drawImage(video, 0, srcY, vw, srcH, 0, 0, COLS, ROWS);
  } else {
    ctx.drawImage(video, 0, 0, COLS, ROWS);
  }
  const data = ctx.getImageData(0, 0, COLS, ROWS).data;
  const rows: string[] = [];
  for (let y = 0; y < ROWS; y++) {
    let row = "";
    for (let x = 0; x < COLS; x++) {
      const i = (y * COLS + x) * 4;
      const luminance =
        (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
      // The source video has a black background: black maps to space,
      // mid grays to ○ and the brightest pixels to ◐
      if (luminance < 0.08) row += " ";
      else if (luminance < 0.88) row += "\u25CB";
      else row += "\u25D0";
    }
    rows.push(row);
  }
  pre.textContent = rows.join("\n");
}

function AsciiVideo({ src, className }: { src: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const video = container.querySelector<HTMLVideoElement>("video");
    const pre = container.querySelector<HTMLPreElement>("pre");
    if (!video || !pre) return;

    const canvas = document.createElement("canvas");
    canvas.width = COLS;
    canvas.height = ROWS;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Some browsers block autoplay until an explicit play() promise resolves
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }

    let rafId = 0;
    let lastTime = 0;
    let cancelled = false;

    const renderFrame = () => {
      if (video.readyState < 2) return;
      drawAsciiFrame(video, canvas, pre);
    };

    const tick = (time: number) => {
      if (cancelled) return;
      if (video.readyState >= 2 && time - lastTime >= FRAME_INTERVAL_MS) {
        lastTime = time;
        drawAsciiFrame(video, canvas, pre);
      }
      rafId = requestAnimationFrame(tick);
    };

    if (reducedMotion) {
      if (video.readyState >= 2) {
        renderFrame();
      } else {
        const onReady = () => {
          renderFrame();
          video.removeEventListener("loadeddata", onReady);
        };
        video.addEventListener("loadeddata", onReady);
        return () => {
          cancelled = true;
          video.removeEventListener("loadeddata", onReady);
        };
      }
      return () => {
        cancelled = true;
      };
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <video
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        src={src}
        style={{ display: "none" }}
      />
      <pre
        className="h-full w-full"
        style={{
          // Menlo renders ○/◐/space at a uniform advance, keeping the
          // 165-col grid exactly as wide as the 595px box (no right clipping)
          fontFamily: "Menlo, 'Liberation Mono', monospace",
          fontSize: "5.98px",
          lineHeight: "6.6px",
          whiteSpace: "pre",
          color: "black",
          margin: 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

const cornerPositions = [
  "left-0 top-0",
  "right-0 top-0",
  "bottom-0 left-0",
  "bottom-0 right-0",
];

export function HeroSection() {
  const { metrics } = useMetrics();

  return (
    <section className="mx-auto flex w-full max-w-[1180px] flex-col items-center justify-end gap-5 px-7 pb-[110px] pt-[140px] min-[810px]:h-[834px]">
      <div className="flex flex-col items-center gap-4">
        {/* Version Badge */}
        <a
          href="https://github.com/MakazhanAlpamys/Soup/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 font-mono text-xs text-black transition-colors hover:bg-black hover:text-white"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#28c840] animate-pulse" />
          <span className="font-semibold">{metrics.version}</span>
          <span className="text-[rgb(120,120,120)] group-hover:text-white/60">·</span>
          <span>Flagship Release · {metrics.releaseDate}</span>
          <span className="text-[rgb(120,120,120)] group-hover:text-white/60">→</span>
        </a>

        <h1
          className="text-center text-[44px] font-normal leading-[52.8px] text-black min-[810px]:text-[54px] min-[810px]:leading-[64.8px]"
          style={{ fontFamily: "var(--site-serif)", letterSpacing: "normal" }}
        >
          Stop tuning. Start training.
        </h1>
        <p
          className="max-w-[480px] text-center"
          style={{
            fontFamily: "var(--site-sans)",
            fontSize: "14px",
            lineHeight: "22.4px",
            letterSpacing: "0.14px",
            color: "rgb(84, 84, 84)",
          }}
        >
          Soup writes the config for you. Fine-tune Llama-3.1-8B on a 4 GB laptop GPU with exact layer streaming. 23 methods, 167 recipes, all offline.
        </p>
      </div>
      <div className="flex items-center justify-center gap-2.5">
        <a
          href="https://github.com/MakazhanAlpamys/Soup"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[18px] px-3.5 py-1.5 text-black transition-colors hover:bg-[rgba(0,0,0,0.1)]"
          style={{
            fontFamily: "var(--site-sans)",
            fontSize: "14px",
            lineHeight: "19.6px",
            letterSpacing: "-0.28px",
            background: "rgba(0, 0, 0, 0.05)",
          }}
        >
          ★ Star {metrics.stars}
        </a>
        <a
          href="#quickstart"
          className="rounded-[18px] bg-black px-3.5 py-1.5 text-white transition-colors hover:bg-[rgb(30,30,30)]"
          style={{
            fontFamily: "var(--site-sans)",
            fontSize: "14px",
            lineHeight: "19.6px",
            letterSpacing: "-0.28px",
          }}
        >
          pip install soup-cli
        </a>
      </div>

      {/* Metrics Line: Stars, Downloads, Version */}
      <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-[rgb(84,84,84)] sm:gap-6 sm:text-[13px]">
        <a
          href="https://github.com/MakazhanAlpamys/Soup"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 transition-colors hover:text-black"
        >
          <span className="text-[#febc2e] font-bold">★</span>
          <span className="font-semibold text-black">{metrics.stars}</span>
          <span className="text-[11px] text-[rgb(120,120,120)]">GitHub stars</span>
        </a>
        <span className="text-[rgb(210,210,210)]">|</span>
        <a
          href="https://pypi.org/project/soup-cli/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 transition-colors hover:text-black"
        >
          <span className="text-[#38BDF8] font-bold">↓</span>
          <span className="font-semibold text-black">{metrics.downloads}</span>
          <span className="text-[11px] text-[rgb(120,120,120)]">PyPI downloads</span>
        </a>
        <span className="text-[rgb(210,210,210)]">|</span>
        <div className="flex items-center gap-1.5">
          <span className="rounded bg-black px-1.5 py-0.5 text-[10px] font-semibold text-white">
            {metrics.version}
          </span>
          <span className="text-[11px] text-[rgb(120,120,120)]">Apache-2.0</span>
        </div>
      </div>
      <div className="relative h-[420px] w-[595px] max-[810px]:h-[300px] max-[810px]:w-[400px]">
        <AsciiVideo
          src={`${siteAsset}/videos/hero-ascii.mp4`}
          className="relative h-full w-full overflow-hidden rounded-lg bg-white"
        />
        {cornerPositions.map((position) => (
          <div
            key={position}
            data-border=""
            className={`absolute z-[1] h-5 w-5 ${position}`}
            style={{ border: "1px solid #B0B0B0" }}
          />
        ))}
      </div>
    </section>
  );
}
