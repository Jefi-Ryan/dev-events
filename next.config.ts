import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript : {
    ignoreBuildErrors: true
  },
  reactCompiler: true,
  experimental: {
    agentFeedback: true,
    turbopackFileSystemCacheForDev: true
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      }
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
