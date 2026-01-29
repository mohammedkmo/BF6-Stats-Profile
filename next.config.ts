import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eaavatarservice.akamaized.net',
      },
      {
        protocol: 'https',
        hostname: 'drop-assets.ea.com',
      },
      {
        protocol: 'https',
        hostname: 'drop-api.ea.com',
      },
    ],
  },
};

export default nextConfig;
