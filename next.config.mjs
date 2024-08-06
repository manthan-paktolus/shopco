/** @type {import('next').NextConfig} */
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
    ],
  },
};

export default nextConfig;
