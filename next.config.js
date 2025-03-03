/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Image configuration
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig; 