import type { NextConfig } from "next";

const nextConfig = {
  output: "export",
  images: {
        unoptimized: true, // Disables image optimization globally
      },
};;

export default nextConfig;
