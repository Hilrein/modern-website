"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** delay in ms before the reveal transition starts once visible */
  delay?: number;
  /** initial Y offset in px (matches the original framer appear effect) */
  yOffset?: number;
  className?: string;
  as?: "div" | "figure" | "span";
}

/**
 * Scroll-triggered appear effect matching the original site:
 * elements start at opacity 0 + translateY(20px) and animate to
 * opacity 1 + translateY(0) with a ~0.9s ease-out transition once
 * they enter the viewport. Reveal plays once. Elements that were
 * already scrolled past (e.g. after an anchor jump) reveal
 * immediately so they never get stuck invisible.
 */
export function Reveal({
  children,
  delay = 0,
  yOffset = 20,
  className,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transition = "none";
      reveal();
      return;
    }

    const check = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // reveal when ~15% of the element is inside the viewport,
      // or when the element has been scrolled past entirely
      if (rect.top < vh * 0.85 || rect.bottom < 0) {
        reveal();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };

    const onScroll = () => {
      if (typeof requestAnimationFrame !== "undefined") {
        requestAnimationFrame(check);
      } else {
        check();
      }
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      data-reveal=""
      style={{
        opacity: 0,
        transform: `translateY(${yOffset}px)`,
        transition: `opacity 0.9s cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms, transform 0.9s cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
