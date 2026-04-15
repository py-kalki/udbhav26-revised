import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => [
    {
      source: "/dashboard/api/:path*",
      destination: "/api/:path*",
    },
  ],
};

export default nextConfig;
