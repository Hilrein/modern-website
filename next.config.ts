import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only use standalone output for Docker container builds; disable on Vercel to avoid NFT trace collision
  output: process.env.VERCEL ? undefined : "standalone",
};

export default nextConfig;
