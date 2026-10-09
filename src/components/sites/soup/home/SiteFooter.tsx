"use client";

import Link from "next/link";
import { footerColumns, socialLinks } from "./content";
import { footerAscii } from "./ascii-art";
import { LinkedinIcon, XIcon, YoutubeIcon, LogoMarkIcon } from "./icons";
import { Reveal } from "./Reveal";
import { useMetrics } from "@/hooks/useMetrics";

const socialIcons = [LinkedinIcon, XIcon, YoutubeIcon];

const footerColumnStyles = {
  fontFamily: "var(--site-sans)",
} as const;

export function SiteFooter() {
  const { metrics } = useMetrics();

  return (
    <footer className="relative w-full bg-[#FDFDFD]">
      {/* ASCII wordmark background layer — breathes with a slow idle pulse */}
      <div className="pointer-events-none absolute inset-x-0 top-[100px] bottom-0 select-none overflow-hidden">
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-pre text-center text-[10px] leading-[1em] text-[rgb(176,176,176)]"
          style={{
            fontFamily: "var(--site-mono)",
            filter: "blur(11px)",
            scale: "1.0130 1.12274",
            animation: "site-footer-breathe 6s ease-in-out infinite",
          }}
        >
          {footerAscii}
        </div>
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-pre text-center text-[10px] leading-[1em] text-[rgb(176,176,176)]"
          style={{
            fontFamily: "var(--site-mono)",
            scale: "1.0130 1.12274",
            animation: "site-footer-breathe 6s ease-in-out infinite",
          }}
        >
          {footerAscii}
        </div>
      </div>
      <div className="relative z-10 mx-auto flex h-[865px] w-full max-w-[1180px] flex-row items-end justify-center gap-2.5">
        {/* Company & Socials — anchored to the bottom, justify-between */}
        <Reveal className="flex h-[673px] flex-1 flex-col justify-between pb-11 pl-7">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5">
              <LogoMarkIcon className="h-4 w-4 text-black" />
              <p
                className="text-[14px] leading-[19.6px] tracking-[0.14px] text-black"
                style={{ fontFamily: "var(--site-sans)" }}
              >
                Soup
              </p>
            </div>
            <p
              className="max-w-[290px] text-[13px] leading-[20.8px] tracking-[0.13px] text-[rgb(99,99,99)]"
              style={{ fontFamily: "var(--site-sans)" }}
            >
              CLI-first post-training toolkit for open models on consumer hardware. Exact layer streaming, 23 methods, 167 recipes, offline.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social, index) => {
                const Icon = socialIcons[index];
                if (!Icon) return null;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="h-6 w-6 text-[rgb(120,120,120)] transition-colors hover:text-black"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
            <div className="flex flex-col gap-1.5 font-mono text-xs text-[rgb(120,120,120)]">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-black">Soup CLI {metrics.version}</span>
                <span>·</span>
                <span className="text-[#febc2e]">★ {metrics.stars}</span>
                <span>·</span>
                <span className="text-[#38BDF8]">↓ {metrics.downloads}</span>
              </div>
              <p
                className="text-[13px] leading-[20.8px] text-[rgb(99,99,99)]"
                style={{ fontFamily: "var(--site-sans)" }}
              >
                <span>
                  © 2026 MePlay, Inc. &amp; Hilrein. Released under Apache-2.0.
                </span>
              </p>
            </div>
          </div>
        </Reveal>
        {/* Spacer */}
        <div className="hidden w-[295px] min-[810px]:block" />
        {/* Links — single column: Pages above Support, centered */}
        <Reveal
          delay={150}
          className="flex h-[673px] flex-1 flex-col items-center gap-[50px]"
        >
          {footerColumns.map((column) => (
            <div
              key={column.heading}
              className="flex w-[150px] flex-col gap-2.5"
            >
              <p
                className="text-[13px] leading-[20.8px] tracking-[0.13px] text-[rgb(51,51,51)]"
                style={footerColumnStyles}
              >
                {column.heading}
              </p>
              <div className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-[5px] text-[13px] leading-[20.8px] tracking-[0.13px] text-[rgb(99,99,99)] transition-colors hover:text-black"
                    style={footerColumnStyles}
                  >
                    [ {link.label} ]
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </footer>
  );
}
