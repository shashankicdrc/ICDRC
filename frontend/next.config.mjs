/**
 * @type {import('next').NextConfig}
 *
 *
 */

// const withImage=require('next-images')
// module.exports = withImage()
const nextConfig = {
    output: 'standalone',
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
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
