import { featureCards } from "./content";

const cornerSquares = [
  { top: "-8px", left: "-8px" },
  { top: "calc(100%)", left: "-8px" },
  { top: "-8px", left: "calc(100%)" },
  { top: "calc(100%)", left: "calc(100%)" },
];

function Badge({ label }: { label: string }) {
  return (
    <div className="relative inline-flex">
      {cornerSquares.map((corner, index) => (
        <span
          key={index}
          className="absolute h-2 w-2 bg-black"
          style={corner}
          aria-hidden="true"
        />
      ))}
      <span
        className="bg-black px-2 py-[2px] text-[13px] leading-[20.8px] tracking-[0.13px] text-white"
        style={{ fontFamily: "var(--site-sans)" }}
      >
        {label}
      </span>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto flex w-full max-w-[1180px] flex-col gap-[30px] px-7 py-[50px]">
      <div className="flex w-full flex-col items-center gap-3">
        <Badge label="The Whole Loop" />
        <h3
          className="text-center text-[44px] leading-[52.8px] font-normal text-black"
          style={{ fontFamily: "var(--site-sans)" }}
        >
          Decide, Train, Ship, Operate, Secure
        </h3>
        <p
          className="max-w-[500px] text-center text-[14px] leading-[22.4px] tracking-[0.14px] text-[rgb(84,84,84)]"
          style={{ fontFamily: "var(--site-sans)" }}
        >
          Curate clean training data, stream frozen layers beyond your VRAM, and gate every checkpoint on a cryptographic SHIP verdict.
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-2.5">
        <div className="flex w-full flex-row gap-2.5 max-[810px]:flex-col">
          {featureCards.slice(0, 2).map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
        <div className="flex w-full flex-row gap-2.5 max-[810px]:flex-col">
          {featureCards.slice(2, 4).map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  asciiArt,
  color,
  scale,
  scaleY,
}: {
  title: string;
  description: string;
  asciiArt: string;
  color: string;
  scale: number;
  scaleY: number;
}) {
  return (
    <div className="relative h-[400px] w-[445px] flex-1 max-[810px]:w-full">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 whitespace-pre text-center text-[10px] leading-[10px]"
          style={{
            fontFamily: "var(--site-mono)",
            color,
            transform: `translate(-50%, -50%) scale(${scale}, ${scaleY})`,
            transformOrigin: "center",
            userSelect: "none",
            filter: "blur(11px)",
          }}
        >
          {asciiArt}
        </div>
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 whitespace-pre text-center text-[10px] leading-[10px]"
          style={{
            fontFamily: "var(--site-mono)",
            color,
            transform: `translate(-50%, -50%) scale(${scale}, ${scaleY})`,
            transformOrigin: "center",
            userSelect: "none",
          }}
        >
          {asciiArt}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-[5px] p-[28px]">
        <p
          className="text-[16px] leading-[25.6px] tracking-[0.16px] text-black"
          style={{ fontFamily: "var(--site-sans)" }}
        >
          {title}
        </p>
        <p
          className="max-w-[387px] text-[14px] leading-[22.4px] tracking-[0.14px] text-[rgb(84,84,84)]"
          style={{ fontFamily: "var(--site-sans)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
