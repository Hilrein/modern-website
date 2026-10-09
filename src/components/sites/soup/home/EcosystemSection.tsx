import { ecosystemNodes } from "./content";

const cornerSquares = [
  { top: "-8px", left: "-8px" },
  { top: "calc(100%)", left: "-8px" },
  { top: "-8px", left: "calc(100%)" },
  { top: "calc(100%)", left: "calc(100%)" },
];

function CornerPill({ label }: { label: string }) {
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

function EcosystemDiagram() {
  return (
    <div className="relative h-[350px] w-[860px]">
      {/* Node center sits at section x≈388 (of 1180) on the live site — cluster is left-shifted */}
      <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center">
        <div className="relative h-[3px] w-[472px] bg-[#333]">
          <div
            aria-hidden="true"
            className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-white"
          />
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <CornerPill label="Soup CLI" />
          </div>
        </div>
        <div className="relative h-8 w-8 rounded-full bg-[#333]">
          <div
            aria-hidden="true"
            className="absolute inset-0 m-auto h-3 w-3 bg-white"
          />
        </div>
      </div>
      {ecosystemNodes.map((node) => (
        <div
          key={node.label}
          className="absolute h-[2px] w-[150px] bg-[#333]"
          style={{
            left: "488px",
            top: "calc(50% - 1px)",
            transform: `rotate(${node.angle}deg)`,
            transformOrigin: "0 50%",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute right-0 top-1/2 h-3 w-3 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#333]"
          />
          <p
            className="absolute left-[160px] top-1/2 -translate-y-1/2 whitespace-nowrap text-[16px] leading-[25.6px] tracking-[0.16px] text-black"
            style={{ fontFamily: "var(--site-sans)" }}
          >
            {node.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="mx-auto flex w-full max-w-[1180px] flex-col py-[50px] min-[810px]:h-[900px]">
      <div className="relative h-[524px] w-full overflow-visible max-[810px]:hidden">
        <div className="absolute left-0 top-[57px]">
          <EcosystemDiagram />
        </div>
      </div>
      <div className="relative h-[260px] w-full overflow-visible min-[810px]:hidden">
        <div
          className="absolute left-0 top-1/2"
          style={{ transform: "translateY(-50%) scale(0.5)" }}
        >
          <EcosystemDiagram />
        </div>
      </div>
      <div className="flex flex-col items-center gap-[5px] px-7">
        <h3
          className="text-center text-[44px] leading-[52.8px] font-normal text-black"
          style={{ fontFamily: "var(--site-sans)" }}
        >
          Built for the Modern ML Stack
        </h3>
        <p
          className="max-w-[440px] text-center text-[14px] leading-[22.4px] tracking-[0.14px] text-[rgb(84,84,84)]"
          style={{ fontFamily: "var(--site-sans)" }}
        >
          First-class integrations with the models, runtimes, serving engines, and trackers powering production ML.
        </p>
      </div>
    </section>
  );
}
