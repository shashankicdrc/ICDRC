

/**
 * @type {import('next').NextConfig}
 * 
 * 
 */

// const withImage=require('next-images')
// module.exports = withImage()
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
}
 
export default nextConfig