import type {
  FeatureCard,
  PricingTier,
  TestimonialCard,
  FaqItem,
  TrustItem,
  FooterColumn,
  NavLink,
} from "./types";
import {
  featureAsciiBlue,
  featureAsciiMagenta,
  featureAsciiGreen,
  featureAsciiYellow,
  featureAsciiScaleCorrected,
} from "./ascii-art";

const ASSET = "/sites/soup/home";

export const siteAsset = ASSET;

export const navLinksLeft: NavLink[] = [
  { label: "Terminal", href: "#terminal" },
  { label: "Features", href: "#features" },
];

export const navLinksRight: NavLink[] = [
  { label: "Migrate", href: "#migration" },
  { label: "Pricing", href: "#pricing" },
];

export const mobileMenuGroups = [
  {
    heading: "Product",
    links: [
      { label: "Home", href: "/" },
      { label: "Terminal", href: "#terminal" },
      { label: "Features", href: "#features" },
      { label: "Migrate", href: "#migration" },
      { label: "Ecosystem", href: "#ecosystem" },
      { label: "Pricing", href: "#pricing" },
      { label: "Docs", href: "https://trysoup.dev/docs" },
      { label: "Soup Zero", href: "https://trysoup.dev/zero" },
    ],
  },
  {
    heading: "Community & Code",
    links: [
      { label: "GitHub", href: "https://github.com/MakazhanAlpamys/Soup" },
      { label: "PyPI", href: "https://pypi.org/project/soup-cli/" },
      { label: "Discord", href: "https://discord.gg/dgd2pJcjwP" },
      { label: "Telegram", href: "https://t.me/souptasters" },
      { label: "Contact", href: "mailto:team@trysoup.dev" },
    ],
  },
];

export const customers = [
  "Llama 3.1",
  "Qwen 2.5",
  "DeepSeek-V3",
  "Mistral Large",
  "Gemma 3",
  "Apple MLX",
  "Hugging Face",
  "vLLM",
  "Ollama",
  "Unsloth",
  "DeepSpeed",
  "FlashAttention",
  "Whisper ASR",
  "Phi-4",
];

export const featureCards: FeatureCard[] = [
  {
    title: "Pre-Flight Data Doctor",
    description:
      "Audit chat templates, detect EOS bugs, remove semantic near-duplicates, and embed memorization canaries before burning GPU hours.",
    asciiArt: featureAsciiBlue,
    color: "#00A2FF",
    scale: featureAsciiScaleCorrected.featureAsciiBlue.x,
    scaleY: featureAsciiScaleCorrected.featureAsciiBlue.y,
  },
  {
    title: "Exact Layer Streaming",
    description:
      "Stream frozen base weights from RAM or NVMe in NF4 precision. Fine-tune Llama-3.1-8B on a 4 GB GPU at 119.6 tok/s with DPO and ORPO.",
    asciiArt: featureAsciiMagenta,
    color: "#FF4FFC",
    scale: featureAsciiScaleCorrected.featureAsciiMagenta.x,
    scaleY: featureAsciiScaleCorrected.featureAsciiMagenta.y,
  },
  {
    title: "Deterministic Ship Verdict",
    description:
      "Evaluate models across eight offline benchmark suites. Commit a binary SHIP or DON'T-SHIP gate next to weights to prevent regression.",
    asciiArt: featureAsciiGreen,
    color: "#47E6C3",
    scale: featureAsciiScaleCorrected.featureAsciiGreen.x,
    scaleY: featureAsciiScaleCorrected.featureAsciiGreen.y,
  },
  {
    title: "Git for LoRA & MCP Agent",
    description:
      "Diff, merge, bisect, and arithmetic-subtract adapters. Drive full fine-tuning loops from Cursor or Claude Code via native MCP tools.",
    asciiArt: featureAsciiYellow,
    color: "#FFBD2E",
    scale: featureAsciiScaleCorrected.featureAsciiYellow.x,
    scaleY: featureAsciiScaleCorrected.featureAsciiYellow.y,
  },
];

export const ecosystemNodes = [
  { label: "Hugging Face & Ollama", angle: -47 },
  { label: "vLLM & SGLang Serving", angle: -15 },
  { label: "Apple MLX & Unsloth", angle: 8 },
  { label: "DeepSpeed & FlashAttention", angle: 28 },
];

export const pricingTiers: PricingTier[] = [
  {
    badge: "Core CLI",
    title: "Free & Open Source",
    description: "The full post-training stack for researchers and engineers on consumer hardware.",
    price: "$0",
    byline: "forever (Apache-2.0)",
    ctaText: "Install CLI",
    ctaHref: "https://pypi.org/project/soup-cli/",
    points: [
      "Full layer streaming & NF4 quantization",
      "167 offline training recipes & 23 methods",
      "Data doctor, semantic dedup & eval gates",
      "Native Apple Silicon (MLX) & CUDA support",
    ],
  },
  {
    badge: "Community",
    title: "Hardware Fund",
    description: "Fund rented GPU time (H100 clusters) to validate larger architectures and discover silent bugs.",
    price: "Donate",
    byline: "compute fund",
    ctaText: "Sponsor on GitHub",
    ctaHref: "https://github.com/MakazhanAlpamys/Soup",
    points: [
      "Fund H100 cluster benchmark sessions",
      "Multi-GPU & large-scale model validation",
      "Name listed in project contributors",
      "Direct input on experimental roadmap",
    ],
  },
  {
    badge: "Soup Zero",
    title: "The AI Workbench",
    description: "Desktop workbench built on Soup: dataset curation, evals, fine-tuning, deploy and monitoring.",
    price: "Coming Soon",
    byline: "desktop app",
    ctaText: "Explore Zero",
    ctaHref: "https://trysoup.dev/zero",
    points: [
      "Native desktop UI on your own hardware",
      "Visual dataset curation & pipeline DAGs",
      "One-click serving & canary deployment",
      "Real-time metrics & failure mode analysis",
    ],
  },
];

export const testimonialCards: TestimonialCard[] = [
  {
    company: "RTX 3050 Laptop (4 GB)",
    overview:
      "Trained Llama-3.1-8B-Instruct in NF4 at 119.6 tok/s with peak VRAM capped at 3.32 GB. Streamed DPO reference model cost zero extra weights.",
    name: "Alpamys Makazhan",
    role: "Co-Founder & CTO, Creator of Soup",
    imageSrc: `${ASSET}/images/testimonial-1.png`,
  },
  {
    company: "Apple Silicon (M-Series)",
    overview:
      "Full native Apple Silicon support via MLX. Bidirectional LoRA conversion between Hugging Face and MLX npz without precision loss.",
    name: "Sanzhar Hilrein",
    role: "Maybe Full Stack Developer, he is not lying:):):):):):)",
    imageSrc: `${ASSET}/images/testimonial-1.png`,
  },
  {
    company: "8x H100 Cluster Session",
    overview:
      "Validated bit-exact layer streaming against resident baselines from 0.5B to 72B. Disclosed and patched upstream NF4 gradient defects.",
    name: "Rafik Mamedov",
    role: "Co-Founder & CEO",
    imageSrc: `${ASSET}/images/testimonial-1.png`,
    activeBoxes: true,
  },
];

export const largeTestimonial = {
  name: "Alpamys Makazhan",
  role: "Author of Exact Layer Streaming (DOI: 10.5281/zenodo.21771064)",
  quote:
    "“Because streaming failures are silent, the central contribution is a correctness protocol built on bit-exactness against a resident reference of the same numerics, verified across nine architecture families. Peak VRAM is bounded by one layer, not by the model.”",
  ctaText: "Read the Paper",
  ctaHref: "https://doi.org/10.5281/zenodo.21771064",
  imageSrc: `${ASSET}/images/testimonial-1.png`,
};

export const faqItems: FaqItem[] = [
  {
    question: "How does Layer Streaming fit an 8B model into a 4 GB GPU?",
    answer:
      "Soup holds the frozen base model in CPU RAM or NVMe and copies it into VRAM one decoder layer at a time on a dedicated CUDA stream. Only the active layer and LoRA adapters reside in VRAM, bounding peak memory to a single layer.",
  },
  {
    question: "What training methods and objectives are supported?",
    answer:
      "Soup supports 23 methods including SFT, DPO, ORPO, SimPO, KTO, GRPO (with Process Reward Models and verifiable rewards), LISA layer sampling, Spectrum SNR targeting, and LoRA task arithmetic.",
  },
  {
    question: "Which models and architectures can I fine-tune?",
    answer:
      "Out of the box, Soup supports Llama 3.1/3.2/4, Qwen 2.5/3.5/3.6, DeepSeek R1/V3/V4, Mistral, Gemma 3, Phi-4, Whisper for speech fine-tuning, and over 200+ models on the Hugging Face Hub.",
  },
  {
    question: "Does Soup send telemetry or training data to external servers?",
    answer:
      "No. Soup runs 100% offline and sends zero telemetry or logs unless explicitly requested. All weights, datasets, and configurations remain strictly on your local hardware.",
  },
  {
    question: "How does Soup prevent catastrophic forgetting and bad checkpoints?",
    answer:
      "The soup ship command evaluates checkpoints against 8 offline benchmark suites, outputting a cryptographic SHIP or DON'T-SHIP verdict. It blocks PRs or saves when a model degrades general capabilities.",
  },
];

export const trustItems: TrustItem[] = [
  { text: "100% Free and Apache-2.0 Licensed." },
  { text: "Runs completely offline on your own hardware." },
  { text: "Zero cloud lock-in or telemetry.", useLogoMark: true },
];

export const footerColumns: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Ecosystem", href: "#ecosystem" },
      { label: "Pricing", href: "#pricing" },
      { label: "Docs", href: "https://trysoup.dev/docs" },
      { label: "Soup Zero", href: "https://trysoup.dev/zero" },
    ],
  },
  {
    heading: "Community & Code",
    links: [
      { label: "GitHub", href: "https://github.com/MakazhanAlpamys/Soup" },
      { label: "PyPI", href: "https://pypi.org/project/soup-cli/" },
      { label: "Discord", href: "https://discord.gg/dgd2pJcjwP" },
      { label: "Telegram", href: "https://t.me/souptasters" },
      { label: "Paper (DOI)", href: "https://doi.org/10.5281/zenodo.21771064" },
    ],
  },
];

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rafik-mamedov/" },
  { label: "GitHub", href: "https://github.com/MakazhanAlpamys/Soup" },
  { label: "YouTube", href: "https://www.youtube.com/@SoupCLI" },
];
