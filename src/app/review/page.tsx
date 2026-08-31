import { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ReviewRequest from "@/components/ReviewRequest";

/**
 * クチコミ依頼ページ。
 *
 * noindex にしている理由:
 * - 検索から来る人向けの内容がなく、薄いページとして拾われる意味がない
 * - robots.txt の Disallow ではなく meta の noindex を使う。Disallow にすると
 *   Googleがページを読めず noindex 自体を認識できないため。
 * sitemap.ts は固定ページを明示列挙しているので、そちらにも足さない。
 */
export const metadata: Metadata = {
  alternates: { canonical: "/review" },
  title: "クチコミのお願い",
  description:
    "cycleZをご利用いただいた方へ。Googleのクチコミ投稿ページへのご案内です。",
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="クチコミのお願い"
        subtitle="REVIEW"
        breadcrumbs={[{ label: "クチコミのお願い" }]}
      />
      <ReviewRequest />
    </div>
  );
}
