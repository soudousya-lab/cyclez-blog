import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // 日本語パスのワークスペースルート誤検知バグを回避
    root: __dirname,
  },
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
      // 禁止ブランド(narifuri)を含む期限切れイベント記事を削除しアパレルカテゴリへ集約（2026-07-04）
      {
        source: "/blog/narifuri_assos_popupstore",
        destination: "/category/アパレル",
        permanent: true,
      },
      // /cyclewear を /select に統合（2026-07-20）。KWカニバリ/重複ページ解消。
      {
        source: "/cyclewear",
        destination: "/select",
        permanent: true,
      },
      {
        source: "/cyclewear/",
        destination: "/select",
        permanent: true,
      },
      // 取扱終了ブランドの旧ガイドは現行ラインナップへ集約（2026-07-19）
      {
        source: "/lineup/lapierre",
        destination: "/lineup",
        permanent: true,
      },
      {
        source: "/lineup/lapierre/",
        destination: "/lineup",
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
      // WP旧固定ページ: /10th/ → トップページ
      {
        source: "/10th",
        destination: "/",
        permanent: true,
      },
      {
        source: "/10th/",
        destination: "/",
        permanent: true,
      },
      // WP旧カテゴリURL: /blog/category/slug → 新URL: /category/slug
      {
        source: "/blog/category/:slug",
        destination: "/category/:slug",
        permanent: true,
      },
      {
        source: "/blog/category/:slug/",
        destination: "/category/:slug",
        permanent: true,
      },
      // WP旧固定ページ: /event_all → カテゴリページ
      {
        source: "/event_all",
        destination: "/category/event",
        permanent: true,
      },
      {
        source: "/event_all/",
        destination: "/category/event",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Next.js/Vercelのビルド資産(JS/CSSチャンク)はデプロイ毎に内容ハッシュでURLが変わり、
        // さらに ?dpl=デプロイID が付くため、Googleが「クロール済み-インデックス未登録」として
        // 累積記録する（2026-07時点で約1,102件・デプロイの度に増加）。これらは検索結果に出す
        // 対象ではないので X-Robots-Tag: noindex を明示し、薄いコンテンツ誤検知を止める。
        // robots.txt の Disallow と違いクロール自体は許可されるので、Googleのレンダリング
        // (WRS)には影響しない。/_next/image（画像最適化）は対象外なので画像検索は無傷。
        source: "/_next/static/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
