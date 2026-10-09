import Link from "next/link";
import { pricingTiers } from "./content";
import { Reveal } from "./Reveal";

const GRADIENT_270 = "linear-gradient(270deg, #BDBDBD 0%, #000 100%)";
const GRADIENT_180 = "linear-gradient(180deg, #BDBDBD 0%, #000 100%)";
const GRADIENT_90 = "linear-gradient(90deg, #BDBDBD 0%, #000 100%)";

function GradientLine({
  gradient,
  className,
}: {
  gradient: string;
  className: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`absolute hidden min-[810px]:block ${className}`}
      style={{ background: gradient }}
    />
  );
}

function TierBadge({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={`absolute hidden min-[810px]:block bg-black px-2 py-[2px] text-[13px] leading-[20.8px] whitespace-nowrap text-white ${className}`}
      style={{ fontFamily: "var(--site-sans)" }}
    >
      {label}
    </span>
  );
}

function TierDecorations({ index }: { index: number }) {
  if (index === 0) {
    return (
      <>
        <TierBadge label="Tier 1" className="left-0 top-[135px]" />
        <GradientLine
          gradient={GRADIENT_270}
          className="left-[47px] top-[167px] h-[2px] w-[100px]"
        />
      </>
    );
  }
  if (index === 1) {
    return (
      <>
        <GradientLine
          gradient={GRADIENT_180}
          className="right-[24px] top-[-4px] h-[307px] w-[2px]"
        />
        <GradientLine
          gradient={GRADIENT_90}
          className="right-[47px] top-[294px] h-[2px] w-[100px]"
        />
        <TierBadge label="Tier 2" className="right-0 top-[299px]" />
      </>
    );
  }
  return (
    <>
      <GradientLine
        gradient={GRADIENT_180}
        className="left-[22px] top-[13px] h-[282px] w-[2px]"
      />
      <TierBadge label="Tier 3" className="left-0 top-[280px]" />
      <GradientLine
        gradient={GRADIENT_270}
        className="left-[47px] top-[292px] h-[2px] w-[100px]"
      />
    </>
  );
}

function TierCard({ tier }: { tier: (typeof pricingTiers)[number] }) {
  return (
    <div className="relative z-[1] flex w-full flex-row gap-6 border border-dashed border-[#BDBDBD] bg-transparent p-7 min-[810px]:w-[753px]">
      <div className="flex min-h-[252px] flex-1 flex-col justify-between">
        <div className="flex flex-col gap-3">
          <span
            className="self-start bg-[#EDEDED] px-2 py-[2px] text-[13px] leading-[20.8px] tracking-[0.13px] text-black"
            style={{ fontFamily: "var(--site-sans)" }}
          >
            {tier.badge}
          </span>
          <p
            className="text-[20px] leading-8 tracking-[0.2px] text-black"
            style={{ fontFamily: "var(--site-sans)" }}
          >
            {tier.title}
          </p>
          <p
            className="text-sm leading-[22.4px] tracking-[0.14px] text-[rgb(84,84,84)]"
            style={{ fontFamily: "var(--site-sans)" }}
          >
            {tier.description}
          </p>
        </div>
        <div className="flex flex-row items-end gap-[5px]">
          <div className="flex flex-row items-baseline gap-[7px]">
            <span
              className="text-[20px] leading-8 tracking-[0.2px] text-black"
              style={{ fontFamily: "var(--site-sans)" }}
            >
              {tier.price}
            </span>
            {tier.byline ? (
              <span
                className="pb-[3px] text-sm leading-[22.4px] text-[rgb(84,84,84)]"
                style={{ fontFamily: "var(--site-sans)" }}
              >
                {tier.byline}
              </span>
            ) : null}
          </div>
          <Link
            href={tier.ctaHref}
            className="rounded-[18px] bg-[#3455FA] px-2.5 py-1.5 text-sm leading-[19.6px] tracking-[-0.28px] text-white transition hover:brightness-110"
            style={{ fontFamily: "var(--site-sans)" }}
          >
            {tier.ctaText}
          </Link>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2.5">
        {tier.points.map((point) => (
          <div
            key={point}
            className="w-full whitespace-pre-line border border-dashed border-[#DEDEDE] bg-[#F7F7F7] p-[18px] text-sm leading-[19.6px] tracking-[0.14px] text-black min-[810px]:max-w-[312px]"
            style={{ fontFamily: "var(--site-sans)" }}
          >
            {point}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="mx-auto flex w-full max-w-[1180px] flex-col gap-[30px] px-7 py-[50px]"
      style={{ fontFamily: "var(--site-sans)" }}
    >
      <div className="flex flex-col items-center gap-[5px]">
        <h3 className="text-center text-[44px] leading-[52.8px] text-black">
          Open Source &amp; Ecosystem
        </h3>
        <p className="max-w-[500px] text-center text-sm leading-[22.4px] text-[rgb(84,84,84)]">
          Soup CLI is free and Apache-2.0 licensed. Train offline on your own hardware, support the open-source compute fund, or explore Soup Zero.
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-[900px] flex-col">
        {pricingTiers.map((tier, i) => (
          <Reveal
            key={tier.badge}
            className={`relative flex w-full flex-col min-[810px]:flex-row min-[810px]:items-center min-[810px]:justify-start${i > 0 ? " min-[810px]:pt-[125px]" : ""}`}
          >
            <TierDecorations index={i} />
            <div
              className={
                i === 1
                  ? "w-full min-[810px]:w-[753px]"
                  : "w-full min-[810px]:ml-[147px] min-[810px]:w-[753px]"
              }
            >
              <TierCard tier={tier} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
