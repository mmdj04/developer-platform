import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 1080, 1200, 1920],
  },
};

export default nextConfig;
