"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

interface TerminalTab {
  id: string;
  name: string;
  title: string;
  command: string;
  description: string;
  outputLines: string[];
  stats?: { label: string; value: string }[];
}

const TERMINAL_TABS: TerminalTab[] = [
  {
    id: "streaming",
    name: "Layer Streaming",
    title: "soup · DPO over layer streaming",
    command: "soup train --config soup.yaml",
    description:
      "Hold the frozen base model in RAM or NVMe. Stream one decoder layer onto the GPU at a time on a dedicated CUDA stream.",
    outputLines: [
      "$ cat soup.yaml",
      "base: Qwen/Qwen2.5-3B",
      "task: dpo                  # sft, dpo, orpo, simpo and kto all stream",
      "data:",
      "  train: ./prefs.jsonl",
      "  format: dpo",
      "  max_length: 512          # a paired loss sends 2x the rows; size it down",
      "training:",
      "  stream_layers: true      # base streams from RAM, only the adapter trains",
      "  quantization: 4bit       # NF4: ~4x smaller store",
      "  stream_source: auto      # RAM when it fits, NVMe disk when it does not",
      "  batch_size: 1            # kto needs 2 or more; the pre-flight sizes the rest",
      "  lora: { r: 16, target_modules: [q_proj, v_proj] }",
      "",
      "$ soup train --config soup.yaml",
      "Preparing layer shards -> ~/.soup/layer-stream/Qwen__Qwen2.5-3B",
      "Layer streaming is BETA: slower than resident training, but this",
      "model may not run resident on this card at all.",
      "",
      "# reference model = this same streamed base, adapters disabled",
      "# one set of weights, one RAM store, one buffer pool",
      "> Streaming: Layer 1/36 loaded in 4.2ms (CUDA Stream 1)",
      "> Streaming: Layer 12/36 loaded in 4.1ms [=========>                 ]",
      "> Step 120/1000 | Loss: 0.421 | VRAM: 3.32 GB / 4.00 GB (83%) | 119.6 tok/s",
      "✓ Memory bound: Peak 3.32 GB strictly within 4 GB laptop ceiling",
    ],
    stats: [
      { label: "Peak VRAM", value: "3.32 GB" },
      { label: "Hardware", value: "4 GB Laptop GPU" },
      { label: "Throughput", value: "119.6 tok/s" },
      { label: "DPO Ref Cost", value: "0 MB extra" },
    ],
  },
  {
    id: "migration",
    name: "Config Migration",
    title: "soup migrate --from llamafactory",
    command: "soup migrate --from llamafactory config.yaml",
    description:
      "One command converts your existing training recipe. No rewriting, no guessing, zero lock-in.",
    outputLines: [
      "$ soup migrate --from llamafactory config.yaml",
      "Reading LLaMA-Factory configuration...",
      "✓ Detected stage: sft, finetuning_type: lora, quantization: 4",
      "✓ Preserved: batch_size: 4, gradient_accumulation_steps: 4",
      "✓ Preserved: lora_rank: 64, lora_alpha: 16, lora_dropout: 0.05",
      "✓ Converted target_modules to: auto",
      "✓ Generated ./soup.yaml in 0.08s",
      "",
      "$ head -n 14 soup.yaml",
      "base: meta-llama/Llama-3.1-8B",
      "task: sft",
      "data:",
      "  train: ./alpaca_en.jsonl",
      "  format: auto",
      "  max_length: 2048",
      "training:",
      "  epochs: 3",
      "  lr: 2.0e-05",
      "  batch_size: 4",
      "  gradient_accumulation_steps: 4",
      "  quantization: 4bit",
      "  lora: { r: 64, alpha: 16, dropout: 0.05, target_modules: auto }",
      "output: ./saves/llama3-lora",
    ],
    stats: [
      { label: "Conversion Time", value: "< 1 second" },
      { label: "Compatibility", value: "100% Parameter Match" },
      { label: "Supported Tools", value: "LLaMA-Factory, Axolotl, Unsloth" },
    ],
  },
  {
    id: "ship",
    name: "Ship Gate (CI)",
    title: "soup ship · commit gate for weights",
    command: "soup ship --checkpoint ./saves/best",
    description:
      "Evaluate models against eight offline benchmark suites. Commit one verified SHIP or DON'T-SHIP verdict next to the weights.",
    outputLines: [
      "$ soup ship --checkpoint ./saves/checkpoint-best",
      "Running 8 offline benchmark evaluation suites...",
      "  [1/8] GSM8k (5-shot)         : 79.4% (+2.1% vs base)  ✓ PASS",
      "  [2/8] ARC-Challenge (25-shot): 64.8% (+1.4% vs base)  ✓ PASS",
      "  [3/8] MMLU (5-shot)          : 68.2% (-0.3% vs base)  ✓ PASS (within noise floor)",
      "  [4/8] TruthfulQA (0-shot)    : 54.1% (+4.8% vs base)  ✓ PASS",
      "  [5/8] HumanEval+ (0-shot)    : 42.6% (+6.2% vs base)  ✓ PASS",
      "  [6/8] IFEval (prompt-strict) : 71.9% (+3.0% vs base)  ✓ PASS",
      "  [7/8] Canary memorization    : 0 / 100 exposed        ✓ PASS",
      "  [8/8] Forgetting check       : Zero catastrophic loss ✓ PASS",
      "",
      "======================================================================",
      "VERDICT: SHIP",
      "Attestation: sha256:4a8b79e1... signed evidence emitted to ship_verdict.json",
      "Exit code: 0 (CI gate passed, weights ready to deploy)",
    ],
    stats: [
      { label: "Benchmark Suites", value: "8 offline suites" },
      { label: "Gate Verdict", value: "SHIP (Exit 0)" },
      { label: "Attestation", value: "SLSA-3 Provenance" },
    ],
  },
  {
    id: "doctor",
    name: "Data Doctor & Moat",
    title: "soup data doctor · pre-flight checks",
    command: "soup data doctor --train ./dataset.jsonl",
    description:
      "Catch silent failures before spending a GPU hour. Audit chat templates, detect EOS bugs, and insert secret memorization canaries.",
    outputLines: [
      "$ soup data doctor --train ./dataset.jsonl",
      "Auditing dataset: 24,500 rows...",
      "  ✓ Chat template validation: Llama-3.1 format intact",
      "  ✓ EOS token check: <|eot_id|> present on all turns (No runaway generation)",
      "  ✓ Semantic near-duplicates: 312 reworded duplicates flagged and pruned",
      "  ✓ Topic coverage map: 18 clusters mapped via c-TF-IDF (No thin topics)",
      "  ✓ Memorization canaries: 10 Secret Sharer canaries inserted into shard_04",
      "",
      "$ soup advise --dataset ./dataset.jsonl",
      "Method Recommendation: SFT + DPO alignment",
      "Peak VRAM Estimate: 3.32 GB (Layer Streaming NF4)",
      "Predicted Speed: 119.6 tok/s on 4 GB laptop GPU",
      "✓ Safety pre-flight complete. Zero unaddressed data defects.",
    ],
    stats: [
      { label: "Template Checks", value: "8 checks" },
      { label: "Deduplication", value: "Semantic Embedding Cosine" },
      { label: "Canaries", value: "Secret Sharer Probes" },
    ],
  },
  {
    id: "mcp",
    name: "Agent MCP Bridge",
    title: "soup mcp serve · AI coding agent tools",
    command: "soup mcp serve --transport stdio",
    description:
      "Drive Soup directly from Claude Code, Cursor, Cline, or Continue. 14 read-only tools and gated execution behind security tokens.",
    outputLines: [
      "$ soup mcp serve --transport stdio",
      "[MCP] Initialized Soup Model Context Protocol Server",
      "[MCP] Tools registered:",
      "  - soup_doctor: Audit dataset & hardware capabilities",
      "  - soup_advise: Recommend training method & hyperparameters",
      "  - soup_plan: Generate zero-drift training execution plan",
      "  - soup_train: Stream layers and execute fine-tuning loop",
      "  - soup_ship: Run 8 benchmark suites and verify gate",
      "[MCP] Connected to client session (Claude Code / Cursor)",
      'Agent: "Running pre-flight data audit and starting layer-streamed LoRA run..."',
      "✓ Execution confirmed via one-time authorization token",
    ],
    stats: [
      { label: "Protocol", value: "Model Context Protocol (MCP)" },
      { label: "Available Tools", value: "14 read, 2 plan, 2 exec" },
      { label: "Security", value: "Bearer token & DNS rebinding guard" },
    ],
  },
];

export function TerminalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const [activeTabId, setActiveTabId] = useState("streaming");
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeTab =
    TERMINAL_TABS.find((t) => t.id === activeTabId) || TERMINAL_TABS[0];

  const isTyping =
    hasEnteredView && visibleLineCount < activeTab.outputLines.length;

  // IntersectionObserver: trigger animation only when user scrolls to this section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleTabChange = (id: string) => {
    setActiveTabId(id);
    if (hasEnteredView) {
      setVisibleLineCount(0);
    }
  };

  // Run typing animation ONLY after the user has reached the terminal section
  useEffect(() => {
    if (!hasEnteredView) return;

    let current = 0;
    const totalLines = activeTab.outputLines.length;

    const interval = setInterval(() => {
      current += 1;
      setVisibleLineCount(current);

      if (terminalBodyRef.current) {
        terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
      }

      if (current >= totalLines) {
        clearInterval(interval);
      }
    }, 65);

    return () => clearInterval(interval);
  }, [hasEnteredView, activeTabId, activeTab.outputLines.length]);

  const handleCopy = () => {
    const fullText = activeTab.outputLines.join("\n");
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReplay = () => {
    setVisibleLineCount(0);
    let current = 0;
    const totalLines = activeTab.outputLines.length;

    const interval = setInterval(() => {
      current += 1;
      setVisibleLineCount(current);
      if (terminalBodyRef.current) {
        terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
      }
      if (current >= totalLines) {
        clearInterval(interval);
      }
    }, 65);
  };

  const handleShowAll = () => {
    setVisibleLineCount(activeTab.outputLines.length);
  };

  return (
    <section
      ref={sectionRef}
      id="terminal"
      className="mx-auto flex w-full max-w-[1180px] flex-col gap-8 px-7 py-[60px]"
      style={{ fontFamily: "var(--site-sans)" }}
    >
      <div className="flex flex-col items-center gap-3">
        <span
          className="bg-black px-2.5 py-1 text-[12px] font-mono uppercase tracking-widest text-white"
          style={{ letterSpacing: "0.1em" }}
        >
          Interactive Terminal
        </span>
        <h3 className="text-center text-[40px] leading-[48px] font-normal text-black min-[810px]:text-[48px] min-[810px]:leading-[56px]">
          The Post-Training Stack in Action
        </h3>
        <p className="max-w-[560px] text-center text-sm leading-[22.4px] text-[rgb(84,84,84)]">
          Explore the exact CLI workflows: exact layer streaming, one-command config migration, cryptographic SHIP gates, and data health audits.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {TERMINAL_TABS.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`rounded-[18px] px-3.5 py-1.5 text-xs font-mono transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-black text-white shadow-md scale-105"
                  : "bg-[rgba(0,0,0,0.05)] text-[rgb(84,84,84)] hover:bg-[rgba(0,0,0,0.1)] hover:text-black"
              }`}
            >
              [ {tab.name} ]
            </button>
          );
        })}
      </div>

      {/* Terminal Window with Animated Glow */}
      <Reveal className="mx-auto w-full max-w-[940px]">
        <div className="terminal-animated-glow overflow-hidden rounded-xl border border-[#2B2B2B] bg-[#0C0C0C] text-[#E0E0E0] shadow-2xl transition-all duration-300">
          {/* Top Titlebar */}
          <div className="flex items-center justify-between border-b border-[#252525] bg-[#141414] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57] transition-transform hover:scale-110" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e] transition-transform hover:scale-110" />
              <span className="h-3 w-3 rounded-full bg-[#28c840] transition-transform hover:scale-110" />
              <span className="ml-2 font-mono text-xs text-[#8A8A8A]">
                {activeTab.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {!hasEnteredView ? (
                <div className="flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono text-[#777]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#555]" />
                  <span>READY</span>
                </div>
              ) : isTyping ? (
                <div className="flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono text-[#47E6C3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#47E6C3] animate-ping" />
                  <span>RUNNING</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleReplay}
                  className="flex items-center gap-1 rounded border border-[#333] bg-[#1A1A1A] px-2 py-0.5 font-mono text-[11px] text-[#888] transition-colors hover:text-white cursor-pointer"
                  title="Replay terminal animation"
                >
                  <span>↻ Replay</span>
                </button>
              )}

              {isTyping && (
                <button
                  type="button"
                  onClick={handleShowAll}
                  className="rounded border border-[#333] bg-[#1A1A1A] px-2 py-0.5 font-mono text-[11px] text-[#888] transition-colors hover:text-white cursor-pointer"
                >
                  Skip
                </button>
              )}

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-md border border-[#333] bg-[#1E1E1E] px-2.5 py-1 font-mono text-[11px] text-[#A0A0A0] transition-colors hover:border-[#555] hover:text-white cursor-pointer"
              >
                <span>{copied ? "✓ Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Terminal Body with Animated Lines */}
          <div
            ref={terminalBodyRef}
            className="h-[380px] overflow-y-auto p-5 font-mono text-xs leading-[20px] sm:text-[13px] sm:leading-[22px] scrollbar-thin scrollbar-thumb-[#333]"
          >
            <pre className="overflow-x-auto whitespace-pre font-mono text-[#D8D8D8]">
              {activeTab.outputLines.slice(0, visibleLineCount).map((line, idx) => {
                const isCommand = line.startsWith("$ ");
                const isComment = line.trim().startsWith("#");
                const isPass = line.includes("✓") || line.includes("PASS");
                const isHeading = line.startsWith("===") || line.startsWith("VERDICT");
                const isStreaming = line.startsWith("> Streaming");

                let colorClass = "text-[#B8B8B8]";
                if (isCommand) colorClass = "text-white font-semibold";
                else if (isComment) colorClass = "text-[#6E6E6E]";
                else if (isPass) colorClass = "text-[#47E6C3]";
                else if (isHeading) colorClass = "text-[#FFBD2E] font-bold";
                else if (isStreaming) colorClass = "text-[#38BDF8]";

                return (
                  <div
                    key={idx}
                    className={`${colorClass} transition-opacity duration-200 animate-fadeIn`}
                    style={{
                      animation: "terminal-line-in 0.15s ease-out both",
                    }}
                  >
                    {line}
                  </div>
                );
              })}

              {/* Animated Blinking Cursor */}
              {isTyping && (
                <div className="flex items-center text-[#47E6C3] mt-0.5">
                  <span className="terminal-cursor text-[14px]">▋</span>
                </div>
              )}
            </pre>
          </div>

          {/* Tab Footer Stats */}
          {activeTab.stats ? (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#252525] bg-[#111111] px-5 py-3 text-xs">
              <div className="text-[11px] text-[#888]">
                {activeTab.description}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {activeTab.stats.map((s) => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <span className="text-[#666] font-mono text-[11px]">
                      {s.label}:
                    </span>
                    <span className="font-mono font-medium text-white text-[11px]">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
