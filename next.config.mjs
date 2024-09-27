/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
