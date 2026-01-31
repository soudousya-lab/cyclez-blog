import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#c41e3a] to-[#e85a70] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              cycleZ ブログ
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              初心者の方や女性のお客様、さらにはロードバイクに乗る全ての方の人生をより豊かにしたい。
            </p>
            <p className="text-xl font-bold mt-4">
              通勤・通学やフィットネスにロードバイクという選択肢を
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-4">
            <Link
              href="/"
              className="flex-shrink-0 px-4 py-2 bg-[#c41e3a] text-white rounded-full text-sm font-medium"
            >
              すべての記事
            </Link>
            <Link
              href="/category/beginner"
              className="flex-shrink-0 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              初心者向け
            </Link>
            <Link
              href="/category/maintenance"
              className="flex-shrink-0 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              メンテナンス
            </Link>
            <Link
              href="/category/course"
              className="flex-shrink-0 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              コース紹介
            </Link>
            <Link
              href="/category/women"
              className="flex-shrink-0 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              女性サイクリスト
            </Link>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#c41e3a]"></span>
            最新の記事
          </h2>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <p className="text-gray-500 text-lg">まだ記事がありません</p>
              <p className="text-gray-400 mt-2">記事を追加してください</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ロードバイクのことなら何でもご相談ください
          </h2>
          <p className="text-gray-600 mb-6">
            cycleZでは初心者の方向けに、無料の講習会を毎月開催しています。<br />
            お気軽にお問い合わせください。
          </p>
          <a
            href="https://cycle-z.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#c41e3a] text-white px-8 py-3 rounded-full hover:bg-[#a01830] transition-colors font-medium"
          >
            店舗サイトを見る
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
