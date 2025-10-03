import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ["192.168.137.1"], // 👈 add your LAN IP here
  },
};

export default nextConfig;
