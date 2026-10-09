import { trustItems } from "./content";
import { LogoMarkIcon } from "./icons";

export function BookCallSection() {
  return (
    <section id="quickstart" className="mx-auto w-full max-w-[1180px] px-7 py-[50px]">
      <div className="flex min-[810px]:flex-row min-[810px]:gap-[30px] flex-col">
        <div className="flex flex-1 flex-col gap-6">
          <h3
            className="max-w-[547px] text-left text-[44px] leading-[52.8px] font-normal text-black"
            style={{ fontFamily: "var(--site-sans)" }}
          >
            Start Training in One Command
          </h3>
          <p className="max-w-[420px] text-left text-[14px] leading-[22.4px] text-[rgb(84,84,84)]">
            Soup doctors your data pre-flight, writes the config, and gates every save. Install it, point it at your dataset, and your first run finishes on your personal GPU in minutes.
          </p>
          <div className="flex flex-col gap-2.5">
            {trustItems.map((item) => (
              <div
                key={item.text}
                className="flex flex-row items-center gap-3 bg-[#F7F7F7] p-[18px]"
              >
                {item.useLogoMark ? (
                  <LogoMarkIcon className="h-3 w-3 shrink-0 text-black" />
                ) : (
                  <div className="h-3 w-3 shrink-0 bg-black" />
                )}
                <p className="text-[14px] leading-[19.6px] tracking-[0.14px] text-black">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[60px] flex-1 min-[810px]:mt-0">
          <div className="flex h-full min-h-[400px] w-full flex-col justify-between border border-dashed border-[#BDBDBD] bg-[#F7F7F7] p-7 min-[810px]:min-h-[460px] transition-all duration-300 hover:border-black/50 hover:shadow-lg">
            <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] hover:scale-110 transition-transform" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] hover:scale-110 transition-transform" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#28c840] animate-pulse" />
                <span className="font-mono text-[12px] text-[rgb(120,120,120)]">bash · soup-cli</span>
              </div>
            </div>
            <div className="flex flex-col gap-6 py-6 font-mono text-[13px] leading-relaxed">
              <div className="group">
                <p className="mb-1 text-[11px] uppercase tracking-wider text-[rgb(120,120,120)]">
                  # 1. Install training stack
                </p>
                <p className="font-semibold text-black">$ pip install &quot;soup-cli[train]&quot;</p>
              </div>
              <div>
                <p className="mb-1 text-[11px] uppercase tracking-wider text-[rgb(120,120,120)]">
                  # 2. Initialize recipe
                </p>
                <p className="font-semibold text-black">$ soup init</p>
                <p className="text-[12px] text-[rgb(99,99,99)]">✓ Created soup.yaml (Llama-3.1-8B, stream_layers: true)</p>
              </div>
              <div>
                <p className="mb-1 text-[11px] uppercase tracking-wider text-[rgb(120,120,120)]">
                  # 3. Stream &amp; train offline
                </p>
                <p className="font-semibold text-black flex items-center gap-1">
                  <span>$ soup train</span>
                  <span className="terminal-cursor text-black">▋</span>
                </p>
                <p className="text-[12px] text-[rgb(99,99,99)]">
                  &gt; Streaming layers from RAM... 119.6 tok/s (peak: 3.32 GB)
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-[#E0E0E0] pt-4">
              <span className="text-[12px] text-[rgb(120,120,120)]">Python 3.10–3.12 · Apache-2.0</span>
              <a
                href="https://pypi.org/project/soup-cli/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-medium text-black underline hover:text-[rgb(84,84,84)]"
              >
                View on PyPI →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
