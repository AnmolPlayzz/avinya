import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'd2w7l1p59qkl0r.cloudfront.net',
                pathname: '/static/scholarship_logo/**',
            },
            {
                protocol: 'https',
                hostname: 's3-ap-southeast-1.amazonaws.com',
                pathname: '/cdn.buddy4study.com/static/scholarship_logo/**',
            },
        ],
    },
}
export default nextConfig;
