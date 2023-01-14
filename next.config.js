/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
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
