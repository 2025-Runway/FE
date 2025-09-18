import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'www.durunubi.kr',
      'www.durunubi.kr:443',
      'www.durunubi.kr:*',
      'tong.visitkorea.or.kr',
      'runway-bucket.s3.ap-northeast-2.amazonaws.com',
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'img1.kakaocdn.net',
        pathname: '/**',
      },
    ],
  },
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // turbo에서 svgr설정
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};
const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  // @ts-ignore
})(nextConfig);

export default pwaConfig;
