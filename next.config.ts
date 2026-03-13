import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // WP旧URL: /blog/YYYY/MM/DD/slug/ → 新URL: /blog/slug
      {
        source: "/blog/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      // 末尾スラッシュ付きも対応
      {
        source: "/blog/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug/",
        destination: "/blog/:slug",
        permanent: true,
      },
      // WP固定ページの旧URLリダイレクト
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/greeting",
        destination: "/about/greeting",
        permanent: true,
      },
      // /first/beginner/ はそのまま対応済み
    ];
  },
};

export default nextConfig;
