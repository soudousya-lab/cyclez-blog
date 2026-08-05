import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndex, { getTotalPages } from "@/components/BlogIndex";

interface Props {
  params: Promise<{ n: string }>;
}

// 2ページ目以降を静的生成する。1ページ目は /blog（重複URLを作らないためここには含めない）。
export function generateStaticParams() {
  const total = getTotalPages();
  return Array.from({ length: Math.max(total - 1, 0) }, (_, i) => ({ n: String(i + 2) }));
}

function parsePage(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null; // "01" や "2e1" のような重複URLを弾く
  const n = Number(raw);
  if (n < 2 || n > getTotalPages()) return null; // 1ページ目は /blog が正
  return n;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { n } = await params;
  const page = parsePage(n);
  if (!page) return {};
  return {
    title: `ブログ記事一覧（${page}ページ目）`,
    description:
      "岡山のスポーツバイク専門店 cycleZ のブログ記事一覧。ロードバイクの選び方、メンテナンス、岡山のサイクリングコース、試乗会やイベントのレポートをまとめています。",
    alternates: { canonical: `/blog/page/${page}` },
    // 2ページ目以降は記事カードが並ぶだけの薄いアーカイブ。index させると
    // 重複・低品質ページを増やす（2026-04コアアプデでの順位崩落を踏まえた保守側の判断）。
    // follow は残すので記事へのクロールは続く。
    robots: { index: false, follow: true },
  };
}

export default async function BlogPaginatedPage({ params }: Props) {
  const { n } = await params;
  const page = parsePage(n);
  if (!page) notFound();
  return <BlogIndex page={page} />;
}
