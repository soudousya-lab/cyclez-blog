import { Metadata } from "next";
import BlogIndex from "@/components/BlogIndex";

// 記事一覧の1ページ目。
// 2026-08-05まで /blog は存在せず404だった（記事467本に一覧が無く、さらに
// JsonLd のパンくず position 2 が全記事から /blog を指していた＝404を構造化データで宣言していた）。
// searchParams を使うと動的レンダリングになり毎リクエストで467本を読み直すため、
// ページ送りは /blog/page/[n] の静的ルートに分けている。

export const metadata: Metadata = {
  title: "ブログ記事一覧",
  description:
    "岡山のスポーツバイク専門店 cycleZ のブログ記事一覧。ロードバイクの選び方、メンテナンス、岡山のサイクリングコース、試乗会やイベントのレポートをまとめています。",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return <BlogIndex page={1} />;
}
