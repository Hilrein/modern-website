import Image from "next/image";
import Link from "next/link";
import { largeTestimonial, testimonialCards } from "./content";
import { Reveal } from "./Reveal";

const CORNER_DOTS = [
  { top: "-4px", left: "-4px" },
  { top: "-4px", right: "-4px" },
  { bottom: "-4px", left: "-4px" },
  { bottom: "-4px", right: "-4px" },
];

function TestimonialCard({
  card,
  variant,
}: {
  card: (typeof testimonialCards)[number];
  variant: "no-right" | "all";
}) {
  const borderCls =
    variant === "no-right"
      ? "border border-dashed border-[#BDBDBD] border-r-0"
      : "border border-dashed border-[#BDBDBD]";
  return (
    <div
      className={`relative flex h-auto min-h-[300px] w-[375px] max-w-full flex-1 flex-col justify-between bg-transparent p-7 min-[810px]:h-[300px] ${borderCls}`}
    >
      {card.activeBoxes ? (
        CORNER_DOTS.map((pos) => (
          <span
            key={`${pos.top}-${pos.left}-${pos.right ?? ""}-${pos.bottom ?? ""}`}
            aria-hidden="true"
            className="absolute z-10 h-2.5 w-2.5 bg-black"
            style={pos}
          />
        ))
      ) : null}
      <div className="flex flex-col gap-1">
        <p
          className="text-[16px] leading-[25.6px] tracking-[0.16px] text-black"
          style={{ fontFamily: "var(--site-sans)" }}
        >
          {card.company}
        </p>
        <p
          className="text-sm leading-[22.4px] tracking-[0.14px] text-[rgb(99,99,99)]"
          style={{ fontFamily: "var(--site-sans)" }}
        >
          {card.overview}
        </p>
      </div>
      <div className="flex flex-row items-end justify-between gap-[10px]">
        <div className="flex flex-col">
          <p
            className="text-[16px] leading-[25.6px] text-black"
            style={{ fontFamily: "var(--site-sans)" }}
          >
            {card.name}
          </p>
          <p
            className="text-sm leading-[22.4px] text-[rgb(99,99,99)]"
            style={{ fontFamily: "var(--site-sans)" }}
          >
            {card.role}
          </p>
        </div>
        <Reveal as="figure" className="h-11 w-11 shrink-0" yOffset={0}>
          <Image
            src={card.imageSrc}
            alt={card.name}
            width={44}
            height={44}
            unoptimized
            loading="eager"
            className="h-11 w-11 object-cover"
          />
        </Reveal>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      className="mx-auto flex max-w-[1180px] flex-col gap-[30px] px-7 py-[50px]"
      style={{ fontFamily: "var(--site-sans)" }}
    >
      <div className="flex flex-col items-center gap-[5px]">
        <h3 className="text-center text-[44px] leading-[52.8px] text-black">
          Empirical Benchmarks &amp; Validation
        </h3>
        <p className="mx-auto max-w-[480px] text-center text-sm leading-[22.4px] text-[rgb(84,84,84)]">
          Every performance number is measured on real hardware rather than claimed. Bit-exact layer streaming validated across nine architecture families.
        </p>
      </div>
      <div className="flex flex-col gap-[10px] min-[810px]:flex-row">
        {testimonialCards.map((card, i) => (
          <TestimonialCard
            key={card.name}
            card={card}
            variant={i === 0 ? "no-right" : "all"}
          />
        ))}
      </div>
      <div className="mt-[20px] flex flex-col gap-6 border border-dashed border-[#BDBDBD] bg-[#F7F7F7] p-7 min-[810px]:flex-row">
        <div className="flex flex-[1.2] flex-row gap-6">
          <Image
            src={largeTestimonial.imageSrc}
            alt={largeTestimonial.name}
            width={300}
            height={300}
            unoptimized
          loading="eager"
            className="h-[300px] w-full object-cover min-[810px]:w-[300px]"
          />
          <div className="flex flex-1 flex-col justify-center gap-2 py-7">
            <p className="text-[20px] leading-8 text-black">
              {largeTestimonial.name}
            </p>
            <p className="text-sm leading-[22.4px] text-[rgb(84,84,84)]">
              {largeTestimonial.role}
            </p>
            <Link
              href={largeTestimonial.ctaHref}
              className="w-fit rounded-[18px] bg-[rgba(0,0,0,0.05)] px-2.5 py-1.5 text-sm leading-[19.6px] tracking-[-0.28px] text-black transition hover:bg-[rgba(0,0,0,0.1)]"
            >
              {largeTestimonial.ctaText}
            </Link>
          </div>
        </div>
        <div className="flex flex-1 flex-col pl-0 pt-0 min-[810px]:pl-7 min-[810px]:pt-0">
          <p className="text-sm leading-[22.4px] tracking-[0.14px] text-[rgb(84,84,84)]">
            {largeTestimonial.quote}
          </p>
        </div>
      </div>
    </section>
  );
}
