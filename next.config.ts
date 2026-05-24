import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Clean URLs are default in Next.js App Router
  // Images from /public/images/ are served at /images/
  // No trailing slashes to match existing URL structure
  trailingSlash: false,
  // Allow images from codyeanes.com in next/image if used
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'codyeanes.com' }
    ]
  }
}

export default nextConfig
