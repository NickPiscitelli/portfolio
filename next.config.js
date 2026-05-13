/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
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
