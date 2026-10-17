import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Autorise quality={85} et quality={90} sur next/image (sinon Next retombe sur 75).
  images: { qualities: [75, 85, 90] },
  async redirects() {
    return [{ source: "/retours", destination: "/livraison", permanent: true }];
  },
};

export default nextConfig;
