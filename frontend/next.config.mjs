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
    async headers() {
        return [
            {
                source: '/(.*)', // Applies to all routes
                headers: [
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin', // Sets the referrer policy
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
