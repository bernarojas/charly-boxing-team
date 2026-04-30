/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@arcgis/core'],
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false }
    return config
  },
}

module.exports = nextConfig
