/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // Set basePath if deploying to a repo subdirectory (e.g. /stryng_web_motiondev)
  // basePath: '/stryng_web_motiondev',
  // assetPrefix: '/stryng_web_motiondev/',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
