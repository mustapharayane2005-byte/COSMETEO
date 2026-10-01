import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Autorise quality={90} sur next/image (sinon Next retombe sur 75).
  images: { qualities: [75, 90] },
};

export default nextConfig;
