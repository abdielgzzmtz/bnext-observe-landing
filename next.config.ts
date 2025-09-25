import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        // si quieres ser más estricto: pathname: "/lrigu76hy/**"
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
