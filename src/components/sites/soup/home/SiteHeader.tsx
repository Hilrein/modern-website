"use client";

import { Fragment, useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { CloseIcon, MenuIcon } from "./icons";
import { mobileMenuGroups, navLinksLeft, navLinksRight } from "./content";
import type { NavLink } from "./types";
import { useMetrics } from "@/hooks/useMetrics";

interface SiteAnchorProps {
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onClick?: () => void;
}

function SiteAnchor({ href, className, style, children, onClick }: SiteAnchorProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} className={className} style={style} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} style={style} onClick={onClick}>
      {children}
    </a>
  );
}

const LOGO_PATH =
  "M 17.455 0.001 C 18.025 0.002 18.595 0.001 19.165 0 C 20.122 0 21.078 0.001 22.034 0.002 C 23.133 0.004 24.232 0.003 25.33 0.002 C 26.281 0 27.232 0 28.183 0.001 C 28.748 0.001 29.312 0.001 29.877 0 C 34.785 -0.009 39.54 0.277 43.317 3.8 C 46.88 7.583 47.009 12.573 46.999 17.455 C 46.998 18.025 46.999 18.595 47 19.165 C 47 20.122 46.999 21.078 46.998 22.034 C 46.996 23.133 46.997 24.232 46.998 25.33 C 47 26.281 47 27.232 46.999 28.183 C 46.999 28.748 46.999 29.312 47 29.877 C 47.009 34.785 46.723 39.54 43.2 43.317 C 39.417 46.88 34.427 47.009 29.545 46.999 C 28.975 46.998 28.405 46.999 27.835 47 C 26.878 47 25.922 46.999 24.966 46.998 C 23.867 46.996 22.768 46.997 21.67 46.998 C 20.719 47 19.768 47 18.817 46.999 C 18.252 46.999 17.688 46.999 17.123 47 C 12.215 47.009 7.46 46.723 3.683 43.2 C 0.12 39.417 -0.009 34.427 0.001 29.545 C 0.002 28.975 0.001 28.405 0 27.835 C 0 26.878 0.001 25.922 0.002 24.966 C 0.004 23.867 0.003 22.768 0.002 21.67 C 0 20.719 0 19.768 0.001 18.817 C 0.001 18.252 0.001 17.688 0 17.123 C -0.009 12.215 0.277 7.46 3.8 3.683 C 7.583 0.12 12.573 -0.009 17.455 0.001 Z";

function LogoMark() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-[22px] w-[22px] text-black"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={LOGO_PATH} transform="translate(0 0)" />
      <path d={LOGO_PATH} transform="translate(53 0)" />
      <path d={LOGO_PATH} transform="translate(0 53)" />
      <path d={LOGO_PATH} transform="translate(53 53)" />
    </svg>
  );
}

function DesktopNavLink({ link }: { link: NavLink }) {
  return (
    <SiteAnchor
      href={link.href}
      className="group inline-flex items-center text-[14px] font-normal leading-[22.4px] tracking-[0.14px] text-[rgb(84,84,84)] transition-colors duration-200 hover:text-black"
      style={{ fontFamily: "var(--site-sans)" }}
    >
      <span className="text-[rgb(99,99,99)] transition-colors duration-200 group-hover:text-black">[</span>
      <span>{link.label}</span>
      <span className="text-[rgb(99,99,99)] transition-colors duration-200 group-hover:text-black">]</span>
    </SiteAnchor>
  );
}

interface MobileMenuGroupProps {
  group: (typeof mobileMenuGroups)[number];
  onNavigate: () => void;
}

function MobileMenuGroup({ group, onNavigate }: MobileMenuGroupProps) {
  return (
    <div>
      <p
        className="text-[16px] leading-[25.6px] tracking-[0.16px] text-[rgb(120,120,120)]"
        style={{ fontFamily: "var(--site-sans)" }}
      >
        {group.heading}
      </p>
      <div className="flex flex-col">
        {group.links.map((link) => (
          <SiteAnchor
            key={link.label}
            href={link.href}
            onClick={onNavigate}
            className="block w-full text-[32px] leading-[51.2px] tracking-[0.32px] text-black"
            style={{ fontFamily: "var(--site-sans)" }}
          >
            {link.label}
          </SiteAnchor>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { metrics } = useMetrics();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[70px]">
      <div className="hidden h-full min-[810px]:flex">
        <div className="relative mx-auto flex h-full w-full max-w-[1180px] items-center bg-[#FDFDFD] px-7">
          <nav
            className="flex flex-1 items-center justify-end gap-[32px] pr-[56px]"
            aria-label="Primary"
          >
            {navLinksLeft.map((link) => (
              <DesktopNavLink key={link.label} link={link} />
            ))}
          </nav>
          <Link
            href="/"
            aria-label="Soup CLI Home"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2"
          >
            <LogoMark />
          </Link>
          <nav
            className="flex flex-1 items-center justify-start gap-[32px] pl-[56px]"
            aria-label="Secondary"
          >
            {navLinksRight.map((link) => (
              <DesktopNavLink key={link.label} link={link} />
            ))}
          </nav>
        </div>
      </div>
      <div className="flex h-full min-[810px]:hidden">
        <div className="flex h-full w-full max-w-full items-center justify-between bg-[#FDFDFD] px-3">
          <Link href="/" aria-label="Soup CLI Home" className="flex items-center gap-2">
            <LogoMark />
            <span className="font-semibold text-[15px] tracking-tight">Soup</span>
            <span className="rounded border border-black/10 bg-black/5 px-1.5 py-0.5 text-[11px] font-mono text-[rgb(99,99,99)]">
              {metrics.version}
            </span>
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex h-[28px] w-[28px] items-center justify-center rounded-[10px] bg-[rgba(0,0,0,0.05)]"
          >
            <MenuIcon className="h-4 w-4 text-black" />
          </button>
        </div>
      </div>
      {open ? (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#FDFDFD]">
          <div className="flex h-[70px] items-center justify-between px-3">
            <Link href="/" aria-label="Home" onClick={() => setOpen(false)} className="flex items-center">
              <LogoMark />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-[28px] w-[28px] items-center justify-center rounded-[10px] bg-[rgba(0,0,0,0.05)]"
            >
              <CloseIcon className="h-4 w-4 text-black" />
            </button>
          </div>
          <div className="flex flex-col gap-5 px-7 pb-8 pt-[30px]">
            {mobileMenuGroups.map((group, index) => (
              <Fragment key={group.heading}>
                {index > 0 ? <div className="my-1 h-px w-full bg-black opacity-[0.1]" /> : null}
                <MobileMenuGroup group={group} onNavigate={() => setOpen(false)} />
              </Fragment>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
