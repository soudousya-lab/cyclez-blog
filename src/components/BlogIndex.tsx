import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import { getCategoryLabel } from "@/lib/categories";
import PostCard from "@/components/PostCard";
import PageBanner from "@/components/PageBanner";

// 1ページあたりの記事数。467本を1枚に出すとDOMが重く、細かく割りすぎると
// 薄いアーカイブが量産される。24件で約20ページ。
export const PER_PAGE = 24;

export function getTotalPages(): number {
  return Math.max(Math.ceil(getAllPosts().length / PER_PAGE), 1);
}

/** ページ番号 → URL。1ページ目は /blog（?page=1 のような重複URLを作らない） */
export function blogPageHref(n: number): string {
  return n === 1 ? "/blog" : `/blog/page/${n}`;
}

export default function BlogIndex({ page }: { page: number }) {
  const allPosts = getAllPosts(); // 日付降順
  const categories = getAllCategories();
  const totalPages = Math.max(Math.ceil(allPosts.length / PER_PAGE), 1);
  const posts = allPosts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // 先頭・末尾・現在地の前後だけ出す（20ページ分の番号を全部並べない）
  const pageNumbers: (number | "gap")[] = [];
  for (let n = 1; n <= totalPages; n++) {
    if (n === 1 || n === totalPages || Math.abs(n - page) <= 1) pageNumbers.push(n);
    else if (pageNumbers[pageNumbers.length - 1] !== "gap") pageNumbers.push("gap");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <PageBanner
        title="ブログ"
        subtitle={`全${allPosts.length}件${totalPages > 1 ? `（${page}/${totalPages}ページ）` : ""}`}
        breadcrumbs={[{ label: "ブログ" }]}
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* カテゴリナビ（現在地=すべて） */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-sm px-4 py-1.5 rounded-full bg-[#c41e3a] text-white border border-[#c41e3a]">
            すべて
          </span>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${encodeURIComponent(cat)}`}
              className="text-sm px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:border-[#c41e3a] hover:text-[#c41e3a] transition-colors"
            >
              {getCategoryLabel(cat)}
            </Link>
          ))}
        </div>

        {/* 記事一覧 */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p>記事がまだありません。</p>
          </div>
        )}

        {/* ページネーション */}
        {totalPages > 1 && (
          <nav className="flex flex-wrap items-center justify-center gap-2 mt-12" aria-label="ページ送り">
            {page > 1 && (
              <Link
                href={blogPageHref(page - 1)}
                rel="prev"
                className="text-sm px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:border-[#c41e3a] hover:text-[#c41e3a] transition-colors"
              >
                前へ
              </Link>
            )}
            {pageNumbers.map((n, i) =>
              n === "gap" ? (
                <span key={`gap-${i}`} className="px-2 text-gray-400">
                  …
                </span>
              ) : n === page ? (
                <span
                  key={n}
                  aria-current="page"
                  className="text-sm px-4 py-2 rounded-lg bg-[#c41e3a] text-white border border-[#c41e3a]"
                >
                  {n}
                </span>
              ) : (
                <Link
                  key={n}
                  href={blogPageHref(n)}
                  className="text-sm px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:border-[#c41e3a] hover:text-[#c41e3a] transition-colors"
                >
                  {n}
                </Link>
              )
            )}
            {page < totalPages && (
              <Link
                href={blogPageHref(page + 1)}
                rel="next"
                className="text-sm px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:border-[#c41e3a] hover:text-[#c41e3a] transition-colors"
              >
                次へ
              </Link>
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
