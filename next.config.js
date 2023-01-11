/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? '/portfolio/' : undefined,
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
