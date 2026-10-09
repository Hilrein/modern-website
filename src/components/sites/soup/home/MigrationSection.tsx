"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

interface MigratorOption {
  id: string;
  name: string;
  subtitle: string;
  command: string;
  sourceFilename: string;
  sourceCode: string;
}

const MIGRATOR_OPTIONS: MigratorOption[] = [
  {
    id: "llamafactory",
    name: "LLaMA-Factory",
    subtitle: "Auto-converted to Soup",
    command: "soup migrate --from llamafactory config.yaml",
    sourceFilename: "llama3_lora_sft.yaml",
    sourceCode: `model_name_or_path: meta-llama/Llama-3.1-8B
stage: sft
finetuning_type: lora
lora_rank: 64
lora_alpha: 16
lora_dropout: 0.05
lora_target: all
dataset: alpaca_en
template: llama3
cutoff_len: 2048
per_device_train_batch_size: 4
gradient_accumulation_steps: 4
num_train_epochs: 3
learning_rate: 2.0e-5
lr_scheduler_type: cosine
warmup_ratio: 0.1
quantization_bit: 4
output_dir: ./saves/llama3-lora`,
  },
  {
    id: "axolotl",
    name: "Axolotl",
    subtitle: "Auto-converted to Soup",
    command: "soup migrate --from axolotl config.yml",
    sourceFilename: "axolotl_config.yml",
    sourceCode: `base_model: meta-llama/Llama-3.1-8B
model_type: LlamaForCausalLM
tokenizer_type: AutoTokenizer
load_in_4bit: true
adapter: lora
lora_r: 64
lora_alpha: 16
lora_dropout: 0.05
lora_target_modules:
  - q_proj
  - v_proj
  - k_proj
  - o_proj
sequence_len: 2048
micro_batch_size: 4
gradient_accumulation_steps: 4
num_epochs: 3
learning_rate: 0.00002
optimizer: adamw_torch
lr_scheduler: cosine
output_dir: ./saves/axolotl-llama3`,
  },
  {
    id: "unsloth",
    name: "Unsloth",
    subtitle: "Auto-converted to Soup",
    command: "soup migrate --from unsloth notebook.ipynb",
    sourceFilename: "unsloth_train.py",
    sourceCode: `from unsloth import FastLanguageModel
import torch

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="meta-llama/Llama-3.1-8B",
    max_seq_length=2048,
    load_in_4bit=True,
)

model = FastLanguageModel.get_peft_model(
    model,
    r=64,
    lora_alpha=16,
    lora_dropout=0.05,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
)

training_args = TrainingArguments(
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-5,
    num_train_epochs=3,
)`,
  },
];

const SOUP_OUTPUT_YAML = `base: meta-llama/Llama-3.1-8B
task: sft
data:
  train: ./alpaca_en.jsonl
  format: auto
  max_length: 2048
training:
  epochs: 3
  lr: 2.0e-05
  batch_size: 4
  gradient_accumulation_steps: 4
  scheduler: cosine
  warmup_ratio: 0.1
  quantization: 4bit
  lora:
    r: 64
    alpha: 16
    dropout: 0.05
    target_modules: auto
output: ./saves/llama3-lora`;

export function MigrationSection() {
  const [selectedId, setSelectedId] = useState("llamafactory");
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const selected =
    MIGRATOR_OPTIONS.find((o) => o.id === selectedId) || MIGRATOR_OPTIONS[0];

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(cmd);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <section
      id="migration"
      className="mx-auto flex w-full max-w-[1180px] flex-col gap-[40px] px-7 py-[60px]"
      style={{ fontFamily: "var(--site-sans)" }}
    >
      <div className="flex flex-col items-center gap-3">
        <span
          className="bg-black px-2.5 py-1 text-[12px] font-mono uppercase tracking-widest text-white"
          style={{ letterSpacing: "0.1em" }}
        >
          soup migrate
        </span>
        <h3 className="text-center text-[40px] leading-[48px] font-normal text-black min-[810px]:text-[48px] min-[810px]:leading-[56px]">
          Already using another tool? Switch in 30 seconds
        </h3>
        <p className="max-w-[500px] text-center text-sm leading-[22.4px] text-[rgb(84,84,84)]">
          One command converts your existing training recipe. No rewriting, no guessing — just migrate and train.
        </p>
      </div>

      {/* 3 Tool Cards */}
      <div className="grid grid-cols-1 gap-4 min-[810px]:grid-cols-3">
        {MIGRATOR_OPTIONS.map((tool) => {
          const isSelected = tool.id === selectedId;
          return (
            <div
              key={tool.id}
              onClick={() => setSelectedId(tool.id)}
              className={`flex flex-col justify-between border border-dashed p-6 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-black bg-white shadow-md"
                  : "border-[#DEDEDE] bg-[#F7F7F7] hover:border-[#999]"
              }`}
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[17px] font-semibold text-black">
                    {tool.name}
                  </span>
                  <span className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-mono text-[#666]">
                    auto
                  </span>
                </div>
                <p className="text-xs text-[rgb(99,99,99)]">
                  {tool.subtitle}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#EAEAEA] pt-4">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-[11px] font-mono text-[#888]">$</span>
                  <span className="truncate font-mono text-[11px] text-black">
                    {tool.command}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(tool.command);
                  }}
                  className="ml-2 shrink-0 rounded px-2 py-1 text-[11px] font-mono text-[#666] hover:bg-black hover:text-white transition-colors"
                >
                  {copiedCommand === tool.command ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side-by-side terminal diff */}
      <Reveal className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-wider text-[#666]">
            See the difference · {selected.name} vs Soup
          </p>
          <span className="text-xs text-[rgb(120,120,120)]">
            Exact parameter translation
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[810px]:grid-cols-2">
          {/* Legacy tool config */}
          <div className="overflow-hidden rounded-xl border border-[#DEDEDE] bg-[#FAFAFA] transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] bg-[#F0F0F0] px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] hover:scale-110 transition-transform" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] hover:scale-110 transition-transform" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] hover:scale-110 transition-transform" />
                <span className="ml-1 font-mono text-xs text-[#666]">
                  {selected.sourceFilename}
                </span>
              </div>
              <span className="text-[11px] text-[#888] font-mono">{selected.name}</span>
            </div>
            <pre
              key={`src-${selectedId}`}
              className="max-h-[360px] overflow-auto p-4 font-mono text-[12px] leading-[18px] text-[#444]"
              style={{ animation: "terminal-line-in 0.25s ease-out both" }}
            >
              {selected.sourceCode}
            </pre>
          </div>

          {/* Soup config */}
          <div className="terminal-animated-glow overflow-hidden rounded-xl border border-[#2B2B2B] bg-[#0C0C0C] transition-all duration-300 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#252525] bg-[#141414] px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] hover:scale-110 transition-transform" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] hover:scale-110 transition-transform" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] hover:scale-110 transition-transform" />
                <span className="ml-1 font-mono text-xs text-[#AAA]">
                  soup.yaml (generated)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#47E6C3] font-mono font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#47E6C3] animate-pulse" />
                <span>Ready</span>
              </div>
            </div>
            <pre
              key={`soup-${selectedId}`}
              className="max-h-[360px] overflow-auto p-4 font-mono text-[12px] leading-[18px] text-[#E0E0E0]"
              style={{ animation: "terminal-line-in 0.25s ease-out both" }}
            >
              {SOUP_OUTPUT_YAML}
              {"\n"}
              <span className="terminal-cursor text-[#47E6C3]">▋</span>
            </pre>
          </div>
        </div>

        <p className="text-center font-mono text-xs text-[rgb(99,99,99)]">
          Batch size, learning rate, scheduler, and LoRA hyperparameters carry over automatically; target modules become auto-detected.
        </p>
      </Reveal>
    </section>
  );
}

