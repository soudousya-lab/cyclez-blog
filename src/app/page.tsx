import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import HeroSlider from "@/components/HeroSlider";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Message Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 text-[#c41e3a] text-sm font-medium mb-6">
            <span className="w-8 h-[1px] bg-[#c41e3a]"></span>
            CONCEPT
            <span className="w-8 h-[1px] bg-[#c41e3a]"></span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-relaxed">
            ロードバイクに乗る全ての方の<br className="hidden md:block" />
            <span className="text-[#c41e3a]">人生をより豊かに</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            初心者の方や女性のお客様も安心してお越しください。<br />
            通勤・通学やフィットネスにロードバイクという選択肢を。<br />
            cycleZがあなたの新しいライフスタイルをサポートします。
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="bg-gray-100 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
            <Link
              href="/"
              className="flex-shrink-0 px-5 py-2.5 bg-[#c41e3a] text-white rounded-full text-sm font-medium shadow-sm"
            >
              すべての記事
            </Link>
            <Link
              href="/category/beginner"
              className="flex-shrink-0 px-5 py-2.5 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              初心者向け
            </Link>
            <Link
              href="/category/maintenance"
              className="flex-shrink-0 px-5 py-2.5 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              メンテナンス
            </Link>
            <Link
              href="/category/course"
              className="flex-shrink-0 px-5 py-2.5 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              コース紹介
            </Link>
            <Link
              href="/category/women"
              className="flex-shrink-0 px-5 py-2.5 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              女性サイクリスト
            </Link>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="w-1 h-8 bg-[#c41e3a] rounded-full"></span>
              最新の記事
            </h2>
            <span className="text-sm text-gray-500">{posts.length}件の記事</span>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/contact.jpg"
            alt="お問い合わせ"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#c41e3a]/90" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ロードバイクのことなら<br className="md:hidden" />何でもご相談ください
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            cycleZでは初心者の方向けに、無料の講習会を毎月開催しています。<br className="hidden md:block" />
            お気軽にお問い合わせください。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://cycle-z.com/#contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#c41e3a] px-8 py-3 rounded-full hover:bg-gray-100 transition-all hover:scale-105 font-bold"
            >
              お問い合わせ
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="https://cycle-z.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-3 rounded-full hover:bg-white/10 transition-all font-medium border-2 border-white"
            >
              店舗サイトを見る
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
