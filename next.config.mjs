/** @type {import('next').NextConfig} */
import nextTranslate from "next-translate-plugin";

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "turbo-eureka-5ggp4qxj9jgr2xv-3000.app.github.dev",
        "localhost:3000",
      ],
    },
  },
};

export default nextTranslate(nextConfig);
