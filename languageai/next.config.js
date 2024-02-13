/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["flagcdn.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "16x12/**",
      },
    ],
  },
};

module.exports = nextConfig;
