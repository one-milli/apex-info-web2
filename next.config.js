// next.config.js

const withPWA = require("next-pwa")({
  dest: "public", // サービスワーカーとキャッシュファイルの出力先
  register: true, // クライアント側でサービスワーカーを登録するかどうか
  skipWaiting: true, // 新しいサービスワーカーが即座にアクティブになるようにする
  disable: process.env.NODE_ENV === "development", // 開発環境ではPWAを無効化
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  webpack(config) {
    // 既存のSVGルールを見つけて除外
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test instanceof RegExp && rule.test.test(".svg")
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    // SVGR用のルールを追加
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apexlegendsstatus.com",
        port: "",
        pathname: "/assets/**",
      },
    ],
  },
});

module.exports = nextConfig;
