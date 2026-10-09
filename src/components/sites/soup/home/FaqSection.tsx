"use client";

import { useState } from "react";
import { faqItems } from "./content";
import { PlusIcon, CloseIcon } from "./icons";

export function FaqSection() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="mx-auto w-full max-w-[1180px] px-7 py-[50px]">
      <div className="flex min-[810px]:flex-row min-[810px]:gap-[30px] flex-col">
        <div className="flex flex-1 flex-col gap-[30px]">
          <h3
            className="w-full max-w-[520px] text-left text-[44px] leading-[52.8px] font-normal text-black"
            style={{ fontFamily: "var(--site-sans)" }}
          >
            Frequently Asked Questions
          </h3>
          <p className="max-w-[547px] text-left text-[14px] leading-[22.4px] text-[rgb(84,84,84)]">
            Clear technical parameters regarding layer streaming, hardware requirements, supported models, and offline execution.
          </p>
          <div className="mt-auto pt-10">
            <a
              href="mailto:team@trysoup.dev"
              className="group relative inline-flex flex-row items-center gap-2 rounded-none bg-black py-2 pr-8 pl-2 text-white no-underline"
            >
              <span className="h-2.5 w-2.5 shrink-0 bg-white" />
              <span
                className="text-[13px] leading-[20.8px] tracking-[0.13px] text-white"
                style={{ fontFamily: "var(--site-sans)" }}
              >
                team@trysoup.dev
              </span>
              <span className="absolute top-1/2 right-3 h-2 w-2 -translate-y-1/2 bg-white" />
              <span className="absolute top-[-40px] left-[11px] h-11 w-0.5 bg-black" />
            </a>
          </div>
        </div>
        <div className="mt-[60px] flex flex-1 flex-col gap-2.5 min-[810px]:mt-0">
          {faqItems.map((item, index) => {
            const isOpen = openIndices.has(index);
            return (
              <div
                key={item.question}
                className="border border-dashed border-[#DEDEDE] bg-[#F7F7F7] transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer flex-row items-center justify-between gap-2.5 px-7 py-7 text-left"
                >
                  <p className="flex-1 text-[16px] leading-[25.6px] tracking-[0.16px] text-black">
                    {item.question}
                  </p>
                  <span className="h-4 w-4 shrink-0 text-[rgb(120,120,120)] transition-transform duration-300">
                    {isOpen ? <CloseIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
                  style={isOpen ? { maxHeight: "300px", opacity: "1" } : { maxHeight: "0px", opacity: "0" }}
                >
                  <p className="px-7 pb-7 text-[14px] leading-[22.4px] tracking-[0.14px] text-[rgb(84,84,84)]">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
