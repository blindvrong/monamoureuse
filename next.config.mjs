/** @type {import('next').NextConfig} */
const basePath = process.env.GITHUB_ACTIONS === 'true' ? '/monamoureuse' : ''

const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  allowedDevOrigins: ['localhost', '127.0.0.1', '0.0.0.0'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
