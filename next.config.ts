import type { NextConfig } from "next";

const nextConfig = {
  output: "export",
  images: {
        unoptimized: true, // Disables image optimization globally
        loader: 'akamai'
      },
  basePath: "https://wiiiy.github.io/cabin",
};;

export default nextConfig;
