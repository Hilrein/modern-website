import { customers } from "./content";

function MarqueeItem({ customer, hidden }: { customer: string; hidden?: boolean }) {
  return (
    <p
      aria-hidden={hidden}
      className="whitespace-nowrap"
      style={{
        fontFamily: "var(--site-sans)",
        fontSize: "14px",
        lineHeight: "22.4px",
        letterSpacing: "0.14px",
        color: "rgb(84, 84, 84)",
      }}
    >
      {customer}
    </p>
  );
}

function MarqueeCopy({ hidden }: { hidden?: boolean }) {
  // The 8-item list repeated twice so one copy (≈1700px) always
  // covers the 1062px window — no empty gap at any animation phase
  const doubled = [...customers, ...customers];
  return (
    <div className="flex shrink-0 items-center gap-[50px] pr-[50px]">
      {doubled.map((customer, i) => (
        <MarqueeItem key={`${customer}-${i}`} customer={customer} hidden={hidden} />
      ))}
    </div>
  );
}

export function CustomersMarquee() {
  return (
    <section className="mx-auto flex h-[187px] w-full max-w-[1180px] flex-col items-center gap-[30px] py-[50px]">
      <p
        className="w-[320px] text-center"
        style={{
          fontFamily: "var(--site-sans)",
          fontSize: "14px",
          lineHeight: "22.4px",
          letterSpacing: "0.14px",
          color: "rgb(84, 84, 84)",
        }}
      >
        Supported Architectures &amp; Frameworks
      </p>
      <div className="w-full overflow-clip">
        <div className="mx-auto w-[1062px] max-w-full overflow-clip">
          {/* Each copy is a group whose width includes the trailing gap,
              so translating -50% lands exactly on the next copy — no seam */}
          <div
            className="flex w-max items-center"
            style={{ animation: "site-marquee 21s linear infinite" }}
          >
            <MarqueeCopy />
            <MarqueeCopy hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
