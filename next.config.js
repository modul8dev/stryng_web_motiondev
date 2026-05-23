/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/stryng_web_motiondev',
  assetPrefix: '/stryng_web_motiondev/',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
