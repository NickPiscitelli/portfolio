/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nickpiscitelli.com',
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
