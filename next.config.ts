import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Qualidades usadas em <Image quality={...}> (hero = 85, lightbox = 90).
    qualities: [75, 85, 90],
  },
};

export default nextConfig;
