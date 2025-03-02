/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable strict mode completely
  swcMinify: true,
  // Disable React strict mode in development to reduce hydration warnings
  ...(process.env.NODE_ENV === 'development' ? { 
    reactStrictMode: false,
    onDemandEntries: {
      // Keep the error overlay from appearing
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    }
  } : {}),
  // Add any other necessary configurations
};

module.exports = nextConfig; 