/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  eslint: {
    dirs: ['app'],
  },
  images: {
    domains: [
      '**',
      '',
      'static.wixstatic.com',
      'https:/d945e594-8657-47e2-9cd9-e9033c3d8da0.usrfiles.com',
    ],
    formats: ['image/webp'],
  },
};

module.exports = nextConfig;
