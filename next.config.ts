import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dyrjziqft/image/upload/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
