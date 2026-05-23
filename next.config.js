/** @type {import('next').NextConfig} */
const REPO_BASE = '/stryng_web_motiondev';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: REPO_BASE,
  assetPrefix: `${REPO_BASE}/`,
  env: {
    NEXT_PUBLIC_BASE_PATH: REPO_BASE,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
