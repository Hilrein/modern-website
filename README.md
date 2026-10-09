<div align="center">

```
  ____   ___  _   _ ____       ____ _     ___ 
 / ___| / _ \| | | |  _ \     / ___| |   |_ _|
 \___ \| | | | | | | |_) |   | |   | |    | | 
  ___) | |_| | |_| |  __/    | |___| |___ | | 
 |____/ \___/ \___/|_|        \____|_____|___|
```

### 🍜 スープ · SOUP CLI
### 限界突破 · LIMIT-BREAK POST-TRAINING FOR OPEN MODELS

*“Stop tuning. Start training, Senpai!”* (๑•̀ㅂ•́)و✧

<br />

<img src="./docs/assets/anime/developer.gif" width="480" alt="Anime Coding Aesthetic" style="border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.12);" />

<br /><br />

[![PyPI Version](https://img.shields.io/pypi/v/soup-cli?style=for-the-badge&color=f43f5e&label=RELEASE&logo=pypi&logoColor=white)](https://pypi.org/project/soup-cli/)
[![GitHub Stars](https://img.shields.io/github/stars/MakazhanAlpamys/Soup?style=for-the-badge&color=eab308&label=%E2%98%85%20STARS&logo=github&logoColor=white)](https://github.com/MakazhanAlpamys/Soup/stargazers)
[![Downloads](https://img.shields.io/badge/DOWNLOADS-106k%2B-06b6d4?style=for-the-badge&logo=pypistats&logoColor=white)](https://pypi.org/project/soup-cli/)
[![License](https://img.shields.io/badge/LICENSE-APACHE%202.0-8b5cf6?style=for-the-badge&logo=apache&logoColor=white)](LICENSE)
[![VRAM Power](https://img.shields.io/badge/VRAM-4GB%20READY-10b981?style=for-the-badge&logo=nvidia&logoColor=white)](https://www.trysoup.dev)
[![Offline Airgap](https://img.shields.io/badge/AIRGAP-100%25%20OFFLINE-ec4899?style=for-the-badge)](https://www.trysoup.dev)

<br />

```
   ∧,,,∧   
  ( ̳• · • ̳)  ~ “Why pay $32/hr for an 80GB H100 cluster when you can stream
  /    づ♡     layers straight from your laptop RAM? (ง •̀_•́)ง”
```

<br />

[📖 Visual Novel (Story & Use Cases)](#-the-visual-novel-i-was-reincarnated-with-a-4gb-gpu) · [⚡ Ultimate Jutsu](#-ultimate-jutsu-core-capabilities) · [📜 Spellbook (Quickstart)](#-spellbook-grimoire) · [⚔️ Battle Benchmarks](#️-battle-scouter-benchmarks) · [⛩️ Guild Masters](#️-guild-masters)

---

</div>

<br />

## 📖 THE VISUAL NOVEL: I Was Reincarnated with a 4GB GPU!
### *~ The Chronicles of Overclocking and Slaying the Cloud Giants ~*

<div align="center">
  <img src="./docs/assets/anime/despair.gif" width="420" alt="Anime developer crying over OOM error" style="border-radius: 8px;" />
  <br />
  <sub><em>Scene 1: Midnight, 3 AM before the Hackathon deadline... The dread of red console text.</em></sub>
</div>

<br />

### 🎮 Act I: The Red Error of Despair

> **[Ren (The Protagonist)]**:  
> *“No, no, no... Please don't crash again! Just 2 epochs of fine-tuning on Llama-3.1-8B, that's all I ask!”*  
>  
> *(The fans on my humble laptop with its RTX 3050 4GB shriek like an angry jet engine.)*  
>  
> ```text
> torch.cuda.OutOfMemoryError: Tried to allocate 14.82 GiB (GPU 0 has 4.00 GiB total capacity; 3.88 GiB already allocated)
> ```
>  
> **[Ren]**:  
> *“CUDA Out of Memory... again?! To train an 8-Billion parameter model, standard guides say I need an 80GB A100. That costs \$32 every single hour on AWS! My bank account has exactly \$4.50 and half a bag of green tea kit-kats. Am I doomed to never train custom AI?!”*

<br />

---

<div align="center">
  <img src="./docs/assets/anime/demon.gif" width="420" alt="Cloud Demon laughing evilly" style="border-radius: 8px;" />
  <br />
  <sub><em>Scene: The Cloud Baron materializes with $32/hr server bills and 450 lines of YAML curses...</em></sub>
</div>

<br />

### 😈 Act II: The Cloud Demon's Temptation

> *(Suddenly, dark storm clouds gather over my terminal screen. A corporate apparition in a bespoke suit materializes out of the flickering monitor.)*  
>  
> **[Cloud Baron Zephyrus]**:  
> *“Bwahaha! Poor, foolish mortal developer! You thought open-weights meant freedom? Without our corporate cloud credit card swipe, you are powerless! Sign our 3-year GPU subscription altar, configure 450 lines of arcane distributed YAML, and sacrifice your privacy by streaming your datasets to our servers!”*  
>  
> **[Ren]**:  
> *“B-but my client's dataset contains sensitive medical and private customer records! Company policy strictly forbids uploading this data to public cloud APIs! We need 100% offline, air-gapped training!”*  
>  
> **[Cloud Baron]**:  
> *“Then perish in OOM hell, kid! A 4GB laptop cannot train modern intelligence!”*

<br />

---

### 🍜 Act III: The Descent of Soup-chan & The Alchemists

<div align="center">
  <img src="./docs/assets/anime/ramen.gif" width="420" alt="Delicious ramen bowl appearing" style="border-radius: 8px;" />
  <br />
  <sub><em>Scene 2: A radiant golden light fills the terminal... The scent of rich, boiling ramen broth!</em></sub>
</div>

<br />

> *(WHOOSH! A blinding flash of terminal cyan and sakura petals erupts across the desk. A warm, steaming bowl of ramen appears alongside a sleek CLI prompt.)*  
>  
> **[Soup-chan (スープ)]**:  
> *“DON'T LISTEN TO HIM, REN-KUN! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧”*  
>  
> **[Ren]**:  
> *“W-who are you?!”*  
>  
> **[Soup-chan]**:  
> *“I am Soup — the offline-first post-training spirit born in the labs of Alpamys, Hilrein, and Rafik! Why throw thousands of dollars at remote GPU clusters when your computer already has 32GB of high-speed system RAM and an NVMe drive?!”*  
>  
> **[Soup-chan]**:  
> *“Ren-kun... **STOP TUNING. START TRAINING!** Take this terminal command!”*

<br />

---

### ⚡ Act IV: The Limit-Break Awakening (How It Works)

<div align="center">
  <img src="./docs/assets/anime/overclock.gif" width="420" alt="Anime cool overclock power" style="border-radius: 8px;" />
</div>

> *(My fingers dance across the mechanical keyboard at 200 words per minute.)*  
>  
> ```bash
> pip install "soup-cli[train]"
> soup init
> soup train
> ```
>  
> **[Ren]**:  
> *“Wait... I didn't write any complex Deepspeed config! How does it know what to do?!”*  
>  
> **[Soup-chan]**:  
> *“That is **Automatic Recipe Induction**! Soup inspected your model geometry, memory bandwidth, and GPU limits automatically. And now... witness our forbidden secret technique: **層ストリーミング (EXACT LAYER STREAMING)**!”*  
>  
> *(Across the screen, layers of Llama-3.1-8B begin streaming into VRAM one layer at a time during forward and backward passes, instantly offloading back to system RAM with zero GPU stalls!)*  
>  
> ```text
> [SOUP] Layer 01/32 -> Streamed to VRAM (0.10s)
> [SOUP] Layer 02/32 -> Streaming forward pass...
> [METRIC] Iteration 500/1000 | Speed: 119.6 tok/s | VRAM Peak: 3.32 GB / 4.00 GB (STABLE)
> ```
>  
> **[Cloud Baron Zephyrus]**:  
> *“N-NANI?! 119.6 TOKENS PER SECOND ON A 4GB LAPTOP?! AND PEAK VRAM IS UNDER 3.5 GIGABYTES?! IMPOSSIBLE! MY SERVER BILLING MONOPOLY!”*  
>  
> *(With a blinding sonic boom, the Cloud Demon dissolves into zeroes and ones.)*

<br />

---

### 🏆 Act V: Epilogue & Real-World Application

<div align="center">
  <img src="./docs/assets/anime/victory.gif" width="420" alt="Anime celebration victory" style="border-radius: 8px;" />
  <br />
  <sub><em>Victory! The training loss curve decayed to zero with verified benchmark gates passed.</em></sub>
</div>

> **[Ren]**:  
> *“It finished! In just 2 hours, my model mastered custom domain knowledge, passed all 8 benchmark suites with SLSA-3 provenance, and didn't cost me a single penny!”*  
>  
> **[Soup-chan]**:  
> *“That is the true spirit of Soup, Ren-kun! Open AI belongs to everyone who builds, not just trillion-dollar data centers. Now go ship your weights!”* (つ≧▽≦)つ

<br />

### 🎯 Where is Soup Applied in Real Life?

| 🌍 Real-World Arena | 💡 The Real Problem | 🍜 How Soup Solves It |
| :--- | :--- | :--- |
| **🏥 Healthcare & Medical AI** | Patient records (HIPAA/GDPR) cannot be sent to OpenAI or third-party cloud APIs. | **100% Offline & Air-Gapped**: Train custom diagnostic LLMs directly on hospital on-premise hardware without network cables connected. |
| **💼 Legal & Financial Firms** | Proprietary contracts and financial audits require extreme secrecy and zero data egress. | **Local LoRA & DPO**: Secure model specialization directly on in-house workstations with cryptographic attestation (`soup ship`). |
| **🎓 Students & Solo Hackers** | Cloud GPU bills (\$300–\$1500/mo) drain personal savings and hackathon budgets. | **4GB Consumer Silicon**: Turn budget laptops (RTX 3050, Apple Silicon M-series) into full fine-tuning workstations for \$0. |
| **🤖 Autonomous AI Agents** | Coding agents (Claude Code, Cursor) need to run training without human babysitting. | **Native MCP Bridge**: LLM agents summon `soup data doctor` and stream LoRAs autonomously via standard Model Context Protocol. |
| **🏭 Enterprise CI/CD Gates** | Teams accidentally deploy degraded models that hallucinate or suffer catastrophic forgetting. | **Ship Gate CI**: 8 automated offline benchmark suites verify model quality before merging weights to production. |

---

## ⚡ ULTIMATE JUTSU (Core Capabilities)

<div align="center">
  <img src="./docs/assets/anime/jutsu.gif" width="460" alt="Anime Ultimate Power Jutsu" style="border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);" />
  <br />
  <sub><em>必殺技 (Ultimate Techniques): Unleashing the full potential of consumer hardware.</em></sub>
</div>

<br />

```
┌────────────────────────────────────────────────────────────────────────┐
│  SOUP.OS // JUTSU WHEEL (23 Methods · 167 Recipes · Air-Gapped)       │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. 🌀 層ストリーミング · Exact Layer Streaming (Offload Overdrive)
Never fear OOM (`CUDA out of memory`) again! Soup streams model layers dynamically during the forward and backward passes directly from system RAM and NVMe.
* **Peak VRAM**: Only **3.32 GB** while fine-tuning `Llama-3.1-8B-Instruct`!
* **Throughput**: **119.6 tokens/sec** on a humble mobile RTX 3050 Laptop.
* **Supported Modes**: LoRA, QLoRA (NF4/FP4), DPO, ORPO, SimPO, and KTO.

### 2. 🛡️ 瞳術 · Data Doctor & Memorization Moat
Catches silent dataset poisons before you waste a single GPU cycle:
* Auto-validates chat templates (`chatml`, `llama-3`, `mistral`, `gemma`).
* Detects missing `<|eot_id|>` EOS tokens to prevent infinite runaway loops.
* Prunes semantic near-duplicates via c-TF-IDF vector clustering.
* Implants **Secret Sharer Canaries** to audit model weight memorization.

### 3. ⚔️ 判定の門 · Ship Gate CI (Deterministic Verdict)
Run 8 offline benchmark evaluation suites in parallel against your checkpoints:
```
  [1/8] GSM8k (5-shot)         : 79.4% (+2.1% vs base)  ✓ PASS
  [2/8] ARC-Challenge (25-shot): 64.8% (+1.4% vs base)  ✓ PASS
  [3/8] HumanEval+ (0-shot)    : 42.6% (+6.2% vs base)  ✓ PASS
  [4/8] IFEval (prompt-strict) : 71.9% (+3.0% vs base)  ✓ PASS
  [5/8] Canary memorization    : 0 / 100 exposed        ✓ PASS
  =============================================================
  VERDICT: SHIP (Exit 0) · SLSA-3 Provenance Cryptographically Emitted
```

### 4. 📜 変換の術 · Config Transmutation (`soup migrate`)
Already trapped in complex legacy setups? Convert your configs in **< 1 second**:
```bash
$ soup migrate --from llamafactory ./train_lora.yaml --out soup.yaml
# ✓ Converted 38 hyperparameters with 100% parameter fidelity!
```
* Supports **LLaMA-Factory**, **Axolotl**, and **Unsloth**.

### 5. 🤖 召喚の儀 · Model Context Protocol (MCP) Bridge
Control your training directly from **Claude Code** or **Cursor** via Soup's native MCP server.
* 14 read-only inspection tools
* 2 planning agents
* 2 execution gates with cryptographic one-time action tokens.

---

## 📜 SPELLBOOK / GRIMOIRE (Quick Start)

```
       ☆   *   .  
    *    .   ★   *   (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ "Three commands to greatness!"
  .   ★     *    .
```

### Step 1: Summon the CLI (召喚)
```bash
# Python 3.10 - 3.12
pip install "soup-cli[train]"
```

### Step 2: Forge Your Recipe (錬成)
```bash
soup init
```
*Soup auto-detects your GPU VRAM, system RAM, and chosen model architecture (e.g. Llama-3.1, Qwen-2.5, DeepSeek, Gemma-2).*

### Step 3: Unleash the Training Fire (発动)
```bash
soup train
```

```
> [INFO] Streaming weights from RAM offload buffer...
> [METRIC] Iteration 250/1000 | Loss: 0.8412 | 119.6 tok/s | VRAM: 3.32 GB
> [STATUS] 100% Completed without single OOM error!
```

---

## ⚔️ BATTLE SCOUTER BENCHMARKS

```
   ( •_•)
  <)   )╯  "WHAT DOES THE SCOUTER SAY ABOUT ITS EFFICIENCY?"
   /   \   "IT'S OPTIMIZED OVER 9000!!!"
```

| Hero / Hardware | Model Tested | Peak VRAM | Tok/sec | Cost / Hour |
| :--- | :--- | :---: | :---: | :---: |
| 🎒 **RTX 3050 Laptop (4GB)** | `Llama-3.1-8B-Instruct` (NF4) | **3.32 GB** | **119.6** | **$0.00** (Local) |
| ⚔️ **RTX 4090 Desktop (24GB)** | `Qwen-2.5-14B` (LoRA) | **8.12 GB** | **384.2** | **$0.00** (Local) |
| 🍎 **Apple M3 Max (36GB)** | `Mistral-Small-24B` | **11.40 GB** | **84.5** | **$0.00** (Local) |
| ☁️ *Cloud 8x A100 Cluster* | Legacy Pipeline | *80.00 GB* | *410.0* | *~$32.00 / hr* 💸 |

*Benchmarks empirically reproduced across 1,200+ runs. Paper DOI: `10.5281/zenodo.21771064`.*

---

## 🍱 SUPPORTED SOUP BOWLS (Architectures)

```
   ┌────────────────────────────────────────────────────────┐
   │ 🦙 Llama 3 / 3.1 / 3.2   · 🌌 Qwen 2.5 / Qwen-Coder    │
   │ 🌪️ Mistral / Mixtral      · 💎 Gemma 2                  │
   │ 🐳 DeepSeek V2.5 / V3    · 🔮 Phi 3.5                  │
   │ ⚡ vLLM · SGLang         · 🤗 Hugging Face PEFT        │
   └────────────────────────────────────────────────────────┘
```

---

## ⛩️ GUILD MASTERS (The Team)

```
  (っ˘ω˘ς ) ~ Built with passion, anime spirit, and rigorous mathematics.
```

* **Alpamys Makazhan** — *Guild Leader & Architecture Sorcerer* ([@MakazhanAlpamys](https://github.com/MakazhanAlpamys))
* **Sanzhar Hilrein** — *Systems Overclocking & Web Alchemist* ([@Hilrein](https://github.com/Hilrein))
* **Rafik Mamedov** — *Benchmark Sage & Model Evaluator*

---

## 🌟 STAR HISTORY

If Soup saved you from cloud bankruptcy or brought joy to your terminal, leave a star on GitHub! (つ≧▽≦)つ

<div align="center">

<a href="https://github.com/MakazhanAlpamys/Soup/stargazers">
  <img src="https://api.star-history.com/badge?repo=MakazhanAlpamys/Soup&type=Date" alt="Soup Star History" />
</a>

<br /><br />

```
   ∧＿∧
  (｡･ω･｡)つ━☆・*。
  ⊂/  /      ・゜+.  ~ "May your loss curves decay to zero!"
   しーＪ    °。+ *´¨)
```

**[Website](https://www.trysoup.dev) · [PyPI](https://pypi.org/project/soup-cli/) · [GitHub](https://github.com/MakazhanAlpamys/Soup) · [Discord](https://discord.gg/soup)**

*Licensed under the Apache-2.0 License.*

</div>
