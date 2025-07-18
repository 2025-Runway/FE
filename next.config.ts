import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [''],
  },

  reactStrictMode: false,
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // 추가된 부분 - turbo에서 svgr설정
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

export default nextConfig;
