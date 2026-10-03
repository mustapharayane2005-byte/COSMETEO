import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Autorise quality={85} et quality={90} sur next/image (sinon Next retombe sur 75).
  images: { qualities: [75, 85, 90] },
};

export default nextConfig;
