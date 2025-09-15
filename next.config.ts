import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", //   allows *all* https domains
        port: "",
        // pathname: "/account123/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
